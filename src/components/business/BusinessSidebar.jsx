import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Truck,
  CreditCard,
  Building2,
  Bell,
  Store,
  X,
  LogOut,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const menuItems = [
  {
    key: 'dashboard',
    path: '/business/dashboard',
    icon: LayoutDashboard,
    end: true,
  },
  {
    key: 'products',
    path: '/business/products',
    icon: Package,
  },
  {
    key: 'orders',
    path: '/business/orders',
    icon: ShoppingBag,
  },
  {
    key: 'delivery',
    path: '/business/delivery',
    icon: Truck,
  },
  {
    key: 'payments',
    path: '/business/payments',
    icon: CreditCard,
  },
  {
    key: 'businessProfile',
    path: '/business/profile',
    icon: Building2,
  },
  {
    key: 'notifications',
    path: '/business/notifications',
    icon: Bell,
  },
]

function BusinessSidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { language } = useLanguage()

  const translations = {
    en: {
      businessPortal: 'Business Portal',
      businessManagement: 'Business Management',
      dashboard: 'Dashboard',
      products: 'Products',
      orders: 'Orders',
      delivery: 'Delivery',
      payments: 'Payments',
      businessProfile: 'Business Profile',
      notifications: 'Notifications',
      logout: 'Logout',
      closeMenu: 'Close business navigation menu',
      businessNavigation: 'Business navigation',
      managementNavigation: 'Business management',
      goToDashboard: 'Go to Business Dashboard',
      logoutConfirm: 'Are you sure you want to log out?',
    },
    sw: {
      businessPortal: 'Sehemu ya Biashara',
      businessManagement: 'Usimamizi wa Biashara',
      dashboard: 'Dashibodi',
      products: 'Bidhaa',
      orders: 'Oda',
      delivery: 'Usafirishaji',
      payments: 'Malipo',
      businessProfile: 'Wasifu wa Biashara',
      notifications: 'Arifa',
      logout: 'Toka',
      closeMenu: 'Funga menyu ya biashara',
      businessNavigation: 'Menyu ya biashara',
      managementNavigation: 'Usimamizi wa biashara',
      goToDashboard: 'Nenda kwenye Dashibodi ya Biashara',
      logoutConfirm: 'Una uhakika unataka kutoka?',
    },
  }

  const text = translations[language] || translations.en

  const getMenuLabel = (key) => text[key] || key

  // Logout
  const handleLogout = () => {
    const confirmed = window.confirm(text.logoutConfirm)

    if (!confirmed) {
      return
    }

    localStorage.removeItem('jamiiMarketUser')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')

    onClose()
    navigate('/login', { replace: true })
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-dvh w-[85vw] max-w-72 flex-col bg-[#1B1C1C] text-white shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label={text.businessNavigation}
      >

        {/* Logo */}
        <div className="flex min-h-20 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
          <NavLink
            to="/business/dashboard"
            onClick={onClose}
            className="flex min-w-0 items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#326460]"
            aria-label={text.goToDashboard}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#326460]">
              <Store size={22} />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold">
                JamiiMarket
              </h1>

              <p className="truncate text-xs text-gray-400">
                {text.businessPortal}
              </p>
            </div>
          </NavLink>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#326460] lg:hidden"
            aria-label={text.closeMenu}
            title={text.closeMenu}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-5 sm:px-4 sm:py-6"
          aria-label={text.managementNavigation}
        >
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {text.businessManagement}
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) => {
                    if (isActive) {
                      return 'group flex min-h-11 items-center gap-3 rounded-xl bg-[#326460] px-4 py-3 text-sm font-medium text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#326460]'
                    }

                    return 'group flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#326460]'
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        className={
                          isActive
                            ? 'shrink-0 text-white'
                            : 'shrink-0 text-gray-400 transition group-hover:text-white'
                        }
                      />

                      <span className="truncate">
                        {getMenuLabel(item.key)}
                      </span>
                    </>
                  )}
                </NavLink>
              )
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t border-white/10 p-3 sm:p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex min-h-11 w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-red-500/10 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-400/50"
          >
            <LogOut size={19} className="shrink-0" />

            <span>
              {text.logout}
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default BusinessSidebar

