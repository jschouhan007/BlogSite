import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/settings')({
  component: AdminSettingsPage,
})

const tabs = ['General', 'Navigation', 'Integrations', 'SEO Defaults', 'Email']

function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6">
        <p className="badge">Admin</p>
        <h1 className="display-title mt-3 text-3xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          Site-wide configuration, branding, integrations, and defaults.
        </p>
      </div>

      <div className="card p-6">
        <div className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-4">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={i === 0 ? 'button-primary text-xs' : 'button-secondary text-xs'}
            >
              {tab}
            </button>
          ))}
        </div>

        <form className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold" htmlFor="site-name">
              Site name
            </label>
            <input
              id="site-name"
              type="text"
              defaultValue="BlogSite"
              className="input-field"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold" htmlFor="site-tagline">
              Tagline
            </label>
            <input
              id="site-tagline"
              type="text"
              defaultValue="Editorial OS — Premium Publishing"
              className="input-field"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold" htmlFor="site-url">
              Site URL
            </label>
            <input
              id="site-url"
              type="url"
              defaultValue="https://blogsite.io"
              className="input-field"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold" htmlFor="site-lang">
              Default language
            </label>
            <select id="site-lang" className="input-field">
              <option value="en">English (en)</option>
              <option value="es">Español (es)</option>
              <option value="fr">Français (fr)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-semibold" htmlFor="site-desc">
              Site description
            </label>
            <textarea
              id="site-desc"
              rows={3}
              defaultValue="A premium, SEO-first editorial platform with lightning-fast reading experiences and workflow-ready publishing."
              className="input-field"
            />
          </div>

          <div className="md:col-span-2">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--fg-muted)]">
              Social links
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {['Twitter / X', 'LinkedIn', 'GitHub', 'RSS feed'].map((sn) => (
                <div key={sn} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[var(--fg-muted)]">
                    {sn}
                  </label>
                  <input
                    type="url"
                    placeholder={`https://…`}
                    className="input-field text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 md:col-span-2">
            <button type="button" className="button-primary">
              Save changes
            </button>
            <button type="button" className="button-secondary">
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
