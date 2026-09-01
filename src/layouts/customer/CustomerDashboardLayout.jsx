import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Store,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Bell,
} from 'lucide-react'

function CustomerDashboardLayout() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const user = {
    firstName: 'Customer',
    lastName: '',
    email: 'customer@gmail.com',
  }

  const customerName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || 'Customer'

  const navigation = [
    {
      name: 'Dashboard',
      path: '/customer/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Businesses',
      path: '/customer/businesses',
      icon: Store,
    },
    {
      name: 'Favorites',
      path: '/customer/favorites',
      icon: Heart,
    },
    {
      name: 'My Orders',
      path: '/customer/orders',
      icon: ShoppingBag,
    },
    {
      name: 'Profile',
      path: '/customer/profile',
      icon: User,
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#FCF9F8] text-[#1B1C1C]">

      {/* =========================
          MOBILE OVERLAY
      ========================== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =========================
          SIDEBAR
      ========================== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col
          border-r border-[#DDC0BA] bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >

        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-[#E8E3E1] px-6">

          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A03F28] text-lg font-bold text-white">
              J
            </div>

            <div className="text-left">
              <p className="text-lg font-bold text-[#1B1C1C]">
                JamiiMarket
              </p>

              <p className="text-xs text-[#7A706C]">
                Customer Portal
              </p>
            </div>
          </button>

          {/* Mobile close */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-[#6B625F] hover:bg-[#FCF9F8] lg:hidden"
          >
            <X size={21} />
          </button>

        </div>

        {/* Customer */}
        <div className="border-b border-[#E8E3E1] px-5 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C0573E] font-bold text-white">
              {customerName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#1B1C1C]">
                {customerName}
              </p>

              <p className="truncate text-xs text-[#7A706C]">
                {user.email}
              </p>
            </div>

          </div>

        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9B918D]">
            Customer Menu
          </p>

          <div className="space-y-2">

            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `
                    group flex items-center justify-between rounded-xl px-4 py-3
                    text-sm font-semibold transition
                    ${
                      isActive
                        ? 'bg-[#A03F28] text-white shadow-sm'
                        : 'text-[#56423D] hover:bg-[#FCF9F8] hover:text-[#A03F28]'
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">

                        <Icon
                          size={19}
                          strokeWidth={isActive ? 2.3 : 2}
                        />

                        <span>{item.name}</span>

                      </div>

                      <ChevronRight
                        size={16}
                        className={`
                          transition-transform
                          ${
                            isActive
                              ? 'opacity-100'
                              : 'opacity-0 group-hover:translate-x-1 group-hover:opacity-100'
                          }
                        `}
                      />
                    </>
                  )}
                </NavLink>
              )
            })}

          </div>

        </nav>

        {/* Sidebar Bottom */}
        <div className="border-t border-[#E8E3E1] p-4">

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#A03F28] transition hover:bg-[#FCF9F8]"
          >
            <LogOut size={19} />

            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* =========================
          MAIN AREA
      ========================== */}
      <div className="min-h-screen lg:pl-[260px]">

        {/* =========================
            TOP NAVBAR
        ========================== */}
        <header className="sticky top-0 z-30 h-20 border-b border-[#DDC0BA] bg-white/95 backdrop-blur">

          <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

            <div className="flex items-center gap-3">

              {/* Mobile menu */}
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-[#E8E3E1] p-2.5 text-[#56423D] hover:bg-[#FCF9F8] lg:hidden"
              >
                <Menu size={21} />
              </button>

              <div>
                <p className="text-xs font-medium text-[#8A726C]">
                  Customer Account
                </p>

                <p className="text-sm font-bold text-[#1B1C1C] sm:text-base">
                  Welcome, {customerName}
                </p>
              </div>

            </div>

            {/* Right navbar */}
            <div className="flex items-center gap-2 sm:gap-4">

              {/* Notification */}
              <button
                type="button"
                className="relative rounded-xl p-2.5 text-[#56423D] transition hover:bg-[#FCF9F8]"
                aria-label="Notifications"
              >
                <Bell size={20} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#A03F28]" />
              </button>

              {/* Profile */}
              <button
                type="button"
                onClick={() => navigate('/customer/profile')}
                className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-[#FCF9F8]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C0573E] text-sm font-bold text-white">
                  {customerName.charAt(0).toUpperCase()}
                </div>

                <div className="hidden text-left sm:block">
                  <p className="max-w-[130px] truncate text-xs font-bold">
                    {customerName}
                  </p>

                  <p className="text-[11px] text-[#7A706C]">
                    Customer
                  </p>
                </div>
              </button>

            </div>

          </div>

        </header>

        {/* =========================
            PAGE CONTENT
        ========================== */}
        <main className="w-full px-4 py-7 sm:px-6 lg:px-10 xl:px-12">

          {/* Important:
              Outlet renders the current customer page.
          */}
          <div className="mx-auto w-full max-w-[1400px]">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  )
}

export default CustomerDashboardLayout

