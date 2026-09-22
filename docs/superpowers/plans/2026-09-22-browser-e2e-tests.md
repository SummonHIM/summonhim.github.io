# 浏览器显示测试（E2E + 视觉回归）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 SummonHIM 静态站点添加 Playwright 浏览器测试：交互行为、页面渲染可见性、手机端响应式，以及桌面/手机两套视觉截图回归，并接入 CI。

**Architecture:** 用 `@playwright/test` 在根目录 `e2e/` 下新建 4 个 spec 文件，配一个 `playwright.config.ts`（6 个 project = 3 引擎 × 桌面/手机）。功能测试跨 chromium/firefox/webkit 全跑，视觉快照只在 chromium 上断言（`test.skip`）。`webServer` 用 `npm run build && npm run preview` 测生产构建。

**Tech Stack:** Playwright（`@playwright/test`）、Astro（build + preview）、GitHub Actions。

## Global Constraints

- 依赖：`@playwright/test` 作为 devDependency；不新增运行时依赖。
- 现有 `npm test`（vitest）保持 `vitest run` 不变；新脚本用 `test:e2e` / `test:e2e:update`。
- 端口固定 `4321`；`baseURL` = `http://localhost:4321`。
- 视觉快照基线（`e2e/visual.spec.ts-snapshots/`）必须提交到 git；`test-results/` 与 `playwright-report/` 必须忽略。
- 代码风格：单引号、无分号、trailingComma `all`（与 `.prettierrc.json` 一致）。
- commit 风格：`chore:`（配置/脚本）、`test:`（测试文件）、`ci:`（workflow）。
- `e2e/` 不加入 `tsconfig.json` 的 `include`（避免 `astro check` 依赖 `@playwright/test` 类型）。

---

### Task 1: 安装 Playwright 并建立配置骨架

**Files:**
- Modify: `package.json`（devDependency + scripts）
- Modify: `.gitignore`
- Create: `playwright.config.ts`

**Interfaces:**
- Consumes: 无。
- Produces: `playwright.config.ts` 定义 6 个 project（`chromium-desktop`、`chromium-mobile`、`firefox-desktop`、`firefox-mobile`、`webkit-desktop`、`webkit-mobile`）与 `webServer`；`package.json` 暴露 `npm run test:e2e` / `npm run test:e2e:update`。

- [ ] **Step 1: 安装 @playwright/test**

Run: `npm install --save-dev @playwright/test`
Expected: 成功，`package.json` devDependencies 出现 `@playwright/test`。

- [ ] **Step 2: 安装浏览器（本地运行用）**

Run: `npx playwright install chromium firefox webkit`
Expected: 三个浏览器下载完成，无报错。

- [ ] **Step 3: 创建 playwright.config.ts**

```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'chromium-mobile', use: { ...devices['Pixel 5'] } },
    { name: 'firefox-desktop', use: { ...devices['Desktop Firefox'] } },
    {
      name: 'firefox-mobile',
      use: { ...devices['Pixel 5'], defaultBrowserType: 'firefox' },
    },
    { name: 'webkit-desktop', use: { ...devices['Desktop Safari'] } },
    {
      name: 'webkit-mobile',
      use: { ...devices['Pixel 5'], defaultBrowserType: 'webkit' },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
```

- [ ] **Step 4: 更新 .gitignore**

```gitignore
node_modules
dist
.astro
test-results
playwright-report
```

- [ ] **Step 5: 更新 package.json scripts**

在 `"scripts"` 内、`"format:check"` 之后新增：

```json
    "test:e2e": "playwright test",
    "test:e2e:update": "playwright test --update-snapshots"
```

注意：`"test:watch"` 行尾保留逗号，新增两行之间/末尾逗号与现有 JSON 一致。

- [ ] **Step 6: 验证配置可加载**

