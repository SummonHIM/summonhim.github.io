import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { initTimelineEasterEgg } from './timeline'

const HTML = `
  <span id="summon">Summon</span>
  <ol class="timeline">
    <li><h3>Normal</h3><p>普通描述</p></li>
    <li class="is-hidden"><h3>Hidden</h3><p>隐藏描述</p></li>
    <li><h3>Unhide</h3><p data-unhide="彩蛋描述">默认描述</p></li>
  </ol>
`

describe('initTimelineEasterEgg', () => {
  beforeEach(() => {
    document.body.innerHTML = HTML
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('throws when the trigger element is missing', () => {
    document.body.innerHTML = '<ol class="timeline"></ol>'
    expect(() => initTimelineEasterEgg()).toThrow(
      'Timeline easter egg trigger not found',
    )
  })

  it('reveals on the 7th click when target is 7', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    initTimelineEasterEgg()
    const trigger = document.getElementById('summon')!

    for (let i = 0; i < 6; i += 1) {
      trigger.click()
      expect(document.querySelector('.timeline li.is-hidden')).not.toBeNull()
      expect(document.querySelector('p[data-unhide]')!.textContent).toBe(
        '默认描述',
      )
    }

    trigger.click()
    expect(document.querySelector('.timeline li.is-hidden')).toBeNull()
    expect(document.querySelector('p[data-unhide]')!.textContent).toBe(
      '彩蛋描述',
    )
  })

  it('reveals on the 12th click when target is 12', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999)
    initTimelineEasterEgg()
    const trigger = document.getElementById('summon')!

    for (let i = 0; i < 11; i += 1) {
      trigger.click()
    }
    expect(document.querySelector('.timeline li.is-hidden')).not.toBeNull()

    trigger.click()
    expect(document.querySelector('.timeline li.is-hidden')).toBeNull()
    expect(document.querySelector('p[data-unhide]')!.textContent).toBe(
      '彩蛋描述',
    )
  })
})
