import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { authors, categories, tags as allTags } from '../../lib/content'

export const Route = createFileRoute('/admin/posts/new')({
  component: NewPostEditor,
  head: () => ({
    meta: [
      { title: 'New Post — Admin — BlogSite' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
})

// ─── Block model ────────────────────────────────────────────────────────────

type BlockType = 'paragraph' | 'h2' | 'h3' | 'quote' | 'code' | 'callout' | 'divider' | 'image'
type CalloutVariant = 'info' | 'warn' | 'success' | 'danger'

interface Block {
  id: string
  type: BlockType
  text: string
  lang?: string
  variant?: CalloutVariant
  src?: string
  alt?: string
  caption?: string
}

let _idCount = 0
function mkId() {
  return `b${++_idCount}`
}
function emptyBlock(type: BlockType = 'paragraph'): Block {
  return { id: mkId(), type, text: '' }
}

const BLOCK_LABELS: Record<BlockType, string> = {
  paragraph: 'Paragraph',
  h2: 'Heading 2',
  h3: 'Heading 3',
  quote: 'Quote',
  code: 'Code',
  callout: 'Callout',
  divider: 'Divider',
  image: 'Image',
}

const CALLOUT_COLORS: Record<CalloutVariant, string> = {
  info: 'var(--accent)',
  warn: 'var(--warn)',
  success: 'var(--success)',
  danger: 'var(--danger)',
}

// ─── Sidebar state ───────────────────────────────────────────────────────────

interface PostMeta {
  slug: string
  excerpt: string
  categorySlug: string
  tagSlugs: string[]
  authorSlug: string
  coverImage: string
  status: 'Draft' | 'In Review' | 'Scheduled' | 'Published'
  publishDate: string
  metaTitle: string
  metaDesc: string
  focusKW: string
}

function defaultMeta(): PostMeta {
  return {
    slug: '',
    excerpt: '',
    categorySlug: categories[0].slug,
    tagSlugs: [],
    authorSlug: authors[0].slug,
    coverImage: '',
    status: 'Draft',
    publishDate: '',
    metaTitle: '',
    metaDesc: '',
    focusKW: '',
  }
}

// ─── SEO Score ───────────────────────────────────────────────────────────────

function computeSeoScore(title: string, blocks: Block[], meta: PostMeta) {
  const checks = [
    { label: 'Title 50–60 chars', pass: title.length >= 50 && title.length <= 60 },
    {
      label: 'Meta description 120–160 chars',
      pass: meta.metaDesc.length >= 120 && meta.metaDesc.length <= 160,
    },
    {
      label: 'Focus keyword in title',
      pass:
        meta.focusKW.trim().length > 0 &&
        title.toLowerCase().includes(meta.focusKW.toLowerCase()),
    },
    { label: 'At least one H2', pass: blocks.some((b) => b.type === 'h2') },
    { label: 'Excerpt / meta desc filled', pass: meta.excerpt.length > 0 },
  ]
  const score = Math.round((checks.filter((c) => c.pass).length / checks.length) * 100)
  return { score, checks }
}

// ─── Auto-growing textarea ────────────────────────────────────────────────────

function AutoTextarea({
  value,
  onChange,
  placeholder,
  style,
  className,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  style?: React.CSSProperties
  className?: string
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }, [value])
  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
      style={{ resize: 'none', overflow: 'hidden', ...style }}
    />
  )
}

// ─── Single block renderer ────────────────────────────────────────────────────

function BlockRow({
  block,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  canUp,
  canDown,
}: {
  block: Block
  onUpdate: (patch: Partial<Block>) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  canUp: boolean
  canDown: boolean
}) {
  const [hovered, setHovered] = useState(false)

  const inputCls =
    'w-full bg-transparent outline-none text-[var(--fg)] placeholder:text-[var(--fg-muted)]'

  const controls = (
    <div
      className="flex items-center gap-1 text-xs"
      style={{ color: 'var(--fg-muted)' }}
    >
      <select
        value={block.type}
        onChange={(e) => onUpdate({ type: e.target.value as BlockType, text: block.text })}
        className="rounded border px-1 py-0.5 text-xs"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--fg)',
        }}
      >
        {(Object.keys(BLOCK_LABELS) as BlockType[]).map((t) => (
          <option key={t} value={t}>
            {BLOCK_LABELS[t]}
          </option>
        ))}
      </select>
      <button
        onClick={onMoveUp}
        disabled={!canUp}
        title="Move up"
        className="rounded px-1 py-0.5 hover:bg-[var(--surface-elev)] disabled:opacity-30"
      >
        ↑
      </button>
      <button
        onClick={onMoveDown}
        disabled={!canDown}
        title="Move down"
        className="rounded px-1 py-0.5 hover:bg-[var(--surface-elev)] disabled:opacity-30"
      >
        ↓
      </button>
      <button
        onClick={onDelete}
        title="Delete block"
        className="rounded px-1 py-0.5 text-[var(--danger)] hover:bg-[var(--surface-elev)]"
      >
        ✕
      </button>
    </div>
  )

  function renderInput() {
    if (block.type === 'divider') {
      return <hr style={{ borderColor: 'var(--border)' }} className="my-1" />
    }
    if (block.type === 'h2') {
      return (
        <input
          type="text"
          value={block.text}
          onChange={(e) => onUpdate({ text: e.target.value })}
          placeholder="Heading 2…"
          className={`${inputCls} text-2xl font-semibold`}
        />
      )
    }
    if (block.type === 'h3') {
      return (
        <input
          type="text"
          value={block.text}
          onChange={(e) => onUpdate({ text: e.target.value })}
          placeholder="Heading 3…"
          className={`${inputCls} text-xl font-semibold`}
        />
      )
    }
    if (block.type === 'quote') {
      return (
        <AutoTextarea
          value={block.text}
          onChange={(v) => onUpdate({ text: v })}
          placeholder="Blockquote…"
          className={`${inputCls} italic`}
          style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1rem' }}
        />
      )
    }
    if (block.type === 'code') {
      return (
        <div
          className="rounded-lg p-3"
          style={{ background: 'color-mix(in oklab, var(--fg) 6%, transparent)' }}
        >
          <input
            type="text"
            value={block.lang ?? ''}
            onChange={(e) => onUpdate({ lang: e.target.value })}
            placeholder="Language (e.g. ts)"
            className="mb-2 w-28 rounded border px-2 py-0.5 font-mono text-xs"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--fg-muted)',
            }}
          />
          <AutoTextarea
            value={block.text}
            onChange={(v) => onUpdate({ text: v })}
            placeholder="// code here…"
            className={`${inputCls} font-mono text-sm`}
          />
        </div>
      )
    }
    if (block.type === 'callout') {
      const variant = block.variant ?? 'info'
      return (
        <div
          className="rounded-lg p-3"
          style={{
            borderLeft: `4px solid ${CALLOUT_COLORS[variant]}`,
            background: `color-mix(in oklab, ${CALLOUT_COLORS[variant]} 10%, transparent)`,
          }}
        >
          <select
            value={variant}
            onChange={(e) => onUpdate({ variant: e.target.value as CalloutVariant })}
            className="mb-2 rounded border px-1 py-0.5 text-xs"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--fg)',
            }}
          >
            <option value="info">Info</option>
            <option value="warn">Warning</option>
            <option value="success">Success</option>
            <option value="danger">Danger</option>
          </select>
          <AutoTextarea
            value={block.text}
            onChange={(v) => onUpdate({ text: v })}
            placeholder="Callout text…"
            className={inputCls}
          />
        </div>
      )
    }
    if (block.type === 'image') {
      return (
        <div className="flex flex-col gap-2">
          {block.src && (
            <img
              src={block.src}
              alt={block.alt ?? ''}
              className="max-h-56 w-full rounded-lg object-cover"
            />
          )}
          <input
            type="text"
            value={block.src ?? ''}
            onChange={(e) => onUpdate({ src: e.target.value })}
            placeholder="Image URL…"
            className={`${inputCls} text-sm`}
            style={{
              borderBottom: '1px solid var(--border)',
              paddingBottom: '4px',
            }}
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={block.alt ?? ''}
              onChange={(e) => onUpdate({ alt: e.target.value })}
              placeholder="Alt text"
              className={`${inputCls} flex-1 text-xs`}
              style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}
            />
            <input
              type="text"
              value={block.caption ?? ''}
              onChange={(e) => onUpdate({ caption: e.target.value })}
              placeholder="Caption"
              className={`${inputCls} flex-1 text-xs`}
              style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}
            />
          </div>
        </div>
      )
    }
    // default: paragraph
    return (
      <AutoTextarea
        value={block.text}
        onChange={(v) => onUpdate({ text: v })}
        placeholder="Write something…"
        className={inputCls}
      />
    )
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-lg p-3 transition-colors"
      style={{
        background: hovered
          ? 'color-mix(in oklab, var(--fg) 4%, transparent)'
          : 'transparent',
      }}
    >
      {hovered && (
        <div className="mb-1.5 flex items-center justify-between">{controls}</div>
      )}
      {renderInput()}
    </div>
  )
}

