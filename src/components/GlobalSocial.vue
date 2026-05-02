<template>
  <div class="flex">
    <Button
      v-for="link in links"
      :key="link.href"
      as="a"
      target="_blank"
      :href="link.href"
      severity="secondary"
      variant="text"
    >
      <template #icon>
        <!-- PrimeIcon 用 pi 开头 -->
        <i v-if="link.icon.startsWith('pi ')" :class="link.icon" />
        <!-- 其他用 Iconify -->
        <span v-else :class="link.icon"></span>
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import '@/assets/style/socials.css'

defineProps<{
  links?: { href: string; icon: string }[]
}>()
</script>
