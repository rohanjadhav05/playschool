import { describe, it, expect } from 'vitest'
import { buildWaUrl } from './whatsapp.js'

const branch = {
  slug: 'Karve',
  shortName: 'Karve',
  whatsapp: '919423975130',
}

describe('buildWaUrl', () => {
  it('uses the branch whatsapp number in the URL', () => {
    const url = buildWaUrl(branch)
    expect(url).toContain('wa.me/919423975130')
  })

  it('includes the branch shortName in the encoded message', () => {
    const url = buildWaUrl(branch)
    const decoded = decodeURIComponent(url.split('?text=')[1])
    expect(decoded).toContain('Karve branch')
  })

  it('includes "Please contact me" in the message', () => {
    const url = buildWaUrl(branch)
    const decoded = decodeURIComponent(url.split('?text=')[1])
    expect(decoded).toContain('Please contact me')
  })

  it('accepts a custom prefix', () => {
    const url = buildWaUrl(branch, 'Hello from tests')
    const decoded = decodeURIComponent(url.split('?text=')[1])
    expect(decoded).toContain('Hello from tests')
    expect(decoded).toContain('Karve branch')
  })

  it('returns a valid wa.me URL', () => {
    const url = buildWaUrl(branch)
    expect(url.startsWith('https://wa.me/')).toBe(true)
  })
})
