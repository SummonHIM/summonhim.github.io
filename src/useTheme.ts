import { computed, watch } from 'vue'
import { useStorage, usePreferredDark } from '@vueuse/core'

export type ThemeMode = 'system' | 'light' | 'dark'

const mode = useStorage<ThemeMode>('theme-mode', 'system')
const preferredDark = usePreferredDark()
const isDark = computed(() =>
  mode.value === 'system' ? preferredDark.value : mode.value === 'dark',
)

if (typeof document !== 'undefined') {
  watch(
    isDark,
    (dark) => {
      document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    },
    { immediate: true },
  )
}

export function useTheme() {
  function toggle() {
    const order: ThemeMode[] = ['system', 'light', 'dark']
    mode.value = order[(order.indexOf(mode.value) + 1) % order.length]
  }
  return { mode, isDark, toggle }
}
