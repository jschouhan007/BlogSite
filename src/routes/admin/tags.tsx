import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/tags')({
  component: AdminPage,
})

function AdminPage() {
  return (
    <div className="card p-6">
      <p className="badge">Admin</p>
      <h1 className="display-title mt-4 text-3xl font-semibold">Tags</h1>
      <p className="mt-3 text-sm text-[var(--fg-muted)]">
        Tags management tools will be implemented in this workspace.
      </p>
    </div>
  )
}
