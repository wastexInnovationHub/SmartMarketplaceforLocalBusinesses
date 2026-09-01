import { Bell, Menu, Search } from 'lucide-react'

function CustomerHeader() {
  return (
    <>
      {/* Mobile Header */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-[#DDC0BA] bg-[#FCF9F8]/95 px-4 backdrop-blur-md md:hidden">
        <button
          type="button"
          aria-label="Open menu"
          className="rounded-full p-2 text-[#56423D] transition hover:bg-[#F6F3F2] active:scale-95"
        >
          <Menu size={22} />
        </button>

        <div className="max-w-[150px] truncate text-xl font-bold tracking-tight text-[#A03F28]">
          JamiiMarket
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Search"
            className="rounded-full p-2 text-[#56423D] transition hover:bg-[#F6F3F2] active:scale-95"
          >
            <Search size={20} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="rounded-full p-2 text-[#56423D] transition hover:bg-[#F6F3F2] active:scale-95"
          >
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="fixed inset-x-0 top-0 z-50 hidden h-20 items-center justify-between border-b border-[#DDC0BA] bg-[#FCF9F8]/95 px-6 shadow-sm backdrop-blur-md md:flex lg:px-10">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            aria-label="Open menu"
            className="rounded-full p-2 text-[#56423D] transition hover:bg-[#F6F3F2]"
          >
            <Menu size={22} />
          </button>

          <div className="text-xl font-bold tracking-tight text-[#A03F28]">
            JamiiMarket
          </div>
        </div>

        {/* Search */}
        <div className="mx-6 w-full max-w-2xl">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#56423D]"
            />

            <input
              type="text"
              placeholder="Search shops, services, food..."
              className="w-full rounded-full border border-[#EFDEC0] bg-white py-3 pl-12 pr-4 text-sm text-[#1B1C1C] outline-none transition focus:border-[#C0573E] focus:ring-1 focus:ring-[#C0573E]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-full p-2 text-[#56423D] transition hover:bg-[#F6F3F2]"
          >
            <Bell size={21} />

            {/* Notification indicator */}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#BA1A1A]" />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-[#EFDEC0] py-1.5 pl-2 pr-4 transition hover:bg-[#F6F3F2]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C0573E] text-sm font-semibold text-white">
              U
            </div>

            <span className="text-sm font-semibold text-[#1B1C1C]">
              Profile
            </span>
          </button>
        </div>
      </header>
    </>
  )
}

export default CustomerHeader

