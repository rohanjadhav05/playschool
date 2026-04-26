import { useBranchContext } from '../context/BranchContext.jsx'

// Convenience hook — same shape as useBranchContext, kept as a separate
// import path so consumers don't need to know about the context module.
export function useBranch() {
  return useBranchContext()
}
