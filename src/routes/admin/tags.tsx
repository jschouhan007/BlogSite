import { Link, createFileRoute } from '@tanstack/react-router'
import { tags, posts } from '../../lib/content'

export const Route = createFileRoute('/admin/tags')({
  component: AdminTagsPage,
})

function AdminTagsPage() {
  const rows = tags.map((tag) => ({
    ...tag,
    postCount: posts.filter((p) => p.tags.some((t) => t.slug === tag.slug))
      .length,
  }))

  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge">Admin</p>
            <h1 className="display-title mt-3 text-3xl font-semibold">Tags</h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              {rows.length} tags · Attach granular topics to posts.
            </p>
          </div>
          <button type="button" className="button-primary self-start">
            + New tag
          </button>
        </div>
      </div>

      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-xs font-semibold uppercase tracking-[0.1em] text-[var(--fg-muted)]">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Slug</th>
              <th className="px-5 py-3">Posts</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((tag) => (
              <tr
                key={tag.slug}
                className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-elev)]"
              >
                <td className="px-5 py-3">
                  <span className="badge">{tag.name}</span>
                </td>
                <td className="px-5 py-3">
                  <code className="text-xs">{tag.slug}</code>
                </td>
                <td className="px-5 py-3">
                  <Link
                    to={`/tag/${tag.slug}`}
                    className="font-semibold text-[var(--primary)]"
                  >
                    {tag.postCount}
                  </Link>
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
