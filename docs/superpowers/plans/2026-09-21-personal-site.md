# SummonHIM 个人网站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 SummonHIM 搭建一个 Astro 静态个人主页，可部署到 Cloudflare Pages，中文，明暗主题自动切换，主色 `#ffb900`。

**Architecture:** 单页 Astro 项目。内容（简介/时间线/项目/链接）全部抽离到 `src/data/*.ts` 数据文件，组件只负责渲染。全局 CSS 用 CSS 变量实现明暗主题，`data-theme` 属性驱动，`localStorage` 持久化 + `prefers-color-scheme` 兜底。

**Tech Stack:** Astro 5、TypeScript、原生 CSS（无 CSS 框架）、Node 24 / npm。

## Global Constraints

- 主色（强调色）：`#ffb900`
- 语言：中文（`<html lang="zh-CN">`）
- 部署目标：Cloudflare Pages，构建命令 `npm run build`，输出目录 `dist/`
- 站点地址：`https://summonhim.top`
- 页面结构为单页锚点，锚点 id：`#top`、`#about`、`#projects`、`#links`
- 图标素材来源：`C:\Users\SummonHIM\Standard\Projects\SummonHIM\Icon`（`SummonHIM.png` 作 logo/favicon，`SummonHIM.ico` 作 favicon.ico）
- 不使用 CSS 框架与图标字体库；不添加注释
- 项目卡片链接 `url` 为可选字段，仅当明确已知时才填写（已知：`l4d2-docker` GitHub、`SteamRestarter` gist）

---

