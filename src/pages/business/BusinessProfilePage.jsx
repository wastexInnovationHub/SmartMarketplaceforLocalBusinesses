import { useEffect, useState } from 'react'
import {
Building2,
MapPin,
Phone,
Mail,
Clock,
Save,
User,
} from 'lucide-react'

import { useLanguage } from '../../i18n/LanguageContext'

function BusinessProfilePage() {
const { language } = useLanguage()

const text = {
en: {
businessProfile: 'Business Profile',
pageDescription: 'Manage your business information',


  businessInformation: 'Business Information',
  businessInformationDescription:
    'Add or update your business details.',

  businessName: 'Business Name',
  ownerName: 'Owner Name',
  phoneNumber: 'Phone Number',
  emailAddress: 'Email Address',
  businessAddress: 'Business Address',
  businessDescription: 'Business Description',

  enterBusinessName: 'Enter your business name',
  enterOwnerName: "Enter owner's name",
  enterPhone: 'Enter phone number',
  enterEmail: 'Enter email address',
  enterAddress: 'Enter your business address',
  describeBusiness: 'Describe your business',

  businessHours: 'Business Hours',
  businessHoursDescription:
    'Set your normal opening and closing times.',
  openingTime: 'Opening Time',
  closingTime: 'Closing Time',

  profileSaved: 'Profile saved successfully.',
  saveProfile: 'Save Profile',
},

sw: {
  businessProfile: 'Wasifu wa Biashara',
  pageDescription: 'Simamia taarifa za biashara yako',

  businessInformation: 'Taarifa za Biashara',
  businessInformationDescription:
    'Ongeza au sasisha taarifa za biashara yako.',

  businessName: 'Jina la Biashara',
  ownerName: 'Jina la Mmiliki',
  phoneNumber: 'Namba ya Simu',
  emailAddress: 'Anwani ya Barua Pepe',
  businessAddress: 'Anwani ya Biashara',
  businessDescription: 'Maelezo ya Biashara',

  enterBusinessName: 'Ingiza jina la biashara yako',
  enterOwnerName: 'Ingiza jina la mmiliki',
  enterPhone: 'Ingiza namba ya simu',
  enterEmail: 'Ingiza anwani ya barua pepe',
  enterAddress: 'Ingiza anwani ya biashara yako',
  describeBusiness: 'Eleza kuhusu biashara yako',

  businessHours: 'Muda wa Biashara',
  businessHoursDescription:
    'Weka muda wako wa kawaida wa kufungua na kufunga biashara.',
  openingTime: 'Muda wa Kufungua',
  closingTime: 'Muda wa Kufunga',

  profileSaved: 'Wasifu wa biashara umehifadhiwa kwa mafanikio.',
  saveProfile: 'Hifadhi Wasifu',
},


}

const currentText = language === 'sw' ? text.sw : text.en

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

// Load saved business profile
useEffect(() => {
try {
const savedProfile = localStorage.getItem(
'jamiiMarketBusinessProfile',
)


  if (!savedProfile) {
    return
  }

  const parsedProfile = JSON.parse(savedProfile)

  setProfile((current) => ({
    ...current,
    ...parsedProfile,
  }))
} catch (error) {
  console.error('Failed to load business profile:', error)
}


}, [])

// Handle form changes
const handleChange = (event) => {
const { name, value } = event.target


setProfile((current) => ({
  ...current,
  [name]: value,
}))

setSaved(false)


}

// Save business profile
const handleSubmit = (event) => {
event.preventDefault()


localStorage.setItem(
  'jamiiMarketBusinessProfile',
  JSON.stringify(profile),
)

setSaved(true)


}

return ( <div className="min-h-[calc(100dvh-4rem)] bg-[#F3FAF8] px-4 py-6 sm:px-6 lg:px-8"> <div className="mx-auto max-w-5xl">


    {/* Page header */}
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#326460] text-white">
          <Building2 size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#1B1C1C]">
            {currentText.businessProfile}
          </h1>

          <p className="text-sm text-gray-500">
            {currentText.pageDescription}
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
            {currentText.businessInformation}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {currentText.businessInformationDescription}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* Business name */}
          <div>
            <label
              htmlFor="businessName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {currentText.businessName}
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
                placeholder={currentText.enterBusinessName}
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
              {currentText.ownerName}
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
                placeholder={currentText.enterOwnerName}
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
              {currentText.phoneNumber}
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
                placeholder={currentText.enterPhone}
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
              {currentText.emailAddress}
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
                placeholder={currentText.enterEmail}
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
              {currentText.businessAddress}
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
                placeholder={currentText.enterAddress}
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
              {currentText.businessDescription}
            </label>

            <textarea
              id="description"
              name="description"
              value={profile.description}
              onChange={handleChange}
              placeholder={currentText.describeBusiness}
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
            {currentText.businessHours}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {currentText.businessHoursDescription}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* Opening time */}
          <div>
            <label
              htmlFor="openingTime"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {currentText.openingTime}
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
              {currentText.closingTime}
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
              {currentText.profileSaved}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#326460] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#28534f] focus:outline-none focus:ring-2 focus:ring-[#326460]/30"
        >
          <Save size={18} />
          {currentText.saveProfile}
        </button>
      </div>
    </form>
  </div>
</div>

)
}

export default BusinessProfilePage
