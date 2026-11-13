import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { initContactDialogs } from './contact'

describe('initContactDialogs', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button type="button" data-dialog="wechat-dialog">微信</button>
      <dialog id="wechat-dialog"><p>微信号：SummonHIM</p></dialog>
    `
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('opens the target dialog on click', () => {
    initContactDialogs()

    const dialog = document.getElementById('wechat-dialog') as HTMLDialogElement
    expect(dialog.open).toBe(false)

    document.querySelector<HTMLElement>('[data-dialog]')!.click()
    expect(dialog.open).toBe(true)
  })

  it('closes when the backdrop is clicked', () => {
    initContactDialogs()

    const dialog = document.getElementById('wechat-dialog') as HTMLDialogElement
    document.querySelector<HTMLElement>('[data-dialog]')!.click()
    expect(dialog.open).toBe(true)

    dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(dialog.open).toBe(false)
  })

  it('ignores triggers whose dialog is missing', () => {
    document.body.innerHTML =
      '<button type="button" data-dialog="missing">微信</button>'
    expect(() => initContactDialogs()).not.toThrow()
  })
})