### Task 1: 初始化 git 仓库与项目骨架

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`

**Interfaces:**
- Produces: npm scripts `dev` / `build` / `preview`；Astro 站点配置 `site`、`output: 'static'`

- [ ] **Step 1: 初始化 git 仓库**

Run: `git init`

- [ ] **Step 2: 写入 `package.json`**

```json
{
  "name": "summonhim-top",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.7.0"
  }
}
```

- [ ] **Step 3: 写入 `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://summonhim.top',
  output: 'static',
});
```

- [ ] **Step 4: 写入 `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/base",
  "include": [".astro/types.d.ts", "src/**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 5: 写入 `.gitignore`**

```
node_modules
dist
.astro
```

- [ ] **Step 6: 提交**

```bash
git add package.json astro.config.mjs tsconfig.json .gitignore
git commit -m "chore: scaffold astro project"
```

---

### Task 2: 安装依赖并验证首次构建

**Files:**
- Modify: `package-lock.json`（由 npm 生成）

**Interfaces:**
- Consumes: `package.json` 依赖 `astro`
- Produces: 可用的 `node_modules`；`npm run build` 可执行

- [ ] **Step 1: 安装依赖**

Run: `npm install`

- [ ] **Step 2: 临时创建最小页面以验证构建链路**

创建 `src/pages/index.astro`：

```astro
---
---
<h1>ok</h1>
```

- [ ] **Step 3: 运行构建验证**

Run: `npm run build`
Expected: 成功，`dist/index.html` 生成。

- [ ] **Step 4: 提交**

```bash
git add package-lock.json src/pages/index.astro
git commit -m "chore: install deps and verify build"
```

---

### Task 3: 复制图标素材到 public/

**Files:**
- Create: `public/logo.png`
- Create: `public/favicon.png`
- Create: `public/favicon.ico`

**Interfaces:**
- Produces: `/logo.png`、`/favicon.png`、`/favicon.ico` 可供组件与 `<head>` 引用

- [ ] **Step 1: 复制素材**

```powershell
Copy-Item "C:\Users\SummonHIM\Standard\Projects\SummonHIM\Icon\SummonHIM.png" "public\logo.png"
Copy-Item "C:\Users\SummonHIM\Standard\Projects\SummonHIM\Icon\SummonHIM.png" "public\favicon.png"
Copy-Item "C:\Users\SummonHIM\Standard\Projects\SummonHIM\Icon\SummonHIM.ico" "public\favicon.ico"
```

- [ ] **Step 2: 验证文件存在**

Run: `Get-ChildItem public` 
Expected: 列出 `logo.png`、`favicon.png`、`favicon.ico`。

- [ ] **Step 3: 提交**

```bash
git add public/logo.png public/favicon.png public/favicon.ico
git commit -m "assets: add logo and favicon"
```

---

### Task 4: 全局样式与基础布局 Layout

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/Layout.astro`

**Interfaces:**
- Produces: `Layout` 组件（props：`title?`、`description?`），供所有页面使用；全局 CSS 变量与 `data-theme` 明暗主题

- [ ] **Step 1: 写入 `src/styles/global.css`**

```css
:root {
  --bg: #ffffff;
  --bg-soft: #f5f5f6;
  --text: #17171a;
  --text-muted: #6b7280;
  --accent: #ffb900;
  --accent-soft: rgba(255, 185, 0, 0.12);
  --card: #ffffff;
  --border: #e5e7eb;
  --maxw: 960px;
}

html[data-theme='dark'] {
  --bg: #0f0f11;
  --bg-soft: #161618;
  --text: #f2f2f3;
  --text-muted: #9ca3af;
  --accent: #ffb900;
  --accent-soft: rgba(255, 185, 0, 0.14);
  --card: #1a1a1e;
  --border: #2a2a2f;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: system-ui, -apple-system, 'Segoe UI', 'Microsoft YaHei', sans-serif;
  line-height: 1.7;
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 0 1.5rem;
}

section {
  padding: 4rem 0;
}

.section-title {
  font-size: 1.6rem;
  margin: 0 0 1.5rem;
}
```

- [ ] **Step 2: 写入 `src/layouts/Layout.astro`**

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'SummonHIM',
  description = 'SummonHIM 的个人主页',
} = Astro.props;
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <script is:inline>
      (function () {
        try {
          const stored = localStorage.getItem('theme');
          const theme =
            stored ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light');
          document.documentElement.setAttribute('data-theme', theme);
        } catch (e) {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      })();
    </script>
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 3: 构建验证**

Run: `npm run build`
Expected: 成功，`dist/index.html` 包含 `data-theme` 初始化脚本与 favicon 引用。

- [ ] **Step 4: 提交**

```bash
git add src/styles/global.css src/layouts/Layout.astro
git commit -m "feat: add global styles and layout"
```

---

### Task 5: 明暗切换按钮组件 ThemeToggle

**Files:**
- Create: `src/components/ThemeToggle.astro`

**Interfaces:**
- Produces: `ThemeToggle` 组件（无 props），点击切换 `data-theme` 并写入 `localStorage`

- [ ] **Step 1: 写入 `src/components/ThemeToggle.astro`**

```astro
<button id="theme-toggle" type="button" aria-label="切换明暗主题">
  <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
  <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</button>

<style>
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
  }

  button:hover {
    color: var(--text);
    border-color: var(--accent);
  }

  .icon-sun {
    display: none;
  }

  .icon-moon {
    display: block;
  }

  html[data-theme='dark'] .icon-sun {
    display: block;
  }

  html[data-theme='dark'] .icon-moon {
    display: none;
  }
</style>

<script>
  const btn = document.getElementById('theme-toggle');
  btn.addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  });
</script>
```

- [ ] **Step 2: 构建验证**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: 提交**

```bash
git add src/components/ThemeToggle.astro
git commit -m "feat: add theme toggle component"
```

---

### Task 6: 内容数据文件

**Files:**
- Create: `src/data/profile.ts`
- Create: `src/data/timeline.ts`
- Create: `src/data/tags.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/links.ts`

**Interfaces:**
- Produces: `profile`（`{ name, tagline, quote }`）、`timeline`（`TimelineItem[]`）、`tags`（`string[]`）、`projectGroups`（`ProjectGroup[]`）、`links`（`Link[]`）、`authentikUrl`（`string`）

- [ ] **Step 1: 写入 `src/data/profile.ts`**

```ts
export const profile = {
  name: 'SummonHIM',
  tagline: '一个从「为了打游戏」一路折腾到「能自建基础设施」的人。',
  quote: '中国有句古话叫：“闷声发大财”。我一句话也不说，这是坠吼的。',
};
```

- [ ] **Step 2: 写入 `src/data/timeline.ts`**

```ts
export type TimelineItem = {
  title: string;
  description: string;
};

