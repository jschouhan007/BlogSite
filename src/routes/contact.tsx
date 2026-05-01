import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [{ title: 'Contact — BlogSite' }],
  }),
})

function ContactPage() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="card p-6">
        <p className="badge">Contact</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          Talk to the BlogSite team
        </h1>
        <p className="mt-3 text-base text-[var(--fg-muted)]">
          Questions about partnerships, demos, or editorial workflows? Send us a
          note.
        </p>
        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Full name"
            className="input-field"
            aria-label="Full name"
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            aria-label="Email"
          />
          <input
            type="text"
            placeholder="Company"
            className="input-field"
            aria-label="Company"
          />
          <input
            type="text"
            placeholder="Role"
            className="input-field"
            aria-label="Role"
          />
          <textarea
            placeholder="How can we help?"
            className="input-field md:col-span-2"
            rows={5}
            aria-label="Message"
          />
          <button type="button" className="button-primary md:col-span-2">
            Send message
          </button>
        </form>
      </section>
    </main>
  )
}
