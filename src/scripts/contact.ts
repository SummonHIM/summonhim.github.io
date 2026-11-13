export function initContactDialogs(): void {
  const triggers = document.querySelectorAll<HTMLElement>('[data-dialog]')

  triggers.forEach((trigger) => {
    const id = trigger.dataset.dialog
    if (!id) return

    const dialog = document.getElementById(id)
    if (!(dialog instanceof HTMLDialogElement)) return

    trigger.addEventListener('click', () => {
      if (!dialog.open) {
        dialog.showModal()
      }
    })

    // 点击遮罩（对话框本体）关闭
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close()
      }
    })
  })
}
