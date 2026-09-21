export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

const MODE_KEY = 'theme-mode'
const MODES: readonly ThemeMode[] = ['light', 'dark', 'system']

export function resolveTheme(
  mode: ThemeMode,
  prefersDark: boolean,
): ResolvedTheme {
  if (mode === 'system') {
    return prefersDark ? 'dark' : 'light'
  }
  return mode
}

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system'
}

export function getStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(MODE_KEY)
    if (isThemeMode(stored)) {
      return stored
    }
  } catch {}
  return 'system'
}

export function applyTheme(mode: ThemeMode, prefersDark: boolean): void {
  const root = document.documentElement
  root.dataset.theme = resolveTheme(mode, prefersDark)
  root.dataset.themeMode = mode
  try {
    localStorage.setItem(MODE_KEY, mode)
  } catch {}
}

export function initThemeToggle(): void {
  const btn = document.getElementById('theme-toggle')

  if (!btn) {
    throw new Error('Theme toggle button not found')
  }

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  let mode = getStoredMode()

  const apply = (): void => applyTheme(mode, media.matches)

  btn.addEventListener('click', () => {
    const index = MODES.indexOf(mode)
    mode = MODES[(index + 1) % MODES.length]
    apply()
  })

  media.addEventListener('change', () => {
    if (mode === 'system') {
      apply()
    }
  })
}
