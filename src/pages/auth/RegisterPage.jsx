import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  Store,
  Bike,
  ShoppingBag,
  Phone,
  MapPin,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

function RegisterPage() {
  const navigate = useNavigate()
  const { language, changeLanguage } = useLanguage()

  const [role, setRole] = useState('customer')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [location, setLocation] = useState('')
  const [locationStatus, setLocationStatus] = useState('idle')

  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [submittedRole, setSubmittedRole] = useState('customer')

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    businessCategory: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  })

  const [error, setError] = useState('')

  const roles = [
    {
      id: 'customer',
      label: 'Customer',
      description: 'Shop local products',
      icon: ShoppingBag,
    },
    {
      id: 'vendor',
      label: 'Business',
      description: 'Sell your products',
      icon: Store,
    },
    {
      id: 'rider',
      label: 'Delivery Rider',
      description: 'Deliver local orders',
      icon: Bike,
    },
  ]

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setError('')
  }

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('unsupported')
      return
    }

    setLocationStatus('loading')
    setError('')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
        setLocationStatus('success')
      },
      () => {
        setLocationStatus('error')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!formData.acceptedTerms) {
      setError('Please accept the Terms of Service and Privacy Policy.')
      return
    }

    if (!location) {
      setError('Please allow location access or enter your location manually.')
      return
    }

    /*
      Backend registration will be connected here.

      The selected role is submitted as part of registration.
      The backend should determine and store the user's account role.

      Business and Rider accounts should be created with a
      pending approval status by the backend.
    */

    console.log('Registration data:', {
      ...formData,
      role,
      location,
    })

    setSubmittedRole(role)
    setRegistrationComplete(true)
  }

  if (registrationComplete) {
    const isBusiness = submittedRole === 'vendor'
    const accountName = isBusiness ? 'Business' : 'Delivery Rider'

    return (
      <main className="min-h-screen bg-[#FCF9F8] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">

          {/* Logo */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-[#A03F28]"
            >
              JamiiMarket
            </Link>

            {/* Language */}
            <div className="flex items-center rounded-lg bg-stone-100 p-1">
              <button
                type="button"
                onClick={() => changeLanguage('en')}
                className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
                  language === 'en'
                    ? 'bg-white text-[#A03F28] shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                EN
              </button>

              <button
                type="button"
                onClick={() => changeLanguage('sw')}
                className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
                  language === 'sw'
                    ? 'bg-white text-[#A03F28] shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                SW
              </button>
            </div>
          </div>

          <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#DDC0BA] bg-white p-8 text-center shadow-[0_20px_60px_-20px_rgba(160,63,40,0.18)] sm:p-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F3EE] text-[#326460]">
              <CheckCircle2 size={34} />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[#326460]">
              Registration Complete!
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl">
              Your {accountName} account has been successfully submitted.
            </h1>

            {isBusiness ? (
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#56423D]">
                Your account is currently{' '}
                <strong className="font-semibold text-[#A03F28]">
                  waiting for administrator approval
                </strong>
                . You will be able to access your business features after
                approval.
              </p>
            ) : (
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#56423D]">
                Your account is currently{' '}
                <strong className="font-semibold text-[#A03F28]">
                  waiting for administrator approval
                </strong>
                . You will be able to access your delivery rider features
                after approval.
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#A03F28] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#812914]"
              >
                Go to Login
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#D9D3D0] bg-white px-6 py-3 text-sm font-semibold text-[#56423D] transition hover:bg-[#F6F3F2]"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FCF9F8] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Top logo */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-[#A03F28]"
          >
            JamiiMarket
          </Link>

          {/* Language */}
          <div className="flex items-center rounded-lg bg-stone-100 p-1">
            <button
              type="button"
              onClick={() => changeLanguage('en')}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
                language === 'en'
                  ? 'bg-white text-[#A03F28] shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              EN
            </button>

            <button
              type="button"
              onClick={() => changeLanguage('sw')}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
                language === 'sw'
                  ? 'bg-white text-[#A03F28] shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              SW
            </button>
          </div>
        </div>

        <div className="grid overflow-hidden rounded-[2rem] border border-[#DDC0BA] bg-white shadow-[0_20px_60px_-20px_rgba(160,63,40,0.18)] lg:grid-cols-[0.8fr_1.2fr]">

          {/* Left information panel */}
          <div className="hidden bg-[#A03F28] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#F2E0C3]">
                Join JamiiMarket
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight">
                Be part of your local marketplace.
              </h1>

              <p className="mt-6 text-base leading-7 text-white/80">
                Whether you want to shop, grow your business, or deliver
                orders, JamiiMarket connects you with your community.
              </p>

              <div className="mt-10 space-y-5">

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <ShoppingBag size={18} />
                  </div>

                  <div>
                    <p className="font-semibold">Customers</p>
                    <p className="mt-1 text-sm text-white/65">
                      Discover products and services near you.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Store size={18} />
                  </div>

                  <div>
                    <p className="font-semibold">Businesses</p>
                    <p className="mt-1 text-sm text-white/65">
                      Reach more customers in your community.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Bike size={18} />
                  </div>

                  <div>
                    <p className="font-semibold">Delivery Riders</p>
                    <p className="mt-1 text-sm text-white/65">
                      Help local businesses deliver orders.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <p className="text-sm text-white/60">
              Local commerce. Connected communities.
            </p>
          </div>

          {/* Registration form */}
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-2xl">

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#326460]">
                  Create account
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1B1C1C]">
                  Join JamiiMarket
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#56423D]">
                  Select how you want to use JamiiMarket.
                </p>
              </div>

              {/* Role selection */}
              <div className="mt-8">
                <p className="mb-3 text-sm font-semibold text-[#1B1C1C]">
                  I want to join as
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {roles.map((item) => {
                    const Icon = item.icon
                    const selected = role === item.id

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRole(item.id)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          selected
                            ? 'border-[#A03F28] bg-[#F5E5DF] shadow-sm'
                            : 'border-[#E4E2E1] bg-white hover:border-[#DDC0BA] hover:bg-[#F9F7F6]'
                        }`}
                      >
                        <Icon
                          size={21}
                          className={
                            selected
                              ? 'text-[#A03F28]'
                              : 'text-[#6B625F]'
                          }
                        />

                        <p className="mt-3 text-sm font-bold text-[#1B1C1C]">
                          {item.label}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#6B625F]">
                          {item.description}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* Full name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <User
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7D78]"
                    />

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      autoComplete="name"
                      className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                    />
                  </div>
                </div>

                {/* Business name */}
                {role === 'vendor' && (
                  <div>
                    <label
                      htmlFor="businessName"
                      className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
                    >
                      Business name
                    </label>

                    <div className="relative">
                      <Store
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7D78]"
                      />

                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Enter your business name"
                        required
                        autoComplete="organization"
                        className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                      />
                    </div>
                  </div>
                )}

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
                  >
                    Phone number
                  </label>

                  <div className="relative">
                    <Phone
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7D78]"
                    />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+255 7XX XXX XXX"
                      required
                      autoComplete="tel"
                      className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                    />
                  </div>
                </div>

                {/* Business category */}
                {role === 'vendor' && (
                  <div>
                    <label
                      htmlFor="businessCategory"
                      className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
                    >
                      Business category
                    </label>

                    <select
                      id="businessCategory"
                      name="businessCategory"
                      value={formData.businessCategory}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] px-4 py-3.5 text-sm text-[#56423D] outline-none focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                    >
                      <option value="">Select category</option>
                      <option value="food">Food & Restaurants</option>
                      <option value="fashion">Fashion & Clothing</option>
                      <option value="electronics">Electronics</option>
                      <option value="groceries">Groceries</option>
                      <option value="beauty">Beauty & Personal Care</option>
                      <option value="services">Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}

                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
                  >
                    Location
                  </label>

                  <div className="relative">
                    <MapPin
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7D78]"
                    />

                    <input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(event) => {
                        setLocation(event.target.value)
                        setLocationStatus('manual')
                        setError('')
                      }}
                      placeholder="Enter your area or location"
                      required
                      className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-32 text-sm outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                    />

                    <button
                      type="button"
                      onClick={detectLocation}
                      disabled={locationStatus === 'loading'}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-[#F2E0C3] px-3 py-2 text-xs font-semibold text-[#695D46] transition hover:bg-[#E6D0AB] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {locationStatus === 'loading' ? (
                        <span className="flex items-center gap-1">
                          <Loader2 size={14} className="animate-spin" />
                          Detecting
                        </span>
                      ) : (
                        'Use my location'
                      )}
                    </button>
                  </div>

                  {locationStatus === 'success' && (
                    <p className="mt-2 text-xs font-medium text-[#326460]">
                      Location detected successfully.
                    </p>
                  )}

                  {locationStatus === 'error' && (
                    <p className="mt-2 text-xs text-[#A03F28]">
                      Location access was not available. You can enter your
                      location manually.
                    </p>
                  )}

                  {locationStatus === 'unsupported' && (
                    <p className="mt-2 text-xs text-[#A03F28]">
                      Automatic location is not supported by this browser.
                      Please enter your location manually.
                    </p>
                  )}

                  <p className="mt-2 text-xs leading-5 text-[#7A706C]">
                    Your location helps customers, businesses, and delivery
                    services connect more easily.
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7D78]"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7D78]"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#7A706C] hover:bg-[#F2EDEA]"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-[#7A706C]">
                    Use at least 8 characters.
                  </p>
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7D78]"
                    />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword ? 'text' : 'password'
                      }
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#7A706C] hover:bg-[#F2EDEA]"
                      aria-label={
                        showConfirmPassword
                          ? 'Hide confirm password'
                          : 'Show confirm password'
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Terms */}
                <label className="flex items-start gap-3 text-sm leading-6 text-[#56423D]">
                  <input
                    type="checkbox"
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-[#CFC7C3] accent-[#A03F28]"
                  />

                  <span>
                    I agree to the{' '}
                    <Link
                      to="/terms"
                      className="font-semibold text-[#A03F28] hover:underline"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      to="/privacy"
                      className="font-semibold text-[#A03F28] hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#A03F28] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#812914] active:scale-[0.99]"
                >
                  Create{' '}
                  {role === 'vendor'
                    ? 'Business'
                    : role === 'rider'
                      ? 'Rider'
                      : 'Customer'}{' '}
                  Account
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Login */}
              <div className="mt-8 border-t border-[#E8E3E1] pt-6 text-center">
                <p className="text-sm text-[#6B625F]">
                  Already have an account?
                  <Link
                    to="/login"
                    className="ml-1 font-bold text-[#A03F28] hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage

