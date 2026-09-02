import { useEffect, useState } from 'react'
import {
  Bike,
  CheckCircle2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
} from 'lucide-react'

function DeliveryProfilePage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  })

  const [message, setMessage] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('jamiiMarketUser')

    if (!storedUser) {
      return
    }

    try {
      const user = JSON.parse(storedUser)

      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      })
    } catch {
      localStorage.removeItem('jamiiMarketUser')
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    setMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const storedUser = localStorage.getItem('jamiiMarketUser')

    let existingUser = {}

    if (storedUser) {
      try {
        existingUser = JSON.parse(storedUser)
      } catch {
        existingUser = {}
      }
    }

    const updatedUser = {
      ...existingUser,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email,
      phone: form.phone.trim(),
      address: form.address.trim(),
    }

    localStorage.setItem(
      'jamiiMarketUser',
      JSON.stringify(updatedUser)
    )

    window.dispatchEvent(
      new Event('jamiiMarketProfileUpdated')
    )

    setMessage('Your profile information has been saved on this device.')
  }

  const handleComingSoon = (feature) => {
    setMessage(
      `${feature} will be available when the delivery backend is connected.`
    )
  }

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div>
        <p className="text-sm font-medium text-emerald-600">
          Account Management
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Delivery Profile
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Manage your personal information and delivery account details.
        </p>
      </div>

      {/* Success / information message */}
      {message && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
          <CheckCircle2
            size={19}
            className="mt-0.5 shrink-0"
          />

          <p>{message}</p>
        </div>
      )}

      {/* Profile header card */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-8 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-lg">
              <Bike size={38} />
            </div>

            <div className="text-white">
              <p className="text-sm font-medium text-emerald-100">
                Delivery Rider
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {form.firstName || form.lastName
                  ? `${form.firstName} ${form.lastName}`.trim()
                  : 'Your Delivery Profile'}
              </h2>

              <p className="mt-1 text-sm text-emerald-100">
                Keep your information up to date for successful deliveries.
              </p>
            </div>
          </div>
        </div>

        {/* Profile form */}
        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-8"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Personal Information
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Update the information associated with your account.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* First name */}
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                First Name
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
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Last name */}
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Last Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address
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
                  value={form.email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 py-3 pl-10 pr-4 text-sm text-slate-500 outline-none"
                />
              </div>

              <p className="mt-1.5 text-xs text-slate-400">
                Email changes will require backend account verification.
              </p>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Phone Number
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
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Address
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-4 text-slate-400"
                />

                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </div>

          {/* Save button */}
          <div className="mt-7 flex justify-end">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:w-auto"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </section>

      {/* Account settings */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {/* Password */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <LockKeyhole size={21} />
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-slate-900">
                Account Security
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Password and account security settings will be managed through
                the authentication system.
              </p>

              <button
                type="button"
                onClick={() => handleComingSoon('Password management')}
                className="mt-4 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Rider verification */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Bike size={21} />
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-slate-900">
                Rider Verification
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Rider verification, vehicle information, and required
                documents will be connected to the delivery backend.
              </p>

              <button
                type="button"
                onClick={() => handleComingSoon('Rider verification')}
                className="mt-4 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Manage Verification
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* Delivery account note */}
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-emerald-900">
              Delivery Account
            </h3>

            <p className="mt-1 text-sm leading-6 text-emerald-800">
              Your profile information is currently stored on this device.
              Once the backend is connected, profile updates will be securely
              saved to your JamiiMarket account.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DeliveryProfilePage

