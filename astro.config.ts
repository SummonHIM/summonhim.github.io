import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { SITE } from './src/consts'

export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [sitemap()],
})
