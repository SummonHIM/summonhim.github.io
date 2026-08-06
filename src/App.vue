<template>
  <Toast />
  <main>
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import '@/useTheme'
</script>
