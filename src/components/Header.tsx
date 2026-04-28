import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/category/editorial', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_86%,transparent_14%)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-4 gap-y-3 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="display-title text-lg font-semibold text-[var(--fg)]"
          >
            BlogSite
          </Link>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fg-muted)] md:inline">
            Editorial OS
          </span>
        </div>

        <div className="hidden flex-1 items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/search" className="button-secondary text-xs">
            Search ⌘K
          </Link>
          <ThemeToggle />
          <Link to="/newsletter" className="button-primary text-xs">
            Subscribe
          </Link>
        </div>

        <div className="flex w-full flex-wrap items-center gap-4 text-sm font-semibold md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
