#!/bin/bash
# Generates a thumbnail for any video folder under public/ that is missing one.
# Saves as thumb.webp if possible, falls back to thumb.jpg.
# Requires: ffmpeg
# Usage: bash scripts/generate-thumbs.sh

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC="$PROJECT_ROOT/public"

if ! command -v ffmpeg &>/dev/null; then
  echo "Error: ffmpeg not found. Install with: brew install ffmpeg"
  exit 1
fi

count=0

for dir in $(find "$PUBLIC" -type d -regex ".*/videos/[0-9]*"); do
  ts="$dir/t001.ts"

  [ -f "$ts" ] || continue
  [ -f "$dir/thumb.webp" ] && continue
  [ -f "$dir/thumb.jpg"  ] && continue

  rel="${dir#$PROJECT_ROOT/}"
  echo "Generating: $rel/thumb.jpg"

  ffmpeg -i "$ts" -ss 00:00:01 -vframes 1 -vf "scale=480:-2" \
    -f mjpeg "$dir/thumb.jpg" -y -loglevel quiet

  if [ $? -eq 0 ] && [ -f "$dir/thumb.jpg" ]; then
    count=$((count + 1))
  else
    echo "  Warning: failed for $rel"
  fi
done

if [ "$count" -eq 0 ]; then
  echo "All thumbnails are already up to date."
else
  echo "Done — $count thumbnail(s) generated."
fi
