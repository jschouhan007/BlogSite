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

export type Section = {
  heading: string
  body: string[]
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
  sections: Section[]
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
    sections: [
      {
        heading: 'Why most editorial pipelines break down',
        body: [
          'The problem is rarely a lack of ideas. It is a lack of shared context. Writers, editors, and SEO leads each hold a piece of the puzzle, but without a unified system, handoffs fail and quality slips.',
          'The most common symptom is the "draft purgatory" — posts that are 80% complete but never clear the final approval gate. Fixing this requires explicit ownership at every stage, not just better tools.',
        ],
      },
      {
        heading: 'Mapping the stages from pitch to publish',
        body: [
          'A reliable pipeline has five stages: Pitch, Outline, Draft, Review, and Publish. Each stage should have a single owner, a clear definition of done, and a maximum time-in-stage SLA.',
          'The Pitch stage is often skipped, but it is the cheapest place to reject weak ideas. A two-sentence pitch — angle and reader takeaway — prevents wasted draft cycles.',
          'Review should be split into two passes: a structural pass (story logic, argument clarity) and a quality pass (SEO, accessibility, style guide). Combining them creates a bottleneck.',
        ],
      },
      {
        heading: 'SEO and performance checkpoints',
        body: [
          'Checkpoints work best when they are automated. A pre-publish checklist that runs in the editor — checking meta length, internal links, alt text, and heading hierarchy — removes the cognitive load from reviewers.',
          'Performance budgets belong in the same flow. If the cover image exceeds 200 KB or the JS bundle exceeds the budget, the publish button should be gated.',
        ],
      },
      {
        heading: 'Measuring editorial velocity without sacrificing quality',
        body: [
          'Velocity is the number of published posts per week divided by total drafts in progress. A ratio below 0.25 signals a pipeline blockage — too many drafts, too few completions.',
          'Track time-in-stage per post type. A 1,500-word how-to should have different SLAs than a 3,000-word research piece. Comparing them distorts your data and demoralises writers.',
          'Run a monthly pipeline retrospective. The single question worth answering: which stage caused the most delays, and what is the one change that would unblock it?',
        ],
      },
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
    sections: [
      {
        heading: 'The problem with most SEO checklists',
        body: [
          'Most SEO checklists have thirty items. They read like compliance documents. Writers open them once, feel overwhelmed, and never open them again.',
          'The goal of an SEO scorecard is not perfect coverage — it is behavioural change at the moment of writing. That requires brevity and immediacy.',
        ],
      },
      {
        heading: 'The minimum viable SEO scorecard',
        body: [
          'Five signals catch 80% of structural SEO mistakes before publish: a single H1 matching the focus keyphrase, meta title within the 50–60 character window, meta description between 120 and 160 characters, at least two internal links, and one image with a descriptive alt attribute.',
          'Each signal should be binary: pass or fail. Scores and percentages introduce ambiguity. "4 out of 5" still lets writers publish with a missing canonical or empty alt text.',
        ],
      },
      {
        heading: 'Where to embed the scorecard',
        body: [
          'The best location is the editor sidebar, surfaced only when the writer is about to hit "Submit for Review". Showing it during drafting creates anxiety; showing it at the end creates a gate with purpose.',
          'Publish-blocking signals should be limited to three at most. If every signal blocks, writers learn to game the system by stuffing keywords rather than writing for readers.',
        ],
      },
      {
        heading: 'Scaling the scorecard over time',
        body: [
          'After six months, audit your blocked-publish events. Which signals fired most often? Which were false positives that writers routinely overrode? Prune accordingly.',
          'Add signals only when you have data proving they correlate with ranking outcomes for your domain. Generic SEO best practice does not always apply to your specific content model.',
        ],
      },
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
    sections: [
      {
        heading: 'Measure: the most underrated typography decision',
        body: [
          'Measure is the number of characters per line. Research converges on 65–75 characters as optimal for long-form reading. Wider than that and the eye struggles to track from line end to line start; narrower and the rhythm feels choppy.',
          'On a 1280px viewport, a max-width of 680px on body text hits the sweet spot. Resist the temptation to fill the full width — negative space is not wasted space.',
        ],
      },
      {
        heading: 'Spacing and vertical rhythm',
        body: [
          'Vertical rhythm is the consistent spacing between text elements. When paragraphs, headings, and blockquotes follow the same base unit (typically 8px or 4px), the page feels intentional even to readers who cannot articulate why.',
          'The most common mistake is tight line height on body text. A line-height of 1.7–1.8 for body copy at 17–18px feels generous and fatigue-free on mobile.',
        ],
      },
      {
        heading: 'Motion that respects attention',
        body: [
          'Animation should serve function, not decoration. A reading progress bar, a smooth scroll-to-TOC anchor, and a subtle card hover-lift all communicate state without interrupting reading.',
          'Always respect prefers-reduced-motion. Wrap every transition in a media query and test with motion disabled — your animations should degrade to instant state changes, not disappear in jarring flashes.',
        ],
      },
      {
        heading: 'Dark mode as a first-class reading experience',
        body: [
          'Dark mode for reading is not the inverse of light mode — it is a separate typographic context. Background luminance of #0b1116 with body text at #e2e8f0 yields a contrast ratio above 15:1, well beyond WCAG AA.',
          'Watch out for images: a pure-white cover image burns on a dark background. Use an image container with a slight darkening overlay, or source images with mid-tone backgrounds.',
        ],
      },
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
    sections: [
      {
        heading: 'What content decay looks like in the data',
        body: [
          'Decay is not a single drop — it is a slow slope. A post ranked in position 4 for eighteen months quietly slides to position 11 over six weeks. Sessions fall 40%, but the post still shows up in your "top content" report because it was once a traffic driver.',
          'The signal to watch is the gap between Google Search Console impressions and clicks. A post with high impressions but falling CTR is still visible but losing its compelling edge — title or meta description work will often fix it before a full rewrite is needed.',
        ],
      },
      {
        heading: 'Building the refresh queue',
        body: [
          'The queue should be driven by two criteria: traffic potential (high impressions, ranking 8–20) and decay rate (30-day traffic down more than 30% versus prior 30 days). Posts that meet both criteria are your highest-ROI refresh candidates.',
          'Sort by potential first, not urgency. Refreshing a high-decay, low-traffic post wastes editorial time. Refreshing a high-impressions post ranking at position 12 can deliver a 3–5× traffic lift with minimal work.',
        ],
      },
      {
        heading: 'The refresh playbook',
        body: [
          'Start with the headline. A stale year in the title ("/in 2023") is the cheapest refresh: update it, re-submit to Search Console, and track impressions for two weeks.',
          'Next, audit the content against the current SERP. What are the top three ranking pages covering that your post does not? Add a section. Update statistics. Expand any section that feels thin relative to competitors.',
          'Finally, update internal links. Add two links from newer high-authority posts pointing to the refreshed URL, then re-submit the sitemap.',
        ],
      },
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

export function getAdjacentPosts(slug: string): { prev: Post | null; next: Post | null } {
  const idx = posts.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  }
}
