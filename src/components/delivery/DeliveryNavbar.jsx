import { Bell, Menu, User, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

function DeliveryNavbar({ onMenuClick }) {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const { language, changeLanguage, t } = useLanguage()

  const storedUser = localStorage.getItem('jamiiMarketUser')
  const user = storedUser ? JSON.parse(storedUser) : null

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
    <header className="fixed left-0 right-0 top-0 z-30 h-20 border-b border-slate-200 bg-white lg:left-72">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label={language === 'sw' ? 'Fungua menyu ya dereva' : 'Open delivery menu'}
          >
            <Menu size={22} />
          </button>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">
              {t('deliveryDashboard')}
            </p>

            <p className="text-xs text-slate-500">
              {t('manageDeliveries')}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Language switcher */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => changeLanguage('sw')}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
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
              className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                language === 'en'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white'
              }`}
              aria-label="English"
              aria-pressed={language === 'en'}
            >
              ENG
            </button>
          </div>

          {/* Notifications */}
          <button
            type="button"
            onClick={() => navigate('/delivery/notifications')}
            className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100"
            aria-label={t('notifications')}
          >
            <Bell size={20} />
          </button>

          {/* Profile dropdown */}
          <div className="relative">

            {/* Profile button */}
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-slate-100"
              aria-expanded={isDropdownOpen}
              aria-haspopup="menu"
            >
              {/* Avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                {initials || <User size={17} />}
              </div>

              {/* Rider name */}
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-900">
                  {riderName}
                </p>

                <p className="text-xs text-slate-500">
                  {t('deliveryRider')}
                </p>
              </div>

              {/* Dropdown arrow */}
              <ChevronDown
                size={16}
                className={`hidden text-slate-500 transition-transform sm:block ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
                role="menu"
              >
                {/* Profile */}
                <button
                  type="button"
                  onClick={handleProfile}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                  role="menuitem"
                >
                  <User size={18} className="text-slate-500" />

                  <div>
                    <p className="font-medium text-slate-900">
                      {t('profile')}
                    </p>

                    <p className="text-xs text-slate-500">
                      {t('viewProfile')}
                    </p>
                  </div>
                </button>

                <div className="border-t border-slate-100" />

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                  role="menuitem"
                >
                  <LogOut size={18} />

                  <div>
                    <p className="font-medium">
                      {t('logout')}
                    </p>

                    <p className="text-xs text-red-400">
                      {t('signOut')}
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

