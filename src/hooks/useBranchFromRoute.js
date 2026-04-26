import { useParams } from 'react-router-dom'
import { useBranch } from './useBranch.js'
import { getBranchBySlug } from '../utils/branches.js'

// Resolves the :slug route param to a branch object. Returns null for an
// unknown slug — callers (e.g. BranchPage) redirect to /branches.
export function useBranchFromRoute() {
  const { slug } = useParams()
  const { branches } = useBranch()
  return getBranchBySlug(branches, slug)
}
