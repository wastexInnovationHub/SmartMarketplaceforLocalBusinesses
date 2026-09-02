import {
  Menu,
  Bell,
  User,
  ChevronDown,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

const pageTitles = {
  '/business/dashboard': {
    title: 'Business Dashboard',
    description: 'Manage your JamiiMarket business',
  },
  '/business/products': {
    title: 'Products',
    description: 'Manage your products and catalogue',
  },
  '/business/orders': {
    title: 'Orders',
    description: 'Manage customer orders',
  },
  '/business/delivery': {
    title: 'Delivery',
    description: 'Manage pickup and delivery',
  },
  '/business/payments': {
    title: 'Payments',
    description: 'Monitor business payments',
  },
  '/business/profile': {
    title: 'Business Profile',
    description: 'Manage your business information',
  },
  '/business/notifications': {
    title: 'Notifications',
    description: 'Stay updated about your business activity',
  },
}

function BusinessNavbar({ onMenuClick }) {
  const location = useLocation()

  const currentPage =
    pageTitles[location.pathname] || pageTitles['/business/dashboard']

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:h-[4.5rem] sm:px-6 lg:px-8">

      {/* Left side */}
      <div className="flex min-w-0 items-center gap-3">

        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-[#326460] focus:outline-none focus:ring-2 focus:ring-[#326460]/20 lg:hidden"
          aria-label="Open business navigation menu"
          title="Open menu"
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
          aria-label="Open notifications"
          title="Notifications"
        >
          <Bell size={20} />

          {/* Unread indicator will be connected to real data later */}
          <span
            className="absolute right-2 top-2 hidden h-2 w-2 rounded-full bg-[#326460]"
            aria-hidden="true"
          />
        </NavLink>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

        {/* Business profile */}
        <NavLink
          to="/business/profile"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-xl p-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#326460]/20 sm:px-2 ${
              isActive
                ? 'bg-[#E7F2F0]'
                : 'hover:bg-gray-100'
            }`
          }
          aria-label="Open business profile"
          title="Business Profile"
        >
          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#326460] text-white">
            <User size={18} />
          </div>

          {/* Business information */}
          <div className="hidden min-w-0 text-left md:block">
            <p className="max-w-32 truncate text-sm font-semibold text-[#1B1C1C]">
              My Business
            </p>

            <p className="text-xs text-gray-500">
              Business Account
            </p>
          </div>

          {/* Dropdown indicator */}
          <ChevronDown
            size={17}
            className={`hidden shrink-0 text-gray-500 transition md:block ${
              location.pathname === '/business/profile'
                ? 'rotate-180 text-[#326460]'
                : ''
            }`}
          />
        </NavLink>

      </div>
    </header>
  )
}

export default BusinessNavbar

