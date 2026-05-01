import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { getAdjacentPosts, getPostBySlug, posts } from '../lib/content'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post) {
      throw notFound()
    }
    return { post, adjacent: getAdjacentPosts(params.slug) }
  },
  component: BlogPost,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.post.title} — BlogSite` },
      { name: 'description', content: loaderData.post.excerpt },
      { property: 'og:title', content: loaderData.post.title },
      { property: 'og:description', content: loaderData.post.excerpt },
      { property: 'og:image', content: loaderData.post.coverImage },
      { property: 'og:type', content: 'article' },
    ],
  }),
})

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// ─── Mock comments data ──────────────────────────────────────────────────────

interface Comment {
  id: number
  author: string
  avatar: string
  date: string
  text: string
  replies?: Comment[]
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: 'Priya Menon',
    avatar:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=facearea&w=64&h=64&q=80',
    date: '2 days ago',
    text: 'This is exactly the framework I needed. The stage-based SLAs idea is something we\'re going to implement immediately — we\'ve been struggling with "draft purgatory" for months.',
    replies: [
      {
        id: 4,
        author: 'Jasmin Cho',
        avatar:
          'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=64&h=64&q=80',
        date: '1 day ago',
        text: 'So glad it resonated! The SLA idea only works if you actually revisit and adjust them — start conservative (3–5 days per stage) and tighten as you learn your team\'s rhythm.',
      },
    ],
  },
  {
    id: 2,
    author: 'Tobias Reinholt',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=64&h=64&q=80',
    date: '4 days ago',
    text: "The split between structural pass and quality pass in Review is gold. We used to combine them and it created brutal bottlenecks. Separating concerns really does speed things up.",
  },
  {
    id: 3,
    author: 'Amara Osei',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&w=64&h=64&q=80',
    date: '6 days ago',
    text: 'How do you handle posts where the author AND editor roles are the same person? Most of our team wears multiple hats.',
    replies: [
      {
        id: 5,
        author: 'Ravi Patel',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=64&h=64&q=80',
        date: '5 days ago',
        text: 'We faced the same. The fix was a mandatory 24-hour "cooling off" period between finishing the draft and doing the quality pass — your brain genuinely catches different things when you come back fresh.',
      },
    ],
  },
]

function CommentsSection() {
  const [comments] = useState<Comment[]>(mockComments)
  const [openReply, setOpenReply] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')
  const [commentText, setCommentText] = useState('')
  const [showForm, setShowForm] = useState(false)

  const total = comments.reduce((acc, c) => acc + 1 + (c.replies?.length ?? 0), 0)

  function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
    return (
      <div className={depth > 0 ? 'mt-3 border-l-2 pl-4' : ''} style={depth > 0 ? { borderColor: 'var(--border)' } : {}}>
        <div className="flex gap-3">
          <img src={comment.avatar} alt={comment.author}
            className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-full object-cover" />
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-sm font-semibold">{comment.author}</span>
              <span className="text-xs text-[var(--fg-muted)]">{comment.date}</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>
              {comment.text}
            </p>
            <button
              onClick={() => setOpenReply(openReply === comment.id ? null : comment.id)}
              className="mt-1.5 text-xs font-medium transition-colors hover:text-[var(--primary)]"
              style={{ color: 'var(--fg-muted)' }}
            >
              {openReply === comment.id ? 'Cancel' : '↩ Reply'}
            </button>
            {openReply === comment.id && (
              <div className="mt-2 flex flex-col gap-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${comment.author}…`}
                  rows={2}
                  className="input-field w-full resize-none text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setOpenReply(null); setReplyText('') }}
                    className="button-secondary text-xs"
                  >
                    Cancel
                  </button>
                  <button className="button-primary text-xs">Post reply</button>
                </div>
              </div>
            )}
          </div>
        </div>
        {comment.replies?.map((r) => (
          <CommentItem key={r.id} comment={r} depth={depth + 1} />
        ))}
      </div>
    )
  }

  return (
    <section className="card mt-10 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Comments <span className="ml-1 text-base font-normal text-[var(--fg-muted)]">({total})</span>
        </h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="button-primary text-xs"
          >
            Leave a comment
          </button>
        )}
      </div>

      {showForm && (
        <div className="mt-4 flex flex-col gap-3 rounded-lg p-4"
          style={{ background: 'color-mix(in oklab, var(--fg) 4%, transparent)' }}>
          <p className="text-sm font-semibold">Join the conversation</p>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts…"
            rows={3}
            className="input-field w-full resize-none text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={() => { setShowForm(false); setCommentText('') }}
              className="button-secondary text-xs"
            >
              Cancel
            </button>
            <button className="button-primary text-xs">Post comment</button>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-6">
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </div>
    </section>
  )
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-[3px] transition-none"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(90deg, var(--primary), var(--accent))',
      }}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}

