import { Link, createFileRoute } from '@tanstack/react-router'
import { posts } from '../../lib/content'

export const Route = createFileRoute('/admin/seo')({
  component: AdminSeoPage,
})

const SEV_STYLE: Record<string, { bg: string; color: string }> = {
  Critical: {
    bg: 'color-mix(in oklab, var(--danger) 15%, transparent)',
    color: 'var(--danger)',
  },
  Warning: {
    bg: 'color-mix(in oklab, var(--warn) 18%, transparent)',
    color: 'var(--warn)',
  },
  Info: {
    bg: 'color-mix(in oklab, var(--accent) 18%, transparent)',
    color: 'var(--accent)',
  },
}

const mockIssues = [
  {
    id: 'i1',
    severity: 'Critical',
    post: posts[1].title,
    slug: posts[1].slug,
    issue: 'Meta description missing',
  },
  {
    id: 'i2',
    severity: 'Warning',
    post: posts[2].title,
    slug: posts[2].slug,
    issue: 'Focus keyword absent from H1',
  },
  {
    id: 'i3',
    severity: 'Warning',
    post: posts[0].title,
    slug: posts[0].slug,
    issue: 'Fewer than 2 internal links',
  },
  {
    id: 'i4',
    severity: 'Info',
    post: posts[3].title,
    slug: posts[3].slug,
    issue: 'No OG image set — auto-generated fallback in use',
  },
  {
    id: 'i5',
    severity: 'Info',
    post: posts[2].title,
    slug: posts[2].slug,
    issue: 'Reading score below 60 (Flesch)',
  },
]

const mockGlobal = [
  { label: 'Indexable posts', value: '4', note: '0 noindex' },
  { label: 'Valid schema', value: '4 / 4', note: 'Article JSON-LD' },
  { label: 'Canonical set', value: '4 / 4', note: 'Self-canonical' },
  { label: 'Open Graph images', value: '3 / 4', note: '1 using fallback' },
  { label: 'Sitemap entries', value: '14', note: 'Last generated Apr 28' },
  { label: 'SEO issues', value: String(mockIssues.length), note: '1 critical' },
]

function AdminSeoPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6">
        <p className="badge">Admin</p>
        <h1 className="display-title mt-3 text-3xl font-semibold">
          SEO Overview
        </h1>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          Global SEO health, on-page issues, and indexability status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {mockGlobal.map((item) => (
          <div key={item.label} className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--fg-muted)]">
              {item.label}
            </p>
            <p className="mt-2 text-2xl font-semibold">{item.value}</p>
            <p className="mt-1 text-xs text-[var(--fg-muted)]">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold">On-page Issues</h2>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          {mockIssues.length} issues detected across published posts.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          {mockIssues.map((issue) => (
            <div
              key={issue.id}
              className="flex flex-col gap-2 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <span
                  className="mt-0.5 flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{
                    background: SEV_STYLE[issue.severity].bg,
                    color: SEV_STYLE[issue.severity].color,
                  }}
                >
                  {issue.severity}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{issue.post}</p>
                  <p className="mt-0.5 text-xs text-[var(--fg-muted)]">
                    {issue.issue}
                  </p>
                </div>
              </div>
              <Link
                to={`/blog/${issue.slug}`}
                className="flex-shrink-0 text-xs font-semibold text-[var(--primary)]"
              >
                Fix →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
