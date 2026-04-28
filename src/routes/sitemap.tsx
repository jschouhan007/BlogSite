import { Link, createFileRoute } from '@tanstack/react-router'
import { posts } from '../lib/content'

export const Route = createFileRoute('/sitemap')({
  component: SitemapPage,
  head: () => ({
    meta: [{ title: 'Sitemap — BlogSite' }],
  }),
})

function SitemapPage() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="card p-6">
        <p className="badge">Sitemap</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          Browse BlogSite
        </h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="card p-4">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