function ReactionBar() {
  const [counts, setCounts] = useState({ clap: 24, like: 18, insight: 11 })
  const [reacted, setReacted] = useState<Set<string>>(new Set())

  function react(key: keyof typeof counts) {
    if (reacted.has(key)) return
    setReacted((prev) => new Set([...prev, key]))
    setCounts((prev) => ({ ...prev, [key]: prev[key] + 1 }))
  }

  const reactions = [
    { key: 'clap' as const, emoji: '👏', label: 'Clap' },
    { key: 'like' as const, emoji: '❤️', label: 'Like' },
    { key: 'insight' as const, emoji: '💡', label: 'Insightful' },
  ]

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--fg-muted)]">
        Reactions
      </span>
      {reactions.map(({ key, emoji, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => react(key)}
          aria-label={`${label} — ${counts[key]} reactions`}
          className="flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1.5 text-sm font-semibold transition hover:-translate-y-0.5"
          style={
            reacted.has(key)
              ? {
                  background: 'color-mix(in oklab, var(--primary) 12%, transparent)',
                  borderColor: 'color-mix(in oklab, var(--primary) 35%, var(--border))',
                  color: 'var(--primary)',
                }
              : { background: 'var(--surface)', color: 'var(--fg-muted)' }
          }
        >
          <span>{emoji}</span>
          <span>{counts[key]}</span>
        </button>
      ))}
    </div>
  )
}

