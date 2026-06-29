<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-center">
    <div class="flex-1 flex flex-col items-center justify-center">
      <Image
        :src="summonhimAvatar"
        :pt="{
          image: { class: 'rounded-full' },
        }"
        alt="Avatar"
        width="256"
        height="256"
      />

      <h1 class="text-5xl text-center">SummonHIM</h1>

      <p class="text-lg font-medium text-center">
        中国有句古话叫：“闷声发大财”。我一句话也不说，这是坠吼的。
      </p>

      <div>
        <GlobalSocial :links="socialLinks" />
      </div>

      <div class="mt-6 flex gap-3">
        <Button
          as="a"
          target="_blank"
          href="https://mastodon.summonhim.top/@summonhim_app_services"
          label="动态"
          icon="pi pi-bolt"
          severity="info"
          size="large"
          raised
        />
        <Button
          as="a"
          target="_blank"
          href="https://auth.summonhim.top:2053/"
          label="控制台"
          icon="pi pi-sign-in"
          severity="secondary"
          size="large"
          raised
        />
      </div>
    </div>

    <footer>
      <GlobalFooter />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { getGravatarUrl } from '@/utils'

defineOptions({
  name: 'HomePage',
})

const summonhimAvatar = ref(getGravatarUrl('summonhim@summonhim.top'))
const socialLinks = [
  {
    href: 'mailto:summonhim@summonhim.top',
    icon: 'ri--mail-line',
  },
  {
    href: 'https://qm.qq.com/q/lYZ8auKT72',
    icon: 'ri--qq-line',
  },
  {
    href: 'https://w1.v3z.cn/si4KiE',
    icon: 'ri--wechat-line',
  },
  {
    href: 'https://t.me/SummonHIM',
    icon: 'ri--telegram-2-line',
  },
  {
    href: 'https://github.com/summonhim',
    icon: 'ri--github-line',
  },
  {
    href: 'https://steamcommunity.com/id/summonhim/',
    icon: 'ri--steam-line',
  },
  {
    href: 'https://space.bilibili.com/21899295',
    icon: 'ri--bilibili-line',
  },
]
</script>

<route lang="yaml">
meta:
  title: SummonHIM
</route>
