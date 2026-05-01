import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

const adminLinks = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/posts', label: 'Posts' },
  { to: '/admin/media', label: 'Media' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/tags', label: 'Tags' },
  { to: '/admin/comments', label: 'Comments' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/roles', label: 'Roles' },
  { to: '/admin/seo', label: 'SEO' },
  { to: '/admin/redirects', label: 'Redirects' },
  { to: '/admin/analytics', label: 'Analytics' },
  { to: '/admin/settings', label: 'Settings' },
  { to: '/admin/audit-log', label: 'Audit Log' },
]

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
  head: () => ({
    meta: [
      { title: 'Admin — BlogSite' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
})

function AdminLayout() {
  return (
    <div className="page-wrap flex flex-col gap-6 px-4 py-8 lg:flex-row">
      <aside className="card w-full p-5 lg:w-64">
        <p className="badge">Admin</p>
        <nav className="mt-4 flex flex-col gap-3">
          {adminLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="min-w-0 flex-1">
        <Outlet />
      </section>
    </div>
  )
}
