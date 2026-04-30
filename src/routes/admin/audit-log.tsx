import { createFileRoute } from '@tanstack/react-router'
import { authors, posts } from '../../lib/content'

export const Route = createFileRoute('/admin/audit-log')({
  component: AdminAuditLogPage,
})

type AuditEntry = {
  id: string
  actor: string
  avatar: string
  action: string
  entity: string
  detail: string
  ip: string
  ts: string
}

const CATEGORY_STYLE: Record<string, { bg: string; color: string }> = {
  post: { bg: 'color-mix(in oklab, var(--primary) 15%, transparent)', color: 'var(--primary)' },
  user: { bg: 'color-mix(in oklab, var(--accent) 15%, transparent)', color: 'var(--accent)' },
  comment: { bg: 'color-mix(in oklab, var(--warn) 15%, transparent)', color: 'var(--warn)' },
  seo: { bg: 'color-mix(in oklab, var(--success) 15%, transparent)', color: 'var(--success)' },
  settings: { bg: 'color-mix(in oklab, var(--fg-muted) 15%, transparent)', color: 'var(--fg-muted)' },
}

const mockLog: AuditEntry[] = [
  {
    id: 'a1',
    actor: authors[0].name,
    avatar: authors[0].avatar,
    action: 'published',
    entity: 'post',
    detail: posts[0].title,
    ip: '203.0.113.4',
    ts: '2026-04-28 14:32',
  },
  {
    id: 'a2',
    actor: authors[1].name,
    avatar: authors[1].avatar,
    action: 'updated seo meta',
    entity: 'seo',
    detail: posts[1].title,
    ip: '203.0.113.9',
    ts: '2026-04-28 11:17',
  },
  {
    id: 'a3',
    actor: authors[0].name,
    avatar: authors[0].avatar,
    action: 'approved comment',
    entity: 'comment',
    detail: 'Comment by Alex Rivera',
    ip: '203.0.113.4',
    ts: '2026-04-27 16:05',
  },
  {
    id: 'a4',
    actor: authors[2].name,
    avatar: authors[2].avatar,
    action: 'submitted for review',
    entity: 'post',
    detail: 'UX patterns that reduce bounce rate',
    ip: '198.51.100.2',
    ts: '2026-04-27 09:44',
  },
  {
    id: 'a5',
    actor: authors[0].name,
    avatar: authors[0].avatar,
    action: 'invited user',
    entity: 'user',
    detail: 'jordan@blogsite.io',
    ip: '203.0.113.4',
    ts: '2026-04-26 17:23',
  },
  {
    id: 'a6',
    actor: authors[0].name,
    avatar: authors[0].avatar,
    action: 'updated settings',
    entity: 'settings',
    detail: 'Changed site tagline',
    ip: '203.0.113.4',
    ts: '2026-04-25 10:01',
  },
  {
    id: 'a7',
    actor: authors[1].name,
    avatar: authors[1].avatar,
    action: 'created redirect',
    entity: 'seo',
    detail: '/old-editorial-guide → /blog/editorial-operating-system',
    ip: '203.0.113.9',
    ts: '2026-04-24 14:58',
  },
  {
    id: 'a8',
    actor: authors[2].name,
    avatar: authors[2].avatar,
    action: 'created draft',
    entity: 'post',
    detail: 'The power of content calendars',
    ip: '198.51.100.2',
    ts: '2026-04-23 08:30',
  },
]

function AdminAuditLogPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge">Admin</p>
            <h1 className="display-title mt-3 text-3xl font-semibold">
              Audit Log
            </h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              Immutable record of every action taken in the admin workspace.
            </p>
          </div>
          <button type="button" className="button-secondary self-start text-xs">
            Export CSV
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {['All', 'Post', 'User', 'Comment', 'SEO', 'Settings'].map((f, i) => (
            <button
              key={f}
              type="button"
              className={i === 0 ? 'button-primary text-xs' : 'button-secondary text-xs'}
            >
              {f}
            </button>
          ))}
          <input
            type="search"
            placeholder="Filter log…"
            className="input-field ml-auto max-w-48 text-sm"
            aria-label="Filter audit log"
          />
        </div>
      </div>

      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-xs font-semibold uppercase tracking-[0.1em] text-[var(--fg-muted)]">
              <th className="px-5 py-3">Actor</th>
              <th className="px-5 py-3">Action</th>
              <th className="px-5 py-3">Entity</th>
              <th className="px-5 py-3">Detail</th>
              <th className="px-5 py-3">IP</th>
              <th className="px-5 py-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {mockLog.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-elev)]"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={entry.avatar}
                      alt={entry.actor}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span className="whitespace-nowrap font-medium">{entry.actor}</span>
                  </div>
                </td>
                <td className="px-5 py-3 font-medium">{entry.action}</td>
                <td className="px-5 py-3">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize"
                    style={{
                      background: CATEGORY_STYLE[entry.entity]?.bg,
                      color: CATEGORY_STYLE[entry.entity]?.color,
                    }}
                  >
                    {entry.entity}
                  </span>
                </td>
                <td className="max-w-xs px-5 py-3 text-[var(--fg-muted)]">
                  <span className="line-clamp-1">{entry.detail}</span>
                </td>
                <td className="px-5 py-3 font-mono text-xs text-[var(--fg-muted)]">
                  {entry.ip}
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-xs text-[var(--fg-muted)]">
                  {entry.ts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
