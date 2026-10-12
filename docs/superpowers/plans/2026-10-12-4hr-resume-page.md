# /4hr HR 简历页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 Astro 5 站点新增面向 HR 的简历页 `/4hr`，展示匿名化的技能、教育、项目与自我评价。

**Architecture:** 数据驱动 + 独立页面，复用现有 `Layout`/`Nav`/`Footer` 与全局 CSS 变量。新增结构化数据文件 `resume.ts`，新增页面 `4hr.astro`，`Nav.astro` 增加入口链接。

**Tech Stack:** Astro 5（静态输出）、TypeScript、CSS 变量主题、Playwright（e2e）、Vitest（单元，本次无需新增）。

## Global Constraints

- 不新增任何 npm 依赖包。
- 不改动 `global.css`、`sitemap.xml.ts`、`robots.txt.ts`、`Layout.astro`、`Footer.astro`。
- 公开身份仅用网名 `SummonHIM`，不出现真实姓名、手机号、具体成绩分数、具名院校。
- 项目经历卡片**不加外链**（`url`），与首页 `Projects` 外链区分。
- 「下载 PDF」按钮当前渲染为**禁用态占位**，注释标明待 PDF 完成后启用 `href`。
- 遵循现有视觉：卡片用 `--card`/`--border`/圆角，标签 pill 用 `.tag`/`.tech-tag` 风格，标题用 `.section-title`。
- 页面 CSS 内联在 `.astro` 的 `<style>`，复用全局变量，不新增全局样式。

---

### Task 1: 创建简历数据文件

**Files:**
- Create: `src/data/resume.ts`

**Interfaces:**
- Consumes: 无（本任务无上游依赖）
- Produces: `export const resume: Resume`，以及类型 `Contact`、`SkillGroup`、`EducationItem`、`ResumeProject`、`Resume`。后续任务通过 `import { resume } from '../data/resume'` 使用。

- [ ] **Step 1: 创建数据文件**

`src/data/resume.ts` 完整内容：

```ts
export type Contact = {
  label: string
  value: string
  href?: string
}

export type SkillGroup = {
  category: string
  items: string[]
}

export type EducationItem = {
  degree: string
  period: string
}

export type ResumeProject = {
  name: string
  description: string
  tech: string[]
}

export type Resume = {
  name: string
  title: string
  contacts: Contact[]
  summary: string
  skills: SkillGroup[]
  education: EducationItem[]
  projects: ResumeProject[]
  evaluation: string[]
}

export const resume: Resume = {
  name: 'SummonHIM',
  title: '运维/DevOps · 后端 · 全栈 实习',
  contacts: [
    {
      label: '邮箱',
      value: 'summonhim@summonhim.top',
      href: 'mailto:summonhim@summonhim.top',
    },
    {
      label: 'GitHub',
      value: 'SummonHIM',
      href: 'https://github.com/SummonHIM',
    },
    {
      label: '个人网站',
      value: 'summonhim.top',
      href: 'https://www.summonhim.top',
    },
  ],
  summary:
    '人工智能方向本科在读，具备嵌入式技术应用背景。独立开发了多个全栈项目（Python/Go/TypeScript/C），涵盖 Web 后端、前端 SPA、系统工具和嵌入式应用。课余独立搭建并维护 4 台服务器共 30+ 自托管服务，具备从应用开发到基础设施运维的完整实践经验。热爱开源，多个项目已在 GitHub 上开源。',
  skills: [
    {
      category: '编程语言',
      items: ['Python', 'Go', 'TypeScript/JavaScript', 'C', 'C#', 'PHP', 'Bash', 'PowerShell'],
    },
    {
      category: '后端框架',
      items: ['Django / DRF', 'Flask', 'Gunicorn'],
    },
    {
      category: '前端框架',
      items: ['Vue 3', 'React / Next.js', 'Vite', 'PrimeVue', 'Vuetify', 'Tailwind CSS', 'Electron'],
    },
    {
      category: '数据库',
      items: ['MySQL', 'MariaDB', 'SQLite', 'Redis', 'Neo4j'],
    },
    {
      category: '运维/DevOps',
      items: ['Docker', 'Linux 服务器管理', 'Caddy/Nginx', 'OPNsense', 'Headscale', 'Grafana', 'n8n'],
    },
    {
      category: '嵌入式',
      items: ['STM32 (HAL)', 'STC8H (C51)', 'Keil'],
    },
    {
      category: '工具链',
      items: ['Git', 'CMake', 'Conan', 'Yarn', 'Playwright', 'CI/CD'],
    },
  ],
  education: [
    { degree: '人工智能（本科，专升本在读）', period: '在读' },
    { degree: '嵌入式技术应用（专科）', period: '已毕业' },
  ],
  projects: [
    {
      name: 'Serenity 订阅管理平台',
      description:
        '多人共享 SaaS 订阅管理平台，独立设计开发全栈系统，集成 OIDC 单点登录、Redis 缓存，一键容器化部署。',
      tech: ['Python', 'Django REST Framework', 'Vue 3', 'MySQL', 'Redis'],
    },
    {
      name: '校园智能服务系统 cciss',
      description:
        '用纯 C 语言从零搭建的校园信息服务系统后端，掌握 HTTP 处理、JWT 认证、密码哈希等底层实现。',
      tech: ['C', 'CMake', 'MariaDB', 'civetweb', 'JWT'],
    },
    {
      name: '校园网自动登录守护进程 gzgspd',
      description:
        '校园网自动登录守护进程，Keep-Alive 心跳 + 指数退避重试，支持 Windows/Linux，开源后被校内同学实际使用。',
      tech: ['Go', 'systray'],
    },
    {
      name: '在线 PDF 提取器 WQPDFExtractor',
      description:
        '在线 PDF 提取器，基于 Playwright 拦截切片图片并拼接为 PDF，支持并行提取与断点续传。',
      tech: ['Python', 'Playwright', 'Pillow'],
    },
    {
      name: 'STM32 多模式智能小车',
      description:
        '基于 STM32F103 的多模式智能小车，实现避障、循迹、串口遥控与 OLED 实时显示。',
      tech: ['C', 'STM32', 'HAL'],
    },
    {
      name: '自建服务器基础设施运维',
      description:
        '独立搭建维护 4 台服务器、30+ 自托管服务，覆盖 Docker、Caddy、OPNsense、Headscale、Grafana 等。',
      tech: ['Docker', 'Caddy', 'OPNsense', 'Headscale', 'Grafana'],
    },
  ],
  evaluation: [
    '具备全栈开发能力，能独立完成从后端 API 设计到前端 UI 实现的完整开发流程',
    '拥有丰富的自建服务与 Linux 服务器运维经验，熟悉容器化部署、网络配置、监控告警等 DevOps 实践',
    '掌握多种编程语言，具有良好的学习能力和技术广度，能快速上手新技术栈',
    '热爱开源，多个项目开源在 GitHub，具备良好的代码规范和文档习惯',
  ],
}
```

- [ ] **Step 2: 运行类型检查**

Run: `npm run check`
Expected: 退出码 0，无类型错误（此时该文件未被任何页面引用，仅校验自身类型）。

- [ ] **Step 3: 提交**

```bash
git add src/data/resume.ts
git commit -m "feat: 新增 /4hr 简历数据文件"
```

---

### Task 2: 创建简历页面

**Files:**
- Create: `src/pages/4hr.astro`

**Interfaces:**
- Consumes: `import { resume } from '../data/resume'`（Task 1）；`import Layout from '../layouts/Layout.astro'`、`import Nav from '../components/Nav.astro'`、`import Footer from '../components/Footer.astro'`（现有）。
- Produces: 页面路由 `/4hr`，DOM 关键类名：`.resume-header`（内含 `h1`=姓名）、`.resume-title`、`.resume-contacts`、`.resume-summary`、`.resume-skills`、`.resume-education`、`.resume-projects`、`.resume-evaluation`、`#download-pdf`。后续 e2e 测试依赖这些类名。

- [ ] **Step 1: 创建页面**

`src/pages/4hr.astro` 完整内容：

```astro
---
import Layout from '../layouts/Layout.astro'
import Nav from '../components/Nav.astro'
import Footer from '../components/Footer.astro'
import { resume } from '../data/resume'
---

<Layout
  title="简历"
  description="SummonHIM 的简历：运维/DevOps、后端与全栈开发技能与项目经历。"
>
  <Nav variant="home" />
  <main id="top" class="container">
    <section class="resume">
      <header class="resume-header">
        <h1>{resume.name}</h1>
        <p class="resume-title">{resume.title}</p>
        <ul class="resume-contacts">
          {resume.contacts.map((c) => (
            <li>
              <a href={c.href} target="_blank" rel="noopener">
                {c.label}: {c.value}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <div class="resume-summary">
        <p>{resume.summary}</p>
      </div>

      <h2 class="section-title">技术技能</h2>
      <div class="resume-skills">
        {resume.skills.map((g) => (
          <div class="skill-group">
            <h3 class="skill-category">{g.category}</h3>
            <div class="skill-tags">
              {g.items.map((item) => (
                <span class="tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 class="section-title">教育经历</h2>
      <div class="resume-education">
        {resume.education.map((e) => (
          <article class="card edu-card">
            <h3>{e.degree}</h3>
            <p class="edu-period">{e.period}</p>
          </article>
        ))}
      </div>

      <h2 class="section-title">项目经历</h2>
      <div class="resume-projects">
        {resume.projects.map((p) => (
          <article class="card">
            <h3>{p.name}</h3>
            <p class="desc">{p.description}</p>
            <div class="tech">
              {p.tech.map((t) => (
                <span class="tech-tag">{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <h2 class="section-title">自我评价</h2>
      <ul class="resume-evaluation">
        {resume.evaluation.map((item) => (
          <li>{item}</li>
        ))}
      </ul>

      <div class="resume-actions">
        <!-- TODO: 待完整简历 PDF 完成后，取消 disabled 并填入 href 指向 PDF -->
        <button id="download-pdf" type="button" disabled>
          下载简历 PDF（即将上线）
        </button>
      </div>
    </section>
  </main>
  <Footer />
</Layout>

<style>
  .resume {
    padding-top: 4rem;
  }

  .resume-header {
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .resume-header h1 {
    font-family: var(--font-brand);
    font-weight: normal;
    font-size: 2.4rem;
    margin: 0 0 0.5rem;
  }

  .resume-title {
    color: var(--accent);
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 1rem;
  }

  .resume-contacts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .resume-contacts a {
    padding: 0.35rem 1rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 0.9rem;
    color: var(--text-muted);
    transition: all 0.15s ease;
  }

  .resume-contacts a:hover {
    color: var(--text);
    border-color: var(--accent);
    background: var(--accent-soft);
  }

  .resume-summary {
    margin: 0 0 2rem;
  }

  .resume-summary p {
    color: var(--text-muted);
    margin: 0;
    line-height: 1.8;
  }

  .resume-skills {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 2rem;
  }

  .skill-category {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-muted);
    margin: 0 0 0.5rem;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    padding: 0.25rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .resume-education {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .resume-projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
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

  .card h3 {
    margin: 0;
    font-size: 1.05rem;
  }

  .desc {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.9rem;
    flex: 1;
  }

  .edu-period {
    margin: 0;
    color: var(--accent);
    font-size: 0.85rem;
    font-weight: 600;
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

  .resume-evaluation {
    list-style: none;
    padding: 0;
    margin: 0 0 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .resume-evaluation li {
    position: relative;
    padding-left: 1.5rem;
    color: var(--text-muted);
  }

  .resume-evaluation li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
  }

  .resume-actions {
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
  }

  #download-pdf {
    padding: 0.6rem 1.5rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.95rem;
    cursor: not-allowed;
  }
</style>
```

- [ ] **Step 2: 运行构建验证页面可编译**

Run: `npm run build`
Expected: 退出码 0，`dist/4hr/index.html` 生成。

- [ ] **Step 3: 提交**

```bash
git add src/pages/4hr.astro
git commit -m "feat: 新增 /4hr HR 简历页"
```

---

### Task 3: 导航栏加入口链接

**Files:**
- Modify: `src/components/Nav.astro:12-15`

**Interfaces:**
- Consumes: 无新增（仅改本地数组）。
- Produces: 首页 `variant="home"` 导航多一个 `/4hr` 链接；`legal` 分支不变。

- [ ] **Step 1: 修改 items 数组**

将 `src/components/Nav.astro` 中：

```ts
const items = [
  { href: '#about', label: '关于' },
  { href: '#projects', label: '项目' },
]
```

改为：

```ts
const items = [
  { href: '#about', label: '关于' },
  { href: '#projects', label: '项目' },
  { href: '/4hr', label: '简历' },
]
```

- [ ] **Step 2: 运行构建验证**

Run: `npm run build`
Expected: 退出码 0。

- [ ] **Step 3: 提交**

```bash
git add src/components/Nav.astro
git commit -m "feat: 导航栏加入 /4hr 简历入口"
```

---

### Task 4: 新增 e2e 测试并整体验证

**Files:**
- Modify: `e2e/pages.spec.ts:30-34`（在现有测试后追加一个新测试）

**Interfaces:**
- Consumes: `/4hr` 页面 DOM 类名（Task 2）、导航链接（Task 3）。
- Produces: 无（测试收尾）。

- [ ] **Step 1: 编写 e2e 测试**

在 `e2e/pages.spec.ts` 文件末尾追加：

```ts
test('简历页渲染关键区块', async ({ page }) => {
  await page.goto('/4hr')
  await expect(page.locator('.resume-header h1')).toHaveText('SummonHIM')
  await expect(page.locator('.resume-title')).toBeVisible()
  await expect(page.locator('.resume-skills')).toBeVisible()
  await expect(page.locator('.resume-education')).toBeVisible()
  await expect(page.locator('.resume-projects')).toBeVisible()
  await expect(page.locator('.resume-evaluation')).toBeVisible()
  await expect(page.locator('#download-pdf')).toBeDisabled()
})
```

- [ ] **Step 2: 运行 e2e 测试**

Run: `npm run test:e2e`
Expected: 全部通过（含新增「简历页渲染关键区块」）。该命令会自动 `build` + `preview` 后跑 Playwright（见 `playwright.config.ts`）。

- [ ] **Step 3: 运行格式检查**

Run: `npm run format:check`
Expected: 退出码 0。若失败，运行 `npm run format` 后重新检查。

- [ ] **Step 4: 运行类型检查**

Run: `npm run check`
Expected: 退出码 0。

- [ ] **Step 5: 提交**

```bash
git add e2e/pages.spec.ts
git commit -m "test: 新增 /4hr 简历页 e2e 测试"
```

---

## Self-Review

**Spec coverage：**
- 数据层 `resume.ts`（匿名化、6 项目、模糊教育）→ Task 1 ✅
- 页面 `4hr.astro`（头部/简介/技能/教育/项目/评价/下载预留按钮）→ Task 2 ✅
- 导航改动 `Nav.astro`（`/4hr` 链接）→ Task 3 ✅
- 下载 PDF 预留按钮（禁用态 + TODO 注释）→ Task 2 Step 1 ✅
- 验证（build/check/format/e2e）→ Task 4 ✅
- sitemap 自动收录（无需改动，已确认 `import.meta.glob` 覆盖）→ 无需任务 ✅

**Placeholder scan：** 无 TBD/TODO 空泛描述；仅「下载 PDF」按钮的 TODO 注释是规格明确要求的占位行为。

**Type consistency：** `resume` 字段名（`name`/`title`/`contacts`/`summary`/`skills`/`education`/`projects`/`evaluation`）在 Task 1 定义与 Task 2 使用一致；e2e 类名（`.resume-header`、`.resume-title`、`.resume-skills`、`.resume-education`、`.resume-projects`、`.resume-evaluation`、`#download-pdf`）在 Task 2 生成与 Task 4 断言一致。
