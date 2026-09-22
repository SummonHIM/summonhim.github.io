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
