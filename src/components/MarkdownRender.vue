<template>
  <div class="prose dark:prose-invert max-w-none" v-html="renderedHtml" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'

export interface MarkdownRenderProps {
  modelValue: string
}

const props = defineProps<MarkdownRenderProps>()

const markdown = new MarkdownIt({
  html: true, // 允许在 Markdown 中写 HTML
  linkify: true, // 自动将类似 URL 的文本转换为链接
  typographer: true, // 替换引号、破折号等排版符号
})

const renderedHtml = computed(() => {
  const rawHtml = markdown.render(props.modelValue)
  // 使用 DOMPurify 清洗 HTML，防止 XSS 攻击
  return DOMPurify.sanitize(rawHtml)
})
</script>
