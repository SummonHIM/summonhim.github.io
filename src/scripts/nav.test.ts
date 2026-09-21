import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { initNavBorder } from './nav'

describe('initNavBorder', () => {
  beforeEach(() => {
    document.body.innerHTML = '<header class="nav"></header>'
    vi.stubGlobal('scrollY', 0)
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('throws when the nav element is missing', () => {
    document.body.innerHTML = ''
    expect(() => initNavBorder()).toThrow('Nav element not found')
  })

  it('adds scrolled class when scrollY > 0', () => {
    vi.stubGlobal('scrollY', 100)
    initNavBorder()

    const nav = document.querySelector('.nav')!
    expect(nav.classList.contains('scrolled')).toBe(true)
  })

  it('removes scrolled class when scrollY is 0', () => {
    vi.stubGlobal('scrollY', 0)
    initNavBorder()

    const nav = document.querySelector('.nav')!
    expect(nav.classList.contains('scrolled')).toBe(false)
  })
})
