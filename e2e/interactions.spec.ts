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

test('联系方式悬停显示在线频率，微信弹出微信号', async ({ page }, testInfo) => {
  await page.goto('/')
  const social = page.locator('.social')

  const labels = (await social.locator('.social-label').allTextContents()).map(
    (s) => s.trim(),
  )
  expect(labels).toEqual([
    '邮箱',
    'QQ',
    'Steam',
    '微信',
    'Telegram',
    'BiliBili',
    'GitHub',
    'Bluesky',
    'Matrix',
  ])

  const firstWrap = social.locator('.social-wrap').first()
  const first = firstWrap.locator('.social-item')
  await expect(first).toHaveAccessibleName('邮箱')

  if (testInfo.project.name.includes('mobile')) {
    // 触屏没有 hover，提示层隐藏，改为胶囊内常驻信号条
    await expect(firstWrap.locator('.tip')).toBeHidden()
    await expect(firstWrap.locator('.mini')).toBeVisible()
  } else {
    await first.hover()
    await expect(firstWrap.locator('.tip')).toBeVisible()
    await expect(firstWrap.locator('.tip')).toHaveText('经常在线')
  }

  await social.getByRole('button', { name: '微信' }).click()
  const dialog = page.locator('#wechat-dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText('微信号：SummonHIM')

  await dialog.getByRole('button', { name: '关闭' }).click()
  await expect(dialog).toBeHidden()

  await social.getByRole('button', { name: 'QQ' }).click()
  const qqDialog = page.locator('#qq-dialog')
  await expect(qqDialog).toBeVisible()
  await expect(qqDialog).toContainText('QQ号：')
  await expect(qqDialog).toContainText('QID：')
  const qqNumberLink = qqDialog.getByRole('link', { name: '2239760702' })
  const qqIdLink = qqDialog.getByRole('link', { name: 'SummonHIM' })
  await expect(qqNumberLink).toBeVisible()
  await expect(qqIdLink).toBeVisible()
  await expect(qqNumberLink).toHaveAttribute(
    'href',
    'https://qm.qq.com/q/lYZ8auKT72',
  )
  await expect(qqIdLink).toHaveAttribute(
    'href',
    'https://qm.qq.com/q/lYZ8auKT72',
  )

  await qqDialog.getByRole('button', { name: '关闭' }).click()
  await expect(qqDialog).toBeHidden()
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
