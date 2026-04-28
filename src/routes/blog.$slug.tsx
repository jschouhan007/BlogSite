import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { getPostBySlug, posts } from '../lib/content'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post) {
      throw notFound()
    }
    return post
  },
  component: BlogPost,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.title} — BlogSite` },
      { name: 'description', content: loaderData.excerpt },
    ],
  }),
})

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function BlogPost() {
  const post = Route.useLoaderData()
  const related = posts
    .filter((item) => item.slug !== post.slug && item.category.slug === post.category.slug)
    .slice(0, 2)

  return (
    <main className="page-wrap px-4 py-12">
      <article className="card p-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--fg-muted)]">
          <span className="badge">{post.category.name}</span>
          <span>{formatter.format(new Date(post.publishedAt))}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="display-title mt-5 text-4xl font-semibold">
          {post.title}
        </h1>
        <p className="mt-3 text-base text-[var(--fg-muted)]">{post.excerpt}</p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)]">
          <img src={post.coverImage} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="mt-6 flex items-center gap-4 text-sm">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="m-0 font-semibold">{post.author.name}</p>
            <p className="m-0 text-xs text-[var(--fg-muted)]">{post.author.role}</p>
          </div>
        </div>
        <div className="prose prose-slate mt-8 max-w-none">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link key={tag.slug} to={`/tag/${tag.slug}`} className="badge">
              {tag.name}
            </Link>
          ))}
        </div>
      </article>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {related.map((item) => (
          <article key={item.slug} className="card p-6">
            <span className="badge">Related</span>
            <h2 className="mt-4 text-xl font-semibold">
              <Link to={`/blog/${item.slug}`}>{item.title}</Link>
            </h2>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{item.excerpt}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
