<template>
  <div class="grid w-full max-w-2xl gap-4 px-6 sm:grid-cols-2">
    <div
      class="group flex flex-col items-center gap-3 rounded border border-black/10 p-6 text-center transition-colors hover:border-[var(--p-primary-color)] dark:border-white/15 dark:hover:border-[var(--p-primary-color)]"
    >
      <div class="flex items-center gap-1">
        <h3 class="font-fuzz text-xl font-bold">根证书</h3>
        <a
          class="opacity-40 transition-opacity hover:opacity-100"
          href="https://www.ssl.com/zh-CN/article/what-are-root-certificates-and-why-do-they-matter/"
          target="_blank"
        >
          <i class="pi pi-question-circle text-sm"></i>
        </a>
      </div>
      <p class="font-mono text-sm opacity-70">SummonHIM Root CA</p>
      <Button
        as="a"
        label="下载"
        class="mt-auto"
        icon="pi pi-download"
        outlined
        size="small"
        href="https://ca.summonhim.top"
        target="_blank"
      />
    </div>

    <div
      class="group flex flex-col items-center gap-3 rounded border border-black/10 p-6 text-center transition-colors hover:border-[var(--p-primary-color)] dark:border-white/15 dark:hover:border-[var(--p-primary-color)]"
    >
      <div class="flex items-center gap-1">
        <h3 class="font-fuzz text-xl font-bold">GnuPG</h3>
        <a
          class="opacity-40 transition-opacity hover:opacity-100"
          href="https://www.gnupg.org"
          target="_blank"
        >
          <i class="pi pi-question-circle text-sm"></i>
        </a>
      </div>
      <p class="font-mono text-sm whitespace-nowrap opacity-70">
        93BE 38C9 11A4 727F E39B<br />
        8447 A6C3 8E9E E548 F835
      </p>
      <Button
        as="a"
        label="下载"
        class="mt-auto"
        icon="pi pi-download"
        outlined
        size="small"
        href="https://keys.openpgp.org/search?q=93BE38C911A4727FE39B8447A6C38E9EE548F835"
        target="_blank"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
