<template>
  <div class="mermaid-diagram" v-html="svg" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import mermaid from 'mermaid'
import { useTheme } from '@/useTheme'

export interface MermaidDiagramProps {
  definition: string
}

const props = defineProps<MermaidDiagramProps>()

const { isDark } = useTheme()
const svg = ref('')
let counter = 0

function cssVar(name: string, fallback: string) {
  if (typeof document === 'undefined') return fallback
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

async function renderDiagram() {
  const amber = cssVar('--p-primary-color', '#f59e0b')
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    themeVariables: {
      background: 'transparent',
      primaryColor: 'transparent',
      primaryBorderColor: amber,
      primaryTextColor: isDark.value ? '#e5e5e5' : '#171717',
      lineColor: isDark.value ? '#71717a' : '#a1a1aa',
      fontFamily: 'inherit',
    },
  })
  const id = `mermaid-${Date.now()}-${counter++}`
  const { svg: rendered } = await mermaid.render(id, props.definition)
  svg.value = rendered
}

onMounted(renderDiagram)
watch([isDark, () => props.definition], renderDiagram)
</script>

<style scoped>
.mermaid-diagram :deep(svg) {
  width: 100%;
  max-width: 100% !important;
  height: auto;
}
</style>
