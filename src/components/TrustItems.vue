<template>
  <div class="flex flex-col sm:flex-row items-center justify-center">
    <div class="flex flex-col items-center">
      <div class="flex items-start gap-1">
        <h3 class="text-2xl">根证书</h3>
        <a
          href="https://www.ssl.com/zh-CN/article/what-are-root-certificates-and-why-do-they-matter/"
          target="_blank"
        >
          <i class="pi pi-question-circle"></i>
        </a>
      </div>
      <h4>SummonHIM Root CA</h4>
      <Button
        as="a"
        label="下载"
        class="mt-2"
        icon="pi pi-download"
        href="https://ca.summonhim.top"
        target="_blank"
      />
    </div>
    <Divider class="hidden! sm:flex!" layout="vertical" />
    <Divider class="flex! sm:hidden!" />
    <div class="flex flex-col items-center">
      <div class="flex items-start gap-1">
        <h3 class="text-2xl">GnuPG</h3>
        <a href="https://www.gnupg.org" target="_blank">
          <i class="pi pi-question-circle"></i>
        </a>
      </div>
      <h4 class="text-sm font-mono whitespace-nowrap">
        93BE 38C9 11A4 727F E39B<br />
        8447 A6C3 8E9E E548 F835
      </h4>
      <Button
        as="a"
        label="下载"
        class="mt-2"
        icon="pi pi-download"
        href="https://keys.openpgp.org/search?q=93BE38C911A4727FE39B8447A6C38E9EE548F835"
        target="_blank"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
