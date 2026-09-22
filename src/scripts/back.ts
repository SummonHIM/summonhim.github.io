export type BackDestination = 'home' | 'external'

export type BackAction = 'home' | 'back'

export function resolveBackDestination(
  referrer: string,
  origin: string,
): BackDestination {
  if (!referrer) {
    return 'external'
  }
  try {
    return new URL(referrer).origin === origin ? 'home' : 'external'
  } catch {
    return 'external'
  }
}

export function resolveBackAction(
  destination: BackDestination,
  historyLength: number,
): BackAction {
  if (destination === 'home') {
    return 'home'
  }
  return historyLength > 1 ? 'back' : 'home'
}

export function initBackButton(): void {
  const btn = document.getElementById('back-btn')

  if (!btn) {
    throw new Error('Back button not found')
  }

  btn.addEventListener('click', () => {
    const destination = resolveBackDestination(
      document.referrer,
      window.location.origin,
    )
    const action = resolveBackAction(destination, window.history.length)

    if (action === 'home') {
      window.location.href = '/'
    } else {
      window.history.back()
    }
  })
}
