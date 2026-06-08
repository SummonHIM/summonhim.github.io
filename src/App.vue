<template>
  <Toast />
  <main :data-theme="isDark ? 'dark' : 'light'">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core'
// 自动监听系统主题，返回 boolean
const isDark = usePreferredDark()
</script>