export const timeline: TimelineItem[] = [
  {
    title: 'Minecraft 服务器 → Linux',
    description: '为打游戏搭建 MC 服务器，第一次租阿里云、第一次接触 Linux；公网被 DDoS 后服务被取消。',
  },
  {
    title: 'Clash / 软路由 OpenWrt',
    description: '查资料开始学 Clash，接触软路由；用 OpenWrt 让全网关设备一起走代理。',
  },
  {
    title: 'Jellyfin / MoviePilot / Docker',
    description: '自建影视墙，用 Docker 运行 Jellyfin + MoviePilot。',
  },
  {
    title: 'PVE 虚拟化',
    description: 'OpenWrt 更新频繁出问题，改用 PVE 同时承载 OpenWrt 与 Debian；核显直通折腾许久（内核配置乌龙）。',
  },
  {
    title: 'Mumble 语音',
    description: 'Discord 被墙后自建 Mumble 作为队友语音，沿用至今，打开了话匣子。',
  },
  {
    title: 'Nextcloud',
    description: '自建文件 / 通讯录 / 日历，脱离谷歌；SFTP 直连 L4D2 目录。',
  },
  {
    title: 'Matrix',
    description: '自建 Matrix，积累 docker compose 经验。',
  },
  {
    title: 'Authentik 统一账号',
    description: '统一自建服务的账号登录；Linux 用 SSSD 接入 LDAP。',
  },
  {
    title: 'Headscale 组网',
    description: '跨运营商联机掉线，从 Zerotier/Tailscale 到自建 Headscale。',
  },
  {
    title: 'Stalwart 邮件',
    description: '自建个人邮件，折腾 SPF / DMARC 记录。',
  },
  {
    title: 'one-kvm 监控',
    description: '用香橙派 P3 给服务器做 IPMI 实时监控。',
  },
  {
    title: 'OpnSense',
    description: '本科 AI 专业系统学习计算机网络，快速上手企业级路由防火墙平台。',
  },
];
```

- [ ] **Step 3: 写入 `src/data/tags.ts`**

```ts
export const tags: string[] = [
  'Linux',
  'Docker',
  'PVE',
  'OpenWrt',
  'OpnSense',
  'Clash',
  'Nextcloud',
  'Jellyfin',
  'Mumble',
  'Matrix',
  'Headscale',
  'Stalwart',
  'Authentik',
  'SSSD',
  'LDAP',
  'SSO',
  'KVM',
  '网络',
  'Django',
];
```

- [ ] **Step 4: 写入 `src/data/projects.ts`**

```ts
export type Project = {
  name: string;
  description: string;
  tech: string[];
  url?: string;
};

export type ProjectGroup = {
  title: string;
  items: Project[];
};

export const projectGroups: ProjectGroup[] = [
  {
    title: '折腾 / 自建服务',
    items: [
      {
        name: 'SubscribeManager (SubMan)',
        description: '合租代理订阅管理平台，PHP → Flask → Django 迭代至今。',
        tech: ['Django'],
      },
      {
        name: 'l4d2-docker',
        description: 'L4D2 专用服务器 Docker 编排。',
        tech: ['Docker', 'Bash'],
        url: 'https://github.com/SummonHIM/l4d2-docker',
      },
      {
        name: 'SteamRestarter',
        description: 'Steam 一键强制重启器。',
        tech: ['Batch'],
        url: 'https://gist.github.com/SummonHIM/1cd129bcbc72e18faac2b72455967b32',
      },
      {
        name: 'auto-pingan',
        description: '自动化平安好伙伴分析器。',
        tech: ['Python', 'OCR'],
      },
      {
        name: 'better-jdcnj',
        description: '更好的机动车年检。',
        tech: ['Vue', 'TypeScript'],
      },
    ],
  },
  {
    title: '学业 / 竞赛',
    items: [
      {
        name: 'Car',
        description: '嵌入式期末作业 · STM32 智能小车（红外 / 超声波 / OLED 等外设）。',
        tech: ['STM32', 'C'],
      },
      {
        name: 'Campus ISS',
        description: '人工智能期中作业 · 校园智能服务系统（JWT + RBAC 权限）。',
        tech: ['C', 'MySQL'],
      },
      {
        name: 'bobac-px4',
        description: 'ROBOTAC 比赛 · 机械臂 + 无人机协同。',
        tech: ['ROS2', 'PX4'],
      },
    ],
  },
];
```

- [ ] **Step 5: 写入 `src/data/links.ts`**

```ts
export type Link = {
  label: string;
  value: string;
  href?: string;
};

