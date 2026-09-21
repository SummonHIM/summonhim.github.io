import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { initHimEasterEgg } from './him'

const WIKI_URL = 'https://zh.wikipedia.org/wiki/Herobrine'

describe('initHimEasterEgg', () => {
  beforeEach(() => {
    document.body.innerHTML = '<span id="him">HIM</span>'
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('throws when the HIM element is missing', () => {
    document.body.innerHTML = ''
    expect(() => initHimEasterEgg()).toThrow('HIM easter egg element not found')
  })

  it('opens the wiki on the 7th click when target is 7', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)

    initHimEasterEgg()
    const him = document.getElementById('him')!

    for (let i = 0; i < 6; i += 1) {
      him.click()
      expect(open).not.toHaveBeenCalled()
    }

    him.click()
    expect(open).toHaveBeenCalledTimes(1)
    expect(open).toHaveBeenCalledWith(WIKI_URL, '_blank', 'noopener')
  })

  it('opens the wiki on the 12th click when target is 12', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999)
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)

    initHimEasterEgg()
    const him = document.getElementById('him')!

    for (let i = 0; i < 11; i += 1) {
      him.click()
      expect(open).not.toHaveBeenCalled()
    }

    him.click()
    expect(open).toHaveBeenCalledTimes(1)
  })

  it('resets the counter after triggering', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)

    initHimEasterEgg()
    const him = document.getElementById('him')!

    for (let i = 0; i < 7; i += 1) {
      him.click()
    }
    expect(open).toHaveBeenCalledTimes(1)

    for (let i = 0; i < 6; i += 1) {
      him.click()
    }
    expect(open).toHaveBeenCalledTimes(1)

    him.click()
    expect(open).toHaveBeenCalledTimes(2)
  })
})
