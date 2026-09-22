import { expect, test } from '@playwright/test'

test.beforeEach(async ({}, testInfo) => {
  test.skip(
    !testInfo.project.name.includes('mobile'),
    '响应式行为只在手机端 project 验证',
  )
})

test('窄屏隐藏品牌文字', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.brand-text')).toBeHidden()
})

test('窄屏返回顶部按钮只显示图标', async ({ page }) => {
  await page.goto('/privacy')
  await expect(page.locator('.to-top span')).toBeHidden()
  await expect(page.locator('.back span')).toBeVisible()
})

test('信任链卡片在窄屏换行且无横向溢出', async ({ page }) => {
  await page.goto('/trust')

  const cards = page.locator('.card')
  await expect(cards).toHaveCount(2)

  const [first, second] = await cards.evaluateAll((els) =>
    els.map((el) => {
      const r = el.getBoundingClientRect()
      return { x: r.x, y: r.y }
    }),
  )
  expect(second.y).toBeGreaterThan(first.y)

  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(0)
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