export const links: Link[] = [
  {
    label: '邮箱',
    value: 'summonhim@summonhim.top',
    href: 'mailto:summonhim@summonhim.top',
  },
  {
    label: 'Matrix',
    value: '@summonhim:matrix.summonhim.top',
  },
  {
    label: 'QQ',
    value: 'SummonHIM',
    href: 'https://qm.qq.com/q/lYZ8auKT72',
  },
  {
    label: 'Telegram',
    value: 'SummonHIM',
  },
  {
    label: 'GitHub',
    value: 'SummonHIM',
    href: 'https://github.com/SummonHIM',
  },
  {
    label: 'Steam',
    value: 'SummonHIM',
  },
  {
    label: 'BiliBili',
    value: 'SummonHIM',
    href: 'https://space.bilibili.com/21899295',
  },
];

export const authentikUrl = 'https://auth.summonhim.top:2053/';
```

- [ ] **Step 6: 构建验证（确认 TypeScript 无类型错误）**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 7: 提交**

```bash
git add src/data
git commit -m "feat: add content data files"
```

---

### Task 7: 导航组件 Nav

**Files:**
- Create: `src/components/Nav.astro`

**Interfaces:**
- Consumes: `ThemeToggle`（无 props）
- Produces: `Nav` 组件（无 props），粘性顶栏 + 锚点链接 + 主题切换

- [ ] **Step 1: 写入 `src/components/Nav.astro`**

```astro
---
import ThemeToggle from './ThemeToggle.astro';

const items = [
  { href: '#about', label: '关于' },
  { href: '#projects', label: '项目' },
  { href: '#links', label: '链接' },
];
---

<header class="nav">
  <div class="container nav-inner">
    <a class="brand" href="#top">
      <img src="/logo.png" alt="SummonHIM" width="28" height="28" />
      <span>SummonHIM</span>
    </a>
    <nav class="links">
      {items.map((i) => (
        <a href={i.href}>{i.label}</a>
      ))}
      <ThemeToggle />
    </nav>
  </div>
</header>

