import { defineConfig } from 'astro/config'
import { SITE } from './src/consts'

export default defineConfig({
  site: SITE,
  output: 'static',
})
