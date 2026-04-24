import { createFileRoute } from '@tanstack/react-router'
import { allTags, posts } from '../lib/posts'
import { SITE } from '../lib/site'

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const urls: Array<{ loc: string; lastmod?: string }> = [
    { loc: `${SITE.url}/`, lastmod: today },
    { loc: `${SITE.url}/tags`, lastmod: today },
  ]
  for (const p of posts) {
    urls.push({ loc: `${SITE.url}/${p.slug}`, lastmod: p.date.slice(0, 10) })
  }
  for (const { tag } of allTags()) {
    urls.push({ loc: `${SITE.url}/tags/${encodeURIComponent(tag)}`, lastmod: today })
  }
  const body = urls
    .map(
      (u) =>
        `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: {
            'content-type': 'application/xml; charset=utf-8',
            'cache-control': 'public, max-age=3600',
          },
        }),
    },
  },
})
