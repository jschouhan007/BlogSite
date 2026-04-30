import { createFileRoute } from '@tanstack/react-router'
import { authors } from '../../lib/content'

export const Route = createFileRoute('/admin/users')({
  component: AdminUsersPage,
})

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Active: {
    bg: 'color-mix(in oklab, var(--success) 18%, transparent)',
    color: 'var(--success)',
  },
  Invited: {
    bg: 'color-mix(in oklab, var(--warn) 18%, transparent)',
    color: 'var(--warn)',
  },
  Deactivated: {
    bg: 'color-mix(in oklab, var(--danger) 15%, transparent)',
    color: 'var(--danger)',
  },
}

const mockUsers = [
  {
    id: 'u1',
    name: authors[0].name,
    email: 'jasmin@blogsite.io',
    role: 'Editor-in-Chief',
    avatar: authors[0].avatar,
    status: 'Active',
    lastLogin: '2026-04-28',
  },
  {
    id: 'u2',
    name: authors[1].name,
    email: 'ravi@blogsite.io',
    role: 'SEO Lead',
    avatar: authors[1].avatar,
    status: 'Active',
    lastLogin: '2026-04-27',
  },
  {
    id: 'u3',
    name: authors[2].name,
    email: 'mira@blogsite.io',
    role: 'Product Writer',
    avatar: authors[2].avatar,
    status: 'Active',
    lastLogin: '2026-04-26',
  },
  {
    id: 'u4',
    name: 'Jordan Kim',
    email: 'jordan@blogsite.io',
    role: 'Reviewer',
    avatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=facearea&w=128&h=128&q=80',
    status: 'Invited',
    lastLogin: '—',
  },
  {
    id: 'u5',
    name: 'Taylor Brooks',
    email: 'taylor@blogsite.io',
    role: 'Moderator',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&w=128&h=128&q=80',
    status: 'Deactivated',
    lastLogin: '2026-02-14',
  },
]

function AdminUsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge">Admin</p>
            <h1 className="display-title mt-3 text-3xl font-semibold">Users</h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              {mockUsers.length} users · Invite, deactivate, and assign roles.
            </p>
          </div>
          <button type="button" className="button-primary self-start">
            + Invite user
          </button>
        </div>
      </div>

      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-xs font-semibold uppercase tracking-[0.1em] text-[var(--fg-muted)]">
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Last login</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-elev)]"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="font-semibold">{user.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-[var(--fg-muted)]">
                  {user.email}
                </td>
                <td className="px-5 py-3 text-[var(--fg-muted)]">
                  {user.role}
                </td>
                <td className="px-5 py-3">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{
                      background: STATUS_STYLE[user.status].bg,
                      color: STATUS_STYLE[user.status].color,
                    }}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-[var(--fg-muted)]">
                  {user.lastLogin}
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button type="button" className="button-secondary text-xs">
                      Edit
                    </button>
                    {user.status === 'Active' && (
                      <button
                        type="button"
                        className="text-xs font-semibold text-[var(--danger)]"
                      >
                        Deactivate
                      </button>
                    )}
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
