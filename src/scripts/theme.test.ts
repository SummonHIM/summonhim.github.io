import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { initThemeToggle } from './theme'

describe('initThemeToggle', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button id="theme-toggle"></button>'
    delete document.documentElement.dataset.theme
    localStorage.clear()
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('throws when the toggle button is missing', () => {
    document.body.innerHTML = ''
    expect(() => initThemeToggle()).toThrow('Theme toggle button not found')
  })

  it('toggles from light to dark and persists', () => {
    document.documentElement.dataset.theme = 'light'
    initThemeToggle()

    document.getElementById('theme-toggle')!.click()

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('toggles from dark to light and persists', () => {
    document.documentElement.dataset.theme = 'dark'
    initThemeToggle()

    document.getElementById('theme-toggle')!.click()

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
