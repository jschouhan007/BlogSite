import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { categories, getPostsByCategory } from '../lib/content'

export const Route = createFileRoute('/category/$slug')({
  loader: ({ params }) => {
    const category = categories.find((item) => item.slug === params.slug)
    if (!category) {
      throw notFound()
    }
    return {
      category,
      posts: getPostsByCategory(params.slug),
    }
  },
  component: CategoryPage,
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData.category.name} — BlogSite` }],
  }),
})

function CategoryPage() {
  const { category, posts } = Route.useLoaderData()

  return (
    <main className="page-wrap px-4 py-12">
      <header className="card p-6">
        <p className="badge">Category</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          {category.name}
        </h1>
        <p className="mt-3 text-base text-[var(--fg-muted)]">
          {category.description}
        </p>
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
