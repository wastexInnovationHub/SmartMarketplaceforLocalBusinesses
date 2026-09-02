import { useEffect, useRef, useState } from 'react'
import {
  Bell,
  LogOut,
  Menu,
  Settings,
  User,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function AdminNavbar({ onMenuClick }) {
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  const [user, setUser] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false)

  // Load the current admin account
  const loadUser = () => {
    try {
      const storedUser = localStorage.getItem('jamiiMarketUser')

      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    }
  }

  useEffect(() => {
    loadUser()

    // Update navbar when profile information changes
    const handleProfileUpdate = () => {
      loadUser()
    }

    const handleStorage = () => {
      loadUser()
    }

    window.addEventListener(
      'jamiiMarketProfileUpdated',
      handleProfileUpdate
    )

    window.addEventListener(
      'storage',
      handleStorage
    )

    return () => {
      window.removeEventListener(
        'jamiiMarketProfileUpdated',
        handleProfileUpdate
      )

      window.removeEventListener(
        'storage',
        handleStorage
      )
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [])

  // Build admin display name
  const adminName =
    user?.firstName || user?.lastName
      ? `${user?.firstName || ''} ${user?.lastName || ''}`.trim()
      : 'Administrator'

  // Build admin initials
  const initials =
    `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`
      .toUpperCase() || 'AD'

  // Open profile
  const handleProfile = () => {
    setProfileOpen(false)
    navigate('/admin/profile')
  }

  // Open settings
  const handleSettings = () => {
    setProfileOpen(false)
    navigate('/admin/settings')
  }

  // Logout admin
  const handleLogout = () => {
    setProfileOpen(false)

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('jamiiMarketUser')

    navigate('/login')
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-20 border-b border-slate-200 bg-white lg:left-72">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            aria-label="Open admin sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Administration
            </p>

            <p className="hidden text-xs text-slate-500 sm:block">
              Manage your JamiiMarket platform
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <button
            type="button"
            onClick={() => navigate('/admin/activity')}
            className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>

          {/* Profile */}
          <div
            ref={dropdownRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setProfileOpen((current) => !current)}
              className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100"
              aria-label="Open admin profile menu"
            >
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={adminName}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {initials}
                </div>
              )}

              <div className="hidden text-left sm:block">
                <p className="max-w-32 truncate text-sm font-semibold text-slate-900">
                  {adminName}
                </p>

                <p className="text-xs text-slate-500">
                  Administrator
                </p>
              </div>
            </button>

            {/* Profile dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                {/* Account header */}
                <div className="border-b border-slate-100 px-4 py-4">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {adminName}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {user?.email || 'Administrator account'}
                  </p>
                </div>

                {/* Profile */}
                <button
                  type="button"
                  onClick={handleProfile}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <User className="h-5 w-5 text-slate-500" />
                  <span>Profile</span>
                </button>

                {/* Settings */}
                <button
                  type="button"
                  onClick={handleSettings}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Settings className="h-5 w-5 text-slate-500" />
                  <span>Settings</span>
                </button>

                {/* Logout */}
                <div className="border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
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

export default AdminNavbar

