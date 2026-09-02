import { Bell, Menu, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function DeliveryNavbar({ onMenuClick }) {
  const navigate = useNavigate()

  const storedUser = localStorage.getItem('jamiiMarketUser')
  const user = storedUser ? JSON.parse(storedUser) : null

  const firstName = user?.firstName || 'Rider'
  const lastName = user?.lastName || ''

  const riderName = `${firstName} ${lastName}`.trim()

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0) || ''}`.toUpperCase()

  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-20 border-b border-slate-200 bg-white lg:left-72">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open delivery menu"
          >
            <Menu size={22} />
          </button>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">
              Delivery Dashboard
            </p>

            <p className="text-xs text-slate-500">
              Manage your deliveries
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => navigate('/delivery/notifications')}
            className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>

          <button
            type="button"
            onClick={() => navigate('/delivery/profile')}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-slate-100"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
              {initials || <User size={17} />}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {riderName}
              </p>

              <p className="text-xs text-slate-500">
                Delivery Rider
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default DeliveryNavbar

