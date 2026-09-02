import { useEffect, useState } from 'react'
import {
  Bell,
  Globe,
  LockKeyhole,
  Monitor,
  Save,
  Settings,
  ShieldCheck,
} from 'lucide-react'

function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    language: 'English',
    emailNotifications: true,
    orderNotifications: true,
    paymentNotifications: true,
    securityNotifications: true,
    compactMode: false,
  })

  const [saved, setSaved] = useState(false)

  // Load saved administrator settings
  useEffect(() => {
    const storedSettings = localStorage.getItem(
      'jamiiMarketAdminSettings'
    )

    if (!storedSettings) {
      return
    }

    try {
      const parsedSettings = JSON.parse(storedSettings)

      setSettings((currentSettings) => ({
        ...currentSettings,
        ...parsedSettings,
      }))
    } catch {
      console.error('Unable to load administrator settings.')
    }
  }, [])

  // Update a settings value
  const handleChange = (name, value) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [name]: value,
    }))

    setSaved(false)
  }

  // Save administrator settings
  const handleSubmit = (event) => {
    event.preventDefault()

    localStorage.setItem(
      'jamiiMarketAdminSettings',
      JSON.stringify(settings)
    )

    setSaved(true)
  }

  return (
    <section className="space-y-6">
      {/* Page heading */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Account
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Admin Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Manage administrator preferences and notification
          settings for the JamiiMarket admin portal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General settings */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-start gap-4 border-b border-slate-100 p-5 sm:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Settings size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                General Settings
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Configure basic preferences for the admin portal.
              </p>
            </div>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            {/* Language */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <Globe
                  size={20}
                  className="mt-0.5 shrink-0 text-slate-500"
                />

                <div>
                  <p className="font-semibold text-slate-800">
                    Language
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Choose the language used by the admin interface.
                  </p>
                </div>
              </div>

              <select
                value={settings.language}
                onChange={(event) =>
                  handleChange('language', event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="English">English</option>
                <option value="Swahili">Swahili</option>
              </select>
            </div>

            {/* Compact mode */}
            <SettingToggle
              icon={<Monitor size={20} />}
              title="Compact Mode"
              description="Use a more compact layout for admin management screens."
              checked={settings.compactMode}
              onChange={(value) =>
                handleChange('compactMode', value)
              }
            />
          </div>
        </div>

        {/* Notification settings */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-start gap-4 border-b border-slate-100 p-5 sm:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Bell size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose which administrative notifications you want
                to receive.
              </p>
            </div>
          </div>

          <div className="space-y-1 p-5 sm:p-6">
            <SettingToggle
              title="Email Notifications"
              description="Receive administrative notifications through email."
              checked={settings.emailNotifications}
              onChange={(value) =>
                handleChange('emailNotifications', value)
              }
            />

            <SettingToggle
              title="Order Notifications"
              description="Receive notifications about marketplace order events."
              checked={settings.orderNotifications}
              onChange={(value) =>
                handleChange('orderNotifications', value)
              }
            />

            <SettingToggle
              title="Payment Notifications"
              description="Receive notifications about payment events and issues."
              checked={settings.paymentNotifications}
              onChange={(value) =>
                handleChange('paymentNotifications', value)
              }
            />

            <SettingToggle
              title="Security Notifications"
              description="Receive alerts for important account and security events."
              checked={settings.securityNotifications}
              onChange={(value) =>
                handleChange('securityNotifications', value)
              }
            />
          </div>
        </div>

        {/* Security information */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-start gap-4 border-b border-slate-100 p-5 sm:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <LockKeyhole size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Security
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Security controls that require backend authentication
                will be connected later.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
              <div className="flex gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-amber-600"
                />

                <div>
                  <h3 className="font-semibold text-amber-900">
                    Backend security required
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    Password changes, authentication, JWT
                    validation, administrator permissions, sessions,
                    account locking and other security controls must
                    be enforced by the backend. Browser settings alone
                    cannot provide real security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save settings */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {saved && (
              <p className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                <Save size={17} />
                Settings saved successfully.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Save size={17} />
            Save Settings
          </button>
        </div>
      </form>
    </section>
  )
}

// Reusable settings toggle
function SettingToggle({
  icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl p-3 transition hover:bg-slate-50">
      <div className="flex min-w-0 gap-3">
        {icon && (
          <div className="mt-0.5 shrink-0 text-slate-500">
            {icon}
          </div>
        )}

        <div>
          <p className="font-semibold text-slate-800">
            {title}
          </p>

          <p className="mt-1 text-sm leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? 'bg-indigo-600' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </div>
  )
}

export default AdminSettingsPage

