import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { posts } from '../lib/content'

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
        {
          title: 'BlogSite — Editorial OS',
        },
        {
          name: 'description',
          content:
            'A premium, SEO-first editorial platform with lightning-fast reading experiences and workflow-ready publishing.',
        },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function NotFound() {
  const popular = posts.filter((p) => p.trending).slice(0, 3)

  return (
    <main className="page-wrap px-4 py-20">
      <div className="card p-10 text-center">
        <p className="text-7xl font-semibold text-[var(--primary)]">404</p>
        <h1 className="display-title mt-4 text-3xl font-semibold">
          Page not found
        </h1>
        <p className="mt-3 text-base text-[var(--fg-muted)]">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/" className="button-primary">
            Go home
          </Link>
          <Link to="/blog" className="button-secondary">
            Browse articles
          </Link>
          <Link to="/search" className="button-secondary">
            Search
          </Link>
        </div>
      </div>

      {popular.length > 0 && (
        <section className="mt-10">
          <h2 className="display-title mb-5 text-2xl font-semibold">
            Popular on BlogSite
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {popular.map((post) => (
              <article key={post.slug} className="card p-5">
                <span className="badge">{post.category.name}</span>
                <h3 className="mt-3 text-lg font-semibold">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-2 text-xs text-[var(--fg-muted)]">
                  {post.readingTime}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[color-mix(in_oklab,var(--accent)_35%,transparent_65%)]">
        <Header />
        {children}
        <Footer />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
