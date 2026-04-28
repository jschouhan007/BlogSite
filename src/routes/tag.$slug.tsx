import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { getPostsByTag, tags } from '../lib/content'

export const Route = createFileRoute('/tag/$slug')({
  loader: ({ params }) => {
    const tag = tags.find((item) => item.slug === params.slug)
    if (!tag) {
      throw notFound()
    }
    return {
      tag,
      posts: getPostsByTag(params.slug),
    }
  },
  component: TagPage,
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData.tag.name} — BlogSite` }],
  }),
})

function TagPage() {
  const { tag, posts } = Route.useLoaderData()

  return (
    <main className="page-wrap px-4 py-12">
      <header className="card p-6">
        <p className="badge">Tag</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          {tag.name}
        </h1>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="card p-6">
            <h2 className="text-xl font-semibold">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{post.excerpt}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
