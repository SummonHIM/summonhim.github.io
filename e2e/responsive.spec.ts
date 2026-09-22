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
