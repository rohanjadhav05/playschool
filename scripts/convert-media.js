#!/usr/bin/env node
/**
 * Media Conversion Script
 *
 * Output structure (created inside the given folder):
 *
 *   <folder>/
 *     images/
 *       image1.webp
 *       image2.webp
 *       ...
 *     videos/
 *       1/
 *         index.m3u8
 *         t001.ts
 *         t002.ts
 *       2/
 *         index.m3u8
 *         t001.ts
 *         ...
 *
 * Image conversion : sharp (no ffmpeg needed)
 *   - quality 90, original dimensions preserved
 *
 * Video conversion : ffmpeg → HLS
 *   - CRF 18 (visually lossless H.264), preset slow
 *   - AAC 192k audio, original resolution preserved
 *   - 10-second segments, segments start at t001.ts
 *
 * Usage:
 *   npm run convert -- <folder>
 *   npm run convert -- public/karad
 *   npm run convert -- public/karad --recursive
 *   npm run convert -- public/karad --dry-run
 *
 * Requires: ffmpeg for video  →  brew install ffmpeg
 */

import { readdirSync, existsSync, mkdirSync, statSync } from 'fs'
import { join, extname, resolve } from 'path'
import { spawn } from 'child_process'
import sharp from 'sharp'

// ── supported formats ─────────────────────────────────────────────────────────

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.avif'])
const VIDEO_EXTS = new Set(['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v'])

// ── CLI ───────────────────────────────────────────────────────────────────────

const args        = process.argv.slice(2)
const folderArg   = args.find(a => !a.startsWith('--'))
const isRecursive = args.includes('--recursive') || args.includes('-r')
const isDryRun    = args.includes('--dry-run')

if (!folderArg) {
  console.error([
    '',
    '  Usage: node scripts/convert-media.js <folder> [options]',
    '',
    '  Options:',
    '    --recursive   Also process sub-folders',
    '    --dry-run     Show what would be converted without writing anything',
    '',
    '  Examples:',
    '    node scripts/convert-media.js public/karad',
    '    node scripts/convert-media.js public/ --recursive',
    '    node scripts/convert-media.js public/karad --dry-run',
    '',
  ].join('\n'))
  process.exit(1)
}

const rootFolder = resolve(folderArg)

if (!existsSync(rootFolder)) {
  console.error(`  ERROR: folder not found → ${rootFolder}`)
  process.exit(1)
}

// ── ffmpeg runner ─────────────────────────────────────────────────────────────

function runFFmpeg(ffmpegArgs, label, cwd) {
  return new Promise((res, rej) => {
    const proc = spawn('ffmpeg', ffmpegArgs, {
      stdio: ['ignore', 'ignore', 'pipe'],
      cwd,
    })

    let stderr = ''
    proc.stderr.on('data', chunk => { stderr += chunk.toString() })

    proc.on('error', err => {
      if (err.code === 'ENOENT')
        rej(new Error('ffmpeg not found — install it: brew install ffmpeg'))
      else
        rej(err)
    })

    proc.on('close', code => {
      if (code === 0) res()
      else rej(new Error(`ffmpeg failed (exit ${code}) for "${label}"\n${stderr.slice(-400)}`))
    })
  })
}

// ── image conversion via sharp ────────────────────────────────────────────────
//
// sharp handles WebP encoding natively — no ffmpeg libwebp required.
// quality 90 : visually indistinguishable from JPEG/PNG, much smaller file.
// No resize call → original pixel dimensions are preserved exactly.

async function convertImage(inputPath, outputPath, label) {
  if (existsSync(outputPath)) {
    console.log(`    skip      already exists`)
    return 'skipped'
  }

  if (isDryRun) {
    console.log(`    dry-run   would write → ${outputPath}`)
    return 'dry-run'
  }

  await sharp(inputPath)
    .webp({ quality: 90 })   // quality 90/100 — near-lossless
    .toFile(outputPath)

  return 'converted'
}

// ── video conversion via ffmpeg → HLS ────────────────────────────────────────
//
// Each video gets its own numbered folder: videos/1/, videos/2/, ...
//   index.m3u8  — HLS playlist (references segments by relative name)
//   t001.ts     — first 10-second chunk
//   t002.ts     — second chunk, etc.
//
// CRF 18  : visually lossless (0 = mathematically lossless, 51 = worst)
// preset slow : best compression ratio at the given CRF — smaller file, same quality
// AAC 192k: high-quality audio as required by HLS spec
// No -vf scale → original width × height are preserved

