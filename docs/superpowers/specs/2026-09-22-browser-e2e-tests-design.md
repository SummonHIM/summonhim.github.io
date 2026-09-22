# 浏览器显示测试（E2E + 视觉回归）设计文档

日期：2026-09-22
状态：待实现

## 1. 概述

为 SummonHIM 个人主页补充浏览器级测试。现有 `src/**/*.test.ts` 用 vitest + happy-dom 做单元测试，仅覆盖脚本逻辑；本项目需在真实浏览器中验证交互行为、页面渲染可见性，以及桌面端与手机端的视觉一致性。

## 2. 技术方案

- **工具**：Playwright（`@playwright/test`），Astro 官方推荐的 E2E 方案，新增为 devDependency。
- **测试目录**：根目录 `e2e/`，与 `src/**/*.test.ts`（vitest）物理分离、互不干扰。
- **配置**：根目录 `playwright.config.ts`。
- **webServer**：`npm run build && npm run preview`，端口 4321，测试生产构建（含 `astro-compress` 输出），`reuseExistingServer: !process.env.CI`。
- **现有 `npm test`（vitest）保持不变**。

## 3. 浏览器 / 视口（project 矩阵）

功能测试（交互 / 页面可见性 / 响应式）在 3 个浏览器引擎 × 2 个视口共 6 个 project 上运行，抓取 `matchMedia`、`window.open`、`history.back` 等 API 的跨引擎兼容问题：

| Project | 引擎 | 设备 | 视口 |
|---|---|---|---|
| `chromium-desktop` | chromium | Desktop Chrome | 1280×800 |
| `chromium-mobile` | chromium | Pixel 5 | 393×851（`isMobile`） |
| `firefox-desktop` | firefox | Desktop Firefox | 1280×800 |
| `firefox-mobile` | firefox | Pixel 5 | 393×851（`isMobile`） |
| `webkit-desktop` | webkit | Desktop Safari | 1280×800 |
| `webkit-mobile` | webkit | Pixel 5 | 393×851（`isMobile`） |

- **视觉快照回归仅在 chromium 上跑**（`chromium-desktop` / `chromium-mobile`），避免 firefox/webkit 字体抗锯齿与默认渲染差异导致的误报。
- `toHaveScreenshot` 按 project 名自动分目录存基线，互不冲突。
- CI 重试 2 次。

## 4. 测试文件（4 个 spec）

### 4.1 `e2e/interactions.spec.ts` — 交互行为

- **导航栏滚动边框**：初始 `.nav` 无 `scrolled` 类，滚动后出现 `scrolled`。
- **主题切换**：初始 `data-theme-mode="system"`，点击 `#theme-toggle` 循环 `light → dark → system`，验证 `data-theme` / `data-theme-mode`、图标显隐（`.icon-sun/.icon-moon/.icon-auto`）与 localStorage（`theme-mode`）持久化。
- **返回按钮**：从 `/` 进入 `/privacy`，点击 `#back-btn` 回到 `/`（home 分支；external 分支由既有单测覆盖）。
- **HIM 彩蛋**：点击页脚 `#him` 至多 12 次触发 `popup`，断言新窗口 URL 为维基 Herobrine 页面。

### 4.2 `e2e/pages.spec.ts` — 页面渲染可见性

对 `/`、`/trust`、`/privacy`、`/tos`、`/404`（访问不存在路径）验证关键元素可见：
- 首页：`.brand-text`、`h1`（昵称）、`.tagline`、`.projects`
- 信任链：`h1`（"你真的信任我吗？"）、`.cards`、两张 `.card`
- 隐私 / 条款：`article.prose` 内容存在
- 404：`.code`（"404"）、`.home` 链接

### 4.3 `e2e/responsive.spec.ts` — 手机端响应式

在 mobile project 上验证窄屏响应式行为：
- `.brand-text` 隐藏（max-width: 640px 规则）
- 首页导航 `.links` 内文字字号收缩、间距压缩
- 返回按钮 / 返回顶部 `span` 隐藏（窄屏规则）
- 触摸设备下 hover 不粘滞（对应「sticky hover」修复）：用 `isMobile` 触摸上下文交互后断言无 hover 高亮残留。

### 4.4 `e2e/visual.spec.ts` — 视觉截图回归

- 对 `/`、`/trust`、`/privacy`、`/tos`、`/404` 使用 `toHaveScreenshot` 快照断言。
- 仅在 chromium（desktop + mobile）上跑，各一套基线；firefox/webkit 不生成快照。
- 用 `testMatch` 或 `grep`/`projects` 配置将 visual spec 限定到 chromium 两个 project。

## 5. 脚本

- `test:e2e`：`playwright test`
- `test:e2e:update`：`playwright test --update-snapshots`
- `test` 保持 `vitest run` 不变。

## 6. CI 集成

在 `.github/workflows/deploy.yml` 的 build job 中，于 `npm test` 之后新增：
1. `npx playwright install --with-deps chromium firefox webkit`
2. `npx playwright test`

视觉截图回归仅在本地运行：`visual.spec.ts` 顶部用 `test.skip(!!process.env.CI, ...)` 在 CI 环境跳过，故 CI 只执行功能测试（交互 / 页面可见性 / 响应式，3 引擎）。

## 7. 已知取舍

截图基线是平台绑定的（文件名含 `-win32` 平台后缀，且本地 Windows 与 CI Linux 字体渲染、CJK 字体差异大）。最终决策：**视觉回归仅本地**，CI 跳过视觉；功能测试在 CI 跨 3 引擎运行。本地运行 `npm run test:e2e` 时视觉回归生效。
