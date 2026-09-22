import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 1920, height: 1080 } })

test('内容不足一屏时 footer 固定高度并贴底', async ({ page }) => {
  await page.goto('/trust')

  const footer = page.locator('.footer')
  await expect(footer).toBeVisible()

  const box = await footer.boundingBox()
  expect(box).not.toBeNull()

  expect(box!.height).toBeCloseTo(96, 1)

  const innerHeight = await page.evaluate(() => window.innerHeight)
  expect(box!.y + box!.height).toBeCloseTo(innerHeight, 1)
})

test('内容超过一屏时 footer 位于文档流底部', async ({ page }) => {
  await page.goto('/privacy')

  const box = await page.locator('.footer').boundingBox()
  expect(box).not.toBeNull()

  const innerHeight = await page.evaluate(() => window.innerHeight)
  expect(box!.y + box!.height).toBeGreaterThan(innerHeight)
})
