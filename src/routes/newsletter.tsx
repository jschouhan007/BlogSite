import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/newsletter')({
  component: NewsletterPage,
  head: () => ({
    meta: [
      { title: 'Newsletter — BlogSite' },
      {
        name: 'description',
        content:
          'Join 1,200+ editorial professionals. A weekly digest of content strategy, SEO wins, and product playbooks.',
      },
    ],
  }),
})

const benefits = [
  {
    emoji: '📰',
    title: 'Weekly editorial briefing',
    description:
      'Every Monday: the top stories in content strategy, SEO, and product writing — curated for publishing professionals.',
  },
  {
    emoji: '🔍',
    title: 'SEO insights you can act on',
    description:
      'Data-backed tactics, keyword opportunities, and refresh signals from the BlogSite SEO team.',
  },
  {
    emoji: '📈',
    title: 'Growth playbooks',
    description:
      'Detailed walkthroughs on audience building, content distribution, and newsletter monetisation.',
  },
  {
    emoji: '🛠',
    title: 'Tool reviews and templates',
    description:
      'Honest reviews of editorial tools plus ready-to-use templates for scorecards, workflows, and briefs.',
  },
]

const testimonials = [
  {
    body: 'The best content strategy newsletter I receive. Actionable, concise, and always relevant to my work as an editor.',
    name: 'Sarah M.',
    role: 'Managing Editor, Aperture Media',
  },
  {
    body: "Ravi's SEO breakdowns are worth the subscription alone. My team references past issues in every quarterly review.",
    name: 'James T.',
    role: 'Head of SEO, Northfield Digital',
  },
]

function NewsletterPage() {
  return (
    <main className="page-wrap px-4 py-12">
      {/* Hero */}
      <section className="card p-8 text-center">
        <p className="badge mx-auto">Newsletter</p>
        <h1 className="display-title mx-auto mt-4 max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
          The BlogSite Briefing
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-[var(--fg-muted)]">
          A weekly digest of editorial strategy, SEO wins, and content playbooks.
          Trusted by <strong>1,200+</strong> publishing professionals.
        </p>
        <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="your@email.com"
            className="input-field"
            aria-label="Email address"
          />
          <button type="button" className="button-primary flex-shrink-0">
            Join free
          </button>
        </form>
        <p className="mt-3 text-xs text-[var(--fg-muted)]">
          No spam. Unsubscribe any time. Double opt-in confirmation.
        </p>

        {/* Stats */}
        <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-[var(--border)] pt-6">
          {[
            ['1,200+', 'Subscribers'],
            ['42%', 'Avg open rate'],
            ['52 issues', 'Published'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-2xl font-semibold text-[var(--primary)]">{value}</p>
              <p className="mt-0.5 text-xs text-[var(--fg-muted)]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mt-10">
        <h2 className="display-title mb-2 text-3xl font-semibold">
          What you will get
        </h2>
        <p className="text-[var(--fg-muted)]">
          Every issue is designed to be read in 5 minutes and applied immediately.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {benefits.map((b) => (
            <div key={b.title} className="card p-6">
              <span className="text-3xl">{b.emoji}</span>
              <h3 className="mt-3 text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-10">
        <h2 className="display-title mb-6 text-3xl font-semibold">
          What readers say
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="card p-6">
              <p className="text-base leading-relaxed text-[var(--fg-muted)]">
                &ldquo;{t.body}&rdquo;
              </p>
              <footer className="mt-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-[var(--fg-muted)]">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA again */}
      <section className="mt-10 card p-8 text-center">
        <h2 className="display-title text-2xl font-semibold">
          Ready to level up your editorial game?
        </h2>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">
          Join free. New issue every Monday.
        </p>
        <form className="mx-auto mt-5 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="your@email.com"
            className="input-field"
            aria-label="Email address"
          />
          <button type="button" className="button-primary flex-shrink-0">
            Subscribe
          </button>
        </form>
      </section>
    </main>
  )
}
