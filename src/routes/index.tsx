import { Link, createFileRoute } from '@tanstack/react-router'
import {
  categories,
  getFeaturedPost,
  getLatestPosts,
  getTrendingPosts,
} from '../lib/content'

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    meta: [
      {
        title: 'BlogSite — Editorial-grade publishing',
      },
      {
        name: 'description',
        content:
          'Premium reading experiences and workflow-ready content tooling for modern editorial teams.',
      },
    ],
  }),
})

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function App() {
  const featured = getFeaturedPost()
  const latest = getLatestPosts(3)
  const trending = getTrendingPosts(3)

  return (
    <main className="page-wrap px-4 pb-14 pt-12">
      <section className="card card-elevated grid gap-6 p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="badge">Featured story</span>
          <h1 className="display-title mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            {featured.title}
          </h1>
          <p className="mt-4 text-base text-[var(--fg-muted)]">
            {featured.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={`/blog/${featured.slug}`} className="button-primary">
              Read feature
            </Link>
            <Link to="/newsletter" className="button-secondary">
              Get the newsletter
            </Link>
          </div>
          <p className="mt-5 text-sm text-[var(--fg-muted)]">
            {formatter.format(new Date(featured.publishedAt))} · {featured.readingTime}
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
          <img
            src={featured.coverImage}
            alt="Featured editorial"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="section-title">Latest stories</h2>
              <p className="section-subtitle">
                Fresh reporting from the BlogSite editorial desk.
              </p>
            </div>
            <Link to="/blog" className="text-sm font-semibold">
              View all
            </Link>
          </div>
          <div className="mt-6 grid gap-4">
            {latest.map((post) => (
              <article key={post.slug} className="card p-5">
                <span className="badge">{post.category.name}</span>
                <h3 className="mt-3 text-xl font-semibold">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-2 text-sm text-[var(--fg-muted)]">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-[var(--fg-muted)]">
                  <span>{post.author.name}</span>
                  <span>•</span>
                  <span>{formatter.format(new Date(post.publishedAt))}</span>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="card p-6">
          <h2 className="section-title text-2xl">Trending now</h2>
          <p className="section-subtitle">What readers are sharing this week.</p>
          <ol className="mt-6 list-none space-y-5 p-0">
            {trending.map((post, index) => (
              <li key={post.slug} className="flex gap-3">
                <span className="text-2xl font-semibold text-[var(--primary)]">
                  0{index + 1}
                </span>
                <div>
                  <Link to={`/blog/${post.slug}`} className="font-semibold">
                    {post.title}
                  </Link>
                  <p className="mt-1 text-xs text-[var(--fg-muted)]">
                    {post.readingTime} · {post.category.name}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="section-title">Featured categories</h2>
            <p className="section-subtitle">
              Topic clusters that shape our editorial roadmap.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="card p-5 transition hover:-translate-y-0.5"
            >
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 card p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="badge">Newsletter</span>
            <h2 className="section-title mt-3">Get the editorial briefing</h2>
            <p className="section-subtitle">
              Weekly highlights, SEO insights, and content playbooks.
            </p>
          </div>
          <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Email address"
              className="input-field"
              aria-label="Email address"
            />
            <button type="button" className="button-primary">
              Join free
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
