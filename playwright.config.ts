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
    command: process.env.CI
      ? 'npm run preview -- --port 4321'
      : 'npm run build && npm run preview -- --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
