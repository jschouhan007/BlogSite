import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { authors, categories, posts, tags } from '../lib/content'

export const Route = createFileRoute('/search')({
  component: SearchPage,
  head: () => ({
    meta: [
      { title: 'Search — BlogSite' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
})

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function highlight(text: string, query: string) {
  if (!query.trim()) return text
  const pattern = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${pattern})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        style={{
          background: 'color-mix(in oklab, var(--accent) 30%, transparent)',
          color: 'inherit',
          borderRadius: '3px',
          padding: '0 2px',
        }}
      >
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

function SearchPage() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const q = query.toLowerCase().trim()

  const filtered = posts.filter((post) => {
    const matchesQuery =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.name.toLowerCase().includes(q) ||
      post.author.name.toLowerCase().includes(q) ||
      post.tags.some((t) => t.name.toLowerCase().includes(q))

    const matchesFilter =
      activeFilter === 'All' ||
      post.category.name === activeFilter ||
      post.author.name === activeFilter ||
      post.tags.some((t) => t.name === activeFilter)

    return matchesQuery && matchesFilter
  })

  const filterOptions = [
    'All',
    ...categories.map((c) => c.name),
    ...authors.map((a) => a.name),
    ...tags.map((t) => t.name),
  ]

  return (
    <main className="page-wrap px-4 py-12">
      <header className="card p-6">
        <p className="badge">Search</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          Search the BlogSite archive
        </h1>
        <p className="mt-3 text-base text-[var(--fg-muted)]">
          Search by title, excerpt, author, category, or tag.
        </p>
        <div className="relative mt-5">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, authors, categories…"
            className="input-field pr-10"
            aria-label="Search"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--fg-muted)] hover:text-[var(--fg)]"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {filterOptions.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={
                activeFilter === f
                  ? 'button-primary text-xs'
                  : 'button-secondary text-xs'
              }
            >
              {f}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-[var(--fg-muted)]">
          {filtered.length === posts.length
            ? `${posts.length} articles`
            : `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${query || activeFilter}"`}
        </p>
      </header>

      {filtered.length > 0 ? (
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {filtered.map((post) => (
            <article key={post.slug} className="card p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--fg-muted)]">
                <span className="badge">{post.category.name}</span>
                <span>{formatter.format(new Date(post.publishedAt))}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold">
                <Link to={`/blog/${post.slug}`}>
                  {highlight(post.title, query)}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">
                {highlight(post.excerpt, query)}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-[var(--fg-muted)]">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-5 w-5 rounded-full object-cover"
                />
                <span className="font-semibold">
                  {highlight(post.author.name, query)}
                </span>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="mt-10 card p-10 text-center">
          <p className="text-4xl">🔍</p>
          <p className="mt-4 text-lg font-semibold">No results found</p>
          <p className="mt-2 text-sm text-[var(--fg-muted)]">
            Try a different keyword or clear the filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setActiveFilter('All')
            }}
            className="button-primary mt-5"
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  )
}
