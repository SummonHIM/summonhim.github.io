<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-center">
    <div class="flex-1 flex flex-col items-center justify-center text-center">
      <h2 class="text-3xl">页面未找到</h2>
      <p class="mb-8">404 Not Found</p>
      <Button as-child raised severity="secondary" v-slot="slotProps">
        <RouterLink to="/" :class="slotProps.class">返回首页</RouterLink>
      </Button>
    </div>

    <footer>
      <GlobalFooter />
    </footer>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'NotFoundPage',
})
</script>
