<template>
  <div v-bind="$attrs" class="mx-1 mt-1 mb-1 text-center">
    <p>
      <RouterLink class="underline" to="/tos">服务条款</RouterLink> |
      <RouterLink class="underline" to="/privacy">隐私政策</RouterLink> |
      <RouterLink class="underline" to="/trust">信任链</RouterLink>
    </p>
    <p>
      © {{ currentYear }} SummonHIM |
      <a class="underline" href="https://github.com/SummonHIM/summonhim.github.io" target="_blank"
        >Source Code</a
      >
    </p>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
