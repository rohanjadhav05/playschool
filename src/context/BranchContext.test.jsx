import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Branches fixture — matches the shape validateBranches expects.
const karve = {
  slug: 'Karve',
  name: 'Test — Karve',
  shortName: 'Karve',
  isPrimary: true,
  phone: '9000000001',
  whatsapp: '919000000001',
  maps: { embedUrl: 'https://maps.google.com/?q=1' },
  address: { line1: 'a', line2: '', city: 'Karad', state: 'Maharashtra', pin: '415001' },
  timing: { playschool: '10am-1pm' },
  batchSize: { playschool: 50 },
  photos: [],
  admissionStatus: 'open',
  branchTeacher: null,
}

const satara = {
  ...karve,
  slug: 'Satara',
  name: 'Test — Satara',
  shortName: 'Satara',
  isPrimary: false,
}

vi.mock('../../school.config.js', () => ({
  BRAND: { name: 'Test School', s3BaseUrl: 'https://s3.example.com' },
  BRANCHES: [karve, satara],
  SCHOOL: {},
  FOUNDER: {},
}))

// Import after mock is set up.
const { BranchProvider, useBranchContext } = await import('./BranchContext.jsx')

// Helper: a component that renders the selected branch's shortName.
function TestConsumer() {
  const { selectedBranch } = useBranchContext()
  return <div data-testid="branch">{selectedBranch?.shortName ?? 'none'}</div>
}

function renderWithProvider() {
  return render(
    <BrowserRouter>
      <BranchProvider>
        <TestConsumer />
      </BranchProvider>
    </BrowserRouter>,
  )
}

const STORAGE_KEY = 'atharva.selectedBranchSlug'

describe('BranchContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('initializes from localStorage when the stored slug is valid', () => {
    localStorage.setItem(STORAGE_KEY, 'Satara')
    renderWithProvider()
    expect(screen.getByTestId('branch').textContent).toBe('Satara')
  })

  it('case-insensitive localStorage init (stored lowercase)', () => {
    localStorage.setItem(STORAGE_KEY, 'karve')
    renderWithProvider()
    expect(screen.getByTestId('branch').textContent).toBe('Karve')
  })

  it('falls back to the isPrimary branch when localStorage is empty', () => {
    renderWithProvider()
    expect(screen.getByTestId('branch').textContent).toBe('Karve')
  })

  it('falls back to branches[0] when no branch has isPrimary', async () => {
    // Override BRANCHES mock with no isPrimary.
    const { BRANCHES } = await import('../../school.config.js')
    const original = [...BRANCHES]
    BRANCHES.forEach((b) => (b.isPrimary = false))

    renderWithProvider()
    expect(screen.getByTestId('branch').textContent).toBe('Karve')

    // Restore for other tests.
    BRANCHES.forEach((b, i) => (b.isPrimary = original[i].isPrimary))
  })

  it('persists the initial selection to localStorage after mount', async () => {
    await act(async () => { renderWithProvider() })
    // Primary branch (Karve) should have been persisted by the useEffect.
    expect(localStorage.getItem(STORAGE_KEY)).toBe('Karve')
  })
})
