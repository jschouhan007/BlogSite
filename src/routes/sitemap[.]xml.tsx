import { createFileRoute } from '@tanstack/react-router'
import { posts } from '../lib/content'

const baseUrl = 'https://blogsite.local'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const urls = posts
          .map(
            (post) => `\n  <url>\n    <loc>${baseUrl}/blog/${post.slug}</loc>\n    <lastmod>${post.publishedAt}</lastmod>\n  </url>`,
          )
          .join('')
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${baseUrl}</loc>\n  </url>${urls}\n</urlset>`
        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml',
          },
        })
      },
    },
  },
})
