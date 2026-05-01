import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: 'Privacy Policy — BlogSite' },
      {
        name: 'description',
        content: 'How BlogSite collects, uses, and protects your data.',
      },
    ],
  }),
})

const lastUpdated = 'April 28, 2026'

const sections = [
  {
    heading: '1. What we collect',
    body: [
      'BlogSite collects only the data necessary to operate the service and improve the reading experience. We collect:',
      '• Email address — when you subscribe to the newsletter or create an account.',
      '• Usage data — anonymised page views, scroll depth, and read time, collected via Plausible Analytics (no cookies, no cross-site tracking, fully GDPR-compliant).',
      '• Submitted content — comments, contact form messages, and newsletter unsubscribe requests.',
      'We do not use tracking pixels, advertising cookies, or third-party analytics that share data with ad networks.',
    ],
  },
  {
    heading: '2. How we use your data',
    body: [
      'Your email address is used exclusively to send the newsletter you subscribed to. We do not sell, rent, or share your email address with any third party.',
      'Usage data is used in aggregate to understand which content is most valuable to readers and to prioritise the editorial roadmap. It is never linked to personally identifiable information.',
      'Contact form submissions are used only to respond to your enquiry and are deleted after 90 days.',
    ],
  },
  {
    heading: '3. Cookies',
    body: [
      'BlogSite stores a single first-party cookie: your theme preference (light / dark / auto). This cookie contains no personal data and is never sent to a third party.',
      'Plausible Analytics, our traffic analysis tool, is cookieless by design. No analytics cookies are set.',
    ],
  },
  {
    heading: '4. Data retention',
    body: [
      'Newsletter subscriber records are retained until you unsubscribe. Upon unsubscription, your email is permanently deleted within 7 days.',
      'Usage analytics data is stored for 24 months in aggregate form only.',
      'Contact form data is deleted after 90 days.',
    ],
  },
  {
    heading: '5. Your rights',
    body: [
      'You have the right to access, correct, or delete any personal data we hold about you. To exercise these rights, email privacy@blogsite.io.',
      'If you are in the European Economic Area, you are also entitled to data portability and the right to lodge a complaint with your local data protection authority.',
      'We will respond to all privacy requests within 30 days.',
    ],
  },
  {
    heading: '6. Third-party services',
    body: [
      'BlogSite uses the following sub-processors:',
      '• Resend — transactional and newsletter email delivery. Resend processes your email address on our behalf.',
      '• Cloudflare — CDN and DDoS protection. Cloudflare processes request metadata (IP address) as a transit provider.',
      '• Supabase / Lovable Cloud — database and authentication hosting. Your data is stored in EU-West-1 (Ireland) by default.',
      'Each sub-processor is bound by a Data Processing Agreement and operates under GDPR-compliant terms.',
    ],
  },
  {
    heading: '7. Security',
    body: [
      'All data in transit is encrypted using TLS 1.2 or higher. Data at rest is encrypted using AES-256.',
      'Access to production data is restricted to authorised personnel on a least-privilege basis. We conduct annual security reviews.',
    ],
  },
  {
    heading: '8. Changes to this policy',
    body: [
      'We may update this policy from time to time. The "Last updated" date at the top of this page will reflect the most recent revision. Material changes will be communicated to newsletter subscribers by email.',
    ],
  },
  {
    heading: '9. Contact',
    body: [
      'Questions about this policy? Email privacy@blogsite.io or write to:',
      'BlogSite Privacy · 1 Editorial Way · London · EC1A 1BB · United Kingdom',
    ],
  },
]

function PrivacyPage() {
  return (
    <main className="page-wrap px-4 py-12">
      <article className="card p-8">
        <p className="badge">Privacy Policy</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          Privacy-first publishing
        </h1>
        <p className="mt-3 text-sm text-[var(--fg-muted)]">
          Last updated: {lastUpdated}
        </p>
        <p className="prose prose-slate mt-4 max-w-none text-base leading-relaxed">
          BlogSite is built on the principle that you should be able to read,
          write, and subscribe without being tracked across the web. This policy
          explains what data we collect, why, and how you control it.
        </p>
        <div className="mt-8 flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              <div className="prose prose-slate mt-3 max-w-none">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>
    </main>
  )
}