<style>
  .nav {
    position: sticky;
    top: 0;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    z-index: 10;
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
  }

  .brand img {
    border-radius: 6px;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .links a {
    color: var(--text-muted);
    font-size: 0.95rem;
  }

  .links a:hover {
    color: var(--text);
  }
</style>
```

- [ ] **Step 2: 构建验证**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: 提交**

```bash
git add src/components/Nav.astro
git commit -m "feat: add nav component"
```

---

### Task 8: Hero 组件

**Files:**
- Create: `src/components/Hero.astro`

**Interfaces:**
- Consumes: `profile`（`src/data/profile.ts`）、`links`（`src/data/links.ts`）
- Produces: `Hero` 组件（无 props）

- [ ] **Step 1: 写入 `src/components/Hero.astro`**

```astro
---
import { profile } from '../data/profile';
import { links } from '../data/links';

const social = links.filter((l) => l.href);
---

<section id="top" class="hero">
  <div class="container">
    <img class="logo" src="/logo.png" alt="SummonHIM 图标" width="96" height="96" />
    <h1>{profile.name}</h1>
    <p class="tagline">{profile.tagline}</p>
    <blockquote class="quote">{profile.quote}</blockquote>
    <div class="social">
      {social.map((l) => (
        <a href={l.href} target="_blank" rel="noopener">{l.label}</a>
      ))}
    </div>
  </div>
</section>

<style>
  .hero {
    text-align: center;
    padding-top: 6rem;
    padding-bottom: 4rem;
  }

  .logo {
    border-radius: 24px;
    box-shadow: 0 8px 30px var(--accent-soft);
  }

  h1 {
    font-size: 2.4rem;
    margin: 1.5rem 0 0.5rem;
  }

  .tagline {
    color: var(--text-muted);
    font-size: 1.1rem;
    margin: 0 0 1.5rem;
  }

  .quote {
    display: inline-block;
    margin: 0 0 2rem;
    padding: 0.5rem 1.25rem;
    border-left: 3px solid var(--accent);
    background: var(--accent-soft);
    border-radius: 8px;
    font-size: 0.95rem;
  }

  .social {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }

  .social a {
    padding: 0.35rem 1rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 0.9rem;
    color: var(--text-muted);
    transition: all 0.15s ease;
  }

  .social a:hover {
    color: var(--text);
    border-color: var(--accent);
    background: var(--accent-soft);
  }
</style>
```

- [ ] **Step 2: 构建验证**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: 提交**

```bash
git add src/components/Hero.astro
git commit -m "feat: add hero component"
```

---

### Task 9: 关于我组件 About（时间线 + 标签）

**Files:**
- Create: `src/components/About.astro`

**Interfaces:**
- Consumes: `timeline`（`src/data/timeline.ts`）、`tags`（`src/data/tags.ts`）
- Produces: `About` 组件（无 props）

- [ ] **Step 1: 写入 `src/components/About.astro`**

```astro
---
import { timeline } from '../data/timeline';
import { tags } from '../data/tags';
---

<section id="about" class="about">
  <div class="container">
    <h2 class="section-title">关于我</h2>
    <ol class="timeline">
      {timeline.map((item) => (
        <li>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ol>
    <div class="tags">
      {tags.map((t) => (
        <span class="tag">{t}</span>
      ))}
    </div>
  </div>
</section>

<style>
  .timeline {
    list-style: none;
    margin: 0;
    padding: 0 0 0 1.25rem;
    border-left: 2px solid var(--border);
  }

  .timeline li {
    position: relative;
    padding: 0 0 1.5rem 1.5rem;
  }

  .timeline li::before {
    content: '';
    position: absolute;
    left: -1.55rem;
    top: 0.35rem;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--accent);
  }

  .timeline h3 {
    margin: 0 0 0.25rem;
    font-size: 1.05rem;
  }

  .timeline p {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.95rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 2rem;
  }

  .tag {
    padding: 0.25rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 0.85rem;
    color: var(--text-muted);
  }
</style>
```

- [ ] **Step 2: 构建验证**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: 提交**

```bash
git add src/components/About.astro
git commit -m "feat: add about component"
```

---

### Task 10: 项目组件 Projects

**Files:**
- Create: `src/components/Projects.astro`

**Interfaces:**
- Consumes: `projectGroups`（`src/data/projects.ts`）
- Produces: `Projects` 组件（无 props）

- [ ] **Step 1: 写入 `src/components/Projects.astro`**

```astro
---
import { projectGroups } from '../data/projects';
---

<section id="projects" class="projects">
  <div class="container">
    <h2 class="section-title">项目</h2>
    {projectGroups.map((group) => (
      <div class="group">
        <h3 class="group-title">{group.title}</h3>
        <div class="grid">
          {group.items.map((p) => (
            <article class="card">
              <h4>{p.name}</h4>
              <p class="desc">{p.description}</p>
              <div class="tech">
                {p.tech.map((t) => (
                  <span class="tech-tag">{t}</span>
                ))}
              </div>
              {p.url && (
                <a class="card-link" href={p.url} target="_blank" rel="noopener">访问</a>
              )}
            </article>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>

<style>
  .group {
    margin-bottom: 2.5rem;
  }

  .group-title {
    margin: 0 0 1rem;
    font-size: 1.1rem;
    color: var(--text-muted);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
  }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .card h4 {
    margin: 0;
    font-size: 1.05rem;
  }

  .desc {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.9rem;
    flex: 1;
  }

  .tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .tech-tag {
    padding: 0.1rem 0.6rem;
    border-radius: 6px;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 0.8rem;
    font-weight: 600;
  }

  .card-link {
    color: var(--accent);
    font-size: 0.9rem;
    font-weight: 600;
  }
</style>
```

- [ ] **Step 2: 构建验证**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: 提交**

```bash
git add src/components/Projects.astro
git commit -m "feat: add projects component"
```

---

### Task 11: 链接组件 Links

**Files:**
- Create: `src/components/Links.astro`

**Interfaces:**
- Consumes: `links`、`authentikUrl`（`src/data/links.ts`）
- Produces: `Links` 组件（无 props）

- [ ] **Step 1: 写入 `src/components/Links.astro`**

```astro
---
import { links, authentikUrl } from '../data/links';
---

<section id="links" class="links">
  <div class="container">
    <h2 class="section-title">链接 / 联系</h2>
    <ul class="link-list">
      {links.map((l) => (
        <li>
          <span class="label">{l.label}</span>
          {l.href ? (
            <a href={l.href} target="_blank" rel="noopener">{l.value}</a>
          ) : (
            <span class="value">{l.value}</span>
          )}
        </li>
      ))}
    </ul>
    <a class="authentik" href={authentikUrl} target="_blank" rel="noopener">统一账号登录 (Authentik)</a>
  </div>
</section>

<style>
  .link-list {
    list-style: none;
    margin: 0 0 2rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .link-list li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 10px;
  }

  .label {
    min-width: 5.5rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .link-list a {
    color: var(--accent);
    font-weight: 500;
  }

  .link-list .value {
    color: var(--text);
  }

  .authentik {
    display: inline-block;
    padding: 0.6rem 1.25rem;
    background: var(--accent);
    color: #1a1a1a;
    font-weight: 700;
    border-radius: 10px;
  }
</style>
```

- [ ] **Step 2: 构建验证**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: 提交**

```bash
git add src/components/Links.astro
git commit -m "feat: add links component"
```

---

### Task 12: 页脚组件 Footer

**Files:**
- Create: `src/components/Footer.astro`

**Interfaces:**
- Produces: `Footer` 组件（无 props）

- [ ] **Step 1: 写入 `src/components/Footer.astro`**

```astro
<footer class="footer">
  <div class="container">
    <p>© {new Date().getFullYear()} SummonHIM</p>
    <p class="easter">SummonHIM 的名字，来自 Minecraft 的 HIM。</p>
  </div>
</footer>

<style>
  .footer {
    border-top: 1px solid var(--border);
    padding: 2rem 0;
    text-align: center;
  }

  .footer p {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  .footer .easter {
    margin-top: 0.25rem;
  }
</style>
```

- [ ] **Step 2: 构建验证**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: 提交**

```bash
git add src/components/Footer.astro
git commit -m "feat: add footer component"
```

---

### Task 13: 组装首页 index.astro

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `Layout`、`Nav`、`Hero`、`About`、`Projects`、`Links`、`Footer`
- Produces: 完整单页站点

- [ ] **Step 1: 覆盖 `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Projects from '../components/Projects.astro';
import Links from '../components/Links.astro';
import Footer from '../components/Footer.astro';
---

<Layout>
  <Nav />
  <main>
    <Hero />
    <About />
    <Projects />
    <Links />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2: 构建验证**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 3: 内容校验（确认关键内容出现在产物中）**

Run: `Select-String -LiteralPath "dist\index.html" -Pattern "闷声发大财","SubscribeManager","Authentik","Minecraft 的 HIM" | ForEach-Object { $_.Matches.Value }`
Expected: 四个关键词均命中。

- [ ] **Step 4: 提交**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble home page"
```

---

### Task 14: 最终构建验证与 Cloudflare Pages 部署配置

**Files:**
- Create: `README.md`（部署说明）

**Interfaces:**
- Consumes: 完整站点
- Produces: 可部署的 `dist/` 与部署文档

- [ ] **Step 1: 生产构建**

Run: `npm run build`
Expected: 成功，`dist/` 生成。

- [ ] **Step 2: 本地预览冒烟测试**

Run: `npm run preview`（后台），然后 `Invoke-WebRequest http://localhost:4321 -UseBasicParsing | Select-Object StatusCode`
Expected: `200`。测试后关闭预览进程。

- [ ] **Step 3: 写入 `README.md`**

```md
# SummonHIM 个人主页

Astro 静态站点，部署于 Cloudflare Pages。

## 本地开发

```sh
npm install
npm run dev
```

## 构建

```sh
npm run build
```

## 部署到 Cloudflare Pages

- 构建命令：`npm run build`
- 输出目录：`dist`
- 绑定自定义域：`summonhim.top`
```

- [ ] **Step 4: 提交**

```bash
git add README.md
git commit -m "docs: add deployment readme"
```

---

## 说明

- 项目卡片链接 `url` 目前仅对已知地址（`l4d2-docker`、`SteamRestarter`）填写；其余项目（SubMan、auto-pingan、better-jdcnj、Car、Campus ISS、bobac-px4）如需展示外链，可在 `src/data/projects.ts` 中补 `url` 字段。
- Telegram / Steam / Matrix 未提供明确 URL，故仅展示账号文字值（不生成链接），如需可点击可在 `src/data/links.ts` 补 `href`。
