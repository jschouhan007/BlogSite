import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  return (
    <div className="card p-6">
      <p className="badge">Dashboard</p>
      <h1 className="display-title mt-4 text-3xl font-semibold">
        Editorial command center
      </h1>
      <p className="mt-3 text-sm text-[var(--fg-muted)]">
        KPIs, workflow queues, and content health snapshots will surface here.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ['Published', '128'],
          ['In Review', '14'],
          ['Scheduled', '9'],
        ].map(([label, value]) => (
          <div key={label} className="card p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fg-muted)]">
              {label}
            </p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
