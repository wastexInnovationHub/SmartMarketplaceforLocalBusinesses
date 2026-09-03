import { useEffect, useState } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  LockKeyhole,
  Save,
  Camera,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

import { useLanguage } from '../../i18n/LanguageContext'

function CustomerProfilePage() {
  const { language } = useLanguage()
  const isSwahili = language === 'sw'

  // Get the locally stored customer session
  const storedUser = localStorage.getItem('jamiiMarketUser')

  let user = null

  try {
    user = storedUser ? JSON.parse(storedUser) : null
  } catch {
    user = null
  }

  // Profile state
  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  })

  const [saved, setSaved] = useState(false)
  const [message, setMessage] = useState('')

  // Page text
  const text = {
    account: isSwahili ? 'Akaunti' : 'Account',
    profile: isSwahili ? 'Wasifu' : 'Profile',
    profileDescription: isSwahili
      ? 'Simamia taarifa zako binafsi na usalama wa akaunti yako.'
      : 'Manage your personal information and account security.',

    customer: isSwahili ? 'Mteja' : 'Customer',
    noEmail: isSwahili ? 'Hakuna barua pepe' : 'No email available',
    changeProfilePhoto: isSwahili
      ? 'Badilisha picha ya wasifu'
      : 'Change profile photo',

    accountSecurity: isSwahili
      ? 'Usalama wa akaunti'
      : 'Account security',
    accountSecurityDescription: isSwahili
      ? 'Hakikisha taarifa za akaunti yako ni sahihi na linda taarifa zako za kuingia.'
      : 'Keep your account information accurate and protect your account credentials.',

    profileStatus: isSwahili
      ? 'Hali ya wasifu'
      : 'Profile status',
    activeAccount: isSwahili
      ? 'Akaunti inayotumika'
      : 'Active account',

    personalInformation: isSwahili
      ? 'Taarifa Binafsi'
      : 'Personal Information',
    personalInformationDescription: isSwahili
      ? 'Sasisha taarifa zinazohusiana na akaunti yako ya JamiiMarket.'
      : 'Update the information associated with your marketplace account.',

    firstName: isSwahili ? 'Jina la kwanza' : 'First name',
    lastName: isSwahili ? 'Jina la mwisho' : 'Last name',
    emailAddress: isSwahili ? 'Barua pepe' : 'Email address',
    phoneNumber: isSwahili ? 'Namba ya simu' : 'Phone number',
    address: isSwahili ? 'Anwani' : 'Address',

    enterFirstName: isSwahili
      ? 'Ingiza jina lako la kwanza'
      : 'Enter your first name',
    enterLastName: isSwahili
      ? 'Ingiza jina lako la mwisho'
      : 'Enter your last name',
    enterPhone: isSwahili
      ? 'Ingiza namba yako ya simu'
      : 'Enter your phone number',
    enterAddress: isSwahili
      ? 'Ingiza anwani yako ya kupelewa oda au anwani ya mawasiliano'
      : 'Enter your delivery or contact address',

    emailReadOnly: isSwahili
      ? 'Barua pepe unayotumia kuingia haiwezi kubadilishwa hapa.'
      : 'Your login email is read-only here.',

    saveChanges: isSwahili
      ? 'Hifadhi Mabadiliko'
      : 'Save Changes',

    profileSaved: isSwahili
      ? 'Taarifa za wasifu wako zimehifadhiwa kwenye kifaa hiki.'
      : 'Your profile information has been saved on this device.',

    saveError: isSwahili
      ? 'Imeshindikana kuhifadhi taarifa za wasifu wako.'
      : 'Unable to save your profile information.',

    passwordSecurity: isSwahili
      ? 'Nenosiri na Usalama'
      : 'Password & Security',
    passwordSecurityDescription: isSwahili
      ? 'Linda akaunti yako ya JamiiMarket.'
      : 'Keep your JamiiMarket account protected.',

    password: isSwahili ? 'Nenosiri' : 'Password',
    passwordLater: isSwahili
      ? 'Kubadilisha nenosiri kutaunganishwa na huduma ya usalama wa akaunti baadaye.'
      : 'Password changes will be connected to the account security service later.',

    changePassword: isSwahili
      ? 'Badilisha Nenosiri'
      : 'Change Password',

    passwordMessage: isSwahili
      ? 'Kubadilisha nenosiri kutapatikana baada ya kuunganisha API ya usalama wa akaunti.'
      : 'Password management will be available when the account security API is connected.',

    photoMessage: isSwahili
      ? 'Kupakia picha ya wasifu kutapatikana baada ya kuunganisha hifadhi ya picha za wateja.'
      : 'Profile photo upload will be available when customer media storage is connected.',
  }

  // Keep profile fields synchronized with the stored customer
  useEffect(() => {
    if (!user) {
      return
    }

    setProfile({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
    })
  }, [])

  // Handle profile input changes
  const handleChange = (event) => {
    const { name, value } = event.target

    setProfile((current) => ({
      ...current,
      [name]: value,
    }))

    setSaved(false)
    setMessage('')
  }

  // Save profile information locally
  const handleSubmit = (event) => {
    event.preventDefault()

    try {
      const existingUser = localStorage.getItem('jamiiMarketUser')

      const currentUser = existingUser
        ? JSON.parse(existingUser)
        : {}

      const updatedUser = {
        ...currentUser,
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
        email: profile.email.trim(),
        phone: profile.phone.trim(),
        address: profile.address.trim(),
      }

      localStorage.setItem(
        'jamiiMarketUser',
        JSON.stringify(updatedUser)
      )

      window.dispatchEvent(
        new Event('jamiiMarketProfileUpdated')
      )

      setSaved(true)

      setMessage(text.profileSaved)
    } catch {
      setSaved(false)

      setMessage(text.saveError)
    }
  }

  // Display customer name
  const displayName =
    `${profile.firstName} ${profile.lastName}`.trim() ||
    text.customer

  // Generate customer initials
  const initials =
    `${profile.firstName?.charAt(0) || ''}${profile.lastName?.charAt(0) || ''}`
      .trim()
      .toUpperCase() ||
    profile.email?.charAt(0).toUpperCase() ||
    'C'

  // Password management will be connected to the backend later
  const handleChangePassword = () => {
    setSaved(false)
    setMessage(text.passwordMessage)
  }

  // Profile photo upload will be connected later
  const handleProfilePhoto = () => {
    setSaved(false)
    setMessage(text.photoMessage)
  }

  return (
    <div className="min-h-screen bg-[#FCF9F8]">

      {/* Page introduction */}
      <section className="border-b border-[#DDC0BA] bg-white">

        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#326460]">
            {text.account}
          </p>

          <div className="mt-2">

            <h2 className="text-3xl font-extrabold tracking-tight text-[#1B1C1C] sm:text-4xl">
              {text.profile}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#56423D] sm:text-base">
              {text.profileDescription}
            </p>

          </div>

        </div>

      </section>

      {/* Profile content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">

          {/* Profile summary */}
          <aside className="h-fit overflow-hidden rounded-2xl border border-[#DDC0BA] bg-white shadow-sm">

            <div className="bg-[#326460] px-6 py-8 text-center">

              {/* Avatar */}
              <div className="relative mx-auto w-fit">

                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/80 bg-[#A03F28] text-3xl font-bold text-white shadow-lg">
                  {initials}
                </div>

                <button
                  type="button"
                  onClick={handleProfilePhoto}
                  aria-label={text.changeProfilePhoto}
                  className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#326460] bg-white text-[#326460] shadow-md transition hover:bg-[#F2F7F6]"
                >
                  <Camera size={16} />
                </button>

              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                {displayName}
              </h3>

              <p className="mt-1 break-all text-sm text-white/75">
                {profile.email || text.noEmail}
              </p>

              <div className="mt-4 inline-flex rounded-full bg-white/15 px-4 py-1.5">

                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {text.customer}
                </span>

              </div>

            </div>

            {/* Account information */}
            <div className="p-6">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DDF0ED] text-[#326460]">
                  <ShieldCheck size={19} />
                </div>

                <div>

                  <p className="text-sm font-bold text-[#1B1C1C]">
                    {text.accountSecurity}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#6B625F]">
                    {text.accountSecurityDescription}
                  </p>

                </div>

              </div>

              <div className="mt-5 border-t border-[#E8E3E1] pt-5">

                <p className="text-xs font-bold uppercase tracking-wider text-[#8A726C]">
                  {text.profileStatus}
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-[#326460]" />

                  <span className="text-sm font-semibold text-[#326460]">
                    {text.activeAccount}
                  </span>

                </div>

              </div>

            </div>

          </aside>

          {/* Profile settings */}
          <section className="space-y-6">

            {/* Personal information */}
            <div className="overflow-hidden rounded-2xl border border-[#DDC0BA] bg-white shadow-sm">

              <div className="border-b border-[#E8E3E1] px-6 py-5 sm:px-8">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0EB] text-[#A03F28]">
                    <User size={19} />
                  </div>

                  <div>

                    <h3 className="text-xl font-bold text-[#1B1C1C]">
                      {text.personalInformation}
                    </h3>

                    <p className="mt-1 text-sm text-[#6B625F]">
                      {text.personalInformationDescription}
                    </p>

                  </div>

                </div>

              </div>

              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8"
              >

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* First name */}
                  <div>

                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-bold text-[#1B1C1C]"
                    >
                      {text.firstName}
                    </label>

                    <div className="relative">

                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A726C]"
                      />

                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={profile.firstName}
                        onChange={handleChange}
                        placeholder={text.enterFirstName}
                        autoComplete="given-name"
                        className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-4 text-sm text-[#1B1C1C] outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                      />

                    </div>

                  </div>

                  {/* Last name */}
                  <div>

                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-bold text-[#1B1C1C]"
                    >
                      {text.lastName}
                    </label>

                    <div className="relative">

                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A726C]"
                      />

                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={profile.lastName}
                        onChange={handleChange}
                        placeholder={text.enterLastName}
                        autoComplete="family-name"
                        className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-4 text-sm text-[#1B1C1C] outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                      />

                    </div>

                  </div>

                  {/* Email */}
                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-[#1B1C1C]"
                    >
                      {text.emailAddress}
                    </label>

                    <div className="relative">

                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A726C]"
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        readOnly
                        className="w-full cursor-not-allowed rounded-xl border border-[#D9D3D0] bg-[#F0EDED] py-3.5 pl-11 pr-4 text-sm text-[#56423D] outline-none"
                      />

                    </div>

                    <p className="mt-2 text-xs text-[#7A706C]">
                      {text.emailReadOnly}
                    </p>

                  </div>

                  {/* Phone */}
                  <div>

                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-bold text-[#1B1C1C]"
                    >
                      {text.phoneNumber}
                    </label>

                    <div className="relative">

                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A726C]"
                      />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={handleChange}
                        placeholder={text.enterPhone}
                        autoComplete="tel"
                        className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-4 text-sm text-[#1B1C1C] outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                      />

                    </div>

                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">

                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-bold text-[#1B1C1C]"
                    >
                      {text.address}
                    </label>

                    <div className="relative">

                      <MapPin
                        size={18}
                        className="absolute left-4 top-4 text-[#8A726C]"
                      />

                      <textarea
                        id="address"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        rows={4}
                        placeholder={text.enterAddress}
                        autoComplete="street-address"
                        className="w-full resize-none rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-4 text-sm text-[#1B1C1C] outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                      />

                    </div>

                  </div>

                </div>

                {/* Save status and button */}
                <div className="mt-7 flex flex-col gap-4 border-t border-[#E8E3E1] pt-6 sm:flex-row sm:items-center sm:justify-between">

                  <div className="min-h-10">

                    {message && (
                      <div
                        className={`flex items-start gap-2 text-sm font-semibold ${
                          saved
                            ? 'text-[#326460]'
                            : 'text-[#A03F28]'
                        }`}
                      >

                        {saved ? (
                          <CheckCircle2
                            size={18}
                            className="mt-0.5 shrink-0"
                          />
                        ) : (
                          <AlertCircle
                            size={18}
                            className="mt-0.5 shrink-0"
                          />
                        )}

                        <span>
                          {message}
                        </span>

                      </div>
                    )}

                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A03F28] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#812914] hover:shadow-md active:scale-[0.98]"
                  >
                    <Save size={17} />
                    {text.saveChanges}
                  </button>

                </div>

              </form>

            </div>

            {/* Security */}
            <div className="rounded-2xl border border-[#DDC0BA] bg-white shadow-sm">

              <div className="p-6 sm:p-8">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EFDEC0] text-[#695D46]">
                    <LockKeyhole size={20} />
                  </div>

                  <div className="flex-1">

                    <h3 className="text-lg font-bold text-[#1B1C1C]">
                      {text.passwordSecurity}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#6B625F]">
                      {text.passwordSecurityDescription}
                    </p>

                  </div>

                </div>

                <div className="mt-5 rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] p-4">

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <p className="text-sm font-bold text-[#1B1C1C]">
                        {text.password}
                      </p>

                      <p className="mt-1 text-xs text-[#7A706C]">
                        {text.passwordLater}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={handleChangePassword}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#A03F28] px-4 py-2.5 text-sm font-bold text-[#A03F28] transition hover:bg-[#FFF1ED]"
                    >
                      {text.changePassword}
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  )
}

export default CustomerProfilePage

