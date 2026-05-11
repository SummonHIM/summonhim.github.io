<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-center">
    <navbar class="w-full">
      <GlobalToolbar class="mx-2 my-2" v-model="menuSelected" :buttons="menuItems" />
    </navbar>

    <div class="flex-1 flex flex-col items-center justify-center">
      <span class="ri--shield-user-line title-icon"></span>
      <h1 class="text-4xl mt-4">你真的信任我吗？</h1>
      <TrustItems class="mt-12" />
    </div>

    <footer>
      <GlobalFooter />
    </footer>
  </div>
</template>

<script setup lang="ts">
import '@/assets/style/icons.css'
import type { GlobalTabbarButtonProps } from '@/components/GlobalToolbar.vue'
import { ref } from 'vue'

defineOptions({
  name: 'TrustChain',
})

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

<style>
.title-icon {
  width: 128px;
  height: 128px;
}
</style>
