import { BRAND, BRANCHES } from '../../school.config.js'
import { validateBranches } from './branches.js'

// Throws on the first malformed config it sees. Called from main.jsx before
// the React tree mounts so a misconfigured fork fails loudly, not silently.
export function validateConfig() {
  const errors = []

  if (!BRAND || typeof BRAND !== 'object') {
    errors.push({
      field: 'BRAND',
      message: 'is required — export const BRAND = { ... } from school.config.js',
      example: "export const BRAND = { name: 'Atharva Playschool', s3BaseUrl: '...' }",
    })
  } else {
    if (!BRAND.name || typeof BRAND.name !== 'string') {
      errors.push({
        field: 'BRAND.name',
        message: 'is required (brand name shown across the site)',
        example: "name: 'Atharva Playschool'",
      })
    }
    if (!BRAND.s3BaseUrl || typeof BRAND.s3BaseUrl !== 'string') {
      errors.push({
        field: 'BRAND.s3BaseUrl',
        message: 'is required (base URL for hosted media)',
        example: "s3BaseUrl: 'https://your-bucket.s3.ap-south-1.amazonaws.com'",
      })
    }
  }

  errors.push(...validateBranches(BRANCHES))

  if (errors.length > 0) {
    const msg = errors
      .map((e) => `  • ${e.field}: ${e.message}\n      example → ${e.example}`)
      .join('\n')
    throw new Error(
      `school.config.js failed validation (${errors.length} issue${
        errors.length === 1 ? '' : 's'
      }):\n${msg}\n\nFix the issues above and reload.`,
    )
  }
}
