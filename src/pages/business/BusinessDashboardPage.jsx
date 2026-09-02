import {
  Package,
  ShoppingBag,
  Truck,
  CreditCard,
  Plus,
  ArrowRight,
  Store,
  Clock3,
  Bell,
  Building2,
  Settings,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const dashboardCards = [
  {
    title: 'Products',
    value: 0,
    description: 'Products listed',
    icon: Package,
    path: '/business/products',
  },
  {
    title: 'Orders',
    value: 0,
    description: 'Orders received',
    icon: ShoppingBag,
    path: '/business/orders',
  },
  {
    title: 'Deliveries',
    value: 0,
    description: 'Active deliveries',
    icon: Truck,
    path: '/business/delivery',
  },
  {
    title: 'Payments',
    value: 0,
    description: 'Pending payments',
    icon: CreditCard,
    path: '/business/payments',
  },
]

const quickActions = [
  {
    title: 'Add Products',
    description: 'Create and manage your product catalogue.',
    icon: Package,
    path: '/business/products',
  },
  {
    title: 'Business Profile',
    description: 'Manage your business and store information.',
    icon: Building2,
    path: '/business/profile',
  },
  {
    title: 'Delivery',
    description: 'Manage pickup and delivery options.',
    icon: Truck,
    path: '/business/delivery',
  },
  {
    title: 'Payments',
    description: 'View and monitor payment transactions.',
    icon: CreditCard,
    path: '/business/payments',
  },
]

function BusinessDashboardPage() {
  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#F3FAF8]">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">

        {/* Welcome section */}
        <section className="overflow-hidden rounded-2xl bg-[#326460] text-white shadow-sm">
          <div className="p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
                  <Store size={15} />
                  JamiiMarket Business Portal
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                  Business Dashboard
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                  Manage your products, orders, deliveries, payments, and
                  business information from one place.
                </p>
              </div>

{/* Primary action */}
<NavLink
  to="/business/products"
  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-white bg-white px-5 py-3 text-sm font-bold !text-[#326460] shadow-md transition hover:bg-[#F3FAF8] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/60 sm:w-auto"
>
  <Plus
    size={19}
    className="text-[#326460] transition-transform group-hover:rotate-90"
  />

  <span className="text-[#326460]">
    Add Product
  </span>

  <ArrowRight
    size={16}
    className="text-[#326460] transition-transform group-hover:translate-x-0.5"
  />
</NavLink>



            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="mt-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1B1C1C] sm:text-xl">
                Overview
              </h2>

              <p className="mt-1 text-sm text-[#455A58]">
                A quick view of your current business activity.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardCards.map((card) => {
              const Icon = card.icon

              return (
                <NavLink
                  key={card.title}
                  to={card.path}
                  className="group rounded-2xl border border-[#DCE9E6] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#326460]/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#326460]/20 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#455A58]">
                        {card.title}
                      </p>

                      <p className="mt-2 text-3xl font-bold tracking-tight text-[#1B1C1C]">
                        {card.value}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {card.description}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E7F2F0] text-[#326460] transition group-hover:bg-[#326460] group-hover:text-white">
                      <Icon size={21} />
                    </div>

                  </div>

                  <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-[#326460]">
                    View details

                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </NavLink>
              )
            })}
          </div>
        </section>

        {/* Main content */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Quick actions */}
          <section className="rounded-2xl border border-[#DCE9E6] bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">

            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#1B1C1C] sm:text-xl">
                  Get Started
                </h2>

                <p className="mt-1 text-sm leading-6 text-[#455A58]">
                  Set up your business so customers can discover and order
                  your products.
                </p>
              </div>

              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E7F2F0] text-[#326460] sm:flex">
                <Settings size={19} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {quickActions.map((action) => {
                const Icon = action.icon

                return (
                  <NavLink
                    key={action.title}
                    to={action.path}
                    className="group flex min-h-[96px] items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-[#326460]/40 hover:bg-[#F3FAF8] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#326460]/20"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E7F2F0] text-[#326460] transition group-hover:bg-[#326460] group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-[#1B1C1C]">
                        {action.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {action.description}
                      </p>
                    </div>

                    <ArrowRight
                      size={17}
                      className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#326460]"
                    />
                  </NavLink>
                )
              })}
            </div>
          </section>

          {/* Recent activity */}
          <section className="rounded-2xl border border-[#DCE9E6] bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E7F2F0] text-[#326460]">
                  <Clock3 size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-[#1B1C1C]">
                    Recent Activity
                  </h2>

                  <p className="text-xs text-gray-500">
                    Latest business activity
                  </p>
                </div>
              </div>

              <NavLink
                to="/business/notifications"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-[#E7F2F0] hover:text-[#326460]"
                aria-label="View notifications"
                title="View notifications"
              >
                <Bell size={18} />
              </NavLink>
            </div>

            <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/70 px-5 text-center">

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm">
                <Clock3 size={21} />
              </div>

              <h3 className="text-sm font-semibold text-[#1B1C1C]">
                No activity yet
              </h3>

              <p className="mt-1 max-w-xs text-xs leading-5 text-gray-500">
                Orders, payments, deliveries, and other business activity
                will appear here when real data becomes available.
              </p>

            </div>
          </section>
        </div>

        {/* Business setup notice */}
        <section className="mt-6 rounded-2xl border border-[#DCE9E6] bg-white p-5 shadow-sm sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E7F2F0] text-[#326460]">
                <Store size={19} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#1B1C1C]">
                  Build your store
                </h2>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm">
                  Add your business information and products first. Your
                  real orders, payments, deliveries, and activity will
                  appear as customers interact with your store.
                </p>
              </div>
            </div>

            <NavLink
              to="/business/profile"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#326460] bg-white px-5 py-3 text-sm font-semibold text-[#326460] transition hover:bg-[#326460] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#326460]/20"
            >
              <Building2 size={17} />
              Complete Profile
            </NavLink>

          </div>
        </section>

      </div>
    </div>
  )
}

export default BusinessDashboardPage

