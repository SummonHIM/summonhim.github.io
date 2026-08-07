<template>
  <div class="flex flex-col gap-2 rounded border border-black/10 p-5 dark:border-white/15">
    <div class="flex items-center gap-2">
      <i :class="icon" class="text-xl text-[var(--p-primary-color)]"></i>
      <h3 v-if="inlineTitle" class="font-fuzz text-base font-bold">{{ title }}</h3>
    </div>
    <h3 v-if="!inlineTitle" class="font-fuzz text-base font-bold">{{ title }}</h3>
    <p v-if="description" class="text-xs opacity-70 md:text-sm">{{ description }}</p>
    <div v-if="tags?.length" class="mt-1 flex flex-wrap gap-2">
      <span
        v-for="tag in tags"
        :key="tag"
        class="rounded border border-black/10 px-2 py-0.5 font-mono text-xs opacity-70 transition-colors hover:border-[var(--p-primary-color)]/60 hover:text-[var(--p-primary-color)] hover:opacity-100 dark:border-white/15"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface FeatureCardProps {
  icon: string
  title: string
  description?: string
  tags?: string[]
  /** true：图标与标题同行；false：图标在上、标题在下 */
  inlineTitle?: boolean
}

defineProps<FeatureCardProps>()
</script>
