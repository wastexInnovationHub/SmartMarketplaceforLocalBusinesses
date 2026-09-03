import { useEffect, useState } from 'react'
import {
  Bell,
  Check,
  Globe,
  LayoutDashboard,
  Save,
  Settings,
  ShieldCheck,
} from 'lucide-react'

const defaultSettings = {
  language: 'English',
  orderNotifications: true,
  deliveryNotifications: true,
  paymentNotifications: true,
  accountNotifications: true,
  compactMode: false,
}

function BusinessSettingsPage() {
  const [settings, setSettings] = useState(defaultSettings)
  const [saved, setSaved] = useState(false)

  // Load business settings from local storage
  useEffect(() => {
    const savedSettings = localStorage.getItem(
      'jamiiMarketBusinessSettings'
    )

    if (savedSettings) {
      try {
        setSettings({
          ...defaultSettings,
          ...JSON.parse(savedSettings),
        })
      } catch {
        setSettings(defaultSettings)
      }
    }
  }, [])

  // Update a setting
  const updateSetting = (name, value) => {
    setSettings((current) => ({
      ...current,
      [name]: value,
    }))

    setSaved(false)
  }

  // Save business settings
  const handleSave = () => {
    localStorage.setItem(
      'jamiiMarketBusinessSettings',
      JSON.stringify(settings)
    )

    setSaved(true)

    window.setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F2F0] text-[#326460]">
            <Settings size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#1B1C1C]">
              Business Settings
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your business account preferences
            </p>
          </div>
        </div>
      </div>

      {/* Save confirmation */}
      {saved && (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <Check size={18} />
          <span>Business settings saved successfully.</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Main settings */}
        <div className="space-y-6 lg:col-span-2">

          {/* Language and appearance */}
          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E7F2F0] text-[#326460]">
                  <Globe size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-[#1B1C1C]">
                    Language & Appearance
                  </h2>

                  <p className="text-sm text-gray-500">
                    Customize how your business dashboard appears
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5 px-5 py-5 sm:px-6">

              {/* Language */}
              <div>
                <label
                  htmlFor="language"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Language
                </label>

                <select
                  id="language"
                  value={settings.language}
                  onChange={(event) =>
                    updateSetting(
                      'language',
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10 sm:max-w-md"
                >
                  <option value="English">
                    English
                  </option>

                  <option value="Swahili">
                    Kiswahili
                  </option>
                </select>

                <p className="mt-2 text-xs text-gray-500">
                  Language switching will be fully connected
                  to localization later.
                </p>
              </div>

              {/* Compact mode */}
              <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Compact dashboard
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Use a more compact layout when viewing
                    business management pages.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateSetting(
                      'compactMode',
                      !settings.compactMode
                    )
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    settings.compactMode
                      ? 'bg-[#326460]'
                      : 'bg-gray-300'
                  }`}
                  aria-label="Toggle compact dashboard"
                  aria-pressed={settings.compactMode}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                      settings.compactMode
                        ? 'left-6'
                        : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Notification settings */}
          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E7F2F0] text-[#326460]">
                  <Bell size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-[#1B1C1C]">
                    Notifications
                  </h2>

                  <p className="text-sm text-gray-500">
                    Choose which business notifications you
                    want to receive
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">

              {/* Order notifications */}
              <SettingToggle
                title="Order notifications"
                description="Receive notifications when customers place or update orders."
                checked={settings.orderNotifications}
                onChange={() =>
                  updateSetting(
                    'orderNotifications',
                    !settings.orderNotifications
                  )
                }
              />

              {/* Delivery notifications */}
              <SettingToggle
                title="Delivery notifications"
                description="Receive updates about pickup, delivery and rider activity."
                checked={settings.deliveryNotifications}
                onChange={() =>
                  updateSetting(
                    'deliveryNotifications',
                    !settings.deliveryNotifications
                  )
                }
              />

              {/* Payment notifications */}
              <SettingToggle
                title="Payment notifications"
                description="Receive updates about payment and transaction activity."
                checked={settings.paymentNotifications}
                onChange={() =>
                  updateSetting(
                    'paymentNotifications',
                    !settings.paymentNotifications
                  )
                }
              />

              {/* Account notifications */}
              <SettingToggle
                title="Account notifications"
                description="Receive important account and security notifications."
                checked={settings.accountNotifications}
                onChange={() =>
                  updateSetting(
                    'accountNotifications',
                    !settings.accountNotifications
                  )
                }
              />
            </div>
          </section>

          {/* Save button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#326460] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#28524F] focus:outline-none focus:ring-2 focus:ring-[#326460]/20"
            >
              <Save size={18} />
              Save Settings
            </button>
          </div>
        </div>

        {/* Information panel */}
        <div className="space-y-6">

          {/* Account preferences */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E7F2F0] text-[#326460]">
                <LayoutDashboard size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-[#1B1C1C]">
                  Account Preferences
                </h2>

                <p className="text-xs text-gray-500">
                  Current dashboard preferences
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <InfoRow
                label="Language"
                value={settings.language}
              />

              <InfoRow
                label="Compact Mode"
                value={
                  settings.compactMode
                    ? 'Enabled'
                    : 'Disabled'
                }
              />

              <InfoRow
                label="Order Alerts"
                value={
                  settings.orderNotifications
                    ? 'Enabled'
                    : 'Disabled'
                }
              />

              <InfoRow
                label="Delivery Alerts"
                value={
                  settings.deliveryNotifications
                    ? 'Enabled'
                    : 'Disabled'
                }
              />
            </div>
          </section>

          {/* Security notice */}
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-amber-700"
              />

              <div>
                <h2 className="font-semibold text-amber-900">
                  Security
                </h2>

                <p className="mt-2 text-sm leading-6 text-amber-800">
                  These settings are currently stored in
                  your browser for the frontend prototype.
                  Authentication, permissions, sessions and
                  security controls must be enforced by the
                  JamiiMarket backend.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

// Reusable settings toggle
function SettingToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-5 sm:px-6">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-800">
          {title}
        </p>

        <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? 'bg-[#326460]'
            : 'bg-gray-300'
        }`}
        aria-label={`Toggle ${title}`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked
              ? 'left-6'
              : 'left-1'
          }`}
        />
      </button>
    </div>
  )
}

// Reusable information row
function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-gray-800">
        {value}
      </span>
    </div>
  )
}

export default BusinessSettingsPage

