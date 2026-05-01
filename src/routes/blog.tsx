import { Link, createFileRoute } from '@tanstack/react-router'
import { posts } from '../lib/content'

export const Route = createFileRoute('/blog')({
  component: BlogListing,
  head: () => ({
    meta: [{ title: 'Blog — BlogSite' }],
  }),
})

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function BlogListing() {
  return (
    <main className="page-wrap px-4 py-12">
      <header className="card p-6">
        <p className="badge">Blog</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          The BlogSite Journal
        </h1>
        <p className="mt-3 text-base text-[var(--fg-muted)]">
          Editorial insights on growth, design, SEO, and audience engagement.
        </p>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="card p-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--fg-muted)]">
              <span className="badge">{post.category.name}</span>
              <span>{formatter.format(new Date(post.publishedAt))}</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">
              {post.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-[var(--fg-muted)]">
              <span>{post.author.name}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
