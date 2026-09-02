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

  // Load the current administrator account
  const loadUser = () => {
    try {
      const storedUser = localStorage.getItem('jamiiMarketUser')

      if (!storedUser) {
        setUser(null)
        return
      }

      const parsedUser = JSON.parse(storedUser)

      setUser(parsedUser)
    } catch {
      setUser(null)
    }
  }

  useEffect(() => {
    loadUser()

    // Update the navbar after the administrator profile changes
    const handleProfileUpdate = () => {
      loadUser()
    }

    // Update the navbar when localStorage changes in another tab
    const handleStorage = (event) => {
      if (
        !event.key ||
        event.key === 'jamiiMarketUser'
      ) {
        loadUser()
      }
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

  // Close the profile menu when clicking outside
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

  // Build the administrator display name
  const adminName =
    user?.firstName || user?.lastName
      ? `${user?.firstName || ''} ${user?.lastName || ''}`.trim()
      : 'Administrator'

  // Build administrator initials
  const initials =
    `${user?.firstName?.charAt(0) || ''}${user?.lastName?.charAt(0) || ''}`
      .toUpperCase() || 'AD'

  // Open administrator profile
  const handleProfile = () => {
    setProfileOpen(false)
    navigate('/admin/profile')
  }

  // Open administrator settings
  const handleSettings = () => {
    setProfileOpen(false)
    navigate('/admin/settings')
  }

  // Logout administrator
  const handleLogout = () => {
    setProfileOpen(false)

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('jamiiMarketUser')

    window.dispatchEvent(
      new CustomEvent('jamiiMarketProfileUpdated')
    )

    navigate('/login')
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-20 border-b border-slate-200 bg-white lg:left-72">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:hidden"
            aria-label="Open admin sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="min-w-0 text-left"
          >
            <p className="truncate text-sm font-semibold text-slate-900">
              Administration
            </p>

            <p className="hidden truncate text-xs text-slate-500 sm:block">
              Manage your JamiiMarket platform
            </p>
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <button
            type="button"
            onClick={() => navigate('/admin/activity')}
            className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Open activity logs"
            title="Activity Logs"
          >
            <Bell className="h-5 w-5" />
          </button>

          {/* Administrator profile menu */}
          <div
            ref={dropdownRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setProfileOpen((current) => !current)
              }
              className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Open administrator profile menu"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              {/* Profile image */}
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={adminName}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {initials}
                </div>
              )}

              {/* Administrator information */}
              <div className="hidden min-w-0 text-left sm:block">
                <p className="max-w-32 truncate text-sm font-semibold text-slate-900">
                  {adminName}
                </p>

                <p className="truncate text-xs text-slate-500">
                  Administrator
                </p>
              </div>
            </button>

            {/* Profile dropdown */}
            {profileOpen && (
              <div
                className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
                role="menu"
              >
                {/* Account header */}
                <div className="border-b border-slate-100 px-4 py-4">
                  <div className="flex items-center gap-3">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={adminName}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                        {initials}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {adminName}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {user?.email || 'Administrator account'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile */}
                <button
                  type="button"
                  onClick={handleProfile}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
                  role="menuitem"
                >
                  <User className="h-5 w-5 text-slate-500" />
                  <span>Profile</span>
                </button>

                {/* Settings */}
                <button
                  type="button"
                  onClick={handleSettings}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
                  role="menuitem"
                >
                  <Settings className="h-5 w-5 text-slate-500" />
                  <span>Settings</span>
                </button>

                {/* Logout */}
                <div className="border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:bg-red-50 focus:outline-none"
                    role="menuitem"
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

