import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: 'Terms of Service — BlogSite' },
      {
        name: 'description',
        content: 'The terms and conditions governing use of BlogSite.',
      },
    ],
  }),
})

const lastUpdated = 'April 28, 2026'

const sections = [
  {
    heading: '1. Acceptance of terms',
    body: [
      'By accessing or using BlogSite (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, you may not use the Service.',
      'These Terms apply to all visitors, readers, subscribers, and registered users of the Service.',
    ],
  },
  {
    heading: '2. The Service',
    body: [
      'BlogSite is an editorial publishing platform. We provide access to articles, newsletters, and related content produced by the BlogSite editorial team and registered authors.',
      'We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice where practicable.',
    ],
  },
  {
    heading: '3. User accounts',
    body: [
      'To contribute content or access premium features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.',
      'You must not share your account credentials or allow unauthorised access to your account. Notify us immediately at support@blogsite.io if you suspect unauthorised use.',
      'We reserve the right to suspend or terminate accounts that violate these Terms.',
    ],
  },
  {
    heading: '4. Content and intellectual property',
    body: [
      'All original content published on BlogSite — including articles, graphics, and brand assets — is the intellectual property of BlogSite or its respective authors and is protected by copyright law.',
      'You may quote up to 150 words from any article, provided you attribute BlogSite and link to the original URL. Reproduction of full articles requires prior written permission.',
      'By submitting content to BlogSite (comments, guest posts, letters), you grant BlogSite a non-exclusive, royalty-free licence to publish, edit, and distribute that content on the Service.',
    ],
  },
  {
    heading: '5. Acceptable use',
    body: [
      'You agree not to:',
      '• Use the Service for any unlawful purpose or in violation of any applicable laws.',
      '• Post content that is defamatory, obscene, hateful, or infringes a third party\'s intellectual property rights.',
      '• Attempt to gain unauthorised access to any part of the Service or its infrastructure.',
      '• Use automated tools (scrapers, bots) to access the Service at a rate that degrades performance for other users.',
      '• Submit false, misleading, or spam content via comments or contact forms.',
    ],
  },
  {
    heading: '6. Newsletter and communications',
    body: [
      'By subscribing to the BlogSite newsletter, you consent to receive weekly editorial communications at the email address you provide. You may unsubscribe at any time via the link in each email.',
      'We may send transactional emails related to your account (password resets, subscription confirmations). These cannot be opted out of while your account is active.',
    ],
  },
  {
    heading: '7. Disclaimer of warranties',
    body: [
      'The Service is provided "as is" without warranties of any kind, express or implied. BlogSite does not warrant that the Service will be error-free, uninterrupted, or free of harmful components.',
      'Content on the Service is intended for informational purposes only and should not be relied upon as professional advice (legal, financial, medical, or otherwise).',
    ],
  },
  {
    heading: '8. Limitation of liability',
    body: [
      'To the maximum extent permitted by applicable law, BlogSite shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Service.',
      'Our total liability for any claim arising from these Terms shall not exceed the amount you paid to us in the twelve months preceding the claim, or £100, whichever is greater.',
    ],
  },
  {
    heading: '9. Governing law',
    body: [
      'These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
    ],
  },
  {
    heading: '10. Changes to these Terms',
    body: [
      'We may update these Terms from time to time. The "Last updated" date at the top reflects the most recent revision. Continued use of the Service after changes constitutes acceptance of the updated Terms.',
      'For material changes, we will notify registered users by email at least 14 days before the changes take effect.',
    ],
  },
  {
    heading: '11. Contact',
    body: [
      'Questions about these Terms? Email legal@blogsite.io or write to:',
      'BlogSite Legal · 1 Editorial Way · London · EC1A 1BB · United Kingdom',
    ],
  },
]

function TermsPage() {
  return (
    <main className="page-wrap px-4 py-12">
      <article className="card p-8">
        <p className="badge">Terms of Service</p>
        <h1 className="display-title mt-4 text-4xl font-semibold">
          BlogSite terms of service
        </h1>
        <p className="mt-3 text-sm text-[var(--fg-muted)]">
          Last updated: {lastUpdated}
        </p>
        <p className="prose prose-slate mt-4 max-w-none text-base leading-relaxed">
          Please read these terms carefully before using BlogSite. They outline
          your rights and obligations as a reader, subscriber, or registered
          author on the platform.
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
