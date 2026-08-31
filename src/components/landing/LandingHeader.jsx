import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bell, Menu, X } from 'lucide-react'

function LandingHeader() {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const location = useLocation()

const navigation = [
{ label: 'Home', href: '/#home' },
{ label: 'About', href: '/#about' },
{ label: 'How It Works', href: '/#how-it-works' },
{ label: 'Businesses', href: '/#businesses' },
{ label: 'Services', href: '/#services' },
{ label: 'Help', href: '/#help' },
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

return ( <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-[#FCF9F8]/95 backdrop-blur-md"> <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">

    {/* Mobile menu button */}
    <button
      type="button"
      aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
      className="text-xl font-bold tracking-tight text-[#A03F28]"
    >
      JamiiMarket
    </Link>

    {/* Desktop navigation */}
    <nav className="hidden items-center gap-7 lg:flex">
      {navigation.map((item) => (
        <a
          key={item.label}
          href={getNavigationHref(item.href)}
          className="text-sm font-medium text-stone-600 transition hover:text-[#A03F28]"
        >
          {item.label}
        </a>
      ))}
    </nav>

    {/* Desktop actions */}
    <div className="hidden items-center gap-2 sm:flex">

      {/* Language */}
      <button
        type="button"
        className="rounded-lg px-3 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-100"
      >
        EN / SW
      </button>

      {/* Notifications */}
      <button
        type="button"
        aria-label="Notifications"
        className="rounded-full p-2 text-[#A03F28] transition hover:bg-stone-100"
      >
        <Bell size={20} />
      </button>

      {/* Login */}
      <Link
        to="/login"
        className="rounded-full px-4 py-2 text-sm font-semibold text-[#A03F28] transition hover:bg-[#F5E5DF]"
      >
        Login
      </Link>

      {/* Register */}
      <Link
        to="/register"
        className="rounded-full bg-[#A03F28] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#812914]"
      >
        Register
      </Link>
    </div>

    {/* Mobile notification */}
    <button
      type="button"
      aria-label="Notifications"
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
            key={item.label}
            href={getNavigationHref(item.href)}
            onClick={closeMobileMenu}
            className="rounded-xl px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-[#F5E5DF] hover:text-[#A03F28]"
          >
            {item.label}
          </a>
        ))}

        {/* Mobile authentication */}
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-stone-200 pt-3">

          <Link
            to="/login"
            onClick={closeMobileMenu}
            className="rounded-xl border border-[#A03F28] px-4 py-3 text-center text-sm font-semibold text-[#A03F28]"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={closeMobileMenu}
            className="rounded-xl bg-[#A03F28] px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Register
          </Link>

        </div>
      </nav>
    </div>
  )}
</header>

)
}

export default LandingHeader
