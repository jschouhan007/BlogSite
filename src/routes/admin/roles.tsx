import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/roles')({
  component: AdminRolesPage,
})

const roles = [
  'Super Admin',
  'Admin',
  'Editor',
  'SEO Manager',
  'Author',
  'Reviewer',
  'Moderator',
  'Analyst',
]

type Permission = {
  label: string
  caps: boolean[]
}

const permissions: Permission[] = [
  { label: 'Manage users & roles',    caps: [true,  true,  false, false, false, false, false, false] },
  { label: 'Site settings',           caps: [true,  true,  false, false, false, false, false, false] },
  { label: 'Create post',             caps: [true,  true,  true,  false, true,  false, false, false] },
  { label: 'Edit any post',           caps: [true,  true,  true,  false, false, false, false, false] },
  { label: 'Edit own post',           caps: [true,  true,  true,  false, true,  false, false, false] },
  { label: 'Edit SEO meta (any)',     caps: [true,  true,  true,  true,  false, false, false, false] },
  { label: 'Publish / Schedule',      caps: [true,  true,  true,  false, false, false, false, false] },
  { label: 'Submit for review',       caps: [true,  true,  true,  false, true,  false, false, false] },
  { label: 'Approve review',          caps: [true,  true,  true,  false, false, true,  false, false] },
  { label: 'Delete post',             caps: [true,  true,  true,  false, false, false, false, false] },
  { label: 'Manage SEO / redirects',  caps: [true,  true,  true,  true,  false, false, false, false] },
  { label: 'Moderate comments',       caps: [true,  true,  true,  false, false, false, true,  false] },
  { label: 'View analytics',          caps: [true,  true,  true,  true,  false, false, false, true]  },
  { label: 'Manage media',            caps: [true,  true,  true,  false, false, false, false, false] },
  { label: 'Manage own media',        caps: [true,  true,  true,  false, true,  false, false, false] },
]

function Tick({ yes }: { yes: boolean }) {
  return (
    <span
      className="text-base font-bold"
      style={{ color: yes ? 'var(--success)' : 'var(--border)' }}
      aria-label={yes ? 'Allowed' : 'Denied'}
    >
      {yes ? '✓' : '—'}
    </span>
  )
}

function AdminRolesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6">
        <p className="badge">Admin</p>
        <h1 className="display-title mt-3 text-3xl font-semibold">
          Roles &amp; Permissions
        </h1>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          {roles.length} roles · Server-side RBAC enforced on all mutations.
        </p>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-xs font-semibold uppercase tracking-[0.1em] text-[var(--fg-muted)]">
              <th className="px-5 py-3 text-left">Capability</th>
              {roles.map((r) => (
                <th key={r} className="px-3 py-3 text-center">
                  {r.replace(' ', '\u00A0')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm) => (
              <tr
                key={perm.label}
                className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-elev)]"
              >
                <td className="px-5 py-2.5 font-medium">{perm.label}</td>
                {perm.caps.map((cap, i) => (
                  <td
                    key={roles[i]}
                    className="px-3 py-2.5 text-center"
                  >
                    <Tick yes={cap} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
