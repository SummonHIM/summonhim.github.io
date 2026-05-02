<template>
  <div v-bind="$attrs" class="mx-1 mt-1 mb-1 text-center">
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
