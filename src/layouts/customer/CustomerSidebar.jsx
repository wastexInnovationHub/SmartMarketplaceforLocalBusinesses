import {
  Home,
  Search,
  ShoppingBag,
  Heart,
  User,
  Settings,
  X,
} from 'lucide-react'

const navigation = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/customer/dashboard',
  },
  {
    label: 'Explore',
    icon: Search,
    href: '/customer/explore',
  },
  {
    label: 'My Orders',
    icon: ShoppingBag,
    href: '/customer/orders',
  },
  {
    label: 'Saved',
    icon: Heart,
    href: '/customer/saved',
  },
  {
    label: 'Profile',
    icon: User,
    href: '/customer/profile',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/customer/settings',
  },
]

function CustomerSidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#E8CFC7] bg-[#FCF9F8] transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex h-20 items-center justify-between border-b border-[#E8CFC7] px-6">
          <div>
            <p className="text-xl font-bold tracking-tight text-[#A03F28]">
              JamiiMarket
            </p>

            <p className="mt-0.5 text-xs font-medium text-[#695D46]">
              Customer
            </p>
          </div>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="rounded-full p-2 text-[#56423D] hover:bg-[#F5E5DF] lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6">
          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  item.label === 'Dashboard'
                    ? 'bg-[#A03F28] text-white shadow-sm'
                    : 'text-[#56423D] hover:bg-[#F5E5DF] hover:text-[#A03F28]'
                }`}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#E8CFC7] p-4">
          <div className="rounded-xl bg-[#F5E5DF] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#A03F28]">
              Customer Portal
            </p>

            <p className="mt-1 text-xs leading-5 text-[#695D46]">
              Explore local businesses and manage your marketplace activity.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default CustomerSidebar

