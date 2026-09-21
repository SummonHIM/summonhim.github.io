import type { APIRoute } from 'astro'
import { SITE } from '../consts'

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`

export const GET: APIRoute = () => {
  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
