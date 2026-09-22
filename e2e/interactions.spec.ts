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

  await page.evaluate(() => {
    const win = window as typeof window & { __himOpenedUrl?: string }
    win.open = (url) => {
      win.__himOpenedUrl = String(url)
      return null
    }
  })

  for (let i = 0; i < 12; i += 1) {
    await him.click()
  }

  const openedUrl = await page.evaluate(
    () =>
      (window as typeof window & { __himOpenedUrl?: string }).__himOpenedUrl,
  )
  expect(openedUrl).toContain('zh.wikipedia.org/wiki/Herobrine')
})
