<template>
  <Menubar
    :model="menuItems"
    breakpoint="768px"
    :pt="{
      root: '!bg-transparent !border-none !px-6 !py-4 md:!px-16 lg:!px-24',
      button: 'ml-auto',
      rootList: 'md:!ml-auto',
    }"
  >
    <template #start>
      <p class="font-fuzz text-xl md:text-2xl">SummonHIM</p>
    </template>
  </Menubar>

  <section
    class="flex min-h-screen flex-col items-start justify-center gap-1 px-6 text-left md:px-16 lg:px-24"
  >
    <h1 class="font-fuzz text-6xl font-bold text-[var(--p-primary-color)] sm:text-8xl">
      SummonHIM
    </h1>
    <div class="flex flex-col gap-3">
      <p class="text-base md:text-lg">
        <span class="font-medium">Linux 基础设施工程师</span><br />
        构建安全、自动化、可自托管的系统。
      </p>
      <p class="max-w-2xl text-sm opacity-75 md:text-base">
        热衷于构建可靠的基础设施——从统一身份认证、网络边界防护到容器化部署与自动化运维。同时也在嵌入式开发与机器人控制领域持续探索，用代码连接软件与硬件。
      </p>
    </div>

    <div class="mt-4 flex flex-wrap gap-3">
      <Button
        label="GitHub"
        icon="pi pi-github"
        outlined
        size="small"
        as="a"
        href="https://github.com/summonhim"
        target="_blank"
      />
      <Button label="项目" icon="pi pi-code" outlined size="small" as="a" href="#projects" />
      <Button
        label="基础设施"
        icon="pi pi-server"
        outlined
        size="small"
        as="a"
        href="#infrastructure"
      />
      <Button
        label="控制台"
        icon="pi pi-gauge"
        outlined
        size="small"
        as="a"
        href="https://auth.summonhim.top:2053/"
        target="_blank"
      />
    </div>

    <div class="mt-2 flex flex-wrap gap-2">
      <span
        v-for="tech in techStack"
        :key="tech"
        class="rounded border border-black/10 px-2 py-0.5 font-mono text-xs opacity-70 dark:border-white/15"
      >
        {{ tech }}
      </span>
    </div>
  </section>

  <section id="infrastructure" class="px-6 py-16 md:px-16 lg:px-24">
    <h2 class="flex items-center gap-3 font-fuzz text-3xl font-bold md:text-4xl">
      <span class="inline-block h-7 w-1.5 rounded-full bg-[var(--p-primary-color)]"></span>基础设施
    </h2>

    <MermaidDiagram :definition="infraDiagram" class="mt-8 w-full max-w-4xl" />

    <div class="mt-8 flex flex-col gap-2">
      <p class="text-sm opacity-75 md:text-base">
        以 Authentik 为核心的自托管平台：统一身份与单点登录，配合 Caddy 反向代理和 Docker
        编排，把每个服务收拢进同一套安全边界。所有组件均通过 Docker Compose
        声明式管理，做到一键部署、版本可追溯。新服务的接入只需添加一段配置，即可自动获得
        TLS 证书与 SSO 保护。
      </p>
      <p class="text-sm opacity-75 md:text-base">
        外部流量首先经过 Cloudflare 进行 DDoS 防护与 WAF
        过滤，再由 Caddy 将请求分发到各个容器化服务。需要鉴权的应用会统一跳转至
        Authentik 完成登录，支持 OIDC、SAML 以及多因素认证，用户只需一套凭据即可访问所有系统。整套架构的配置全部版本化管理，
        可在新机器上快速还原，也便于在测试环境中完整复现生产拓扑。
      </p>
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <FeatureCard
        v-for="feature in infraFeatures"
        :key="feature.title"
        :icon="feature.icon"
        :title="feature.title"
        :description="feature.description"
      />
    </div>
  </section>

  <section id="projects" class="px-6 py-16 md:px-16 lg:px-24">
    <h2 class="flex items-center gap-3 font-fuzz text-3xl font-bold md:text-4xl">
      <span class="inline-block h-7 w-1.5 rounded-full bg-[var(--p-primary-color)]"></span>项目
    </h2>

    <div class="mt-8 grid gap-4 sm:grid-cols-2">
      <a
        v-for="project in projects"
        :key="project.name"
        :href="project.href"
        target="_blank"
        rel="noopener"
        class="group flex flex-col gap-3 rounded border border-black/10 p-5 transition-colors hover:border-[var(--p-primary-color)] dark:border-white/15 dark:hover:border-[var(--p-primary-color)]"
      >
        <div>
          <h3
            class="font-mono text-lg font-semibold transition-colors group-hover:text-[var(--p-primary-color)]"
          >
            {{ project.name }}
          </h3>
          <p class="text-xs opacity-60">{{ project.type }}</p>
        </div>
        <p class="text-sm opacity-80">{{ project.description }}</p>
        <div class="mt-auto flex flex-wrap gap-2">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="rounded border border-black/10 px-2 py-0.5 font-mono text-xs opacity-70 transition-colors hover:border-[var(--p-primary-color)]/60 hover:text-[var(--p-primary-color)] hover:opacity-100 dark:border-white/15"
          >
            {{ tag }}
          </span>
        </div>
      </a>
    </div>

    <a
      href="https://github.com/SummonHIM?tab=repositories"
      target="_blank"
      rel="noopener"
      class="mt-6 inline-flex items-center gap-1.5 text-sm opacity-70 transition-colors hover:text-[var(--p-primary-color)] hover:opacity-100"
    >
      在 GitHub 查看更多<i class="pi pi-arrow-right text-xs"></i>
    </a>
  </section>

  <section id="skills" class="px-6 py-16 md:px-16 lg:px-24">
    <h2 class="flex items-center gap-3 font-fuzz text-3xl font-bold md:text-4xl">
      <span class="inline-block h-7 w-1.5 rounded-full bg-[var(--p-primary-color)]"></span>技术栈
    </h2>

    <div class="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <FeatureCard
        v-for="group in skillGroups"
        :key="group.title"
        :icon="group.icon"
        :title="group.title"
        :description="group.description"
        :tags="group.items"
        inline-title
      />
    </div>
  </section>

  <section id="social" class="px-6 py-16 md:px-16 lg:px-24">
    <h2 class="flex items-center gap-3 font-fuzz text-3xl font-bold md:text-4xl">
      <span class="inline-block h-7 w-1.5 rounded-full bg-[var(--p-primary-color)]"></span>社交
    </h2>
    <p class="mt-4 max-w-xl text-sm opacity-75 md:text-base">
      这里是我常出没的一些平台——无论是讨论技术方案、交流开源项目，还是单纯想聊几句，都欢迎随时找我。邮件和 Matrix 是最容易联系到我的方式。
    </p>
    <GlobalSocial :links="socialLinks" class="mt-6 -ml-3 flex-wrap" />
  </section>

  <footer>
    <GlobalFooter />
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/useTheme'

