import { useEffect, useState } from 'react'
import {
  Activity,
  Bike,
  Building2,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShieldCheck,
  UserCog,
  Users,
  X,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

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

    // Update sidebar when profile information changes
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

  // Build admin display name
  const adminName =
    user?.firstName || user?.lastName
      ? `${user?.firstName || ''} ${user?.lastName || ''}`.trim()
      : 'Administrator'

  // Build admin initials
  const initials =
    `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`
      .toUpperCase() || 'AD'

  const menuSections = [
    {
      title: 'MAIN',
      items: [
        {
          label: 'Dashboard',
          path: '/admin/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: 'MARKETPLACE',
      items: [
        {
          label: 'Users',
          path: '/admin/users',
          icon: Users,
        },
        {
          label: 'Businesses',
          path: '/admin/businesses',
          icon: Building2,
        },
        {
          label: 'Products & Services',
          path: '/admin/products',
          icon: Package,
        },
        {
          label: 'Orders',
          path: '/admin/orders',
          icon: ClipboardList,
        },
        {
          label: 'Deliveries',
          path: '/admin/deliveries',
          icon: Bike,
        },
        {
          label: 'Payments',
          path: '/admin/payments',
          icon: CreditCard,
        },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        {
          label: 'Admin Management',
          path: '/admin/management',
          icon: UserCog,
        },
        {
          label: 'Activity Logs',
          path: '/admin/activity',
          icon: Activity,
        },
      ],
    },
    {
      title: 'ACCOUNT',
      items: [
        {
          label: 'Profile',
          path: '/admin/profile',
          icon: ShieldCheck,
        },
        {
          label: 'Settings',
          path: '/admin/settings',
          icon: Settings,
        },
      ],
    },
  ]

  // Logout admin
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('jamiiMarketUser')

    navigate('/login')
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close admin sidebar"
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Admin sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-slate-950 text-white transition-transform duration-300 ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              JamiiMarket
            </h1>

            <p className="mt-0.5 text-xs text-slate-400">
              Admin Portal
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-6">
            {menuSections.map((section) => (
              <div key={section.title}>
                <p className="mb-2 px-3 text-[11px] font-semibold tracking-wider text-slate-500">
                  {section.title}
                </p>

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                            isActive
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'text-slate-300 hover:bg-white/10 hover:text-white'
                          }`
                        }
                      >
                        <Icon className="h-5 w-5 shrink-0" />

                        <span>{item.label}</span>
                      </NavLink>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Admin account */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={adminName}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold">
                {initials}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {adminName}
              </p>

              <p className="text-xs text-slate-400">
                Administrator
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar

