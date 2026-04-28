import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/media')({
  component: AdminPage,
})

function AdminPage() {
  return (
    <div className="card p-6">
      <p className="badge">Admin</p>
      <h1 className="display-title mt-4 text-3xl font-semibold">Media</h1>
      <p className="mt-3 text-sm text-[var(--fg-muted)]">
        Media management tools will be implemented in this workspace.
      </p>
    </div>
  )
}
