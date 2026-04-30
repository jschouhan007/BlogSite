import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/media')({
  component: AdminMediaPage,
})

const mockAssets = [
  {
    id: '1',
    filename: 'editorial-hero.jpg',
    mime: 'image/jpeg',
    size: '342 KB',
    width: 1200,
    height: 800,
    url: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&q=80',
    alt: 'Editorial hero cover image',
    uploaded: '2026-04-21',
  },
  {
    id: '2',
    filename: 'seo-dashboard.jpg',
    mime: 'image/jpeg',
    size: '218 KB',
    width: 1200,
    height: 800,
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    alt: 'SEO scorecard dashboard',
    uploaded: '2026-04-18',
  },
  {
    id: '3',
    filename: 'reader-focus.jpg',
    mime: 'image/jpeg',
    size: '271 KB',
    width: 1200,
    height: 800,
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
    alt: 'Design for reader focus',
    uploaded: '2026-04-13',
  },
  {
    id: '4',
    filename: 'analytics-chart.jpg',
    mime: 'image/jpeg',
    size: '195 KB',
    width: 1200,
    height: 800,
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
    alt: 'Analytics content refresh',
    uploaded: '2026-04-08',
  },
  {
    id: '5',
    filename: 'author-jasmin.jpg',
    mime: 'image/jpeg',
    size: '48 KB',
    width: 128,
    height: 128,
    url: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=128&h=128&q=80',
    alt: 'Author Jasmin Cho avatar',
    uploaded: '2026-03-10',
  },
  {
    id: '6',
    filename: 'author-ravi.jpg',
    mime: 'image/jpeg',
    size: '44 KB',
    width: 128,
    height: 128,
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=128&h=128&q=80',
    alt: 'Author Ravi Patel avatar',
    uploaded: '2026-03-10',
  },
]

function AdminMediaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge">Admin</p>
            <h1 className="display-title mt-3 text-3xl font-semibold">
              Media Library
            </h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              {mockAssets.length} assets · Upload, organise, and manage media.
            </p>
          </div>
          <button type="button" className="button-primary self-start">
            ↑ Upload files
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {['All', 'Images', 'Videos', 'Documents'].map((f) => (
            <button
              key={f}
              type="button"
              className={f === 'All' ? 'button-primary text-xs' : 'button-secondary text-xs'}
            >
              {f}
            </button>
          ))}
          <input
            type="search"
            placeholder="Search assets…"
            className="input-field ml-auto max-w-48 text-sm"
            aria-label="Search media"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {mockAssets.map((asset) => (
          <div key={asset.id} className="card group overflow-hidden p-0">
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src={asset.url}
                alt={asset.alt}
                className="h-full w-full object-cover transition group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <p className="truncate text-sm font-semibold">{asset.filename}</p>
              <p className="mt-1 text-xs text-[var(--fg-muted)]">
                {asset.mime.split('/')[1].toUpperCase()} · {asset.size} ·{' '}
                {asset.width}×{asset.height}px
              </p>
              <p className="mt-1 text-xs text-[var(--fg-muted)]">
                Uploaded {asset.uploaded}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
