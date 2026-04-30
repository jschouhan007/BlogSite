import { Link, createFileRoute } from '@tanstack/react-router'
import { authors, categories, posts, tags } from '../lib/content'

export const Route = createFileRoute('/sitemap')({
  component: SitemapPage,
  head: () => ({
    meta: [{ title: 'Sitemap — BlogSite' }],
  }),
})

const pages = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Newsletter', to: '/newsletter' },
  { label: 'Search', to: '/search' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

type Section = {
  title: string
  items: React.ReactNode
}

function SitemapPage() {
  const sections: Section[] = [
    {
      title: 'Pages',
      items: (
        <ul className="m-0 space-y-2 p-0 text-sm">
          {pages.map((p) => (
            <li key={p.to} className="flex items-center gap-2">
              <span className="text-[var(--fg-muted)]">→</span>
              <Link to={p.to} className="font-medium">
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: `Articles (${posts.length})`,
      items: (
        <ul className="m-0 space-y-3 p-0 text-sm">
          {posts.map((post) => (
            <li key={post.slug} className="flex flex-col gap-0.5">
              <Link to={`/blog/${post.slug}`} className="font-semibold">
                {post.title}
              </Link>
              <span className="text-xs text-[var(--fg-muted)]">
                {formatter.format(new Date(post.publishedAt))} · {post.readingTime} ·{' '}
                {post.category.name}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: `Categories (${categories.length})`,
      items: (
        <ul className="m-0 space-y-2 p-0 text-sm">
          {categories.map((cat) => (
            <li key={cat.slug} className="flex flex-col gap-0.5">
              <Link to={`/category/${cat.slug}`} className="font-semibold">
                {cat.name}
              </Link>
              <span className="text-xs text-[var(--fg-muted)]">
                {cat.description}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: `Tags (${tags.length})`,
      items: (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag.slug} to={`/tag/${tag.slug}`} className="badge">
              {tag.name}
            </Link>
          ))}
        </div>
      ),
    },
    {
      title: `Authors (${authors.length})`,
      items: (
        <ul className="m-0 space-y-3 p-0 text-sm">
          {authors.map((author) => (
            <li key={author.slug} className="flex items-center gap-3">
              <img
                src={author.avatar}
                alt={author.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div>
                <Link
                  to={`/author/${author.slug}`}
                  className="font-semibold"
                >
                  {author.name}
                </Link>
                <p className="text-xs text-[var(--fg-muted)]">{author.role}</p>
              </div>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Feeds & Crawlers',
      items: (
        <ul className="m-0 space-y-2 p-0 text-sm">
          {[
            { label: 'RSS Feed', href: '/rss.xml' },
            { label: 'XML Sitemap', href: '/sitemap.xml' },
            { label: 'robots.txt', href: '/robots.txt' },
          ].map((f) => (
            <li key={f.href} className="flex items-center gap-2">
              <span className="text-[var(--fg-muted)]">→</span>
              <a href={f.href} className="font-medium">
                {f.label}
              </a>
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <main className="page-wrap px-4 py-12">
      <header className="card p-6">
        <p className="badge">Sitemap</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          Browse BlogSite
        </h1>
        <p className="mt-3 text-base text-[var(--fg-muted)]">
          A complete directory of every page, article, category, tag, and author
          on this site.
        </p>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <div key={section.title} className="card p-6">
            <h2 className="mb-4 text-lg font-semibold">{section.title}</h2>
            {section.items}
          </div>
        ))}
      </div>
    </main>
  )
}
