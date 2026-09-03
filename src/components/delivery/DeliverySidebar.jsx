import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Bell,
  Bike,
  ClipboardList,
  DollarSign,
  History,
  LayoutDashboard,
  LogOut,
  Map,
  User,
  X,
} from 'lucide-react'

import { useLanguage } from '../../i18n/LanguageContext'

function DeliverySidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { language } = useLanguage()

  const isSwahili = language === 'sw'

  const text = {
    deliveryPortal: isSwahili ? 'Sehemu ya Usafirishaji' : 'Delivery Portal',
    deliveryRider: isSwahili ? 'Msafirishaji' : 'Delivery Rider',

    dashboard: isSwahili ? 'Dashibodi' : 'Dashboard',
    availableDeliveries: isSwahili
      ? 'Usafirishaji Uliopo'
      : 'Available Deliveries',
    myDeliveries: isSwahili ? 'Usafirishaji Wangu' : 'My Deliveries',
    activeDelivery: isSwahili
      ? 'Usafirishaji Unaendelea'
      : 'Active Delivery',

    deliveryHistory: isSwahili
      ? 'Historia ya Usafirishaji'
      : 'Delivery History',
    earnings: isSwahili ? 'Mapato' : 'Earnings',
    notifications: isSwahili ? 'Arifa' : 'Notifications',

    profile: isSwahili ? 'Wasifu' : 'Profile',

    main: isSwahili ? 'Mkuu' : 'Main',
    management: isSwahili ? 'Usimamizi' : 'Management',
    account: isSwahili ? 'Akaunti' : 'Account',

    logout: isSwahili ? 'Toka' : 'Logout',

    closeDeliverySidebar: isSwahili
      ? 'Funga menyu ya usafirishaji'
      : 'Close delivery sidebar',

    deliveryPortalSidebar: isSwahili
      ? 'Menyu ya sehemu ya usafirishaji'
      : 'Delivery portal sidebar',

    goToDeliveryDashboard: isSwahili
      ? 'Nenda kwenye dashibodi ya usafirishaji'
      : 'Go to delivery dashboard',

    closeDeliveryNavigation: isSwahili
      ? 'Funga menyu ya usafirishaji'
      : 'Close delivery sidebar',
  }

  const [rider, setRider] = useState({
    firstName: '',
    lastName: '',
    profileImage: '',
  })

  // Load delivery rider information
  const loadRider = () => {
    try {
      const storedUser = localStorage.getItem('jamiiMarketUser')

      if (!storedUser) {
        setRider({
          firstName: '',
          lastName: '',
          profileImage: '',
        })
        return
      }

      const user = JSON.parse(storedUser)

      setRider({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        profileImage: user.profileImage || '',
      })
    } catch (error) {
      console.error('Unable to load delivery rider profile:', error)

      setRider({
        firstName: '',
        lastName: '',
        profileImage: '',
      })
    }
  }

  useEffect(() => {
    loadRider()

    const handleProfileUpdate = () => {
      loadRider()
    }

    const handleStorageChange = () => {
      loadRider()
    }

    window.addEventListener(
      'jamiiMarketProfileUpdated',
      handleProfileUpdate
    )

    window.addEventListener(
      'storage',
      handleStorageChange
    )

    return () => {
      window.removeEventListener(
        'jamiiMarketProfileUpdated',
        handleProfileUpdate
      )

      window.removeEventListener(
        'storage',
        handleStorageChange
      )
    }
  }, [])

  const riderName =
    [rider.firstName, rider.lastName]
      .filter(Boolean)
      .join(' ') || text.deliveryRider

  const initials =
    `${rider.firstName?.charAt(0) || ''}${rider.lastName?.charAt(0) || ''}`
      .toUpperCase() || 'DR'

  const mainMenu = [
    {
      name: text.dashboard,
      path: '/delivery/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: text.availableDeliveries,
      path: '/delivery/available',
      icon: ClipboardList,
    },
    {
      name: text.myDeliveries,
      path: '/delivery/my-deliveries',
      icon: Bike,
    },
    {
      name: text.activeDelivery,
      path: '/delivery/active',
      icon: Map,
    },
  ]

  const managementMenu = [
    {
      name: text.deliveryHistory,
      path: '/delivery/history',
      icon: History,
    },
    {
      name: text.earnings,
      path: '/delivery/earnings',
      icon: DollarSign,
    },
    {
      name: text.notifications,
      path: '/delivery/notifications',
      icon: Bell,
    },
  ]

  const accountMenu = [
    {
      name: text.profile,
      path: '/delivery/profile',
      icon: User,
    },
  ]

  // Logout delivery rider
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('jamiiMarketUser')

    onClose?.()

    navigate('/login', {
      replace: true,
    })
  }

  // Navigate to delivery dashboard
  const handleDashboard = () => {
    onClose?.()

    navigate('/delivery/dashboard')
  }

  // Render sidebar navigation items
  const renderMenu = (items) => {
    return (
      <nav
        className="space-y-1"
        aria-label={text.deliveryPortalSidebar}
      >
        {items.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`
              }
            >
              <Icon
                size={19}
                strokeWidth={2}
                className="shrink-0"
              />

              <span className="min-w-0 flex-1 truncate">
                {item.name}
              </span>
            </NavLink>
          )
        })}
      </nav>
    )
  }

  return (
    <>
      {/* Mobile backdrop */}
      <button
        type="button"
        aria-label={text.closeDeliverySidebar}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Delivery sidebar */}
      <aside
        aria-label={text.deliveryPortalSidebar}
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:w-72 lg:translate-x-0 lg:shadow-none ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >

        {/* Sidebar header */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200 px-5 sm:px-6">

          <button
            type="button"
            onClick={handleDashboard}
            className="min-w-0 text-left"
            aria-label={text.goToDeliveryDashboard}
          >
            <h1 className="truncate text-xl font-bold tracking-tight text-slate-900">
              JamiiMarket
            </h1>

            <p className="mt-0.5 text-xs font-semibold text-emerald-600">
              {text.deliveryPortal}
            </p>
          </button>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label={text.closeDeliveryNavigation}
          >
            <X size={21} />
          </button>
        </div>

        {/* Rider information */}
        <div className="border-b border-slate-200 px-4 py-4">
          <button
            type="button"
            onClick={() => {
              onClose?.()
              navigate('/delivery/profile')
            }}
            className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-slate-50"
          >
            {/* Rider avatar */}
            {rider.profileImage ? (
              <img
                src={rider.profileImage}
                alt={riderName}
                className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-emerald-100"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 ring-2 ring-emerald-50">
                {initials}
              </div>
            )}

            {/* Rider name */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {riderName}
              </p>

              <p className="mt-0.5 truncate text-xs text-slate-500">
                {text.deliveryRider}
              </p>
            </div>
          </button>
        </div>

        {/* Sidebar navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-5 sm:px-4">

          {/* Main menu */}
          <div className="mb-7">
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {text.main}
            </p>

            {renderMenu(mainMenu)}
          </div>

          {/* Management menu */}
          <div className="mb-7">
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {text.management}
            </p>

            {renderMenu(managementMenu)}
          </div>

          {/* Account menu */}
          <div>
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {text.account}
            </p>

            {renderMenu(accountMenu)}
          </div>
        </div>

        {/* Sidebar footer */}
        <div className="shrink-0 border-t border-slate-200 bg-white p-3 sm:p-4">

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut
              size={19}
              className="shrink-0"
            />

            <span>
              {text.logout}
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default DeliverySidebar

