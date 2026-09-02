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

function CustomerProfilePage() {

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

      setSaved(true)

      setMessage(
        'Your profile information has been saved on this device.'
      )
    } catch {
      setSaved(false)

      setMessage(
        'Unable to save your profile information.'
      )
    }
  }

  // Display customer name
  const displayName =
    `${profile.firstName} ${profile.lastName}`.trim() ||
    'Customer'

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

    setMessage(
      'Password management will be available when the account security API is connected.'
    )
  }

  // Profile photo upload will be connected later
  const handleProfilePhoto = () => {
    setSaved(false)

    setMessage(
      'Profile photo upload will be available when customer media storage is connected.'
    )
  }

  return (
    <div className="min-h-screen bg-[#FCF9F8]">

      {/* Page introduction */}
      <section className="border-b border-[#DDC0BA] bg-white">

        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#326460]">
            Account
          </p>

          <div className="mt-2">

            <h2 className="text-3xl font-extrabold tracking-tight text-[#1B1C1C] sm:text-4xl">
              Profile
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#56423D] sm:text-base">
              Manage your personal information and account security.
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
                  aria-label="Change profile photo"
                  className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#326460] bg-white text-[#326460] shadow-md transition hover:bg-[#F2F7F6]"
                >
                  <Camera size={16} />
                </button>

              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                {displayName}
              </h3>

              <p className="mt-1 break-all text-sm text-white/75">
                {profile.email || 'No email available'}
              </p>

              <div className="mt-4 inline-flex rounded-full bg-white/15 px-4 py-1.5">

                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Customer
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
                    Account security
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#6B625F]">
                    Keep your account information accurate and protect your
                    account credentials.
                  </p>

                </div>

              </div>

              <div className="mt-5 border-t border-[#E8E3E1] pt-5">

                <p className="text-xs font-bold uppercase tracking-wider text-[#8A726C]">
                  Profile status
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-[#326460]" />

                  <span className="text-sm font-semibold text-[#326460]">
                    Active account
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
                      Personal Information
                    </h3>

                    <p className="mt-1 text-sm text-[#6B625F]">
                      Update the information associated with your marketplace
                      account.
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
                      First name
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
                        placeholder="Enter your first name"
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
                      Last name
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
                        placeholder="Enter your last name"
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
                      Email address
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
                      Your login email is read-only here.
                    </p>

                  </div>

                  {/* Phone */}
                  <div>

                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-bold text-[#1B1C1C]"
                    >
                      Phone number
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
                        placeholder="Enter your phone number"
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
                      Address
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
                        placeholder="Enter your delivery or contact address"
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
                    Save Changes
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
                      Password & Security
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#6B625F]">
                      Keep your JamiiMarket account protected.
                    </p>

                  </div>

                </div>

                <div className="mt-5 rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] p-4">

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <p className="text-sm font-bold text-[#1B1C1C]">
                        Password
                      </p>

                      <p className="mt-1 text-xs text-[#7A706C]">
                        Password changes will be connected to the account
                        security service later.
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={handleChangePassword}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#A03F28] px-4 py-2.5 text-sm font-bold text-[#A03F28] transition hover:bg-[#FFF1ED]"
                    >
                      Change Password
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

