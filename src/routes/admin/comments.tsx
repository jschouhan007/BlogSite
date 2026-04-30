import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/comments')({
  component: AdminCommentsPage,
})

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Pending: {
    bg: 'color-mix(in oklab, var(--warn) 18%, transparent)',
    color: 'var(--warn)',
  },
  Approved: {
    bg: 'color-mix(in oklab, var(--success) 18%, transparent)',
    color: 'var(--success)',
  },
  Spam: {
    bg: 'color-mix(in oklab, var(--danger) 15%, transparent)',
    color: 'var(--danger)',
  },
}

const mockComments = [
  {
    id: 'c1',
    author: 'Alex Rivera',
    email: 'alex@example.com',
    body: "Fantastic breakdown of the editorial pipeline. We've been using a similar system and it's transformed how we ship.",
    post: 'The Editorial Operating System: From Pitch to Publish',
    status: 'Pending',
    date: '2026-04-27',
  },
  {
    id: 'c2',
    author: 'Sarah Chen',
    email: 'sarah@example.com',
    body: 'The SEO scorecard approach is exactly what our team was missing. Bookmarking this.',
    post: 'SEO Scorecards That Actually Ship Content',
    status: 'Approved',
    date: '2026-04-25',
  },
  {
    id: 'c3',
    author: 'Marcus Webb',
    email: 'marcus@example.com',
    body: 'Great post on design for reading. The section on line measure really clicked for me.',
    post: 'Designing for Reader Focus in 2026',
    status: 'Approved',
    date: '2026-04-22',
  },
  {
    id: 'c4',
    author: 'Spam Bot 9000',
    email: 'spam@spammy.xyz',
    body: 'Click here for cheap SEO tools!! 🚀🚀🚀',
    post: 'SEO Scorecards That Actually Ship Content',
    status: 'Spam',
    date: '2026-04-20',
  },
  {
    id: 'c5',
    author: 'Priya Nair',
    email: 'priya@example.com',
    body: 'Really interesting point on the refresh queue driven by analytics. Any chance of a follow-up on attribution windows?',
    post: 'Turning Analytics into a Content Refresh Queue',
    status: 'Pending',
    date: '2026-04-19',
  },
]

function AdminCommentsPage() {
  const pending = mockComments.filter((c) => c.status === 'Pending').length

  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge">Admin</p>
            <h1 className="display-title mt-3 text-3xl font-semibold">
              Comments
            </h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              {mockComments.length} total ·{' '}
              <span className="font-semibold text-[var(--warn)]">
                {pending} pending review
              </span>
            </p>
          </div>
          <div className="flex gap-2 self-start">
            {['All', 'Pending', 'Approved', 'Spam'].map((f) => (
              <button
                key={f}
                type="button"
                className={f === 'All' ? 'button-primary text-xs' : 'button-secondary text-xs'}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {mockComments.map((comment) => (
          <div
            key={comment.id}
            className="card p-5"
            style={
              comment.status === 'Spam'
                ? { opacity: 0.6 }
                : {}
            }
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{comment.author}</span>
                  <span className="text-xs text-[var(--fg-muted)]">
                    {comment.email}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{
                      background: STATUS_STYLE[comment.status].bg,
                      color: STATUS_STYLE[comment.status].color,
                    }}
                  >
                    {comment.status}
                  </span>
                </div>
                <p className="text-sm text-[var(--fg-muted)]">
                  On{' '}
                  <span className="font-semibold text-[var(--fg)]">
                    {comment.post}
                  </span>{' '}
                  · {comment.date}
                </p>
                <p className="mt-1 text-sm">{comment.body}</p>
              </div>
              <div className="flex flex-shrink-0 flex-wrap gap-2 sm:flex-col">
                {comment.status !== 'Approved' && (
                  <button type="button" className="button-primary text-xs">
                    Approve
                  </button>
                )}
                {comment.status !== 'Spam' && (
                  <button type="button" className="button-secondary text-xs">
                    Mark spam
                  </button>
                )}
                <button
                  type="button"
                  className="text-xs font-semibold text-[var(--danger)]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