function ShareBar({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false)
  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/blog/${slug}`
      : `/blog/${slug}`

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--fg-muted)]">
        Share
      </span>
      <button
        type="button"
        onClick={copyLink}
        className="button-secondary text-xs"
      >
        {copied ? '✓ Copied!' : 'Copy link'}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="button-secondary text-xs"
      >
        Share on X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="button-secondary text-xs"
      >
        LinkedIn
      </a>
    </div>
  )
}

function BlogPost() {
  const { post, adjacent } = Route.useLoaderData()
  const related = posts
    .filter(
      (item) =>
        item.slug !== post.slug && item.category.slug === post.category.slug,
    )
    .slice(0, 2)

  const articleRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const headings = articleRef.current?.querySelectorAll('h2[id]')
    if (!headings?.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0% -70% 0%' },
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <ReadingProgress />

      <main className="page-wrap px-4 py-10">
        {/* Breadcrumb */}
        <nav
          className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[var(--fg-muted)]"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-[var(--fg)]">
            Home
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-[var(--fg)]">
            Blog
          </Link>
          <span>/</span>
          <Link
            to={`/category/${post.category.slug}`}
            className="hover:text-[var(--fg)]"
          >
            {post.category.name}
          </Link>
          <span>/</span>
          <span className="max-w-[24ch] truncate text-[var(--fg)]">
            {post.title}
          </span>
        </nav>

        <div className="flex gap-10 xl:items-start">
          {/* Article */}
          <article
            ref={articleRef}
            className="min-w-0 flex-1"
          >
            <div className="card p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--fg-muted)]">
                <Link
                  to={`/category/${post.category.slug}`}
                  className="badge"
                >
                  {post.category.name}
                </Link>
                <span>{formatter.format(new Date(post.publishedAt))}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>

              <h1 className="display-title mt-5 text-4xl font-semibold leading-tight md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-[var(--fg-muted)]">
                {post.excerpt}
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <Link to={`/author/${post.author.slug}`}>
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-[var(--border)]"
                  />
                </Link>
                <div>
                  <Link
                    to={`/author/${post.author.slug}`}
                    className="font-semibold text-[var(--fg)]"
                  >
                    {post.author.name}
                  </Link>
                  <p className="text-xs text-[var(--fg-muted)]">
                    {post.author.role}
                  </p>
                </div>
              </div>

              {/* Cover image */}
              <div className="mt-7 overflow-hidden rounded-2xl border border-[var(--border)]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-auto w-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Intro paragraphs */}
              <div className="prose prose-slate mt-8 max-w-none">
                {post.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {/* Sections */}
              {post.sections.map((section) => {
                const id = slugify(section.heading)
                return (
                  <div key={id} className="mt-10">
                    <h2
                      id={id}
                      className="display-title text-2xl font-semibold scroll-mt-24"
                    >
                      {section.heading}
                    </h2>
                    <div className="prose prose-slate mt-4 max-w-none">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--border)] pt-6">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    to={`/tag/${tag.slug}`}
                    className="badge"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>

              <ReactionBar />
              <ShareBar title={post.title} slug={post.slug} />
            </div>

            {/* Prev / Next */}
            {(adjacent.prev || adjacent.next) && (
              <nav
                className="mt-6 grid gap-4 sm:grid-cols-2"
                aria-label="Post navigation"
              >
                {adjacent.prev ? (
                  <Link
                    to={`/blog/${adjacent.prev.slug}`}
                    className="card p-5 transition hover:-translate-y-0.5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--fg-muted)]">
                      ← Previous
                    </p>
                    <p className="mt-2 font-semibold line-clamp-2">
                      {adjacent.prev.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
                {adjacent.next && (
                  <Link
                    to={`/blog/${adjacent.next.slug}`}
                    className="card p-5 text-right transition hover:-translate-y-0.5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--fg-muted)]">
                      Next →
                    </p>
                    <p className="mt-2 font-semibold line-clamp-2">
                      {adjacent.next.title}
                    </p>
                  </Link>
                )}
              </nav>
            )}

            {/* Related posts */}
            {related.length > 0 && (
              <section className="mt-6">
                <h2 className="display-title mb-4 text-2xl font-semibold">
                  Related stories
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {related.map((item) => (
                    <article key={item.slug} className="card p-6">
                      <span className="badge">{item.category.name}</span>
                      <h3 className="mt-4 text-xl font-semibold">
                        <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p className="mt-2 text-sm text-[var(--fg-muted)]">
                        {item.excerpt}
                      </p>
                      <p className="mt-3 text-xs text-[var(--fg-muted)]">
                        {item.readingTime} · {item.author.name}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Comments */}
            <CommentsSection />
          </article>

          {/* Sticky TOC sidebar */}
          {post.sections.length > 0 && (
            <aside className="hidden w-56 flex-shrink-0 xl:block">
              <div className="sticky top-20 card p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                  Contents
                </p>
                <nav className="mt-3 flex flex-col gap-1" aria-label="Table of contents">
                  {post.sections.map((section) => {
                    const id = slugify(section.heading)
                    const isActive = activeSection === id
                    return (
                      <a
                        key={id}
                        href={`#${id}`}
                        className="rounded-lg px-2 py-1.5 text-xs font-medium leading-snug transition"
                        style={{
                          color: isActive ? 'var(--primary)' : 'var(--fg-muted)',
                          background: isActive
                            ? 'color-mix(in oklab, var(--primary) 10%, transparent)'
                            : 'transparent',
                        }}
                      >
                        {section.heading}
                      </a>
                    )
                  })}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </main>
    </>
  )
}
