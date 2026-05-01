import { Link } from '@tanstack/react-router'

const footerLinks = {
  Explore: [
    { to: '/blog', label: 'Latest' },
    { to: '/category/editorial', label: 'Categories' },
    { to: '/tag/design-systems', label: 'Tags' },
    { to: '/search', label: 'Search' },
  ],
  Company: [
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/newsletter', label: 'Newsletter' },
  ],
  Legal: [
    { to: '/privacy', label: 'Privacy' },
    { to: '/terms', label: 'Terms' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer mt-20 px-4 pb-12 pt-12">
      <div className="page-wrap grid gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p className="badge mb-3">Editorial OS</p>
          <h2 className="display-title mb-2 text-2xl">BlogSite</h2>
          <p className="m-0 text-sm text-[var(--fg-muted)]">
            A modern, SEO-first publishing stack for content teams who care about
            craft, performance, and growth.
          </p>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--fg-muted)]">
              {title}
            </p>
            <ul className="m-0 list-none space-y-2 p-0 text-sm">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[var(--fg-muted)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="page-wrap mt-10 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--fg-muted)] md:flex-row md:items-center md:justify-between">
        <span>&copy; {year} BlogSite. All rights reserved.</span>
        <span>Designed for fast, accessible, editorial-first publishing.</span>
      </div>
    </footer>
  )
}
