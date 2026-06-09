<template>
  <navbar>
    <GlobalToolbar class="mx-2 my-2" v-model="menuSelected" :buttons="menuItems" />
  </navbar>

  <div class="mx-auto pt-8 pb-8 max-w-[90%] md:max-w-[85%] lg:max-w-[70%]">
    <MarkdownRender v-model="tosMarkdown" />
  </div>

  <footer>
    <GlobalFooter />
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import '@/assets/style/icons.css'
import privacyMarkdownRaw from '@/assets/markdowns/privacy.md?raw'
import type { GlobalTabbarButtonProps } from '@/components/GlobalToolbar.vue'

defineOptions({
  name: 'PrivacyPolicy',
})

const tosMarkdown = ref(privacyMarkdownRaw)

const menuItems: GlobalTabbarButtonProps[] = [
  {
    id: 'back',
    label: '返回',
    icon: 'pi pi-arrow-left',
    hidden: false,
    href: `/`,
  },
  {
    id: 'back-hidden',
    label: '返回',
    icon: 'pi pi-arrow-left',
    hidden: true,
  },
]
const menuSelected = ref<GlobalTabbarButtonProps>(
  menuItems.find((item) => item.id === 'back-hidden')!,
)
</script>
