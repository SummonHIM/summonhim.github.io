import type { APIRoute } from 'astro'
import { SITE } from '../consts'

const pages = import.meta.glob('./**/*.astro')

function toUrl(path: string): string {
  let route = path.replace('./', '/').replace(/\.astro$/, '')
  if (route.endsWith('/index')) {
    route = route.slice(0, -'/index'.length) || '/'
  }
  if (route !== '/' && !route.endsWith('/')) {
    route += '/'
  }
  return new URL(route, SITE).href
}

export const GET: APIRoute = () => {
  const urls = Object.keys(pages).map(toUrl).sort()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map((url) => `<url><loc>${url}</loc></url>`)
    .join('')}</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
