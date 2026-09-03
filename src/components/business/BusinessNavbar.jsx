import {
  Menu,
  Bell,
  User,
  ChevronDown,
  Settings,
  LogOut,
} from 'lucide-react'
import {
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

function BusinessNavbar({ onMenuClick }) {
  const location = useLocation()
  const navigate = useNavigate()

  const [profileOpen, setProfileOpen] = useState(false)

  const profileRef = useRef(null)

  const {
    language,
    changeLanguage,
  } = useLanguage()

  // Get current page information
  const getPageInformation = () => {
    switch (location.pathname) {
      case '/business/products':
        return {
          title:
            language === 'sw'
              ? 'Bidhaa'
              : 'Products',
          description:
            language === 'sw'
              ? 'Simamia bidhaa zako'
              : 'Manage your products',
        }

      case '/business/orders':
        return {
          title:
            language === 'sw'
              ? 'Oda'
              : 'Orders',
          description:
            language === 'sw'
              ? 'Simamia oda za wateja'
              : 'Manage customer orders',
        }

      case '/business/delivery':
        return {
          title:
            language === 'sw'
              ? 'Usafirishaji'
              : 'Delivery',
          description:
            language === 'sw'
              ? 'Simamia usafirishaji'
              : 'Manage deliveries',
        }

      case '/business/payments':
        return {
          title:
            language === 'sw'
              ? 'Malipo'
              : 'Payments',
          description:
            language === 'sw'
              ? 'Fuatilia malipo yako'
              : 'Monitor your payments',
        }

      case '/business/profile':
        return {
          title:
            language === 'sw'
              ? 'Wasifu wa Biashara'
              : 'Business Profile',
          description:
            language === 'sw'
              ? 'Simamia taarifa za biashara yako'
              : 'Manage your business information',
        }

      case '/business/settings':
        return {
          title:
            language === 'sw'
              ? 'Mipangilio ya Biashara'
              : 'Business Settings',
          description:
            language === 'sw'
              ? 'Simamia mapendeleo ya akaunti yako'
              : 'Manage your account preferences',
        }

      case '/business/notifications':
        return {
          title:
            language === 'sw'
              ? 'Arifa'
              : 'Notifications',
          description:
            language === 'sw'
              ? 'Pata taarifa za hivi karibuni'
              : 'Stay updated',
        }

      case '/business/dashboard':
      default:
        return {
          title:
            language === 'sw'
              ? 'Dashibodi ya Biashara'
              : 'Business Dashboard',
          description:
            language === 'sw'
              ? 'Simamia biashara yako'
              : 'Manage your business',
        }
    }
  }

  const currentPage = getPageInformation()

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close dropdown when changing pages
  useEffect(() => {
    setProfileOpen(false)
  }, [location.pathname])

  // Open business profile
  const handleProfile = () => {
    setProfileOpen(false)
    navigate('/business/profile')
  }

  // Open business settings
  const handleSettings = () => {
    setProfileOpen(false)
    navigate('/business/settings')
  }

  // Logout business account
  const handleLogout = () => {
    setProfileOpen(false)

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('jamiiMarketUser')

    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:h-[4.5rem] sm:px-6 lg:px-8">

      {/* Left side */}
      <div className="flex min-w-0 items-center gap-3">

        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-[#326460] focus:outline-none focus:ring-2 focus:ring-[#326460]/20 lg:hidden"
          aria-label={
            language === 'sw'
              ? 'Fungua menyu ya biashara'
              : 'Open business navigation menu'
          }
          title={
            language === 'sw'
              ? 'Fungua menyu'
              : 'Open menu'
          }
        >
          <Menu size={22} />
        </button>

        {/* Page title */}
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-[#1B1C1C] sm:text-lg">
            {currentPage.title}
          </h2>

          <p className="hidden truncate text-xs text-gray-500 sm:block">
            {currentPage.description}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">

        {/* Language switcher */}
        <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1">

          <button
            type="button"
            onClick={() => changeLanguage('sw')}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
              language === 'sw'
                ? 'bg-[#326460] text-white shadow-sm'
                : 'text-gray-600 hover:bg-white'
            }`}
            aria-label="Kiswahili"
            aria-pressed={language === 'sw'}
          >
            SW
          </button>

          <button
            type="button"
            onClick={() => changeLanguage('en')}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
              language === 'en'
                ? 'bg-[#326460] text-white shadow-sm'
                : 'text-gray-600 hover:bg-white'
            }`}
            aria-label="English"
            aria-pressed={language === 'en'}
          >
            EN
          </button>

        </div>

        {/* Notifications */}
        <NavLink
          to="/business/notifications"
          className={({ isActive }) =>
            `relative flex h-10 w-10 items-center justify-center rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[#326460]/20 ${
              isActive
                ? 'bg-[#E7F2F0] text-[#326460]'
                : 'text-gray-600 hover:bg-gray-100 hover:text-[#326460]'
            }`
          }
          aria-label={
            language === 'sw'
              ? 'Arifa'
              : 'Notifications'
          }
          title={
            language === 'sw'
              ? 'Arifa'
              : 'Notifications'
          }
        >
          <Bell size={20} />
        </NavLink>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

        {/* Business account dropdown */}
        <div
          ref={profileRef}
          className="relative"
        >

          {/* Profile button */}
          <button
            type="button"
            onClick={() =>
              setProfileOpen((current) => !current)
            }
            className={`flex items-center gap-2 rounded-xl p-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#326460]/20 sm:px-2 ${
              profileOpen
                ? 'bg-[#E7F2F0]'
                : 'hover:bg-gray-100'
            }`}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            aria-label={
              language === 'sw'
                ? 'Akaunti ya biashara'
                : 'Business account'
            }
          >

            {/* Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#326460] text-white">
              <User size={18} />
            </div>

            {/* Business information */}
            <div className="hidden min-w-0 text-left md:block">
              <p className="max-w-32 truncate text-sm font-semibold text-[#1B1C1C]">
                {language === 'sw'
                  ? 'Biashara Yangu'
                  : 'My Business'}
              </p>

              <p className="text-xs text-gray-500">
                {language === 'sw'
                  ? 'Akaunti ya Biashara'
                  : 'Business Account'}
              </p>
            </div>

            {/* Dropdown indicator */}
            <ChevronDown
              size={17}
              className={`hidden shrink-0 text-gray-500 transition md:block ${
                profileOpen
                  ? 'rotate-180 text-[#326460]'
                  : ''
              }`}
            />
          </button>

          {/* Dropdown menu */}
          {profileOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
              role="menu"
            >

              {/* Account header */}
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="text-sm font-semibold text-[#1B1C1C]">
                  {language === 'sw'
                    ? 'Akaunti ya Biashara'
                    : 'Business Account'}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  {language === 'sw'
                    ? 'Simamia akaunti yako'
                    : 'Manage your account'}
                </p>
              </div>

              {/* Profile */}
              <button
                type="button"
                onClick={handleProfile}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-[#E7F2F0] hover:text-[#326460]"
                role="menuitem"
              >
                <User size={18} />

                <span>
                  {language === 'sw'
                    ? 'Wasifu'
                    : 'Profile'}
                </span>
              </button>

              {/* Settings */}
              <button
                type="button"
                onClick={handleSettings}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-[#E7F2F0] hover:text-[#326460]"
                role="menuitem"
              >
                <Settings size={18} />

                <span>
                  {language === 'sw'
                    ? 'Mipangilio'
                    : 'Settings'}
                </span>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                role="menuitem"
              >
                <LogOut size={18} />

                <span>
                  {language === 'sw'
                    ? 'Toka'
                    : 'Logout'}
                </span>
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default BusinessNavbar

