import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
  head: () => ({
    meta: [{ title: 'About — BlogSite' }],
  }),
})

function About() {
  return (
    <main className="page-wrap px-4 py-14">
      <section className="card p-8">
        <p className="badge">About BlogSite</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          An editorial-grade publishing platform.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--fg-muted)]">
          BlogSite is designed as a content operating system for teams who ship
          consistently. We blend premium reading experiences with a workflow-first
          CMS, ensuring every story is fast, discoverable, and built for growth.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ['Editorial craftsmanship', 'Block-based editing with structured metadata.'],
          ['SEO intelligence', 'On-page scoring, schema, and internal link guidance.'],
          ['Performance budgets', 'Core Web Vitals baked into the publishing flow.'],
        ].map(([title, description]) => (
          <div key={title} className="card p-6">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{description}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
