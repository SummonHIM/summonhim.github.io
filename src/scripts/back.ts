export type BackDestination = 'home' | 'external'

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
    if (destination === 'home') {
      window.location.href = '/'
    } else {
      window.history.back()
    }
  })
}
