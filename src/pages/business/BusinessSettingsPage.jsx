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

import { useLanguage } from '../../i18n/LanguageContext'

const defaultSettings = {
language: 'English',
orderNotifications: true,
deliveryNotifications: true,
paymentNotifications: true,
accountNotifications: true,
compactMode: false,
}

function BusinessSettingsPage() {
const { language } = useLanguage()

const text = {
en: {
businessSettings: 'Business Settings',
pageDescription:
'Manage your business account preferences',


  savedMessage:
    'Business settings saved successfully.',

  languageAppearance: 'Language & Appearance',
  languageAppearanceDescription:
    'Customize how your business dashboard appears',

  language: 'Language',
  english: 'English',
  swahili: 'Kiswahili',
  languageNote:
    'Use the language switcher in the navigation bar to change the dashboard language.',

  compactDashboard: 'Compact dashboard',
  compactDashboardDescription:
    'Use a more compact layout when viewing business management pages.',
  enabled: 'Enabled',
  disabled: 'Disabled',

  notifications: 'Notifications',
  notificationsDescription:
    'Choose which business notifications you want to receive',

  orderNotifications: 'Order notifications',
  orderNotificationsDescription:
    'Receive notifications when customers place or update orders.',

  deliveryNotifications: 'Delivery notifications',
  deliveryNotificationsDescription:
    'Receive updates about pickup, delivery and rider activity.',

  paymentNotifications: 'Payment notifications',
  paymentNotificationsDescription:
    'Receive updates about payment and transaction activity.',

  accountNotifications: 'Account notifications',
  accountNotificationsDescription:
    'Receive important account and security notifications.',

  saveSettings: 'Save Settings',

  accountPreferences: 'Account Preferences',
  accountPreferencesDescription:
    'Current dashboard preferences',

  compactMode: 'Compact Mode',
  orderAlerts: 'Order Alerts',
  deliveryAlerts: 'Delivery Alerts',

  security: 'Security',
  securityDescription:
    'These settings are currently stored in your browser for the frontend prototype. Authentication, permissions, sessions and security controls must be enforced by the JamiiMarket backend.',
},

sw: {
  businessSettings: 'Mipangilio ya Biashara',
  pageDescription:
    'Simamia mapendeleo ya akaunti ya biashara yako',

  savedMessage:
    'Mipangilio ya biashara imehifadhiwa kwa mafanikio.',

  languageAppearance: 'Lugha na Mwonekano',
  languageAppearanceDescription:
    'Customize jinsi dashibodi ya biashara yako inavyoonekana',

  language: 'Lugha',
  english: 'English',
  swahili: 'Kiswahili',
  languageNote:
    'Tumia kitufe cha lugha kwenye upau wa juu kubadilisha lugha ya dashibodi.',

  compactDashboard: 'Dashibodi iliyopunguzwa',
  compactDashboardDescription:
    'Tumia mpangilio mfupi zaidi unapotazama kurasa za usimamizi wa biashara.',
  enabled: 'Imewashwa',
  disabled: 'Imezimwa',

  notifications: 'Arifa',
  notificationsDescription:
    'Chagua arifa za biashara unazotaka kupokea',

  orderNotifications: 'Arifa za Oda',
  orderNotificationsDescription:
    'Pokea arifa wateja wanapoweka au kusasisha oda.',

  deliveryNotifications: 'Arifa za Usafirishaji',
  deliveryNotificationsDescription:
    'Pokea taarifa kuhusu uchukuaji, usafirishaji na shughuli za wasafirishaji.',

  paymentNotifications: 'Arifa za Malipo',
  paymentNotificationsDescription:
    'Pokea taarifa kuhusu malipo na shughuli za miamala.',

  accountNotifications: 'Arifa za Akaunti',
  accountNotificationsDescription:
    'Pokea arifa muhimu kuhusu akaunti na usalama.',

  saveSettings: 'Hifadhi Mipangilio',

  accountPreferences: 'Mapendeleo ya Akaunti',
  accountPreferencesDescription:
    'Mapendeleo ya sasa ya dashibodi',

  compactMode: 'Hali Fupi',
  orderAlerts: 'Arifa za Oda',
  deliveryAlerts: 'Arifa za Usafirishaji',

  security: 'Usalama',
  securityDescription:
    'Mipangilio hii kwa sasa imehifadhiwa kwenye kivinjari chako kwa ajili ya prototype ya frontend. Uthibitishaji, ruhusa, sessions na udhibiti wa usalama lazima utekelezwe na backend ya JamiiMarket.',
},


}

const currentText = language === 'sw' ? text.sw : text.en

const [settings, setSettings] = useState({
...defaultSettings,
language: language === 'sw' ? 'Swahili' : 'English',
})

const [saved, setSaved] = useState(false)

// Load business settings from local storage
useEffect(() => {
const savedSettings = localStorage.getItem(
'jamiiMarketBusinessSettings',
)


if (savedSettings) {
  try {
    setSettings({
      ...defaultSettings,
      ...JSON.parse(savedSettings),
      language:
        language === 'sw'
          ? 'Swahili'
          : 'English',
    })
  } catch {
    setSettings({
      ...defaultSettings,
      language:
        language === 'sw'
          ? 'Swahili'
          : 'English',
    })
  }
} else {
  setSettings((current) => ({
    ...current,
    language:
      language === 'sw'
        ? 'Swahili'
        : 'English',
  }))
}


}, [language])

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
JSON.stringify(settings),
)