// ─── Main editor component ───────────────────────────────────────────────────

function NewPostEditor() {
  const [title, setTitle] = useState('')
  const [blocks, setBlocks] = useState<Block[]>([emptyBlock('paragraph')])
  const [meta, setMeta] = useState<PostMeta>(defaultMeta)
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'publish'>('general')
  const [saveStatus, setSaveStatus] = useState<'unsaved' | 'saving' | 'saved'>('unsaved')
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-save simulation
  useEffect(() => {
    if (saveStatus === 'unsaved') {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      setSaveStatus('saving')
      saveTimerRef.current = setTimeout(() => {
        setSaveStatus('saved')
      }, 1200)
    }
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [title, blocks, meta]) // eslint-disable-line react-hooks/exhaustive-deps

  function markDirty() {
    setSaveStatus('unsaved')
  }

  function updateBlock(id: string, patch: Partial<Block>) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)))
    markDirty()
  }

  function deleteBlock(id: string) {
    setBlocks((prev) => (prev.length > 1 ? prev.filter((b) => b.id !== id) : prev))
    markDirty()
  }

  function insertBlock(afterIdx: number, type: BlockType = 'paragraph') {
    const nb = emptyBlock(type)
    setBlocks((prev) => [
      ...prev.slice(0, afterIdx + 1),
      nb,
      ...prev.slice(afterIdx + 1),
    ])
    markDirty()
  }

  function moveBlock(idx: number, dir: -1 | 1) {
    const newIdx = idx + dir
    if (newIdx < 0 || newIdx >= blocks.length) return
    setBlocks((prev) => {
      const arr = [...prev]
      ;[arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]]
      return arr
    })
    markDirty()
  }

  const { score, checks } = computeSeoScore(title, blocks, meta)

  const scoreColor =
    score >= 80 ? 'var(--success)' : score >= 50 ? 'var(--warn)' : 'var(--danger)'

  const sidebarLabelCls = 'block text-xs font-semibold mb-1'
  const sidebarInputCls =
    'input-field w-full text-sm'

  return (
    <div className="flex flex-col gap-0">
      {/* Top bar */}
      <div
        className="card mb-6 flex flex-wrap items-center gap-3 p-3"
        style={{ borderRadius: '0.75rem' }}
      >
        <Link to="/admin/posts" className="button-secondary text-xs">
          ← Posts
        </Link>
        <span className="flex-1 text-sm font-medium text-[var(--fg-muted)]">
          {title || 'Untitled post'}
        </span>
        <span
          className="text-xs"
          style={{
            color:
              saveStatus === 'saved'
                ? 'var(--success)'
                : saveStatus === 'saving'
                  ? 'var(--warn)'
                  : 'var(--fg-muted)',
          }}
        >
          {saveStatus === 'saved'
            ? '✓ Auto-saved'
            : saveStatus === 'saving'
              ? '↺ Saving…'
              : '● Unsaved'}
        </span>
        <button className="button-secondary text-xs">Preview ↗</button>
        <button className="button-secondary text-xs">Save Draft</button>
        <button className="button-primary text-xs">Publish</button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Editor column */}
        <div className="min-w-0 flex-1">
          {/* Title */}
          <div className="card mb-4 p-5">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (!meta.slug) {
                  setMeta((m) => ({
                    ...m,
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/^-|-$/g, ''),
                  }))
                }
                markDirty()
              }}
              placeholder="Post title…"
              className="w-full bg-transparent text-3xl font-semibold text-[var(--fg)] outline-none placeholder:text-[var(--fg-muted)]"
            />
          </div>

          {/* Blocks */}
          <div className="card p-3">
            <div
              className="mb-2 flex flex-wrap items-center gap-1 border-b pb-3"
              style={{ borderColor: 'var(--border)' }}
            >
              {(
                [
                  'paragraph',
                  'h2',
                  'h3',
                  'quote',
                  'code',
                  'callout',
                  'divider',
                  'image',
                ] as BlockType[]
              ).map((t) => (
                <button
                  key={t}
                  onClick={() => insertBlock(blocks.length - 1, t)}
                  title={`Insert ${BLOCK_LABELS[t]}`}
                  className="rounded border px-2 py-0.5 text-xs hover:bg-[var(--surface-elev)]"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}
                >
                  + {BLOCK_LABELS[t]}
                </button>
              ))}
            </div>

            {blocks.map((block, idx) => (
              <div key={block.id}>
                <BlockRow
                  block={block}
                  onUpdate={(patch) => updateBlock(block.id, patch)}
                  onDelete={() => deleteBlock(block.id)}
                  onMoveUp={() => moveBlock(idx, -1)}
                  onMoveDown={() => moveBlock(idx, 1)}
                  canUp={idx > 0}
                  canDown={idx < blocks.length - 1}
                />
                <div className="flex justify-center py-0.5">
                  <button
                    onClick={() => insertBlock(idx)}
                    className="text-xs opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100 focus:opacity-100"
                    style={{ color: 'var(--fg-muted)' }}
                    title="Insert block here"
                  >
                    ＋
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => insertBlock(blocks.length - 1)}
              className="mt-2 w-full rounded-lg border border-dashed py-2 text-sm hover:bg-[var(--surface-elev)]"
              style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}
            >
              + Add block
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-72">
          <div className="card sticky top-4">
            {/* Tabs */}
            <div
              className="flex border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              {(['general', 'seo', 'publish'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-2.5 text-xs font-semibold capitalize transition-colors"
                  style={{
                    color: activeTab === tab ? 'var(--primary)' : 'var(--fg-muted)',
                    borderBottom:
                      activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 p-4">
              {/* ── General ── */}
              {activeTab === 'general' && (
                <>
                  <div>
                    <label className={sidebarLabelCls} style={{ color: 'var(--fg-muted)' }}>
                      Slug
                    </label>
                    <input
                      type="text"
                      value={meta.slug}
                      onChange={(e) => {
                        setMeta((m) => ({ ...m, slug: e.target.value }))
                        markDirty()
                      }}
                      placeholder="post-slug"
                      className={sidebarInputCls}
                    />
                  </div>
                  <div>
                    <label className={sidebarLabelCls} style={{ color: 'var(--fg-muted)' }}>
                      Excerpt
                    </label>
                    <textarea
                      value={meta.excerpt}
                      onChange={(e) => {
                        setMeta((m) => ({ ...m, excerpt: e.target.value }))
                        markDirty()
                      }}
                      rows={3}
                      placeholder="Short description…"
                      className={`${sidebarInputCls} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={sidebarLabelCls} style={{ color: 'var(--fg-muted)' }}>
                      Category
                    </label>
                    <select
                      value={meta.categorySlug}
                      onChange={(e) => {
                        setMeta((m) => ({ ...m, categorySlug: e.target.value }))
                        markDirty()
                      }}
                      className={sidebarInputCls}
                    >
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={sidebarLabelCls} style={{ color: 'var(--fg-muted)' }}>
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {allTags.map((tag) => {
                        const active = meta.tagSlugs.includes(tag.slug)
                        return (
                          <button
                            key={tag.slug}
                            onClick={() => {
                              setMeta((m) => ({
                                ...m,
                                tagSlugs: active
                                  ? m.tagSlugs.filter((s) => s !== tag.slug)
                                  : [...m.tagSlugs, tag.slug],
                              }))
                              markDirty()
                            }}
                            className="rounded-full border px-2.5 py-0.5 text-xs transition-colors"
                            style={{
                              borderColor: active ? 'var(--primary)' : 'var(--border)',
                              background: active
                                ? 'color-mix(in oklab, var(--primary) 15%, transparent)'
                                : 'transparent',
                              color: active ? 'var(--primary)' : 'var(--fg-muted)',
                            }}
                          >
                            {tag.name}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <label className={sidebarLabelCls} style={{ color: 'var(--fg-muted)' }}>
                      Author
                    </label>
                    <select
                      value={meta.authorSlug}
                      onChange={(e) => {
                        setMeta((m) => ({ ...m, authorSlug: e.target.value }))
                        markDirty()
                      }}
                      className={sidebarInputCls}
                    >
                      {authors.map((a) => (
                        <option key={a.slug} value={a.slug}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={sidebarLabelCls} style={{ color: 'var(--fg-muted)' }}>
                      Cover image URL
                    </label>
                    <input
                      type="text"
                      value={meta.coverImage}
                      onChange={(e) => {
                        setMeta((m) => ({ ...m, coverImage: e.target.value }))
                        markDirty()
                      }}
                      placeholder="https://…"
                      className={sidebarInputCls}
                    />
                    {meta.coverImage && (
                      <img
                        src={meta.coverImage}
                        alt="Cover preview"
                        className="mt-2 h-24 w-full rounded-lg object-cover"
                      />
                    )}
                  </div>
                </>
              )}

              {/* ── SEO ── */}
              {activeTab === 'seo' && (
                <>
                  <div>
                    <label className={sidebarLabelCls} style={{ color: 'var(--fg-muted)' }}>
                      Meta title
                      <span className="ml-1 font-normal">
                        ({meta.metaTitle.length || title.length}/60)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={meta.metaTitle || title}
                      onChange={(e) => {
                        setMeta((m) => ({ ...m, metaTitle: e.target.value }))
                        markDirty()
                      }}
                      placeholder="SEO title…"
                      className={sidebarInputCls}
                    />
                  </div>
                  <div>
                    <label className={sidebarLabelCls} style={{ color: 'var(--fg-muted)' }}>
                      Meta description
                      <span className="ml-1 font-normal">
                        ({meta.metaDesc.length}/160)
                      </span>
                    </label>
                    <textarea
                      value={meta.metaDesc}
                      onChange={(e) => {
                        setMeta((m) => ({ ...m, metaDesc: e.target.value }))
                        markDirty()
                      }}
                      rows={3}
                      placeholder="120–160 characters…"
                      className={`${sidebarInputCls} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={sidebarLabelCls} style={{ color: 'var(--fg-muted)' }}>
                      Focus keyword
                    </label>
                    <input
                      type="text"
                      value={meta.focusKW}
                      onChange={(e) => {
                        setMeta((m) => ({ ...m, focusKW: e.target.value }))
                        markDirty()
                      }}
                      placeholder="e.g. editorial workflow"
                      className={sidebarInputCls}
                    />
                  </div>
                  {/* SEO score */}
                  <div
                    className="rounded-lg p-3"
                    style={{
                      background: 'color-mix(in oklab, var(--fg) 4%, transparent)',
                    }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold">SEO score</span>
                      <span
                        className="text-lg font-bold"
                        style={{ color: scoreColor }}
                      >
                        {score}
                      </span>
                    </div>
                    <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${score}%`, background: scoreColor }}
                      />
                    </div>
                    <ul className="flex flex-col gap-1">
                      {checks.map((c) => (
                        <li
                          key={c.label}
                          className="flex items-center gap-1.5 text-xs"
                          style={{ color: c.pass ? 'var(--success)' : 'var(--fg-muted)' }}
                        >
                          <span>{c.pass ? '✓' : '○'}</span>
                          <span>{c.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* ── Publish ── */}
              {activeTab === 'publish' && (
                <>
                  <div>
                    <label className={sidebarLabelCls} style={{ color: 'var(--fg-muted)' }}>
                      Status
                    </label>
                    <select
                      value={meta.status}
                      onChange={(e) => {
                        setMeta((m) => ({ ...m, status: e.target.value as PostMeta['status'] }))
                        markDirty()
                      }}
                      className={sidebarInputCls}
                    >
                      <option>Draft</option>
                      <option>In Review</option>
                      <option>Scheduled</option>
                      <option>Published</option>
                    </select>
                  </div>
                  {meta.status === 'Scheduled' && (
                    <div>
                      <label className={sidebarLabelCls} style={{ color: 'var(--fg-muted)' }}>
                        Publish date
                      </label>
                      <input
                        type="datetime-local"
                        value={meta.publishDate}
                        onChange={(e) => {
                          setMeta((m) => ({ ...m, publishDate: e.target.value }))
                          markDirty()
                        }}
                        className={sidebarInputCls}
                      />
                    </div>
                  )}
                  <div
                    className="rounded-lg p-3 text-xs"
                    style={{
                      background: 'color-mix(in oklab, var(--fg) 4%, transparent)',
                      color: 'var(--fg-muted)',
                    }}
                  >
                    <p className="font-semibold mb-1" style={{ color: 'var(--fg)' }}>
                      Publish checklist
                    </p>
                    <ul className="flex flex-col gap-1">
                      <li style={{ color: title ? 'var(--success)' : 'var(--fg-muted)' }}>
                        {title ? '✓' : '○'} Title set
                      </li>
                      <li style={{ color: meta.slug ? 'var(--success)' : 'var(--fg-muted)' }}>
                        {meta.slug ? '✓' : '○'} Slug set
                      </li>
                      <li style={{ color: meta.excerpt ? 'var(--success)' : 'var(--fg-muted)' }}>
                        {meta.excerpt ? '✓' : '○'} Excerpt set
                      </li>
                      <li style={{ color: meta.coverImage ? 'var(--success)' : 'var(--fg-muted)' }}>
                        {meta.coverImage ? '✓' : '○'} Cover image set
                      </li>
                      <li
                        style={{
                          color:
                            score >= 60 ? 'var(--success)' : score >= 40 ? 'var(--warn)' : 'var(--danger)',
                        }}
                      >
                        {score >= 60 ? '✓' : '⚠'} SEO score {score}/100
                      </li>
                    </ul>
                  </div>
                  <button className="button-primary w-full">
                    {meta.status === 'Scheduled' ? 'Schedule post' : 'Publish now'}
                  </button>
                  <button className="button-secondary w-full">Save as Draft</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
