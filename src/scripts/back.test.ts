import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  initBackButton,
  resolveBackAction,
  resolveBackDestination,
} from './back'

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

describe('resolveBackAction', () => {
  it('returns home when destination is home', () => {
    expect(resolveBackAction('home', 1)).toBe('home')
    expect(resolveBackAction('home', 5)).toBe('home')
  })

  it('returns back when destination is external and there is history', () => {
    expect(resolveBackAction('external', 2)).toBe('back')
  })

  it('returns home when destination is external but there is no history', () => {
    expect(resolveBackAction('external', 1)).toBe('home')
    expect(resolveBackAction('external', 0)).toBe('home')
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

  it('calls history.back when referrer is external and there is history', () => {
    Object.defineProperty(document, 'referrer', {
      value: 'https://example.com/',
      configurable: true,
    })
    Object.defineProperty(window.history, 'length', {
      value: 2,
      configurable: true,
    })
    const back = vi.spyOn(window.history, 'back').mockImplementation(() => {})
    initBackButton()

    document.getElementById('back-btn')!.click()

    expect(back).toHaveBeenCalledTimes(1)
  })

  it('navigates home when referrer is external but there is no history', () => {
    Object.defineProperty(document, 'referrer', {
      value: 'https://example.com/',
      configurable: true,
    })
    Object.defineProperty(window.history, 'length', {
      value: 1,
      configurable: true,
    })
    const back = vi.spyOn(window.history, 'back').mockImplementation(() => {})
    const location = { origin: 'https://summonhim.top', href: '' }
    Object.defineProperty(window, 'location', {
      value: location,
      configurable: true,
    })
    initBackButton()

    document.getElementById('back-btn')!.click()

    expect(back).not.toHaveBeenCalled()
    expect(location.href).toBe('/')
  })
})
