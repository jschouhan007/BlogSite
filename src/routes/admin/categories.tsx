import { Link, createFileRoute } from '@tanstack/react-router'
import { categories, posts } from '../../lib/content'

export const Route = createFileRoute('/admin/categories')({
  component: AdminCategoriesPage,
})

function AdminCategoriesPage() {
  const rows = categories.map((cat) => ({
    ...cat,
    postCount: posts.filter((p) => p.category.slug === cat.slug).length,
  }))

  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge">Admin</p>
            <h1 className="display-title mt-3 text-3xl font-semibold">
              Categories
            </h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              {rows.length} categories · Organise content into topic clusters.
            </p>
          </div>
          <button type="button" className="button-primary self-start">
            + New category
          </button>
        </div>
      </div>

      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-xs font-semibold uppercase tracking-[0.1em] text-[var(--fg-muted)]">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Slug</th>
              <th className="px-5 py-3">Description</th>
              <th className="px-5 py-3">Posts</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((cat) => (
              <tr
                key={cat.slug}
                className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-elev)]"
              >
                <td className="px-5 py-3 font-semibold">{cat.name}</td>
                <td className="px-5 py-3">
                  <code className="text-xs">{cat.slug}</code>
                </td>
                <td className="px-5 py-3 max-w-xs text-[var(--fg-muted)]">
                  <span className="line-clamp-2">{cat.description}</span>
                </td>
                <td className="px-5 py-3">
                  <Link
                    to={`/category/${cat.slug}`}
                    className="font-semibold text-[var(--primary)]"
                  >
                    {cat.postCount}
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
