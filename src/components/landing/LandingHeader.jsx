import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bell, Menu, X } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { language, changeLanguage } = useLanguage()

  const navigation = [
    {
      label: language === 'sw' ? 'Nyumbani' : 'Home',
      href: '/#home',
    },
    {
      label: language === 'sw' ? 'Kuhusu' : 'About',
      href: '/#about',
    },
    {
      label:
        language === 'sw'
          ? 'Jinsi Inavyofanya Kazi'
          : 'How It Works',
      href: '/#how-it-works',
    },
    {
      label: language === 'sw' ? 'Biashara' : 'Businesses',
      href: '/#businesses',
    },
    {
      label: language === 'sw' ? 'Huduma' : 'Services',
      href: '/#services',
    },
    {
      label: language === 'sw' ? 'Msaada' : 'Help',
      href: '/#help',
    },
  ]

  const isHomePage = location.pathname === '/'

  const getNavigationHref = (href) => {
    if (isHomePage) {
      return href.replace('/', '')
    }

    return href
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-[#FCF9F8]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={
            mobileMenuOpen
              ? language === 'sw'
                ? 'Funga menyu'
                : 'Close menu'
              : language === 'sw'
                ? 'Fungua menyu'
                : 'Open menu'
          }
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-full p-2 text-stone-600 transition hover:bg-stone-100 lg:hidden"
        >
          {mobileMenuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2"
        >
          <img
            src="/jamii-market-icon.png"
            alt="JamiiMarket"
            className="h-9 w-9 object-contain"
          />

          <span className="text-xl font-bold tracking-tight text-[#A03F28]">
            JamiiMarket
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={getNavigationHref(item.href)}
              className="text-sm font-medium text-stone-600 transition hover:text-[#A03F28]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 sm:flex">

          {/* Language switch */}
          <div className="flex items-center overflow-hidden rounded-lg border border-stone-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => changeLanguage('en')}
              aria-pressed={language === 'en'}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition ${
                language === 'en'
                  ? 'bg-[#A03F28] text-white shadow-sm'
                  : 'text-stone-500 hover:bg-stone-100'
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
                  ? 'bg-[#326460] text-white shadow-sm'
                  : 'text-stone-500 hover:bg-stone-100'
              }`}
            >
              SW
            </button>
          </div>

          {/* Notifications */}
          <button
            type="button"
            aria-label={
              language === 'sw'
                ? 'Arifa'
                : 'Notifications'
            }
            className="rounded-full p-2 text-[#A03F28] transition hover:bg-stone-100"
          >
            <Bell size={20} />
          </button>

          {/* Login */}
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm font-semibold text-[#A03F28] transition hover:bg-[#F5E5DF]"
          >
            {language === 'sw' ? 'Ingia' : 'Login'}
          </Link>

          {/* Register */}
          <Link
            to="/register"
            className="rounded-full bg-[#A03F28] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#812914]"
          >
            {language === 'sw' ? 'Jisajili' : 'Register'}
          </Link>
        </div>

        {/* Mobile notification */}
        <button
          type="button"
          aria-label={
            language === 'sw'
              ? 'Arifa'
              : 'Notifications'
          }
          className="rounded-full p-2 text-[#A03F28] sm:hidden"
        >
          <Bell size={20} />
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-stone-200 bg-[#FCF9F8] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">

            {navigation.map((item) => (
              <a
                key={item.href}
                href={getNavigationHref(item.href)}
                onClick={closeMobileMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-[#F5E5DF] hover:text-[#A03F28]"
              >
                {item.label}
              </a>
            ))}

            {/* Mobile language switch */}
            <div className="mt-2 flex items-center rounded-xl border border-stone-200 bg-white p-1">
              <button
                type="button"
                onClick={() => changeLanguage('en')}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                  language === 'en'
                    ? 'bg-[#A03F28] text-white'
                    : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                English
              </button>

              <button
                type="button"
                onClick={() => changeLanguage('sw')}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                  language === 'sw'
                    ? 'bg-[#326460] text-white'
                    : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                Kiswahili
              </button>
            </div>

            {/* Mobile authentication */}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-stone-200 pt-3">

              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="rounded-xl border border-[#A03F28] px-4 py-3 text-center text-sm font-semibold text-[#A03F28]"
              >
                {language === 'sw' ? 'Ingia' : 'Login'}
              </Link>

              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="rounded-xl bg-[#A03F28] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                {language === 'sw' ? 'Jisajili' : 'Register'}
              </Link>

            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default LandingHeader