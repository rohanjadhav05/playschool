const DEFAULT_PREFIX = "Hi, I'm interested in Atharva Playschool"

// Builds a wa.me URL pre-filled with a branch-specific message.
export function buildWaUrl(branch, prefix = DEFAULT_PREFIX) {
  const msg = `${prefix} (${branch.shortName} branch). Please contact me.`
  return `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(msg)}`
}