```
setSaved(true)

window.setTimeout(() => {
  setSaved(false)
}, 3000)
```

}

return ( <div className="space-y-6">

```
  {/* Page header */}
  <div>
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F2F0] text-[#326460]">
        <Settings size={22} />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-[#1B1C1C]">
          {currentText.businessSettings}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {currentText.pageDescription}
        </p>
      </div>
    </div>
  </div>

  {/* Save confirmation */}
  {saved && (
    <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
      <Check size={18} />
      <span>{currentText.savedMessage}</span>
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
                {currentText.languageAppearance}
              </h2>

              <p className="text-sm text-gray-500">
                {currentText.languageAppearanceDescription}
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
              {currentText.language}
            </label>

            <select
              id="language"
              value={
                language === 'sw'
                  ? 'Swahili'
                  : 'English'
              }
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-700 outline-none sm:max-w-md"
            >
              <option value="English">
                {currentText.english}
              </option>

              <option value="Swahili">
                {currentText.swahili}
              </option>
            </select>

            <p className="mt-2 text-xs text-gray-500">
              {currentText.languageNote}
            </p>
          </div>

          {/* Compact mode */}
          <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 p-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {currentText.compactDashboard}
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                {currentText.compactDashboardDescription}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                updateSetting(
                  'compactMode',
                  !settings.compactMode,
                )
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                settings.compactMode
                  ? 'bg-[#326460]'
                  : 'bg-gray-300'
              }`}
              aria-label={currentText.compactDashboard}
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
                {currentText.notifications}
              </h2>

              <p className="text-sm text-gray-500">
                {currentText.notificationsDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">

          {/* Order notifications */}
          <SettingToggle
            title={currentText.orderNotifications}
            description={
              currentText.orderNotificationsDescription
            }
            checked={settings.orderNotifications}
            onChange={() =>
              updateSetting(
                'orderNotifications',
                !settings.orderNotifications,
              )
            }
            enabledText={currentText.enabled}
            disabledText={currentText.disabled}
          />

          {/* Delivery notifications */}
          <SettingToggle
            title={currentText.deliveryNotifications}
            description={
              currentText.deliveryNotificationsDescription
            }
            checked={settings.deliveryNotifications}
            onChange={() =>
              updateSetting(
                'deliveryNotifications',
                !settings.deliveryNotifications,
              )
            }
            enabledText={currentText.enabled}
            disabledText={currentText.disabled}
          />

          {/* Payment notifications */}
          <SettingToggle
            title={currentText.paymentNotifications}
            description={
              currentText.paymentNotificationsDescription
            }
            checked={settings.paymentNotifications}
            onChange={() =>
              updateSetting(
                'paymentNotifications',
                !settings.paymentNotifications,
              )
            }
            enabledText={currentText.enabled}
            disabledText={currentText.disabled}
          />

          {/* Account notifications */}
          <SettingToggle
            title={currentText.accountNotifications}
            description={
              currentText.accountNotificationsDescription
            }
            checked={settings.accountNotifications}
            onChange={() =>
              updateSetting(
                'accountNotifications',
                !settings.accountNotifications,
              )
            }
            enabledText={currentText.enabled}
            disabledText={currentText.disabled}
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
          {currentText.saveSettings}
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
              {currentText.accountPreferences}
            </h2>

            <p className="text-xs text-gray-500">
              {currentText.accountPreferencesDescription}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <InfoRow
            label={currentText.language}
            value={
              language === 'sw'
                ? currentText.swahili
                : currentText.english
            }
          />

          <InfoRow
            label={currentText.compactMode}
            value={
              settings.compactMode
                ? currentText.enabled
                : currentText.disabled
            }
          />

          <InfoRow
            label={currentText.orderAlerts}
            value={
              settings.orderNotifications
                ? currentText.enabled
                : currentText.disabled
            }
          />

          <InfoRow
            label={currentText.deliveryAlerts}
            value={
              settings.deliveryNotifications
                ? currentText.enabled
                : currentText.disabled
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
              {currentText.security}
            </h2>

            <p className="mt-2 text-sm leading-6 text-amber-800">
              {currentText.securityDescription}
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
enabledText,
disabledText,
}) {
return ( <div className="flex items-start justify-between gap-4 px-5 py-5 sm:px-6"> <div className="min-w-0"> <p className="text-sm font-semibold text-gray-800">
{title} </p>


    <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500">
      {description}
    </p>

    <p className="mt-2 text-xs font-medium text-[#326460]">
      {checked ? enabledText : disabledText}
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
    aria-label={title}
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
return ( <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3"> <span className="text-sm text-gray-500">
{label} </span>


  <span className="text-right text-sm font-medium text-gray-800">
    {value}
  </span>
</div>


)
}

export default BusinessSettingsPage
