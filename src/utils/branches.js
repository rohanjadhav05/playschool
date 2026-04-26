// Pure helpers for working with the BRANCHES array. Kept framework-free so
// they can be used from validators, hooks, components, and tests.

const SLUG_RE = /^[A-Za-z0-9-]+$/
const PHONE_RE = /^\d{10,15}$/

export function getPrimaryBranch(branches) {
  if (!Array.isArray(branches) || branches.length === 0) return null
  return branches.find((b) => b.isPrimary) || branches[0]
}

// Case-insensitive lookup so /branches/karve and /branches/Karve both work
// regardless of the casing chosen in school.config.js.
export function getBranchBySlug(branches, slug) {
  if (!Array.isArray(branches) || !slug) return null
  const needle = String(slug).toLowerCase()
  return branches.find((b) => b.slug && b.slug.toLowerCase() === needle) || null
}

// Returns an array of error strings ({ field, message, example }). Empty
// array means the branches array is valid. Caller decides whether to throw.
export function validateBranches(branches) {
  const errors = []

  if (!Array.isArray(branches) || branches.length === 0) {
    errors.push({
      field: 'branches',
      message: 'must be a non-empty array of branch objects',
      example: "branches: [{ slug: 'main', name: 'Main Branch', ... }]",
    })
    return errors
  }

  const seenSlugs = new Set()
  let primaryCount = 0

  branches.forEach((branch, i) => {
    const at = `branches[${i}]`

    if (!branch || typeof branch !== 'object') {
      errors.push({
        field: at,
        message: 'must be an object',
        example: "{ slug: 'karad', name: '...', phone: '9876543210', ... }",
      })
      return
    }

    if (!branch.slug || !SLUG_RE.test(branch.slug)) {
      errors.push({
        field: `${at}.slug`,
        message: 'is required and must match /^[A-Za-z0-9-]+$/ (letters, digits, hyphens — no spaces)',
        example: "slug: 'karad'",
      })
    } else {
      const norm = branch.slug.toLowerCase()
      if (seenSlugs.has(norm)) {
        errors.push({
          field: `${at}.slug`,
          message: `duplicate slug "${branch.slug}" — slugs must be unique across branches (case-insensitive)`,
          example: "slug: 'satara' (each branch needs a different slug)",
        })
      } else {
        seenSlugs.add(norm)
      }
    }

    if (!branch.name || typeof branch.name !== 'string') {
      errors.push({
        field: `${at}.name`,
        message: 'is required (full branch name shown to users)',
        example: "name: 'Atharva Playschool — Karad'",
      })
    }

    if (!branch.shortName || typeof branch.shortName !== 'string') {
      errors.push({
        field: `${at}.shortName`,
        message: 'is required (short label used in selector + cards)',
        example: "shortName: 'Karad'",
      })
    }

    if (!branch.phone || !PHONE_RE.test(branch.phone)) {
      errors.push({
        field: `${at}.phone`,
        message: 'must be 10–15 digits, no spaces, dashes, or + prefix',
        example: "phone: '9423975130'",
      })
    }

    if (!branch.whatsapp || !PHONE_RE.test(branch.whatsapp)) {
      errors.push({
        field: `${at}.whatsapp`,
        message: 'must be 10–15 digits with country code first, no + prefix',
        example: "whatsapp: '919423975130'",
      })
    }

    if (!branch.maps || !branch.maps.embedUrl) {
      errors.push({
        field: `${at}.maps.embedUrl`,
        message: 'is required (Google Maps iframe embed URL)',
        example: "maps: { embedUrl: 'https://www.google.com/maps/embed?pb=...' }",
      })
    }

    if (branch.isPrimary === true) primaryCount += 1
  })

  if (primaryCount > 1) {
    errors.push({
      field: 'branches[].isPrimary',
      message: `at most one branch may have isPrimary: true (found ${primaryCount})`,
      example: 'mark a single branch with isPrimary: true; omit or set false on the rest',
    })
  }

  return errors
}
