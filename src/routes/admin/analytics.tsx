import { Link, createFileRoute } from '@tanstack/react-router'
import { posts, authors } from '../../lib/content'

export const Route = createFileRoute('/admin/analytics')({
  component: AdminAnalyticsPage,
})

const kpis = [
  { label: 'Total pageviews', value: '84,210', delta: '+12%', up: true, note: 'Last 30 days' },
  { label: 'Unique sessions', value: '31,540', delta: '+8%', up: true, note: 'Last 30 days' },
  { label: 'Avg read %', value: '62%', delta: '+4pp', up: true, note: 'Time-on-page vs. read time' },
  { label: 'Bounce rate', value: '38%', delta: '-3pp', up: true, note: 'Lower is better' },
  { label: 'Organic traffic', value: '19,870', delta: '+21%', up: true, note: 'Search-referred sessions' },
  { label: 'Newsletter subs', value: '1,204', delta: '+67', up: true, note: 'Net new this month' },
]

const topPosts = posts.map((p, i) => ({
  ...p,
  views: [12480, 9340, 7210, 5880][i],
  readPct: [71, 65, 58, 80][i],
}))

const topAuthors = authors.map((a, i) => ({
  ...a,
  posts: [2, 2, 1][i],
  views: [22080, 15220, 7210][i],
}))

const trafficSources = [
  { source: 'Organic search', pct: 47, sessions: 14824 },
  { source: 'Direct', pct: 22, sessions: 6939 },
  { source: 'Social', pct: 16, sessions: 5046 },
  { source: 'Referral', pct: 10, sessions: 3154 },
  { source: 'Email', pct: 5, sessions: 1577 },
]

function Bar({ pct }: { pct: number }) {
  return (
    <div className="mt-1 h-1.5 w-full rounded-full bg-[var(--border)]">
      <div
        className="h-1.5 rounded-full"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, var(--primary), var(--accent))',
        }}
      />
    </div>
  )
}

function AdminAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge">Admin</p>
            <h1 className="display-title mt-3 text-3xl font-semibold">
              Analytics
            </h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              Traffic, engagement, and content performance — last 30 days.
            </p>
          </div>
          <div className="flex gap-2 self-start">
            {['7d', '30d', '90d'].map((r, i) => (
              <button
                key={r}
                type="button"
                className={i === 1 ? 'button-primary text-xs' : 'button-secondary text-xs'}
              >
                {r}
              </button>
            ))}
            <button type="button" className="button-secondary text-xs">
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {kpis.map((k) => (
          <div key={k.label} className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--fg-muted)]">
              {k.label}
            </p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-2xl font-semibold">{k.value}</span>
              <span
                className="mb-0.5 text-xs font-semibold"
                style={{ color: k.up ? 'var(--success)' : 'var(--danger)' }}
              >
                {k.delta}
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--fg-muted)]">{k.note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-semibold">Top posts</h2>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">By pageviews, last 30 days.</p>
          <div className="mt-4 flex flex-col gap-4">
            {topPosts.map((post) => (
              <div key={post.slug} className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="line-clamp-1 text-sm font-semibold"
                  >
                    {post.title}
                  </Link>
                  <div className="mt-1 flex items-center gap-3 text-xs text-[var(--fg-muted)]">
                    <span>{post.views.toLocaleString()} views</span>
                    <span>·</span>
                    <span>{post.readPct}% read</span>
                  </div>
                  <Bar pct={(post.views / topPosts[0].views) * 100} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold">Traffic sources</h2>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">Session share by acquisition channel.</p>
          <div className="mt-4 flex flex-col gap-4">
            {trafficSources.map((ts) => (
              <div key={ts.source}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{ts.source}</span>
                  <span className="font-semibold">{ts.pct}%</span>
                </div>
                <Bar pct={ts.pct} />
                <p className="mt-0.5 text-xs text-[var(--fg-muted)]">
                  {ts.sessions.toLocaleString()} sessions
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold">Top authors</h2>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">By total views on published posts, last 30 days.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {topAuthors.map((author) => (
            <div key={author.slug} className="flex items-center gap-3">
              <img
                src={author.avatar}
                alt={author.name}
                className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <Link
                  to={`/author/${author.slug}`}
                  className="truncate font-semibold"
                >
                  {author.name}
                </Link>
                <p className="mt-0.5 text-xs text-[var(--fg-muted)]">
                  {author.posts} posts · {author.views.toLocaleString()} views
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
