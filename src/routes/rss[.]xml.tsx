import { createFileRoute } from '@tanstack/react-router'
import { posts } from '../lib/content'

const baseUrl = 'https://blogsite.local'

export const Route = createFileRoute('/rss.xml')({
  server: {
    handlers: {
      GET: () => {
        const items = posts
          .map(
            (post) => `\n    <item>\n      <title><![CDATA[${post.title}]]></title>\n      <link>${baseUrl}/blog/${post.slug}</link>\n      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>\n      <description><![CDATA[${post.excerpt}]]></description>\n    </item>`,
          )
          .join('')
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>BlogSite Journal</title>\n    <link>${baseUrl}</link>\n    <description>Editorial insights from BlogSite.</description>${items}\n  </channel>\n</rss>`
        return new Response(xml, {
          headers: {
            'Content-Type': 'application/rss+xml',
          },
        })
      },
    },
  },
})
