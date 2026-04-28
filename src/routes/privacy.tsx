import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: () => ({
    meta: [{ title: 'Privacy — BlogSite' }],
  }),
})

function PrivacyPage() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="card p-6">
        <p className="badge">Privacy</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          Privacy-first publishing
        </h1>
        <div className="prose prose-slate mt-4 max-w-none">
          <p>
            BlogSite is built with privacy in mind. We collect only the analytics
            necessary to improve the reading experience, and we never sell
            personal data.
          </p>
          <p>
            Full policy language will live here once compliance review is
            complete.
          </p>
        </div>
      </section>
    </main>
  )
}
