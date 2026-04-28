export type Author = {
  slug: string
  name: string
  role: string
  bio: string
  avatar: string
}

export type Category = {
  slug: string
  name: string
  description: string
}

export type Tag = {
  slug: string
  name: string
}

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: Category
  tags: Tag[]
  author: Author
  publishedAt: string
  readingTime: string
  featured?: boolean
  trending?: boolean
  coverImage: string
  body: string[]
}

export const authors: Author[] = [
  {
    slug: 'jasmin-cho',
    name: 'Jasmin Cho',
    role: 'Editor-in-Chief',
    bio: 'Leads editorial strategy with a focus on premium storytelling and clarity.',
    avatar:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=128&h=128&q=80',
  },
  {
    slug: 'ravi-patel',
    name: 'Ravi Patel',
    role: 'SEO Lead',
    bio: 'Turns search insights into scalable content architecture.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=128&h=128&q=80',
  },
  {
    slug: 'mira-das',
    name: 'Mira Das',
    role: 'Product Writer',
    bio: 'Writes at the intersection of product design and growth.',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=128&h=128&q=80',
  },
]

export const categories: Category[] = [
  {
    slug: 'editorial',
    name: 'Editorial Craft',
    description: 'Storytelling frameworks and writing systems for modern publishers.',
  },
  {
    slug: 'seo',
    name: 'SEO Systems',
    description: 'Structured content architecture for durable search growth.',
  },
  {
    slug: 'product',
    name: 'Product & Design',
    description: 'UX, performance, and accessibility decisions that shape readers.',
  },
  {
    slug: 'analytics',
    name: 'Audience Insights',
    description: 'Metrics and experiments that keep content evergreen.',
  },
]

export const tags: Tag[] = [
  { slug: 'content-strategy', name: 'Content Strategy' },
  { slug: 'performance', name: 'Performance' },
  { slug: 'growth', name: 'Growth' },
  { slug: 'design-systems', name: 'Design Systems' },
]

export const posts: Post[] = [
  {
    slug: 'editorial-operating-system',
    title: 'The Editorial Operating System: From Pitch to Publish',
    excerpt:
      'A blueprint for transforming scattered drafts into a production-grade publishing pipeline that scales.',
    category: categories[0],
    tags: [tags[0], tags[2]],
    author: authors[0],
    publishedAt: '2026-04-21',
    readingTime: '6 min read',
    featured: true,
    trending: true,
    coverImage:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    body: [
      'A modern editorial team needs more than a calendar. It needs clear ownership, trusted workflows, and a system that catches quality issues early.',
      'In this guide we map the journey from ideation to publish, with checkpoints for SEO, accessibility, and performance budgets.',
      'The result is a repeatable editorial operating system that keeps teams aligned without slowing velocity.',
    ],
  },
  {
    slug: 'seo-scorecards-that-ship',
    title: 'SEO Scorecards That Actually Ship Content',
    excerpt:
      'Build lightweight SEO guardrails that empower writers instead of slowing them down.',
    category: categories[1],
    tags: [tags[0], tags[1]],
    author: authors[1],
    publishedAt: '2026-04-18',
    readingTime: '5 min read',
    trending: true,
    coverImage:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    body: [
      'Scorecards work when they are brief, visible, and attached to the publishing flow. Anything else becomes a spreadsheet that no one opens.',
      'We break down the minimum viable SEO checklist that catches structural mistakes before a post goes live.',
      'Use these signals to build momentum while keeping search health strong.',
    ],
  },
  {
    slug: 'designing-for-reader-focus',
    title: 'Designing for Reader Focus in 2026',
    excerpt:
      'Typography, spacing, and motion decisions that keep readers immersed.',
    category: categories[2],
    tags: [tags[3], tags[1]],
    author: authors[2],
    publishedAt: '2026-04-13',
    readingTime: '7 min read',
    coverImage:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    body: [
      'Readers stay longer when the reading experience feels effortless. That means clear hierarchy, smart measure, and calm surfaces.',
      'We outline the design decisions that keep attention on the story, not the interface.',
      'Pair these with performance budgets to deliver a premium editorial feel.',
    ],
  },
  {
    slug: 'turning-analytics-into-refresh-queues',
    title: 'Turning Analytics into a Content Refresh Queue',
    excerpt:
      'Detect decay early and prioritize refreshes that move organic traffic.',
    category: categories[3],
    tags: [tags[2]],
    author: authors[1],
    publishedAt: '2026-04-08',
    readingTime: '4 min read',
    coverImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    body: [
      'Analytics should do more than report. They should drive a prioritized backlog for editorial updates.',
      'We share the signals that highlight decaying posts and the refresh playbooks that recover rankings.',
      'Use this approach to keep evergreen libraries performing year-round.',
    ],
  },
]

export const siteLinks = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function getLatestPosts(count = 3) {
  return [...posts].slice(0, count)
}

export function getTrendingPosts(count = 3) {
  return posts.filter((post) => post.trending).slice(0, count)
}

export function getFeaturedPost() {
  return posts.find((post) => post.featured) ?? posts[0]
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug)
}

export function getPostsByCategory(slug: string) {
  return posts.filter((post) => post.category.slug === slug)
}

export function getPostsByTag(slug: string) {
  return posts.filter((post) => post.tags.some((tag) => tag.slug === slug))
}

export function getPostsByAuthor(slug: string) {
  return posts.filter((post) => post.author.slug === slug)
}
