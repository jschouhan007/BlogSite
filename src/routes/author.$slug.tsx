import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { authors, getPostsByAuthor } from '../lib/content'

export const Route = createFileRoute('/author/$slug')({
  loader: ({ params }) => {
    const author = authors.find((item) => item.slug === params.slug)
    if (!author) {
      throw notFound()
    }
    return {
      author,
      posts: getPostsByAuthor(params.slug),
    }
  },
  component: AuthorPage,
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData.author.name} — BlogSite` }],
  }),
})

function AuthorPage() {
  const { author, posts } = Route.useLoaderData()

  return (
    <main className="page-wrap px-4 py-12">
      <header className="card p-6">
        <div className="flex items-center gap-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <p className="badge">Author</p>
            <h1 className="display-title mt-2 text-3xl font-semibold">
              {author.name}
            </h1>
            <p className="text-sm text-[var(--fg-muted)]">{author.role}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-[var(--fg-muted)]">{author.bio}</p>
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
