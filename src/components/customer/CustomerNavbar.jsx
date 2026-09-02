import { useEffect, useRef, useState } from 'react'
import {
  Bell,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  LogOut,
  ChevronDown,
} from 'lucide-react'

import { Link, useNavigate } from 'react-router-dom'

function CustomerNavbar({ onMenuClick }) {
  const navigate = useNavigate()
  const menuRef = useRef(null)

  const [profileOpen, setProfileOpen] = useState(false)

  // Load the customer profile from local storage
  const getStoredUser = () => {
    try {
      const storedUser = localStorage.getItem('jamiiMarketUser')

      return storedUser ? JSON.parse(storedUser) : null
    } catch {
      return null
    }
  }

  const [user, setUser] = useState(getStoredUser)

  // Refresh the profile when the navbar becomes active
  useEffect(() => {
    const refreshUser = () => {
      setUser(getStoredUser())
    }

    refreshUser()

    window.addEventListener('storage', refreshUser)

    return () => {
      window.removeEventListener('storage', refreshUser)
    }
  }, [])

  // Refresh the navbar when the profile page saves changes
  useEffect(() => {
    const handleProfileUpdated = () => {
      setUser(getStoredUser())
    }

    window.addEventListener(
      'jamiiMarketProfileUpdated',
      handleProfileUpdated
    )

    return () => {
      window.removeEventListener(
        'jamiiMarketProfileUpdated',
        handleProfileUpdated
      )
    }
  }, [])

  // Build the customer's display name
  const firstName = user?.firstName?.trim() || ''
  const lastName = user?.lastName?.trim() || ''

  const customerName =
    `${firstName} ${lastName}`.trim() || 'Customer'

  // Generate initials when no profile photo exists
  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .trim()
      .toUpperCase() ||
    firstName.charAt(0).toUpperCase() ||
    'C'

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [])

  // Logout customer
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('jamiiMarketUser')

    setProfileOpen(false)

    navigate('/login')
  }

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
          </button>

          {/* Profile menu */}
          <div
            ref={menuRef}
            className="relative"
          >

            <button
              type="button"
              onClick={() => setProfileOpen((current) => !current)}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              className="flex items-center gap-2 rounded-xl p-1.5 pr-2 transition hover:bg-[#F0E7E4]"
            >

              {/* Profile photo or initials */}
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={customerName}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#326460] text-sm font-bold text-white">
                  {initials}
                </div>
              )}

              <div className="hidden text-left sm:block">

                <p className="max-w-[140px] truncate text-sm font-semibold text-[#1B1C1C]">
                  {customerName}
                </p>

              </div>

              <ChevronDown
                size={16}
                className={`
                  hidden text-[#695D46] transition-transform sm:block
                  ${profileOpen ? 'rotate-180' : ''}
                `}
              />

            </button>

            {/* Profile dropdown */}
            {profileOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-[#DDC0BA] bg-white shadow-xl"
                role="menu"
              >

                {/* Profile summary */}
                <div className="border-b border-[#E8E3E1] px-4 py-4">

                  <div className="flex items-center gap-3">

                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={customerName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#326460] text-sm font-bold text-white">
                        {initials}
                      </div>
                    )}

                    <div className="min-w-0">

                      <p className="truncate text-sm font-bold text-[#1B1C1C]">
                        {customerName}
                      </p>

                      <p className="text-xs text-[#7A706C]">
                        Customer account
                      </p>

                    </div>

                  </div>

                </div>

                {/* Profile */}
                <div className="p-2">

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false)
                      navigate('/customer/profile')
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#56423D] transition hover:bg-[#FCF9F8] hover:text-[#A03F28]"
                    role="menuitem"
                  >

                    <UserRound size={18} />

                    <span>Profile</span>

                  </button>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#A03F28] transition hover:bg-[#FFF0EB]"
                    role="menuitem"
                  >

                    <LogOut size={18} />

                    <span>Logout</span>

                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </header>
  )
}

export default CustomerNavbar

