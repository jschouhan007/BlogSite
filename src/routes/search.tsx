import { createFileRoute } from '@tanstack/react-router'
import { posts } from '../lib/content'

export const Route = createFileRoute('/search')({
  component: SearchPage,
  head: () => ({
    meta: [
      { title: 'Search — BlogSite' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
})

function SearchPage() {
  return (
    <main className="page-wrap px-4 py-12">
      <header className="card p-6">
        <p className="badge">Search</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          Search the BlogSite archive
        </h1>
        <p className="mt-3 text-base text-[var(--fg-muted)]">
          Instant search, filters, and highlights will live here once the index is
          wired.
        </p>
        <div className="mt-5">
          <input
            type="search"
            placeholder="Search stories, authors, categories"
            className="input-field"
            aria-label="Search"
          />
        </div>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="card p-6">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{post.excerpt}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
