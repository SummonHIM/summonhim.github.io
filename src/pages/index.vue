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

      <h1 class="text-5xl">SummonHIM</h1>

      <div>
        <GlobalSocial :links="socialLinks" />
      </div>

      <div class="mt-6 flex gap-3">
        <Button
          as="a"
          target="_blank"
          href="https://misskey.summonhim.top/@summonhim"
          label="动态"
          icon="pi pi-bolt"
          severity="info"
          size="large"
          raised
        />
        <Button
          as="a"
          target="_blank"
          href="https://auth.summonhim.top:2096/"
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

import qqQRCode from '@/assets/images/qq.png'
import wechatQRCode from '@/assets/images/wechat.png'
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
    href: qqQRCode,
    icon: 'ri--qq-line',
  },
  {
    href: wechatQRCode,
    icon: 'ri--wechat-line',
  },
  {
    href: 'https://t.me/SummonHIM',
    icon: 'ri--telegram-2-line',
  },
  {
    href: 'https://space.bilibili.com/21899295',
    icon: 'ri--bilibili-line',
  },
]
</script>
