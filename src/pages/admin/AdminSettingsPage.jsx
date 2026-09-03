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

import { useLanguage } from '../../i18n/LanguageContext'

function AdminSettingsPage() {
  const { language } = useLanguage()

  const text = {
    en: {
      account: 'Account',
      adminSettings: 'Admin Settings',
      description:
        'Manage administrator preferences and notification settings for the JamiiMarket admin portal.',

      generalSettings: 'General Settings',
      generalDescription:
        'Configure basic preferences for the admin portal.',

      language: 'Language',
      languageDescription:
        'Choose the language used by the admin interface.',
      english: 'English',
      swahili: 'Swahili',

      compactMode: 'Compact Mode',
      compactModeDescription:
        'Use a more compact layout for admin management screens.',

      notifications: 'Notifications',
      notificationsDescription:
        'Choose which administrative notifications you want to receive.',

      emailNotifications: 'Email Notifications',
      emailNotificationsDescription:
        'Receive administrative notifications through email.',

      orderNotifications: 'Order Notifications',
      orderNotificationsDescription:
        'Receive notifications about marketplace order events.',

      paymentNotifications: 'Payment Notifications',
      paymentNotificationsDescription:
        'Receive notifications about payment events and issues.',

      securityNotifications: 'Security Notifications',
      securityNotificationsDescription:
        'Receive alerts for important account and security events.',

      security: 'Security',
      securityDescription:
        'Security controls that require backend authentication will be connected later.',

      backendSecurityRequired: 'Backend security required',
      backendSecurityDescription:
        'Password changes, authentication, JWT validation, administrator permissions, sessions, account locking and other security controls must be enforced by the backend. Browser settings alone cannot provide real security.',

      settingsSaved: 'Settings saved successfully.',
      saveSettings: 'Save Settings',
    },

    sw: {
      account: 'Akaunti',
      adminSettings: 'Mipangilio ya Admin',
      description:
        'Simamia mapendeleo ya msimamizi na mipangilio ya arifa kwa sehemu ya admin ya JamiiMarket.',

      generalSettings: 'Mipangilio ya Jumla',
      generalDescription:
        'Sanidi mapendeleo ya msingi ya sehemu ya admin.',

      language: 'Lugha',
      languageDescription:
        'Chagua lugha inayotumika kwenye interface ya admin.',
      english: 'Kiingereza',
      swahili: 'Kiswahili',

      compactMode: 'Muonekano Mzito',
      compactModeDescription:
        'Tumia mpangilio wenye nafasi ndogo zaidi kwenye sehemu za usimamizi wa admin.',

      notifications: 'Arifa',
      notificationsDescription:
        'Chagua arifa za kiutawala unazotaka kupokea.',

      emailNotifications: 'Arifa za Barua Pepe',
      emailNotificationsDescription:
        'Pokea arifa za kiutawala kupitia barua pepe.',

      orderNotifications: 'Arifa za Oda',
      orderNotificationsDescription:
        'Pokea arifa kuhusu matukio ya oda za soko.',

      paymentNotifications: 'Arifa za Malipo',
      paymentNotificationsDescription:
        'Pokea arifa kuhusu matukio na matatizo ya malipo.',

      securityNotifications: 'Arifa za Usalama',
      securityNotificationsDescription:
        'Pokea arifa kuhusu matukio muhimu ya akaunti na usalama.',

      security: 'Usalama',
      securityDescription:
        'Mipangilio ya usalama inayohitaji uthibitishaji wa backend itaunganishwa baadaye.',

      backendSecurityRequired: 'Usalama wa Backend Unahitajika',
      backendSecurityDescription:
        'Mabadiliko ya nenosiri, uthibitishaji, uhakiki wa JWT, ruhusa za wasimamizi, sessions, kufunga akaunti na mipangilio mingine ya usalama lazima idhibitiwe na backend. Mipangilio ya kivinjari pekee haiwezi kutoa usalama halisi.',

      settingsSaved: 'Mipangilio imehifadhiwa kwa mafanikio.',
      saveSettings: 'Hifadhi Mipangilio',
    },
  }

  const currentText = text[language === 'sw' ? 'sw' : 'en']

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
          {currentText.account}
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          {currentText.adminSettings}
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          {currentText.description}
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
                {currentText.generalSettings}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {currentText.generalDescription}
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
                    {currentText.language}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {currentText.languageDescription}
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
                <option value="English">
                  {currentText.english}
                </option>

                <option value="Swahili">
                  {currentText.swahili}
                </option>
              </select>
            </div>

            {/* Compact mode */}
            <SettingToggle
              icon={<Monitor size={20} />}
              title={currentText.compactMode}
              description={currentText.compactModeDescription}
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
                {currentText.notifications}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {currentText.notificationsDescription}
              </p>
            </div>
          </div>

          <div className="space-y-1 p-5 sm:p-6">
            <SettingToggle
              title={currentText.emailNotifications}
              description={currentText.emailNotificationsDescription}
              checked={settings.emailNotifications}
              onChange={(value) =>
                handleChange('emailNotifications', value)
              }
            />

            <SettingToggle
              title={currentText.orderNotifications}
              description={currentText.orderNotificationsDescription}
              checked={settings.orderNotifications}
              onChange={(value) =>
                handleChange('orderNotifications', value)
              }
            />

            <SettingToggle
              title={currentText.paymentNotifications}
              description={
                currentText.paymentNotificationsDescription
              }
              checked={settings.paymentNotifications}
              onChange={(value) =>
                handleChange('paymentNotifications', value)
              }
            />

            <SettingToggle
              title={currentText.securityNotifications}
              description={
                currentText.securityNotificationsDescription
              }
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
                {currentText.security}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {currentText.securityDescription}
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
                    {currentText.backendSecurityRequired}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    {currentText.backendSecurityDescription}
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
                {currentText.settingsSaved}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Save size={17} />
            {currentText.saveSettings}
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

