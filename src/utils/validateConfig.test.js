import { describe, it, expect, vi, beforeEach } from 'vitest'

// validateConfig imports BRAND and BRANCHES at module load time, so we need
// to mock the config module before importing the validator.
const validBranch = {
  slug: 'karad',
  name: 'Test School — Karad',
  shortName: 'Karad',
  isPrimary: true,
  address: { line1: '1 Test Rd', line2: '', city: 'Karad', state: 'Maharashtra', pin: '415001' },
  phone: '9000000001',
  whatsapp: '919000000001',
  timing: { playschool: '10am-1pm' },
  batchSize: { playschool: 40 },
  branchTeacher: null,
  photos: [],
  maps: { embedUrl: 'https://www.google.com/maps/embed?pb=REAL', shortUrl: 'https://goo.gl/maps/x', lat: 17.29, lng: 74.18 },
  admissionStatus: 'open',
}

const validBrand = { name: 'Test School', s3BaseUrl: 'https://s3.example.com/bucket' }

vi.mock('../../school.config.js', () => ({
  BRAND: validBrand,
  BRANCHES: [validBranch],
}))

const { validateConfig } = await import('./validateConfig.js')

describe('validateConfig', () => {
  it('passes on a well-formed config', () => {
    expect(() => validateConfig()).not.toThrow()
  })
})

// Separate describe block tests BRANCHES validation via validateBranches directly.
import { validateBranches } from './branches.js'

describe('validateBranches — error cases', () => {
  it('errors when branches is empty', () => {
    const errs = validateBranches([])
    expect(errs.length).toBeGreaterThan(0)
    expect(errs[0].field).toBe('branches')
  })

  it('errors when branches is not an array', () => {
    const errs = validateBranches(null)
    expect(errs.length).toBeGreaterThan(0)
  })

  it('errors on invalid slug (has space)', () => {
    const branch = { ...validBranch, slug: 'bad slug' }
    const errs = validateBranches([branch])
    expect(errs.some((e) => e.field.includes('slug'))).toBe(true)
  })

  it('errors on duplicate slug (case-insensitive)', () => {
    const b1 = { ...validBranch, slug: 'Karad' }
    const b2 = { ...validBranch, slug: 'karad', isPrimary: false }
    const errs = validateBranches([b1, b2])
    expect(errs.some((e) => e.message.includes('duplicate'))).toBe(true)
  })

  it('errors on phone shorter than 10 digits', () => {
    const branch = { ...validBranch, phone: '12345' }
    const errs = validateBranches([branch])
    expect(errs.some((e) => e.field.includes('phone'))).toBe(true)
  })

  it('errors on whatsapp containing non-digit characters', () => {
    const branch = { ...validBranch, whatsapp: '+919000000001' }
    const errs = validateBranches([branch])
    expect(errs.some((e) => e.field.includes('whatsapp'))).toBe(true)
  })

  it('errors when maps.embedUrl is missing', () => {
    const branch = { ...validBranch, maps: { shortUrl: 'x' } }
    const errs = validateBranches([branch])
    expect(errs.some((e) => e.field.includes('embedUrl'))).toBe(true)
  })

  it('errors when more than one branch has isPrimary: true', () => {
    const b1 = { ...validBranch, slug: 'a', isPrimary: true }
    const b2 = { ...validBranch, slug: 'b', isPrimary: true }
    const errs = validateBranches([b1, b2])
    expect(errs.some((e) => e.field.includes('isPrimary'))).toBe(true)
  })

  it('returns no errors for a valid branch', () => {
    const errs = validateBranches([validBranch])
    expect(errs).toHaveLength(0)
  })
})
