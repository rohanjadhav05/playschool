import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { BRANCHES } from '../../school.config.js'
import { getBranchBySlug, getPrimaryBranch } from '../utils/branches.js'

const STORAGE_KEY = 'atharva.selectedBranchSlug'

const BranchContext = createContext(null)

function resolveInitialBranch() {
  let stored = null
  try {
    stored = localStorage.getItem(STORAGE_KEY)
  } catch {
    // localStorage may be unavailable (private mode, SSR) — fall through.
  }
  return getBranchBySlug(BRANCHES, stored) || getPrimaryBranch(BRANCHES)
}

export function BranchProvider({ children }) {
  const [selectedBranch, setSelectedBranch] = useState(resolveInitialBranch)

  const setBranch = useCallback((slugOrBranch) => {
    const slug =
      typeof slugOrBranch === 'string' ? slugOrBranch : slugOrBranch?.slug
    const next = getBranchBySlug(BRANCHES, slug)
    if (!next) return
    setSelectedBranch(next)
  }, [])

  useEffect(() => {
    if (!selectedBranch) return
    try {
      localStorage.setItem(STORAGE_KEY, selectedBranch.slug)
    } catch {
      // ignore storage failures
    }
  }, [selectedBranch])

  return (
    <BranchContext.Provider
      value={{ selectedBranch, setBranch, branches: BRANCHES }}
    >
      {children}
    </BranchContext.Provider>
  )
}

export function useBranchContext() {
  const ctx = useContext(BranchContext)
  if (!ctx) throw new Error('useBranchContext must be used within BranchProvider')
  return ctx
}

export { BranchContext }
