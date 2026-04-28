import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/settings')({
  component: AdminPage,
})

function AdminPage() {
  return (
    <div className="card p-6">
      <p className="badge">Admin</p>
      <h1 className="display-title mt-4 text-3xl font-semibold">Settings</h1>
      <p className="mt-3 text-sm text-[var(--fg-muted)]">
        Settings management tools will be implemented in this workspace.
      </p>
    </div>
  )
}
