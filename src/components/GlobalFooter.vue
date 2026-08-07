<template>
  <div
    v-bind="$attrs"
    class="flex flex-col items-center gap-2 border-t border-black/10 px-6 py-8 text-center dark:border-white/15"
  >
    <nav class="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm opacity-75">
      <RouterLink class="transition-colors hover:text-[var(--p-primary-color)]" to="/tos"
        >服务条款</RouterLink
      >
      <span class="opacity-40">·</span>
      <RouterLink class="transition-colors hover:text-[var(--p-primary-color)]" to="/privacy"
        >隐私政策</RouterLink
      >
      <span class="opacity-40">·</span>
      <a
        class="transition-colors hover:text-[var(--p-primary-color)]"
        href="https://uptime.summonhim.top"
        target="_blank"
        >运行状态</a
      >
      <span class="opacity-40">·</span>
      <RouterLink class="transition-colors hover:text-[var(--p-primary-color)]" to="/trust"
        >信任链</RouterLink
      >
    </nav>
    <p class="text-xs opacity-60">
      © {{ currentYear }} <span class="font-fuzz">SummonHIM</span>
      <span class="opacity-40"> · </span>
      <a
        class="font-mono transition-colors hover:text-[var(--p-primary-color)]"
        href="https://github.com/SummonHIM/summonhim.github.io"
        target="_blank"
        >Source Code</a
      >
    </p>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
