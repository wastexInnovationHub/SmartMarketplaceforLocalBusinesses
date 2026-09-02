import { useState } from 'react'
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Save,
  User,
} from 'lucide-react'

function BusinessProfilePage() {
  const [profile, setProfile] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    description: '',
    openingTime: '',
    closingTime: '',
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setProfile((current) => ({
      ...current,
      [name]: value,
    }))

    setSaved(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    localStorage.setItem(
      'jamiiMarketBusinessProfile',
      JSON.stringify(profile),
    )

    setSaved(true)
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#F3FAF8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Page header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#326460] text-white">
              <Building2 size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#1B1C1C]">
                Business Profile
              </h1>

              <p className="text-sm text-gray-500">
                Manage your business information
              </p>
            </div>
          </div>
        </div>

        {/* Profile form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          {/* Business information */}
          <div className="border-b border-gray-200 p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-[#1B1C1C]">
                Business Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add or update your business details.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Business name */}
              <div>
                <label
                  htmlFor="businessName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Business Name
                </label>

                <div className="relative">
                  <Building2
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={profile.businessName}
                    onChange={handleChange}
                    placeholder="Enter your business name"
                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10"
                  />
                </div>
              </div>

              {/* Owner name */}
              <div>
                <label
                  htmlFor="ownerName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Owner Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="ownerName"
                    name="ownerName"
                    type="text"
                    value={profile.ownerName}
                    onChange={handleChange}
                    placeholder="Enter owner's name"
                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Business Address
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />

                  <textarea
                    id="address"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    placeholder="Enter your business address"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Business Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={profile.description}
                  onChange={handleChange}
                  placeholder="Describe your business"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10"
                />
              </div>
            </div>
          </div>

          {/* Business hours */}
          <div className="border-b border-gray-200 p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-[#1B1C1C]">
                Business Hours
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Set your normal opening and closing times.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Opening time */}
              <div>
                <label
                  htmlFor="openingTime"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Opening Time
                </label>

                <div className="relative">
                  <Clock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="openingTime"
                    name="openingTime"
                    type="time"
                    value={profile.openingTime}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10"
                  />
                </div>
              </div>

              {/* Closing time */}
              <div>
                <label
                  htmlFor="closingTime"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Closing Time
                </label>

                <div className="relative">
                  <Clock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="closingTime"
                    name="closingTime"
                    type="time"
                    value={profile.closingTime}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              {saved && (
                <p className="text-sm font-medium text-[#326460]">
                  Profile saved successfully.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#326460] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#28534f] focus:outline-none focus:ring-2 focus:ring-[#326460]/30"
            >
              <Save size={18} />
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BusinessProfilePage

