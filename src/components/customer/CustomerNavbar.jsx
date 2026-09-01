import {
  Bell,
  Menu,
  Search,
  ShoppingBag,
} from 'lucide-react'

import { Link } from 'react-router-dom'

function CustomerNavbar({ onMenuClick }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-20 border-b border-[#DDC0BA] bg-[#FCF9F8]/95 backdrop-blur lg:left-72">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">

          {/* Mobile menu */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open customer navigation"
            className="rounded-xl p-2.5 text-[#56423D] transition hover:bg-[#F0E7E4] hover:text-[#A03F28] lg:hidden"
          >
            <Menu size={22} />
          </button>

          {/* Mobile logo */}
          <Link
            to="/customer/dashboard"
            className="flex items-center gap-2 lg:hidden"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#A03F28] text-white shadow-sm">
              <ShoppingBag size={20} />

              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#FCF9F8] bg-[#326460]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>

            <span className="hidden text-lg font-bold tracking-tight text-[#A03F28] sm:block">
              JamiiMarket
            </span>
          </Link>

          {/* Desktop page identity */}
          <div className="hidden lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#326460]">
              Customer
            </p>

            <p className="text-sm font-semibold text-[#56423D]">
              Marketplace
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="hidden max-w-xl flex-1 md:block">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A726C]"
            />

            <input
              type="search"
              placeholder="Search JamiiMarket..."
              className="w-full rounded-xl border border-[#DDC0BA] bg-white py-3 pl-11 pr-4 text-sm text-[#1B1C1C] outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Mobile search */}
          <button
            type="button"
            aria-label="Search marketplace"
            className="rounded-xl p-2.5 text-[#56423D] transition hover:bg-[#F0E7E4] hover:text-[#A03F28] md:hidden"
          >
            <Search size={20} />
          </button>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-xl p-2.5 text-[#56423D] transition hover:bg-[#F0E7E4] hover:text-[#A03F28]"
          >
            <Bell size={20} />

            {/* No fake notification count */}
          </button>

          {/* Profile */}
          <Link
            to="/customer/profile"
            className="flex items-center gap-2 rounded-xl p-1.5 pr-2 transition hover:bg-[#F0E7E4]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#326460] text-sm font-bold text-white">
              C
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-[#1B1C1C]">
                Customer
              </p>

              <p className="text-[11px] text-[#695D46]">
                Account
              </p>
            </div>
          </Link>

        </div>
      </div>
    </header>
  )
}

export default CustomerNavbar