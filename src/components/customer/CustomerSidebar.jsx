import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  ReceiptText,
  UserRound,
  MapPin,
  X,
  LogOut,
} from 'lucide-react'

import { NavLink, useNavigate } from 'react-router-dom'

function CustomerSidebar({ isOpen, onClose }) {
  const navigate = useNavigate()

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/customer/dashboard',
    },
    {
      label: 'Browse',
      icon: ShoppingBag,
      path: '/customer/browse',
    },
    {
      label: 'Orders',
      icon: ReceiptText,
      path: '/customer/orders',
    },
    {
      label: 'Favorites',
      icon: Heart,
      path: '/customer/favorites',
    },
    {
      label: 'Profile',
      icon: UserRound,
      path: '/customer/profile',
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('role')

    navigate('/login')
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
          border-r border-[#DDC0BA] bg-[#FCF9F8]
          transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >

        {/* =====================================
            BRAND
        ====================================== */}
        <div className="flex h-20 items-center justify-between border-b border-[#DDC0BA] px-5">

          <div className="flex items-center gap-3">

            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#A03F28] text-white shadow-sm">
              <ShoppingBag
                size={22}
                strokeWidth={2.2}
              />

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#FCF9F8] bg-[#326460]">
                <MapPin
                  size={10}
                  fill="currentColor"
                />
              </span>
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-[#A03F28]">
                JamiiMarket
              </h1>

              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#695D46]">
                Local Marketplace
              </p>
            </div>

          </div>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-[#56423D] transition hover:bg-[#F0E7E4] lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* =====================================
            NAVIGATION
        ====================================== */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8A726C]">
            Marketplace
          </p>

          <div className="space-y-1.5">

            {navigationItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => `
                    group flex w-full items-center gap-3 rounded-xl
                    px-3 py-3 text-sm font-semibold transition-all
                    ${
                      isActive
                        ? 'bg-[#A03F28] text-white shadow-sm'
                        : 'text-[#56423D] hover:bg-[#F0E7E4] hover:text-[#A03F28]'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.3 : 2}
                      />

                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              )
            })}

          </div>
        </nav>

        {/* =====================================
            ACCOUNT + LOGOUT
        ====================================== */}
        <div className="border-t border-[#DDC0BA] p-4">

          <div className="rounded-xl bg-[#F0E7E4] p-3">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#326460] text-sm font-bold text-white">
                C
              </div>

              <div className="min-w-0">

                <p className="truncate text-sm font-semibold text-[#1B1C1C]">
                  Customer
                </p>

                <p className="truncate text-xs text-[#695D46]">
                  Marketplace account
                </p>

              </div>

            </div>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#A03F28] transition hover:bg-[#F0E7E4]"
          >
            <LogOut size={19} />

            <span>Logout</span>
          </button>

        </div>

      </aside>
    </>
  )
}

export default CustomerSidebar
