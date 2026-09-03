import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShoppingBag,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

function LoginPage() {
  const navigate = useNavigate()
  const { language, changeLanguage } = useLanguage()

  const isSwahili = language === 'sw'

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    setError('')
    setIsLoading(true)

    const normalizedEmail = email.trim().toLowerCase()

    // Temporary frontend accounts for dashboard development.
    // These will be replaced with backend authentication later.
    const accounts = {
      'customer@gmail.com': {
        password: 'user@123',
        role: 'customer',
        dashboard: '/customer/dashboard',
      },

      'delivery@gmail.com': {
        password: 'user@123',
        role: 'delivery',
        dashboard: '/delivery/dashboard',
      },

      'bussiness@gmail.com': {
        password: 'user@123',
        role: 'business',
        dashboard: '/business/dashboard',
      },

      'admin@smflb.com': {
        password: 'Admi@123',
        role: 'admin',
        dashboard: '/admin/dashboard',
      },
    }

    const account = accounts[normalizedEmail]

    if (!account || account.password !== password) {
      setError(
        isSwahili
          ? 'Barua pepe au nenosiri si sahihi.'
          : 'Invalid email or password.',
      )
      setIsLoading(false)
      return
    }

    // Store only the temporary login information needed
    // for dashboard routing during frontend development.
    localStorage.setItem(
      'jamiiMarketUser',
      JSON.stringify({
        email: normalizedEmail,
        role: account.role,
      }),
    )

    // Send the user directly to the dashboard
    // belonging to their role.
    navigate(account.dashboard)

    setIsLoading(false)
  }

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
              aria-pressed={language === 'en'}
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
              aria-pressed={language === 'sw'}
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

        <div className="grid overflow-hidden rounded-[2rem] border border-[#DDC0BA] bg-white shadow-[0_20px_60px_-20px_rgba(160,63,40,0.18)] lg:grid-cols-[0.85fr_1.15fr]">

          {/* Left panel */}
          <div className="hidden bg-[#A03F28] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <ShoppingBag size={25} />
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-[#F2E0C3]">
                {isSwahili ? 'Karibu tena' : 'Welcome back'}
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight">
                {isSwahili
                  ? 'Soko lako la ndani linakusubiri.'
                  : 'Your local marketplace is waiting.'}
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-white/80">
                {isSwahili
                  ? 'Ingia ili kugundua bidhaa za ndani, kuwasiliana na biashara, kusimamia akaunti yako, au kuendelea na kazi za usafirishaji.'
                  : 'Sign in to discover local products, connect with businesses, manage your marketplace activities, or continue delivering orders.'}
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#F2E0C3]" />
                  <p className="text-sm text-white/80">
                    {isSwahili
                      ? 'Gundua bidhaa na huduma za ndani'
                      : 'Discover local products and services'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#F2E0C3]" />
                  <p className="text-sm text-white/80">
                    {isSwahili
                      ? 'Wasiliana na biashara za ndani'
                      : 'Connect with local businesses'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#F2E0C3]" />
                  <p className="text-sm text-white/80">
                    {isSwahili
                      ? 'Simamia akaunti yako ya JamiiMarket'
                      : 'Manage your JamiiMarket account'}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/60">
              {isSwahili
                ? 'Biashara za ndani. Jamii zilizounganishwa.'
                : 'Local commerce. Connected communities.'}
            </p>
          </div>

          {/* Login form */}
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-md">

              {/* Heading */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#326460]">
                  {isSwahili ? 'Ingia' : 'Sign in'}
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1B1C1C]">
                  {isSwahili ? 'Karibu tena' : 'Welcome back'}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#56423D]">
                  {isSwahili
                    ? 'Ingia ili kuendelea kwenye JamiiMarket.'
                    : 'Sign in to continue to JamiiMarket.'}
                </p>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
                  >
                    {isSwahili ? 'Barua pepe' : 'Email address'}
                  </label>

                  <div className="relative">
                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7D78]"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={
                        isSwahili
                          ? 'wewe@example.com'
                          : 'you@example.com'
                      }
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-[#1B1C1C]"
                    >
                      {isSwahili ? 'Nenosiri' : 'Password'}
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-[#A03F28] hover:underline"
                    >
                      {isSwahili
                        ? 'Umesahau nenosiri?'
                        : 'Forgot password?'}
                    </button>
                  </div>

                  <div className="relative">
                    <LockKeyhole
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7D78]"
                    />

                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder={
                        isSwahili
                          ? 'Ingiza nenosiri lako'
                          : 'Enter your password'
                      }
                      autoComplete="current-password"
                      required
                      className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword
                          ? isSwahili
                            ? 'Ficha nenosiri'
                            : 'Hide password'
                          : isSwahili
                            ? 'Onyesha nenosiri'
                            : 'Show password'
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#7A706C] transition hover:bg-[#F2EDEA]"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <label className="flex items-center gap-3 text-sm text-[#56423D]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#CFC7C3] accent-[#A03F28]"
                  />

                  <span>
                    {isSwahili ? 'Nikumbuke' : 'Remember me'}
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#A03F28] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#812914] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading
                    ? isSwahili
                      ? 'Inaingia...'
                      : 'Signing in...'
                    : isSwahili
                      ? 'Ingia'
                      : 'Sign In'}

                  {!isLoading && <ArrowRight size={18} />}
                </button>
              </form>

              {/* Register */}
              <div className="mt-8 border-t border-[#E8E3E1] pt-6 text-center">
                <p className="text-sm text-[#6B625F]">
                  {isSwahili
                    ? 'Huna akaunti?'
                    : "Don't have an account?"}

                  <Link
                    to="/register"
                    className="ml-1 font-bold text-[#A03F28] hover:underline"
                  >
                    {isSwahili
                      ? 'Fungua akaunti'
                      : 'Create an account'}
                  </Link>
                </p>
              </div>

              {/* Back to marketplace */}
              <div className="mt-5 text-center">
                <Link
                  to="/"
                  className="text-sm font-semibold text-[#326460] hover:underline"
                >
                  ←{' '}
                  {isSwahili
                    ? 'Rudi kwenye soko'
                    : 'Back to marketplace'}
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage

