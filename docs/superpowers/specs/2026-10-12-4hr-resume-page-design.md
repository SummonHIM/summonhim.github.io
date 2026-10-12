# /4hr HR 简历页设计

日期：2026-10-12

## 目标

在 `summonhim-top` 站点新增一个面向 HR 的简历页面，路由为 `/4hr`，用于介绍求职者的技术技能与对面试有用的信息。内容来源为 `C:\Users\SummonHIM\Standard\Projects\SummonHIM\resume.md`，但**不公开真实身份**（真实姓名、手机号、具体成绩分数均不出现），公开身份统一用网名 `SummonHIM`。

## 定位与可见性

- 定位：完整简历页（求职意向、技术技能、教育经历、项目经历、自我评价、联系方式）。
- 可见性：在首页顶部 Nav 导航栏增加「简历」链接（`/4hr`），页面公开可访问。
- 下载功能：页面上**预留**「下载 PDF」按钮（占位/禁用态），待完整 PDF 完成后补上真正的下载链接。

## 现状

- 站点为 Astro 5 静态站点，`output: 'static'`。
- 数据文件集中放在 `src/data/`（`projects.ts`、`timeline.ts`、`tags.ts`、`profile.ts`、`links.ts`），均为导出结构化 TS 对象。
- 页面放在 `src/pages/`（`index.astro`、`trust.astro`、`tos.astro` 等）。
- 组件放在 `src/components/`（`Nav.astro`、`Projects.astro`、`About.astro` 等）。
- 全局样式在 `src/styles/global.css`，使用 CSS 变量（`--bg`、`--text`、`--text-muted`、`--accent`、`--accent-soft`、`--card`、`--border`），支持亮/暗主题。
- `sitemap.xml.ts` 使用 `import.meta.glob('./**/*.astro')` 自动收录页面，无需改动。
- 现有视觉语言：卡片（`--card` 背景 + `--border` 边框 + 圆角）、标签 pill（`.tag` / `.tech-tag`）、section 标题（`.section-title`）。

## 方案

采用**数据驱动 + 独立页面**，复用现有架构与视觉语言。

### 1. 数据层 `src/data/resume.ts`

新增文件，导出 `resume` 对象，结构与 `projects.ts` 一致（TS 类型 + 导出常量）。字段如下：

- `name`: `'SummonHIM'`
- `title`: 求职意向，如 `'运维/DevOps · 后端 · 全栈 实习'`
- `contacts`: 联系项数组 `{ label, value, href? }`，内容：邮箱、GitHub、个人网站（不含手机号、不含真实姓名）
- `summary`: 个人简介一段话（改编自 resume.md 个人简介，去掉"嵌入式技术应用专业出身…"等可识别身份措辞，保留技术广度与自建基础设施能力）
- `skills`: 技能分组数组 `{ category, items: string[] }`，覆盖：编程语言、后端框架、前端框架、数据库、运维/DevOps、嵌入式、工具链（与 resume.md 技能表一致）
- `education`: 教育经历数组 `{ degree, period }`，**模糊写**（不具名院校）：
  - 人工智能方向本科在读（专升本），时间模糊为"在读"
  - 嵌入式技术方向专科，时间模糊
  - 不出现具体院校名、不出现成绩分数
- `projects`: 精选 6 个项目 `{ name, description, tech: string[] }`：
  1. Serenity 订阅管理平台
  2. 校园智能服务系统 cciss（纯 C 后端）
  3. 校园网自动登录守护进程 gzgspd
  4. 在线 PDF 提取器 WQPDFExtractor
  5. STM32 多模式智能小车
  6. 自建服务器基础设施运维
- `evaluation`: 自我评价字符串数组（4 条，改编自 resume.md）

### 2. 页面 `src/pages/4hr.astro`

复用 `Layout` + `Nav` + `Footer`。标题 props：`title="简历"`、`description` 写一句面向 HR 的简介。

页面结构（自上而下）：

1. 头部：姓名 `SummonHIM` + 求职意向 + 联系方式行
2. 个人简介段落
3. 技术技能：按分组渲染标签 pill
4. 教育经历：卡片/列表
5. 项目经历：卡片（名称 / 技术栈 / 描述），复用 `Projects.astro` 的卡片视觉
6. 自我评价：列表
7. 动作区：预留「下载 PDF」按钮（当前渲染为禁用态占位，注释标明待 PDF 完成后启用 `href`）

样式内联在 `.astro` 的 `<style>` 中，复用全局 CSS 变量，不新增全局样式。

### 3. 导航改动 `src/components/Nav.astro`

`items` 数组新增 `{ href: '/4hr', label: '简历' }`，仅影响 `variant="home"` 分支；`legal` 分支不变。

## 边界与约束

- 不新增依赖包。
- 不改动 `global.css`、`sitemap.xml.ts`、`robots.txt.ts`、`Layout.astro`。
- 项目经历不重复外链（resume.md 无项目外链，本页项目卡片也不加 `url`，避免与首页 `Projects` 外链混淆；如需可后续补）。
- 个人信息仅公开 `SummonHIM`、邮箱、GitHub、个人网站。

## 验证

- `npm run build` 构建通过。
- `npm run check`（astro check）类型检查通过。
- `npm run format:check` 格式检查通过。
- 手动 `npm run dev` 访问 `/4hr`，检查布局、亮暗主题、移动端（Nav 现有响应式）。
- 确认 `/4hr` 出现在 `sitemap.xml` 中（自动）。

## 后续（非本次范围）

- 生成简历 PDF 后，将「下载 PDF」按钮从禁用态改为真实下载链接。