Run: `npx playwright test --list`
Expected: 退出码 0，输出 `0 tests`（暂无测试文件，但配置无误）。

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json .gitignore playwright.config.ts
git commit -m "chore: 引入 Playwright 并建立 E2E 配置骨架"
```

---

### Task 2: 交互行为测试（interactions.spec.ts）

**Files:**
- Create: `e2e/interactions.spec.ts`

**Interfaces:**
- Consumes: Task 1 的 `webServer`（baseURL、6 project）。页面元素依赖既有实现：`.nav` / `#theme-toggle` / `#back-btn` / `#him` / `.icon-sun` / `.icon-moon` / `.icon-auto`。
- Produces: 无（其他 task 不依赖本文件）。

- [ ] **Step 1: 编写测试文件**

```ts
import { expect, test } from '@playwright/test'

test('导航栏滚动后出现边框', async ({ page }) => {
  await page.goto('/')
  const nav = page.locator('.nav')
  await expect(nav).not.toHaveClass(/scrolled/)

  await page.evaluate(() => window.scrollTo(0, 200))
  await expect(nav).toHaveClass(/scrolled/)
})

test('主题切换循环 light -> dark -> system 并持久化', async ({ page }) => {
  await page.goto('/')
  const root = page.locator('html')

  await expect(root).toHaveAttribute('data-theme-mode', 'system')

  await page.locator('#theme-toggle').click()
  await expect(root).toHaveAttribute('data-theme-mode', 'light')
  await expect(root).toHaveAttribute('data-theme', 'light')
  await expect(page.locator('.icon-sun')).toBeVisible()

  await page.locator('#theme-toggle').click()
  await expect(root).toHaveAttribute('data-theme-mode', 'dark')
  await expect(root).toHaveAttribute('data-theme', 'dark')
  await expect(page.locator('.icon-moon')).toBeVisible()

  await page.locator('#theme-toggle').click()
  await expect(root).toHaveAttribute('data-theme-mode', 'system')
  await expect(page.locator('.icon-auto')).toBeVisible()

  const stored = await page.evaluate(() => localStorage.getItem('theme-mode'))
  expect(stored).toBe('system')
})

test('返回按钮从法律页回到首页', async ({ page }) => {
  await page.goto('/')
  await page.locator('.footer .legal a[href="/privacy"]').click()
  await expect(page).toHaveURL(/\/privacy/)

  await page.locator('#back-btn').click()
  await expect(page).toHaveURL(/\/$/)
})

test('点击 HIM 彩蛋打开 Herobrine 维基', async ({ page }) => {
  await page.goto('/')
  const him = page.locator('#him')
  const popupPromise = page.waitForEvent('popup')

  for (let i = 0; i < 12; i += 1) {
    await him.click()
  }

  const popup = await popupPromise
  expect(popup.url()).toContain('zh.wikipedia.org/wiki/Herobrine')
})
```

- [ ] **Step 2: 运行并确认通过**

Run: `npx playwright test e2e/interactions.spec.ts`
Expected: 6 个 project × 4 个测试全部通过（24 passed），无失败。若某个引擎失败，按 systematic-debugging 排查该引擎特有 API。

- [ ] **Step 3: Commit**

```bash
git add e2e/interactions.spec.ts
git commit -m "test: 添加交互行为 E2E 测试"
```

---

### Task 3: 页面渲染可见性测试（pages.spec.ts）

**Files:**
- Create: `e2e/pages.spec.ts`

**Interfaces:**
- Consumes: Task 1 配置。页面元素依赖既有实现：`.hero h1` / `.hero .tagline` / `#about` / `#projects` / `#him` / `.cards` / `.card` / `article.prose` / `.code` / `.home`。
- Produces: 无。

- [ ] **Step 1: 编写测试文件**

