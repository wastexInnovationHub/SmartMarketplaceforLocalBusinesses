import { useEffect, useState } from 'react'
import {
  Camera,
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react'

import { useLanguage } from '../../i18n/LanguageContext'

function AdminProfilePage() {
  const { language } = useLanguage()

  const text = {
    en: {
      account: 'Account',
      adminProfile: 'Admin Profile',
      description:
        'Manage the administrator information displayed across the JamiiMarket admin portal.',
      administrator: 'Administrator',
      noEmail: 'No email available',
      accountStatus: 'Account status',
      inactive: 'Inactive',
      active: 'Active',
      role: 'Role',
      personalInformation: 'Personal Information',
      personalInformationDescription:
        'Update the information used for your admin account.',
      firstName: 'First Name',
      lastName: 'Last Name',
      emailAddress: 'Email Address',
      phoneNumber: 'Phone Number',
      enterFirstName: 'Enter first name',
      enterLastName: 'Enter last name',
      enterEmail: 'Enter email address',
      enterPhone: 'Enter phone number',
      profileImageUrl: 'Profile Image URL',
      optionalProfileImageUrl: 'Optional profile image URL',
      imageUploadNotice:
        'Image upload will be connected to backend storage later.',
      profileUpdated: 'Profile updated successfully.',
      saveChanges: 'Save Changes',
      backendIntegration: 'Backend integration',
      backendDescription:
        'Profile changes are currently stored in browser localStorage so the interface can be tested. In the production system, administrator profile data should be loaded and saved through the authenticated backend.',
    },

    sw: {
      account: 'Akaunti',
      adminProfile: 'Wasifu wa Admin',
      description:
        'Simamia taarifa za msimamizi zinazoonyeshwa katika sehemu ya admin ya JamiiMarket.',
      administrator: 'Msimamizi',
      noEmail: 'Hakuna barua pepe',
      accountStatus: 'Hali ya Akaunti',
      inactive: 'Haifanyi Kazi',
      active: 'Hai',
      role: 'Nafasi',
      personalInformation: 'Taarifa Binafsi',
      personalInformationDescription:
        'Sasisha taarifa zinazotumika kwenye akaunti yako ya admin.',
      firstName: 'Jina la Kwanza',
      lastName: 'Jina la Mwisho',
      emailAddress: 'Anwani ya Barua Pepe',
      phoneNumber: 'Namba ya Simu',
      enterFirstName: 'Ingiza jina la kwanza',
      enterLastName: 'Ingiza jina la mwisho',
      enterEmail: 'Ingiza anwani ya barua pepe',
      enterPhone: 'Ingiza namba ya simu',
      profileImageUrl: 'URL ya Picha ya Wasifu',
      optionalProfileImageUrl: 'URL ya picha ya wasifu, si lazima',
      imageUploadNotice:
        'Upakiaji wa picha utaunganishwa na hifadhi ya backend baadaye.',
      profileUpdated: 'Wasifu umeboreshwa kwa mafanikio.',
      saveChanges: 'Hifadhi Mabadiliko',
      backendIntegration: 'Muunganisho wa Backend',
      backendDescription:
        'Mabadiliko ya wasifu kwa sasa yanahifadhiwa kwenye localStorage ya kivinjari ili kuruhusu interface kujaribiwa. Katika mfumo wa uzalishaji, taarifa za wasifu wa msimamizi zinapaswa kusomwa na kuhifadhiwa kupitia backend yenye uthibitishaji.',
    },
  }

  const currentText = text[language === 'sw' ? 'sw' : 'en']

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'admin',
    status: 'active',
    profileImage: '',
  })

  const [saved, setSaved] = useState(false)

  // Load the current administrator profile
  useEffect(() => {
    const storedUser = localStorage.getItem('jamiiMarketUser')

    if (!storedUser) {
      return
    }

    try {
      const user = JSON.parse(storedUser)

      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'admin',
        status: user.status || 'active',
        profileImage: user.profileImage || '',
      })
    } catch {
      console.error('Unable to load administrator profile.')
    }
  }, [])

  // Update profile fields
  const handleChange = (event) => {
    const { name, value } = event.target

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }))

    setSaved(false)
  }

  // Save the administrator profile locally
  const handleSubmit = (event) => {
    event.preventDefault()

    const existingUser = localStorage.getItem('jamiiMarketUser')

    let user = {}

    try {
      user = existingUser ? JSON.parse(existingUser) : {}
    } catch {
      user = {}
    }

    const updatedUser = {
      ...user,
      ...profile,
      role: 'admin',
    }

    localStorage.setItem(
      'jamiiMarketUser',
      JSON.stringify(updatedUser)
    )

    // Notify the navbar and sidebar about the profile update
    window.dispatchEvent(
      new CustomEvent('jamiiMarketProfileUpdated')
    )

    setSaved(true)
  }

  // Create initials when no profile image exists
  const getInitials = () => {
    const first = profile.firstName?.charAt(0) || ''
    const last = profile.lastName?.charAt(0) || ''

    return `${first}${last}`.toUpperCase() || 'A'
  }

  const fullName =
    `${profile.firstName} ${profile.lastName}`.trim() ||
    currentText.administrator

  const displayRole =
    profile.role === 'admin'
      ? currentText.administrator
      : profile.role

  return (
    <section className="space-y-6">
      {/* Page heading */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          {currentText.account}
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          {currentText.adminProfile}
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          {currentText.description}
        </p>
      </div>

      {/* Profile overview */}
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Profile card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            {/* Profile image / initials */}
            <div className="relative">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={fullName}
                  className="h-28 w-28 rounded-full object-cover ring-4 ring-indigo-50"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-600 text-3xl font-bold text-white ring-4 ring-indigo-50">
                  {getInitials()}
                </div>
              )}

              <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-slate-500">
                <Camera size={15} />
              </div>
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              {fullName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {profile.email || currentText.noEmail}
            </p>

            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              <ShieldCheck size={14} />
              {currentText.administrator}
            </span>
          </div>

          {/* Account status */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                {currentText.accountStatus}
              </span>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {profile.status === 'inactive'
                  ? currentText.inactive
                  : currentText.active}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                {currentText.role}
              </span>

              <span className="text-sm font-semibold capitalize text-slate-800">
                {displayRole}
              </span>
            </div>
          </div>
        </div>

        {/* Profile form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="border-b border-slate-100 pb-5">
            <h2 className="text-lg font-bold text-slate-900">
              {currentText.personalInformation}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {currentText.personalInformationDescription}
            </p>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* First name */}
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                {currentText.firstName}
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={profile.firstName}
                  onChange={handleChange}
                  placeholder={currentText.enterFirstName}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Last name */}
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                {currentText.lastName}
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                value={profile.lastName}
                onChange={handleChange}
                placeholder={currentText.enterLastName}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                {currentText.emailAddress}
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder={currentText.enterEmail}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                {currentText.phoneNumber}
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder={currentText.enterPhone}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>
          </div>

          {/* Profile image URL */}
          <div className="mt-5">
            <label
              htmlFor="profileImage"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              {currentText.profileImageUrl}
            </label>

            <input
              id="profileImage"
              name="profileImage"
              type="url"
              value={profile.profileImage}
              onChange={handleChange}
              placeholder={currentText.optionalProfileImageUrl}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              {currentText.imageUploadNotice}
            </p>
          </div>

          {/* Save area */}
          <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {saved && (
                <p className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                  <CheckCircle2 size={17} />
                  {currentText.profileUpdated}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {currentText.saveChanges}
            </button>
          </div>
        </form>
      </div>

      {/* Backend integration notice */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
        <div className="flex gap-3">
          <ShieldCheck
            size={21}
            className="mt-0.5 shrink-0 text-indigo-600"
          />

          <div>
            <h3 className="font-semibold text-indigo-900">
              {currentText.backendIntegration}
            </h3>

            <p className="mt-1 text-sm leading-6 text-indigo-800">
              {currentText.backendDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminProfilePage

