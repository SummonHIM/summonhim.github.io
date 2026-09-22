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
