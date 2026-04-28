import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
  head: () => ({
    meta: [{ title: 'Terms — BlogSite' }],
  }),
})

function TermsPage() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="card p-6">
        <p className="badge">Terms</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          BlogSite terms of service
        </h1>
        <div className="prose prose-slate mt-4 max-w-none">
          <p>
            These terms outline the expectations for using BlogSite as a reader
            or author. The detailed agreement will be published after legal
            review.
          </p>
        </div>
      </section>
    </main>
  )
}
