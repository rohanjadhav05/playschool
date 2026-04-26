import { describe, it, expect } from 'vitest'
import { getBranchBySlug, getPrimaryBranch, validateBranches } from './branches.js'

const karve = {
  slug: 'Karve',
  name: 'Test — Karve',
  shortName: 'Karve',
  isPrimary: true,
  phone: '9000000001',
  whatsapp: '919000000001',
  maps: { embedUrl: 'https://www.google.com/maps/embed?pb=X' },
  address: { line1: 'a', line2: 'b', city: 'c', state: 'Maharashtra', pin: '000001' },
  timing: { playschool: '10am' },
  batchSize: { playschool: 50 },
  photos: [],
  admissionStatus: 'open',
  branchTeacher: null,
}

const satara = { ...karve, slug: 'Satara', name: 'Test — Satara', shortName: 'Satara', isPrimary: false }

const BRANCHES = [karve, satara]

describe('getBranchBySlug', () => {
  it('finds a branch by exact slug', () => {
    expect(getBranchBySlug(BRANCHES, 'Karve')?.shortName).toBe('Karve')
  })

  it('is case-insensitive', () => {
    expect(getBranchBySlug(BRANCHES, 'karve')?.shortName).toBe('Karve')
    expect(getBranchBySlug(BRANCHES, 'KARVE')?.shortName).toBe('Karve')
  })

  it('returns null for an unknown slug', () => {
    expect(getBranchBySlug(BRANCHES, 'mumbai')).toBeNull()
  })

  it('returns null when branches is empty', () => {
    expect(getBranchBySlug([], 'karve')).toBeNull()
  })

  it('returns null when slug is empty', () => {
    expect(getBranchBySlug(BRANCHES, '')).toBeNull()
  })
})

describe('getPrimaryBranch', () => {
  it('returns the branch with isPrimary: true', () => {
    expect(getPrimaryBranch(BRANCHES)?.shortName).toBe('Karve')
  })

  it('falls back to branches[0] when no isPrimary is set', () => {
    const noPrimary = BRANCHES.map((b) => ({ ...b, isPrimary: false }))
    expect(getPrimaryBranch(noPrimary)?.shortName).toBe('Karve')
  })

  it('returns null for empty array', () => {
    expect(getPrimaryBranch([])).toBeNull()
  })
})