async function convertVideo(inputPath, videoFolder, label) {
  const playlistPath = join(videoFolder, 'index.m3u8')

  if (existsSync(playlistPath)) {
    console.log(`    skip      already exists`)
    return 'skipped'
  }

  if (isDryRun) {
    console.log(`    dry-run   would write → ${videoFolder}/index.m3u8`)
    console.log(`              segments    → t001.ts, t002.ts, …`)
    return 'dry-run'
  }

  mkdirSync(videoFolder, { recursive: true })

  // cwd = videoFolder so all paths in the m3u8 are relative (correct for web serving)
  await runFFmpeg(
    [
      '-y',
      '-i',                    resolve(inputPath),  // absolute input
      '-c:v',                  'libx264',
      '-crf',                  '18',                // visually lossless
      '-preset',               'slow',              // best compression at this CRF
      '-c:a',                  'aac',
      '-b:a',                  '192k',              // high-quality audio
      // no -vf scale → original resolution preserved
      '-hls_time',             '10',                // 10-second segments
      '-hls_list_size',        '0',                 // all segments in playlist
      '-start_number',         '1',                 // start at t001.ts not t000.ts
      '-hls_segment_filename', 't%03d.ts',          // t001.ts, t002.ts, …
      '-f',                    'hls',
      'index.m3u8',                                 // relative — stays correct in playlist
    ],
    label,
    videoFolder  // ffmpeg runs from here so segment refs are relative
  )

  return 'converted'
}

// ── folder processor ──────────────────────────────────────────────────────────

async function processFolder(dir) {
  const totals = { converted: 0, skipped: 0, dryRun: 0, errors: 0 }

  // Sort for stable numbering — same file always gets the same number on re-runs
  const entries = readdirSync(dir).sort()

  // Output folders — created on first use
  const imagesDir = join(dir, 'images')
  const videosDir = join(dir, 'videos')

  let imageIndex = 0
  let videoIndex = 0

  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat     = statSync(fullPath)

    // Skip the output folders we create — don't recurse into them
    if (stat.isDirectory()) {
      const isOutputDir = entry === 'images' || entry === 'videos'
      if (isRecursive && !isOutputDir) {
        const sub = await processFolder(fullPath)
        totals.converted += sub.converted
        totals.skipped   += sub.skipped
        totals.dryRun    += sub.dryRun
        totals.errors    += sub.errors
      }
      continue
    }

    const ext = extname(entry).toLowerCase()

    // ── image ──────────────────────────────────────────────────────────────
    if (IMAGE_EXTS.has(ext)) {
      imageIndex++

      if (!isDryRun) mkdirSync(imagesDir, { recursive: true })

      const outputPath = join(imagesDir, `image${imageIndex}.webp`)

      console.log(`\n  [image ${imageIndex}]  ${entry}`)
      console.log(`              → images/image${imageIndex}.webp`)

      try {
        const outcome = await convertImage(fullPath, outputPath, entry)
        if (outcome === 'converted') totals.converted++
        if (outcome === 'skipped')   totals.skipped++
        if (outcome === 'dry-run')   totals.dryRun++
      } catch (err) {
        console.error(`    ERROR     ${err.message}`)
        totals.errors++
      }
    }

    // ── video ──────────────────────────────────────────────────────────────
    else if (VIDEO_EXTS.has(ext)) {
      videoIndex++

      const videoFolder = join(videosDir, String(videoIndex))

      console.log(`\n  [video ${videoIndex}]  ${entry}`)
      console.log(`              → videos/${videoIndex}/index.m3u8  +  t001.ts, t002.ts, …`)

      try {
        const outcome = await convertVideo(fullPath, videoFolder, entry)
        if (outcome === 'converted') totals.converted++
        if (outcome === 'skipped')   totals.skipped++
        if (outcome === 'dry-run')   totals.dryRun++
      } catch (err) {
        console.error(`    ERROR     ${err.message}`)
        totals.errors++
      }
    }
  }

  return totals
}

// ── main ──────────────────────────────────────────────────────────────────────

const modeLabel = isDryRun ? '  [DRY RUN]' : ''
console.log(`\nConverting media in: ${rootFolder}${isRecursive ? '  (recursive)' : ''}${modeLabel}`)
console.log('─'.repeat(64))

const totals = await processFolder(rootFolder)

console.log('\n' + '─'.repeat(64))
if (isDryRun) {
  console.log(`Dry run complete — nothing was written.`)
  console.log(`  Would convert : ${totals.dryRun}`)
} else {
  console.log(`Done.`)
  console.log(`  Converted : ${totals.converted}`)
  console.log(`  Skipped   : ${totals.skipped}  (output already exists)`)
  console.log(`  Errors    : ${totals.errors}`)
}
console.log()