defineOptions({
  name: 'HomePage',
})

const { mode, toggle } = useTheme()

const themeIcon = computed(() =>
  mode.value === 'system' ? 'pi pi-desktop' : mode.value === 'dark' ? 'pi pi-moon' : 'pi pi-sun',
)

const menuItems = computed(() => [
  { label: '基础设施', url: '#infrastructure' },
  { label: '项目', url: '#projects' },
  { label: '技术栈', url: '#skills' },
  { label: '社交', url: '#social' },
  { icon: themeIcon.value, command: () => toggle() },
])

const techStack = [
  'Linux',
  'Docker',
  'Kubernetes',
  'Authentik',
  'OIDC',
  'Caddy',
  'Cloudflare',
  'Terraform',
  'Python',
  'Go',
  'Vue',
  'C',
  'STM32',
  'ROS2',
]

const skillGroups = [
  {
    title: '基础设施',
    icon: 'pi pi-server',
    description: '身份认证、反向代理与容器编排，构成自托管平台的核心底座，让每个服务都运行在统一的安全边界内。',
    items: ['Linux', 'Docker', 'Caddy', 'Authentik', 'OIDC'],
  },
  {
    title: '云原生',
    icon: 'pi pi-cloud',
    description: '通过声明式配置管理集群与基础设施，结合边缘网络实现全球加速，让部署可复现、可回滚、可水平扩展。',
    items: ['Kubernetes', 'Terraform', 'Cloudflare'],
  },
  {
    title: '开发',
    icon: 'pi pi-code',
    description: '从后端 API、自动化脚本到 Web 前端与浏览器扩展，覆盖日常开发的各个环节。',
    items: ['Python', 'Go', 'Vue', 'TypeScript', 'Shell'],
  },
  {
    title: '嵌入式 · 机器人',
    icon: 'pi pi-microchip',
    description: '从 STM32 裸机驱动、传感器对接到 ROS2 自主导航与 PX4 无人机飞控，打通软硬件全链路。',
    items: ['C', 'STM32', 'ROS2', 'PX4'],
  },
]

