import { Link, createFileRoute } from '@tanstack/react-router'
import { posts, authors } from '../../lib/content'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

const kpis = [
  { label: 'Published', value: '128', note: '+4 this week' },
  { label: 'In Review', value: '14', note: '3 awaiting SEO sign-off' },
  { label: 'Scheduled', value: '9', note: 'Next: May 6' },
  { label: 'Drafts', value: '22', note: '5 stale (>30 days)' },
  { label: 'Comments', value: '5', note: '2 pending moderation' },
  { label: 'SEO issues', value: '5', note: '1 critical' },
]

const recentActivity = [
  { actor: authors[0].name, avatar: authors[0].avatar, action: 'published', target: posts[0].title, ts: '14 min ago' },
  { actor: authors[1].name, avatar: authors[1].avatar, action: 'updated SEO meta on', target: posts[1].title, ts: '1 hr ago' },
  { actor: authors[2].name, avatar: authors[2].avatar, action: 'submitted for review', target: 'UX patterns that reduce bounce rate', ts: '3 hrs ago' },
  { actor: authors[0].name, avatar: authors[0].avatar, action: 'approved comment on', target: posts[0].title, ts: '5 hrs ago' },
]

const topPosts = posts.map((p, i) => ({
  ...p,
  views: [12480, 9340, 7210, 5880][i],
}))

const vitals = [
  { label: 'LCP', value: '1.8s', good: true, target: '<2.5s' },
  { label: 'CLS', value: '0.05', good: true, target: '<0.1' },
  { label: 'INP', value: '180ms', good: true, target: '<200ms' },
  { label: 'TTFB', value: '320ms', good: true, target: '<800ms' },
]

function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6">
        <p className="badge">Dashboard</p>
        <h1 className="display-title mt-4 text-3xl font-semibold">
          Editorial command centre
        </h1>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          An overview of content health, workflow, and site performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {kpis.map(({ label, value, note }) => (
          <div key={label} className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fg-muted)]">
              {label}
            </p>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
            <p className="mt-1 text-xs text-[var(--fg-muted)]">{note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-semibold">Top posts — last 30 days</h2>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">By pageviews.</p>
          <ol className="mt-4 space-y-4">
            {topPosts.map((post, i) => (
              <li key={post.slug} className="flex items-start gap-3">
                <span className="text-xl font-semibold text-[var(--primary)]">
                  0{i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="line-clamp-1 font-semibold"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-[var(--fg-muted)]">
                    {post.views.toLocaleString()} views · {post.category.name}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-4 border-t border-[var(--border)] pt-4">
            <Link to="/admin/analytics" className="text-sm font-semibold text-[var(--primary)]">
              Full analytics →
            </Link>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold">Recent activity</h2>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">Latest admin actions across the team.</p>
          <ul className="mt-4 space-y-4">
            {recentActivity.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <img
                  src={item.avatar}
                  alt={item.actor}
                  className="mt-0.5 h-7 w-7 flex-shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold">{item.actor}</span>{' '}
                    {item.action}{' '}
                    <span className="font-medium italic">"{item.target}"</span>
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--fg-muted)]">{item.ts}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-[var(--border)] pt-4">
            <Link to="/admin/audit-log" className="text-sm font-semibold text-[var(--primary)]">
              Full audit log →
            </Link>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold">Core Web Vitals</h2>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          Field data from RUM — mobile p75, last 28 days.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-4">
          {vitals.map((v) => (
            <div key={v.label} className="rounded-xl border border-[var(--border)] p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--fg-muted)]">
                {v.label}
              </p>
              <p
                className="mt-2 text-2xl font-semibold"
                style={{ color: v.good ? 'var(--success)' : 'var(--danger)' }}
              >
                {v.value}
              </p>
              <p className="mt-1 text-xs text-[var(--fg-muted)]">target {v.target}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-base font-semibold">Quick actions</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link to="/admin/posts" className="button-primary text-xs">
              + New post
            </Link>
            <Link to="/admin/media" className="button-secondary text-xs">
              Upload media
            </Link>
            <Link to="/admin/comments" className="button-secondary text-xs">
              Moderate comments
            </Link>
            <Link to="/admin/seo" className="button-secondary text-xs">
              Review SEO issues
            </Link>
          </div>
        </div>
        <div className="card p-5">
          <h2 className="text-base font-semibold">Newsletter</h2>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            <span className="font-semibold text-[var(--fg)]">1,204</span> active subscribers
            · <span className="font-semibold text-[var(--success)]">+67</span> this month
          </p>
          <p className="mt-2 text-sm text-[var(--fg-muted)]">
            Last campaign: <span className="font-semibold text-[var(--fg)]">Apr 21</span> ·
            {' '}42% open rate
          </p>
          <div className="mt-3">
            <Link to="/newsletter" className="text-sm font-semibold text-[var(--primary)]">
              Manage newsletter →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
