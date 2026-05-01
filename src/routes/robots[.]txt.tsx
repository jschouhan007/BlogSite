import { createFileRoute } from '@tanstack/react-router'

const baseUrl = 'https://blogsite.local'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => {
        const body = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /search\n\nSitemap: ${baseUrl}/sitemap.xml\n`
        return new Response(body, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
          },
        })
      },
    },
  },
})
