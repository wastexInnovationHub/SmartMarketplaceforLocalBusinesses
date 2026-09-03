import { Bell, Menu, User, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

function DeliveryNavbar({ onMenuClick }) {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const { language, changeLanguage, t } = useLanguage()

  // Get rider information
  const storedUser = localStorage.getItem('jamiiMarketUser')

  let user = null

  try {
    user = storedUser ? JSON.parse(storedUser) : null
  } catch {
    user = null
  }

  const firstName = user?.firstName || 'Rider'
  const lastName = user?.lastName || ''

  const riderName = `${firstName} ${lastName}`.trim()

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0) || ''}`.toUpperCase()

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('jamiiMarketUser')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')

    navigate('/login')
  }

  // Navigate to profile
  const handleProfile = () => {
    setIsDropdownOpen(false)
    navigate('/delivery/profile')
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-16 border-b border-slate-200 bg-white lg:left-72">
      <div className="flex h-full items-center justify-between px-3 sm:px-5 lg:px-6">

        {/* Left side */}
        <div className="flex min-w-0 items-center gap-2.5">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            aria-label={
              language === 'sw'
                ? 'Fungua menyu ya usafirishaji'
                : 'Open delivery menu'
            }
          >
            <Menu size={20} />
          </button>

          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold text-slate-900">
              {language === 'sw'
                ? 'Dashibodi ya Usafirishaji'
                : 'Delivery Dashboard'}
            </p>

            <p className="truncate text-[11px] text-slate-500">
              {language === 'sw'
                ? 'Simamia usafirishaji wako'
                : 'Manage your deliveries'}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">

          {/* Language switcher */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5">
            <button
              type="button"
              onClick={() => changeLanguage('sw')}
              className={`rounded-md px-2 py-1 text-[11px] font-semibold transition ${
                language === 'sw'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white'
              }`}
              aria-label="Swahili"
              aria-pressed={language === 'sw'}
            >
              SW
            </button>

            <button
              type="button"
              onClick={() => changeLanguage('en')}
              className={`rounded-md px-2 py-1 text-[11px] font-semibold transition ${
                language === 'en'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white'
              }`}
              aria-label="English"
              aria-pressed={language === 'en'}
            >
              EN
            </button>
          </div>

          {/* Notifications */}
          <button
            type="button"
            onClick={() => navigate('/delivery/notifications')}
            className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
            aria-label={
              language === 'sw'
                ? 'Arifa'
                : 'Notifications'
            }
          >
            <Bell size={19} />
          </button>

          {/* Profile dropdown */}
          <div className="relative">

            {/* Profile button */}
            <button
              type="button"
              onClick={() => setIsDropdownOpen((current) => !current)}
              className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 transition hover:bg-slate-100 sm:px-2"
              aria-expanded={isDropdownOpen}
              aria-haspopup="menu"
            >
              {/* Avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                {initials || <User size={15} />}
              </div>

              {/* Rider information */}
              <div className="hidden text-left sm:block">
                <p className="max-w-28 truncate text-xs font-semibold text-slate-900 lg:max-w-36">
                  {riderName}
                </p>

                <p className="text-[10px] text-slate-500">
                  {language === 'sw'
                    ? 'Msafirishaji'
                    : 'Delivery Rider'}
                </p>
              </div>

              {/* Dropdown arrow */}
              <ChevronDown
                size={14}
                className={`hidden text-slate-400 transition-transform sm:block ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
                role="menu"
              >
                {/* Profile */}
                <button
                  type="button"
                  onClick={handleProfile}
                  className="flex w-full items-center gap-3 px-3.5 py-3 text-left transition hover:bg-slate-50"
                  role="menuitem"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <User size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      {language === 'sw'
                        ? 'Wasifu'
                        : 'Profile'}
                    </p>

                    <p className="text-[11px] text-slate-500">
                      {language === 'sw'
                        ? 'Angalia wasifu wako'
                        : 'View your profile'}
                    </p>
                  </div>
                </button>

                <div className="border-t border-slate-100" />

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-3.5 py-3 text-left transition hover:bg-red-50"
                  role="menuitem"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <LogOut size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-red-600">
                      {language === 'sw'
                        ? 'Toka'
                        : 'Logout'}
                    </p>

                    <p className="text-[11px] text-red-400">
                      {language === 'sw'
                        ? 'Toka kwenye akaunti'
                        : 'Sign out of your account'}
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default DeliveryNavbar

