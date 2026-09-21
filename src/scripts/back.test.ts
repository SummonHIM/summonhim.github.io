import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { initBackButton, resolveBackDestination } from './back'

const ORIGIN = 'https://summonhim.top'

describe('resolveBackDestination', () => {
  it('returns home for same-origin referrer', () => {
    expect(resolveBackDestination(`${ORIGIN}/`, ORIGIN)).toBe('home')
  })

  it('returns external for different-origin referrer', () => {
    expect(resolveBackDestination('https://example.com/page', ORIGIN)).toBe(
      'external',
    )
  })

  it('returns external for empty referrer', () => {
    expect(resolveBackDestination('', ORIGIN)).toBe('external')
  })

  it('returns external for invalid referrer', () => {
    expect(resolveBackDestination('not a url', ORIGIN)).toBe('external')
  })
})

describe('initBackButton', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button id="back-btn"></button>'
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('throws when the back button is missing', () => {
    document.body.innerHTML = ''
    expect(() => initBackButton()).toThrow('Back button not found')
  })

  it('calls history.back when referrer is external', () => {
    Object.defineProperty(document, 'referrer', {
      value: 'https://example.com/',
      configurable: true,
    })
    const back = vi.spyOn(window.history, 'back').mockImplementation(() => {})
    initBackButton()

    document.getElementById('back-btn')!.click()

    expect(back).toHaveBeenCalledTimes(1)
  })
})