const infraFeatures = [
  {
    icon: 'pi pi-cloud',
    title: '边缘接入',
    description: 'Cloudflare 承接全部入站流量，提供 DDoS 防护与 WAF 规则，隐藏源站真实 IP。',
  },
  {
    icon: 'pi pi-directions',
    title: '反向代理',
    description: 'Caddy 统一管理所有服务入口，自动签发与续期 TLS 证书，零手动干预。',
  },
  {
    icon: 'pi pi-key',
    title: '统一身份',
    description: 'Authentik 作为身份中枢，通过 OIDC/SAML 为所有应用提供单点登录与多因素认证。',
  },
  {
    icon: 'pi pi-box',
    title: '容器编排',
    description: 'Docker Compose 声明式编排每个服务，确保环境一致、可复现、可快速迁移。',
  },
]

const infraDiagram = `flowchart LR
  Internet([互联网]) --> Cloudflare[Cloudflare]
  Cloudflare --> Caddy[Caddy]
  Caddy --> Authentik["Authentik · 身份中枢"]
  Authentik --> Service1[服务1]
  Authentik --> Service2[服务2]
  Authentik --> More[甚至更多…]`

const projects = [
  {
    name: 'SubscribeManagerNext',
    type: '订阅管理系统',
    description: '基于 Django 的代理订阅管理系统，支持 OIDC 认证、分组管理与订阅转换。',
    tags: ['Python', 'Django', 'Docker'],
  },
  {
    name: 'gzgspd',
    type: '网络守护进程',
    description: '用 Go 编写的守护进程，自动保持校园网门户的登录状态。',
    tags: ['Go', '网络', '自动化'],
    href: 'https://github.com/SummonHIM/gzgspd',
  },
  {
    name: 'GoSteamRestarter',
    type: '命令行工具',
    description: 'SteamRestarter 的 Go 重写版，稳定地重启 Steam 客户端。',
    tags: ['Go', '命令行'],
    href: 'https://github.com/SummonHIM/GoSteamRestarter',
  },
  {
    name: 'auto-pingan',
    type: '工作辅助工具',
    description: '为前工作单位开发的内部自动化分析工具，集成多种 OCR 引擎与 Gradio Web 界面。',
    tags: ['Python', 'Gradio', 'OCR'],
  },
  {
    name: 'best-jdcnj',
    type: '工作辅助工具',
    description: '为前工作单位开发的业务平台增强扩展，优化日常操作流程。',
    tags: ['TypeScript', 'Vue', 'Chrome Extension'],
  },
  {
    name: 'koishi-plugin-bili-parser',
    type: '聊天机器人插件',
    description: 'Koishi 插件，在聊天中解析并展开哔哩哔哩链接。',
    tags: ['TypeScript', 'Koishi'],
    href: 'https://github.com/SummonHIM/koishi-plugin-bili-parser',
  },
  {
    name: 'STM32-Car',
    type: '嵌入式智能车',
    description: '基于 STM32 的智能小车，用 C 与汇编直接驱动底层外设，实现循迹与运动控制。',
    tags: ['C', 'STM32', 'Assembly'],
    href: 'https://github.com/SummonHIM/STM32-Car',
  },
  {
    name: 'bobac-px4',
    type: '机器人 · 无人机',
    description:
      '全国大学生机器人大赛项目：Bobac 单臂机器人协同 PX4 无人机，涵盖自主导航、视觉识别抓取与无人机投放。',
    tags: ['Python', 'ROS2', 'PX4', 'Isaac Sim'],
    href: 'https://github.com/SummonHIM/bobac-px4',
  },
]

// const summonhimAvatar = ref(getGravatarUrl('summonhim@summonhim.top'))
const socialLinks = [
  {
    href: 'mailto:summonhim@summonhim.top',
    icon: 'ri--mail-line',
    label: '邮箱',
  },
  {
    href: 'https://matrix.to/#/@summonhim:matrix.summonhim.top',
    icon: 'mdi--matrix',
    label: 'Matrix',
  },
  {
    href: 'https://qm.qq.com/q/lYZ8auKT72',
    icon: 'ri--qq-line',
    label: 'QQ',
  },
  {
    href: 'https://t.me/SummonHIM',
    icon: 'ri--telegram-2-line',
    label: 'Telegram',
  },
  {
    href: 'https://github.com/summonhim',
    icon: 'ri--github-line',
    label: 'GitHub',
  },
  {
    href: 'https://steamcommunity.com/id/summonhim/',
    icon: 'ri--steam-line',
    label: 'Steam',
  },
  {
    href: 'https://space.bilibili.com/21899295',
    icon: 'ri--bilibili-line',
    label: '哔哩哔哩',
  },
]
</script>

<route lang="yaml">
meta:
  title: SummonHIM
</route>
