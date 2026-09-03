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
import { useLanguage } from '../../i18n/LanguageContext'

function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [user, setUser] = useState(null)

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

    const handleProfileUpdate = () => {
      loadUser()
    }

    const handleStorage = (event) => {
      if (!event.key || event.key === 'jamiiMarketUser') {
        loadUser()
      }
    }

    window.addEventListener(
      'jamiiMarketProfileUpdated',
      handleProfileUpdate
    )

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener(
        'jamiiMarketProfileUpdated',
        handleProfileUpdate
      )

      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const adminName =
    user?.firstName || user?.lastName
      ? `${user?.firstName || ''} ${user?.lastName || ''}`.trim()
      : language === 'sw'
        ? 'Msimamizi'
        : 'Administrator'

  const initials =
    `${user?.firstName?.charAt(0) || ''}${user?.lastName?.charAt(0) || ''}`
      .toUpperCase() || 'AD'

  const menuSections = [
    {
      title: language === 'sw' ? 'KUU' : 'MAIN',
      items: [
        {
          label: language === 'sw' ? 'Dashibodi' : 'Dashboard',
          path: '/admin/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: language === 'sw' ? 'SOKO' : 'MARKETPLACE',
      items: [
        {
          label: language === 'sw' ? 'Watumiaji' : 'Users',
          path: '/admin/users',
          icon: Users,
        },
        {
          label: language === 'sw' ? 'Biashara' : 'Businesses',
          path: '/admin/businesses',
          icon: Building2,
        },
        {
          label:
            language === 'sw'
              ? 'Bidhaa na Huduma'
              : 'Products & Services',
          path: '/admin/products',
          icon: Package,
        },
        {
          label: language === 'sw' ? 'Oda' : 'Orders',
          path: '/admin/orders',
          icon: ClipboardList,
        },
        {
          label: language === 'sw' ? 'Usafirishaji' : 'Deliveries',
          path: '/admin/deliveries',
          icon: Bike,
        },
        {
          label: language === 'sw' ? 'Malipo' : 'Payments',
          path: '/admin/payments',
          icon: CreditCard,
        },
      ],
    },
    {
      title: language === 'sw' ? 'MFUMO' : 'SYSTEM',
      items: [
        {
          label:
            language === 'sw'
              ? 'Usimamizi wa Admin'
              : 'Admin Management',
          path: '/admin/management',
          icon: UserCog,
        },
        {
          label:
            language === 'sw'
              ? 'Kumbukumbu za Shughuli'
              : 'Activity Logs',
          path: '/admin/activity',
          icon: Activity,
        },
      ],
    },
    {
      title: language === 'sw' ? 'AKAUNTI' : 'ACCOUNT',
      items: [
        {
          label: language === 'sw' ? 'Wasifu' : 'Profile',
          path: '/admin/profile',
          icon: ShieldCheck,
        },
        {
          label: language === 'sw' ? 'Mipangilio' : 'Settings',
          path: '/admin/settings',
          icon: Settings,
        },
      ],
    },
  ]

  const handleLogout = () => {
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
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label={
            language === 'sw'
              ? 'Funga menyu ya admin'
              : 'Close admin sidebar'
          }
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
          <button
            type="button"
            onClick={() => {
              navigate('/admin/dashboard')
              onClose()
            }}
            className="text-left"
            aria-label={
              language === 'sw'
                ? 'Fungua dashibodi ya admin'
                : 'Go to admin dashboard'
            }
          >
            <h1 className="text-xl font-bold tracking-tight">
              JamiiMarket
            </h1>

            <p className="mt-0.5 text-xs text-slate-400">
              {language === 'sw' ? 'Sehemu ya Admin' : 'Admin Portal'}
            </p>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label={
              language === 'sw'
                ? 'Funga menyu ya admin'
                : 'Close admin sidebar'
            }
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-4 py-5"
          aria-label={
            language === 'sw'
              ? 'Menyu ya admin'
              : 'Admin navigation'
          }
        >
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

                        <span className="truncate">
                          {item.label}
                        </span>
                      </NavLink>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Administrator account */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <button
            type="button"
            onClick={() => {
              navigate('/admin/profile')
              onClose()
            }}
            className="mb-3 flex w-full items-center gap-3 rounded-xl bg-white/5 p-3 text-left transition hover:bg-white/10"
            aria-label={
              language === 'sw'
                ? 'Fungua wasifu wa msimamizi'
                : 'Open administrator profile'
            }
          >
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={adminName}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold">
                {initials}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {adminName}
              </p>

              <p className="truncate text-xs text-slate-400">
                {user?.email ||
                  (language === 'sw' ? 'Msimamizi' : 'Administrator')}
              </p>
            </div>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5 shrink-0" />

            <span>
              {language === 'sw' ? 'Toka' : 'Logout'}
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar

