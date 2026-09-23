export function initTimelineEasterEgg(): void {
  const trigger = document.getElementById('summon')

  if (!trigger) {
    throw new Error('Timeline easter egg trigger not found')
  }

  const min = 7
  const max = 12
  const target = Math.floor(Math.random() * (max - min + 1)) + min
  let count = 0

  trigger.addEventListener('click', () => {
    count += 1
    if (count >= target) {
      revealTimeline()
      count = 0
    }
  })
}

function revealTimeline(): void {
  const items = document.querySelectorAll<HTMLElement>('.timeline li')

  for (const li of items) {
    li.classList.remove('is-hidden')

    const desc = li.querySelector<HTMLElement>('p[data-unhide]')
    if (desc?.dataset.unhide) {
      desc.textContent = desc.dataset.unhide
    }
  }
}
