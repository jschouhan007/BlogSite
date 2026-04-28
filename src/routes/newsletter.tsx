import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/newsletter')({
  component: NewsletterPage,
  head: () => ({
    meta: [{ title: 'Newsletter — BlogSite' }],
  }),
})

function NewsletterPage() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="card p-6">
        <p className="badge">Newsletter</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          The BlogSite Briefing
        </h1>
        <p className="mt-3 text-base text-[var(--fg-muted)]">
          A weekly digest of editorial strategy, SEO wins, and product updates.
        </p>
        <form className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Email address"
            className="input-field"
            aria-label="Email address"
          />
          <button type="button" className="button-primary">
            Subscribe
          </button>
        </form>
      </section>
    </main>
  )
}
