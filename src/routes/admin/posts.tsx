import { Link, createFileRoute } from '@tanstack/react-router'
import { posts } from '../../lib/content'

export const Route = createFileRoute('/admin/posts')({
  component: AdminPostsPage,
})

const STATUS_COLORS: Record<string, string> = {
  Published: 'color-mix(in oklab, var(--success) 18%, transparent)',
  Draft: 'color-mix(in oklab, var(--fg-muted) 15%, transparent)',
  Scheduled: 'color-mix(in oklab, var(--warn) 18%, transparent)',
  'In Review': 'color-mix(in oklab, var(--accent) 18%, transparent)',
}

const STATUS_TEXT: Record<string, string> = {
  Published: 'var(--success)',
  Draft: 'var(--fg-muted)',
  Scheduled: 'var(--warn)',
  'In Review': 'var(--accent)',
}

const mockRows = [
  ...posts.map((p) => ({ ...p, status: 'Published' })),
  {
    slug: 'untitled-draft',
    title: 'Untitled: The power of content calendars',
    excerpt: 'Draft exploring structured editorial planning.',
    category: { name: 'Editorial Craft', slug: 'editorial' },
    author: { name: 'Jasmin Cho' },
    publishedAt: '—',
    readingTime: '3 min read',
    status: 'Draft',
  },
  {
    slug: 'scheduled-seo-post',
    title: 'The Next Frontier in Programmatic SEO',
    excerpt: 'Scheduled for next Monday.',
    category: { name: 'SEO Systems', slug: 'seo' },
    author: { name: 'Ravi Patel' },
    publishedAt: '2026-05-06',
    readingTime: '5 min read',
    status: 'Scheduled',
  },
  {
    slug: 'review-ux-story',
    title: 'UX patterns that reduce bounce rate',
    excerpt: 'Awaiting editorial review.',
    category: { name: 'Product & Design', slug: 'product' },
    author: { name: 'Mira Das' },
    publishedAt: '—',
    readingTime: '4 min read',
    status: 'In Review',
  },
]

const statuses = ['All', 'Published', 'Draft', 'In Review', 'Scheduled']

function AdminPostsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge">Admin</p>
            <h1 className="display-title mt-3 text-3xl font-semibold">Posts</h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              {mockRows.length} total posts across all statuses.
            </p>
          </div>
          <Link to="/admin/posts/new" className="button-primary self-start">
            + New post
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              className={s === 'All' ? 'button-primary text-xs' : 'button-secondary text-xs'}
            >
              {s}
            </button>
          ))}
          <input
            type="search"
            placeholder="Search posts…"
            className="input-field ml-auto max-w-48 text-sm"
            aria-label="Search posts"
          />
        </div>
      </div>

      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-xs font-semibold uppercase tracking-[0.1em] text-[var(--fg-muted)]">
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Author</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Read</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockRows.map((row) => (
              <tr
                key={row.slug}
                className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-elev)]"
              >
                <td className="px-5 py-3">
                  <Link
                    to={row.status === 'Published' ? `/blog/${row.slug}` : '/blog'}
                    className="font-semibold"
                  >
                    {row.title}
                  </Link>
                  <p className="mt-0.5 line-clamp-1 text-xs text-[var(--fg-muted)]">
                    {row.excerpt}
                  </p>
                </td>
                <td className="px-5 py-3 text-[var(--fg-muted)]">
                  {row.category.name}
                </td>
                <td className="px-5 py-3 text-[var(--fg-muted)]">
                  {row.author.name}
                </td>
                <td className="px-5 py-3">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{
                      background: STATUS_COLORS[row.status],
                      color: STATUS_TEXT[row.status],
                    }}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-[var(--fg-muted)]">
                  {row.publishedAt}
                </td>
                <td className="px-5 py-3 text-[var(--fg-muted)]">
                  {row.readingTime}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/posts/${row.slug}`}
                      className="button-secondary text-xs"
                    >
                      Edit
                    </Link>
                    {row.status === 'Published' && (
                      <Link
                        to={`/blog/${row.slug}`}
                        className="text-xs text-[var(--fg-muted)] hover:text-[var(--primary)]"
                      >
                        View ↗
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