```ts
import { expect, test } from '@playwright/test'

test('首页渲染关键区块', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.hero h1')).toHaveText('SummonHIM')
  await expect(page.locator('.hero .tagline')).toBeVisible()
  await expect(page.locator('#about')).toBeVisible()
  await expect(page.locator('#projects')).toBeVisible()
  await expect(page.locator('#him')).toBeVisible()
})

test('信任链页渲染信任卡片', async ({ page }) => {
  await page.goto('/trust')
  await expect(page.locator('h1')).toHaveText('你真的信任我吗？')
  await expect(page.locator('.cards')).toBeVisible()
  await expect(page.locator('.card')).toHaveCount(2)
})

test('隐私政策页渲染正文', async ({ page }) => {
  await page.goto('/privacy')
  await expect(page.locator('article.prose')).toBeVisible()
  await expect(page.locator('#back-btn')).toBeVisible()
})

test('服务条款页渲染正文', async ({ page }) => {
  await page.goto('/tos')
  await expect(page.locator('article.prose')).toBeVisible()
})

test('未知路由渲染 404 页', async ({ page }) => {
  await page.goto('/does-not-exist')
  await expect(page.locator('.code')).toHaveText('404')
  await expect(page.locator('.home')).toBeVisible()
})
```

- [ ] **Step 2: 运行并确认通过**

Run: `npx playwright test e2e/pages.spec.ts`
Expected: 6 project × 5 测试全部通过（30 passed）。

验证注意：若 `astro preview` 对未知路由不返回自定义 404 页（`.code` 文本不是 `404`），则改用断言 `page.goto('/does-not-exist')` 返回的 `response` 状态码为 404，并单独用已知可达路径验证 `.home` 链接。实现时先跑一遍确认。

- [ ] **Step 3: Commit**

```bash
git add e2e/pages.spec.ts
git commit -m "test: 添加页面渲染可见性 E2E 测试"
```

---

### Task 4: 手机端响应式测试（responsive.spec.ts）

**Files:**
- Create: `e2e/responsive.spec.ts`

**Interfaces:**
- Consumes: Task 1 的 mobile project（`isMobile: true`、`hasTouch: true`）。CSS 依赖：`@media (max-width: 640px)` 下 `.brand-text` 与 `.to-top span` 为 `display: none`；`@media (hover: none)` 下 hover 不粘滞。
- Produces: 无。

- [ ] **Step 1: 编写测试文件**

```ts
import { expect, test } from '@playwright/test'

test.skip(
  ({ testInfo }) => !testInfo.project.name.includes('mobile'),
  '响应式行为只在手机端 project 验证',
)

test('窄屏隐藏品牌文字', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.brand-text')).toBeHidden()
})

test('窄屏返回顶部按钮只显示图标', async ({ page }) => {
  await page.goto('/privacy')
  await expect(page.locator('.to-top span')).toBeHidden()
  await expect(page.locator('.back span')).toBeVisible()
})

test('触摸点击不残留 hover 高亮', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', '触摸 hover 模拟仅在 chromium 可靠')

  await page.goto('/')
  const link = page.locator('.links a').first()
  await link.tap()

  const linkColor = await link.evaluate((el) => getComputedStyle(el).color)
  const mutedColor = await page
    .locator('.footer .legal a')
    .first()
    .evaluate((el) => getComputedStyle(el).color)
  expect(linkColor).toBe(mutedColor)
})
```

- [ ] **Step 2: 运行并确认通过**

Run: `npx playwright test e2e/responsive.spec.ts`
Expected: 前两个测试在 3 个 mobile project 各通过；第三个测试仅在 `chromium-mobile` 通过，其余 project 显示 skipped。

- [ ] **Step 3: Commit**

```bash
git add e2e/responsive.spec.ts
git commit -m "test: 添加手机端响应式 E2E 测试"
```

---

### Task 5: 视觉截图回归（visual.spec.ts + 基线）

**Files:**
- Create: `e2e/visual.spec.ts`
- Create: `e2e/visual.spec.ts-snapshots/*.png`（基线，由命令生成）

