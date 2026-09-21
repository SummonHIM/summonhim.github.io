export function initNavBorder(): void {
  const nav = document.querySelector<HTMLElement>('.nav')

  if (!nav) {
    throw new Error('Nav element not found')
  }

  const update = (): void => {
    nav.classList.toggle('scrolled', window.scrollY > 0)
  }

  update()
  window.addEventListener('scroll', update, { passive: true })
}
