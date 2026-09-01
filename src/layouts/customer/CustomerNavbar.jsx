import { Bell, Menu, Search } from 'lucide-react'

function CustomerNavbar({ onMenuClick, user }) {
  const displayName = user?.firstName || user?.name || 'Customer'

  const initial = displayName.charAt(0).toUpperCase()

  return (
    <header className="fixed inset-x-0 top-0 z-30 h-20 border-b border-[#E8CFC7] bg-[#FCF9F8]/95 backdrop-blur-md lg:left-64">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={onMenuClick}
            className="rounded-full p-2 text-[#56423D] transition hover:bg-[#F5E5DF] lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="lg:hidden">
            <p className="truncate text-lg font-bold text-[#A03F28]">
              JamiiMarket
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="hidden w-full max-w-xl md:block">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#695D46]"
            />

            <input
              type="search"
              placeholder="Search shops, services, food..."
              className="w-full rounded-full border border-[#EFDEC0] bg-white py-2.5 pl-11 pr-4 text-sm text-[#1B1C1C] outline-none transition focus:border-[#C0573E] focus:ring-1 focus:ring-[#C0573E]"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-full p-2 text-[#56423D] transition hover:bg-[#F5E5DF]"
          >
            <Bell size={21} />

            <span
              aria-hidden="true"
              className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#BA1A1A]"
            />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C0573E] text-sm font-bold text-white">
              {initial}
            </div>

            <div className="hidden min-w-0 sm:block">
              <p className="max-w-32 truncate text-sm font-semibold text-[#1B1C1C]">
                {displayName}
              </p>

              <p className="text-xs text-[#695D46]">
                Customer
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default CustomerNavbar