**Interfaces:**
- Consumes: Task 1 配置。快照仅 chromium（desktop + mobile）。
- Produces: 提交到 git 的快照基线目录 `e2e/visual.spec.ts-snapshots/`。

- [ ] **Step 1: 编写测试文件**

```ts
import { expect, test } from '@playwright/test'

test.skip(
  ({ browserName }) => browserName !== 'chromium',
  '视觉快照只在 chromium 上断言',
)

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/trust', name: 'trust' },
  { path: '/privacy', name: 'privacy' },
  { path: '/tos', name: 'tos' },
  { path: '/does-not-exist', name: '404' },
]

for (const { path, name } of PAGES) {
  test(`${name} 页面快照`, async ({ page }, testInfo) => {
    await page.goto(path)
    await expect(page).toHaveScreenshot(`${name}-${testInfo.project.name}.png`, {
      fullPage: true,
      animations: 'disabled',
    })
  })
}
```

- [ ] **Step 2: 生成基线快照**

Run: `npx playwright test e2e/visual.spec.ts --update-snapshots`
Expected: chromium-desktop 与 chromium-mobile 各生成 5 张 png（`home`/`trust`/`privacy`/`tos`/`404`，文件名含 project 名），存放在 `e2e/visual.spec.ts-snapshots/`。

- [ ] **Step 3: 人工审阅基线**

查看生成的 png，确认桌面/手机两套截图视觉正常（无白屏、无错位、无意外主题）。若不满意，先修样式再重跑 Step 2。

- [ ] **Step 4: 运行并确认通过（不带 update 标志）**

Run: `npx playwright test e2e/visual.spec.ts`
Expected: chromium 两 project 共 10 个测试通过；firefox/webkit 显示 skipped。

- [ ] **Step 5: Commit（含基线）**

```bash
git add e2e/visual.spec.ts e2e/visual.spec.ts-snapshots/
git commit -m "test: 添加桌面与手机视觉截图回归基线"
```

---

### Task 6: CI 集成

**Files:**
- Modify: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: Task 1–5 的测试与配置。
- Produces: 每次 push 到 main 时在 build job 中运行 E2E。

- [ ] **Step 1: 在 build job 的 `Run tests` 之后插入两步**

```yaml
      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium firefox webkit

      - name: Run E2E tests
        run: npx playwright test
```

插入位置：`.github/workflows/deploy.yml` 中 `- name: Run tests` / `run: npm test` 之后、`- name: Build` 之前。

- [ ] **Step 2: 本地校验 workflow 语法（可选）**

若已安装 `actionlint`：Run `actionlint .github/workflows/deploy.yml`；否则跳过。Expected: 无错误。

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: 在 deploy 流程中运行 Playwright E2E"
```

---

## Self-Review 记录

- **Spec 覆盖**：交互（§4.1→Task 2）、页面可见性（§4.2→Task 3）、响应式（§4.3→Task 4）、视觉回归（§4.4→Task 5）、脚本（§5→Task 1 Step 5）、CI（§6→Task 6）、三引擎矩阵（§3→Task 1 config）。
- **占位符扫描**：无 TBD/TODO；所有步骤含完整代码与命令。
- **类型一致性**：project 名 `chromium-desktop`/`chromium-mobile`/`firefox-desktop`/`firefox-mobile`/`webkit-desktop`/`webkit-mobile` 在 config（Task 1）、visual 快照命名（Task 5）、responsive skip 判断（Task 4）中保持一致；baseURL/端口 `4321` 一致。
- **已知风险**：`astro preview` 对未知路由的 404 行为在 Task 3 有明确回退指令；触摸 hover 模拟仅 chromium 可靠（Task 4 已跳过其余引擎）；CI 与本地字体渲染差异可能导致快照不一致，首次在 CI 报错时用 `npx playwright test --update-snapshots` 重跑固定基线。
