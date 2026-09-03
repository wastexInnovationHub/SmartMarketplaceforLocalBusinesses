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
import { useLanguage } from '../../i18n/LanguageContext'

function BusinessDashboardPage() {
  const { language } = useLanguage()

  const text = {
    en: {
      businessPortal: 'JamiiMarket Business Portal',
      dashboard: 'Business Dashboard',
      dashboardDescription:
        'Manage your products, orders, deliveries, payments, and business information from one place.',
      addProduct: 'Add Product',

      overview: 'Overview',
      overviewDescription:
        'A quick view of your current business activity.',

      products: 'Products',
      productsListed: 'Products listed',

      orders: 'Orders',
      ordersReceived: 'Orders received',

      deliveries: 'Deliveries',
      activeDeliveries: 'Active deliveries',

      payments: 'Payments',
      pendingPayments: 'Pending payments',

      viewDetails: 'View details',

      getStarted: 'Get Started',
      getStartedDescription:
        'Set up your business so customers can discover and order your products.',

      addProducts: 'Add Products',
      addProductsDescription:
        'Create and manage your product catalogue.',

      businessProfile: 'Business Profile',
      businessProfileDescription:
        'Manage your business and store information.',

      delivery: 'Delivery',
      deliveryDescription:
        'Manage pickup and delivery options.',

      paymentsAction: 'Payments',
      paymentsDescription:
        'View and monitor payment transactions.',

      recentActivity: 'Recent Activity',
      latestBusinessActivity: 'Latest business activity',
      viewNotifications: 'View notifications',

      noActivity: 'No activity yet',
      noActivityDescription:
        'Orders, payments, deliveries, and other business activity will appear here when real data becomes available.',

      buildYourStore: 'Build your store',
      buildYourStoreDescription:
        'Add your business information and products first. Your real orders, payments, deliveries, and activity will appear as customers interact with your store.',

      completeProfile: 'Complete Profile',
    },

    sw: {
      businessPortal: 'Sehemu ya Biashara ya JamiiMarket',
      dashboard: 'Dashibodi ya Biashara',
      dashboardDescription:
        'Simamia bidhaa, oda, usafirishaji, malipo, na taarifa za biashara yako kutoka sehemu moja.',
      addProduct: 'Ongeza Bidhaa',

      overview: 'Muhtasari',
      overviewDescription:
        'Muhtasari wa shughuli za biashara yako kwa sasa.',

      products: 'Bidhaa',
      productsListed: 'Bidhaa zilizowekwa',

      orders: 'Oda',
      ordersReceived: 'Oda zilizopokelewa',

      deliveries: 'Usafirishaji',
      activeDeliveries: 'Usafirishaji unaoendelea',

      payments: 'Malipo',
      pendingPayments: 'Malipo yanayosubiri',

      viewDetails: 'Angalia maelezo',

      getStarted: 'Anza',
      getStartedDescription:
        'Weka biashara yako tayari ili wateja waweze kuiona na kuagiza bidhaa zako.',

      addProducts: 'Ongeza Bidhaa',
      addProductsDescription:
        'Unda na simamia orodha ya bidhaa zako.',

      businessProfile: 'Wasifu wa Biashara',
      businessProfileDescription:
        'Simamia taarifa za biashara na duka lako.',

      delivery: 'Usafirishaji',
      deliveryDescription:
        'Simamia chaguo za kuchukua na kusafirisha bidhaa.',

      paymentsAction: 'Malipo',
      paymentsDescription:
        'Angalia na fuatilia miamala ya malipo.',

      recentActivity: 'Shughuli za Hivi Karibuni',
      latestBusinessActivity: 'Shughuli za hivi karibuni za biashara',
      viewNotifications: 'Angalia arifa',

      noActivity: 'Bado hakuna shughuli',
      noActivityDescription:
        'Oda, malipo, usafirishaji, na shughuli nyingine za biashara zitaonekana hapa data halisi itakapopatikana.',

      buildYourStore: 'Jenga duka lako',
      buildYourStoreDescription:
        'Anza kwa kuongeza taarifa za biashara yako na bidhaa. Oda, malipo, usafirishaji, na shughuli halisi zitaonekana wateja watakapoanza kutumia duka lako.',

      completeProfile: 'Kamilisha Wasifu',
    },
  }

  const currentText = text[language] || text.en

  // Dashboard statistics remain zero until real backend data is connected
  const dashboardCards = [
    {
      title: currentText.products,
      value: 0,
      description: currentText.productsListed,
      icon: Package,
      path: '/business/products',
    },
    {
      title: currentText.orders,
      value: 0,
      description: currentText.ordersReceived,
      icon: ShoppingBag,
      path: '/business/orders',
    },
    {
      title: currentText.deliveries,
      value: 0,
      description: currentText.activeDeliveries,
      icon: Truck,
      path: '/business/delivery',
    },
    {
      title: currentText.payments,
      value: 0,
      description: currentText.pendingPayments,
      icon: CreditCard,
      path: '/business/payments',
    },
  ]

  // Dashboard quick actions
  const quickActions = [
    {
      title: currentText.addProducts,
      description: currentText.addProductsDescription,
      icon: Package,
      path: '/business/products',
    },
    {
      title: currentText.businessProfile,
      description: currentText.businessProfileDescription,
      icon: Building2,
      path: '/business/profile',
    },
    {
      title: currentText.delivery,
      description: currentText.deliveryDescription,
      icon: Truck,
      path: '/business/delivery',
    },
    {
      title: currentText.paymentsAction,
      description: currentText.paymentsDescription,
      icon: CreditCard,
      path: '/business/payments',
    },
  ]

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#F3FAF8]">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">

        {/* Welcome section */}
        <section className="overflow-hidden rounded-2xl bg-[#326460] text-white shadow-sm">
          <div className="p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="min-w-0">

                {/* Portal label */}
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
                  <Store size={15} />
                  {currentText.businessPortal}
                </div>

                {/* Dashboard title */}
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                  {currentText.dashboard}
                </h1>

                {/* Dashboard description */}
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                  {currentText.dashboardDescription}
                </p>
              </div>

              {/* Primary action */}
              <NavLink
                to="/business/products"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-white bg-white px-5 py-3 text-sm font-bold text-[#326460] shadow-md transition hover:bg-[#F3FAF8] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/60 sm:w-auto"
              >
                <Plus
                  size={19}
                  className="text-[#326460] transition-transform group-hover:rotate-90"
                />

                <span className="text-[#326460]">
                  {currentText.addProduct}
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
                {currentText.overview}
              </h2>

              <p className="mt-1 text-sm text-[#455A58]">
                {currentText.overviewDescription}
              </p>
            </div>
          </div>

          {/* Dashboard cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {dashboardCards.map((card) => {
              const Icon = card.icon

              return (
                <NavLink
                  key={card.path}
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
                    {currentText.viewDetails}

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
                  {currentText.getStarted}
                </h2>

                <p className="mt-1 text-sm leading-6 text-[#455A58]">
                  {currentText.getStartedDescription}
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
                    key={action.path}
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
                    {currentText.recentActivity}
                  </h2>

                  <p className="text-xs text-gray-500">
                    {currentText.latestBusinessActivity}
                  </p>
                </div>

              </div>

              <NavLink
                to="/business/notifications"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-[#E7F2F0] hover:text-[#326460]"
                aria-label={currentText.viewNotifications}
                title={currentText.viewNotifications}
              >
                <Bell size={18} />
              </NavLink>

            </div>

            {/* Empty activity state */}
            <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/70 px-5 text-center">

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm">
                <Clock3 size={21} />
              </div>

              <h3 className="text-sm font-semibold text-[#1B1C1C]">
                {currentText.noActivity}
              </h3>

              <p className="mt-1 max-w-xs text-xs leading-5 text-gray-500">
                {currentText.noActivityDescription}
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
                  {currentText.buildYourStore}
                </h2>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm">
                  {currentText.buildYourStoreDescription}
                </p>
              </div>

            </div>

            <NavLink
              to="/business/profile"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#326460] bg-white px-5 py-3 text-sm font-semibold text-[#326460] transition hover:bg-[#326460] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#326460]/20"
            >
              <Building2 size={17} />
              {currentText.completeProfile}
            </NavLink>

          </div>
        </section>

      </div>
    </div>
  )
}

export default BusinessDashboardPage

