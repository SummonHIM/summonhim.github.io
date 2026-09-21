import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  applyTheme,
  getStoredMode,
  initThemeToggle,
  resolveTheme,
} from './theme'

type MediaQueryListener = (event: { matches: boolean }) => void

function mockMatchMedia(matches: boolean) {
  let listener: MediaQueryListener | null = null
  const mql = {
    matches,
    media: '(prefers-color-scheme: dark)',
    addEventListener: (_type: string, cb: MediaQueryListener) => {
      listener = cb
    },
    removeEventListener: () => {
      listener = null
    },
    onchange: null,
    dispatch: (event: { matches: boolean }) => {
      mql.matches = event.matches
      listener?.(event)
    },
  }
  vi.stubGlobal('matchMedia', () => mql)
  return mql
}

describe('resolveTheme', () => {
  it('returns the mode for explicit light/dark', () => {
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('dark', false)).toBe('dark')
  })

  it('resolves system based on prefers-color-scheme', () => {
    expect(resolveTheme('system', true)).toBe('dark')
    expect(resolveTheme('system', false)).toBe('light')
  })
})

describe('getStoredMode', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('defaults to system when nothing stored', () => {
    expect(getStoredMode()).toBe('system')
  })

  it('returns a valid stored mode', () => {
    localStorage.setItem('theme-mode', 'dark')
    expect(getStoredMode()).toBe('dark')
  })

  it('ignores an invalid stored value', () => {
    localStorage.setItem('theme-mode', 'bogus')
    expect(getStoredMode()).toBe('system')
  })
})

describe('initThemeToggle', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button id="theme-toggle"></button>'
    delete document.documentElement.dataset.theme
    delete document.documentElement.dataset.themeMode
    localStorage.clear()
    vi.unstubAllGlobals()
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('throws when the toggle button is missing', () => {
    document.body.innerHTML = ''
    expect(() => initThemeToggle()).toThrow('Theme toggle button not found')
  })

  it('cycles light -> dark -> system -> light and persists', () => {
    localStorage.setItem('theme-mode', 'light')
    mockMatchMedia(false)
    initThemeToggle()

    const btn = document.getElementById('theme-toggle')!

    btn.click()
    expect(document.documentElement.dataset.themeMode).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('theme-mode')).toBe('dark')

    btn.click()
    expect(document.documentElement.dataset.themeMode).toBe('system')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('theme-mode')).toBe('system')

    btn.click()
    expect(document.documentElement.dataset.themeMode).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('theme-mode')).toBe('light')
  })

  it('reacts to system color-scheme changes while in system mode', () => {
    localStorage.setItem('theme-mode', 'system')
    const media = mockMatchMedia(false)
    initThemeToggle()

    media.dispatch({ matches: true })
    expect(document.documentElement.dataset.theme).toBe('dark')

    media.dispatch({ matches: false })
    expect(document.documentElement.dataset.theme).toBe('light')
  })
})

describe('applyTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    delete document.documentElement.dataset.theme
    delete document.documentElement.dataset.themeMode
  })

  it('sets data-theme, data-theme-mode and localStorage', () => {
    applyTheme('system', true)
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.documentElement.dataset.themeMode).toBe('system')
    expect(localStorage.getItem('theme-mode')).toBe('system')
  })
})
