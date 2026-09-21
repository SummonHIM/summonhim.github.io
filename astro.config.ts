import { defineConfig } from 'astro/config'
import compress from 'astro-compress'
import { SITE } from './src/consts'

export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [
    compress({
      Logger: 1,
    }),
  ],
})
