import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/redirects')({
  component: AdminRedirectsPage,
})

const mockRedirects = [
  {
    id: 'r1',
    source: '/old-editorial-guide',
    destination: '/blog/editorial-operating-system',
    code: 301,
    hits: 412,
    lastHit: '2026-04-28',
    active: true,
  },
  {
    id: 'r2',
    source: '/seo-basics',
    destination: '/blog/seo-scorecards-that-ship',
    code: 301,
    hits: 278,
    lastHit: '2026-04-26',
    active: true,
  },
  {
    id: 'r3',
    source: '/design',
    destination: '/category/product',
    code: 301,
    hits: 95,
    lastHit: '2026-04-20',
    active: true,
  },
  {
    id: 'r4',
    source: '/old-about',
    destination: '/about',
    code: 302,
    hits: 18,
    lastHit: '2026-03-15',
    active: false,
  },
  {
    id: 'r5',
    source: '/data-insights',
    destination: '/category/analytics',
    code: 301,
    hits: 0,
    lastHit: '—',
    active: true,
  },
]

function AdminRedirectsPage() {
  const active = mockRedirects.filter((r) => r.active).length

  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge">Admin</p>
            <h1 className="display-title mt-3 text-3xl font-semibold">
              Redirects
            </h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              {mockRedirects.length} rules · {active} active.
            </p>
          </div>
          <div className="flex gap-2 self-start">
            <button type="button" className="button-secondary text-xs">
              Import CSV
            </button>
            <button type="button" className="button-primary text-xs">
              + Add redirect
            </button>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-xs font-semibold uppercase tracking-[0.1em] text-[var(--fg-muted)]">
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3">Destination</th>
              <th className="px-5 py-3">Code</th>
              <th className="px-5 py-3">Hits</th>
              <th className="px-5 py-3">Last hit</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockRedirects.map((r) => (
              <tr
                key={r.id}
                className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-elev)]"
                style={!r.active ? { opacity: 0.55 } : {}}
              >
                <td className="px-5 py-3">
                  <code className="text-xs">{r.source}</code>
                </td>
                <td className="px-5 py-3">
                  <code className="text-xs">{r.destination}</code>
                </td>
                <td className="px-5 py-3 font-semibold">{r.code}</td>
                <td className="px-5 py-3 text-[var(--fg-muted)]">{r.hits.toLocaleString()}</td>
                <td className="px-5 py-3 text-[var(--fg-muted)]">{r.lastHit}</td>
                <td className="px-5 py-3">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={
                      r.active
                        ? {
                            background:
                              'color-mix(in oklab, var(--success) 18%, transparent)',
                            color: 'var(--success)',
                          }
                        : {
                            background:
                              'color-mix(in oklab, var(--fg-muted) 15%, transparent)',
                            color: 'var(--fg-muted)',
                          }
                    }
                  >
                    {r.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button type="button" className="button-secondary text-xs">
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-xs font-semibold text-[var(--danger)]"
                    >
                      Delete
                    </button>
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
