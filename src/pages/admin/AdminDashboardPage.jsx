import {
  Activity,
  ArrowRight,
  Bike,
  Building2,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Package,
  ShieldCheck,
  UserCog,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'

function AdminDashboardPage() {
  const { language } = useLanguage()

  const text =
    language === 'sw'
      ? {
          administration: 'Usimamizi wa JamiiMarket',
          dashboard: 'Dashibodi ya Admin',
          dashboardDescription:
            'Simamia watumiaji, biashara za ndani, bidhaa, huduma, oda, usafirishaji na malipo kutoka sehemu moja.',

          marketplaceOverview: 'Muhtasari wa Soko',
          marketplaceOverviewDescription:
            'Takwimu halisi za soko zitaonekana hapa baada ya API ya backend kuunganishwa.',

          totalUsers: 'Jumla ya Watumiaji',
          usersDescription:
            'Wateja, wamiliki wa biashara na wasafirishaji',

          businesses: 'Biashara',
          businessesDescription:
            'Biashara za ndani zilizosajiliwa',

          productsServices: 'Bidhaa na Huduma',
          productsServicesDescription:
            'Bidhaa na huduma zilizowekwa sokoni',

          orders: 'Oda',
          ordersDescription:
            'Oda za soko',

          marketplaceManagement: 'Usimamizi wa Soko',
          marketplaceManagementDescription:
            'Fikia maeneo makuu ya uendeshaji wa JamiiMarket.',

          userManagement: 'Usimamizi wa Watumiaji',
          userManagementDescription:
            'Simamia wateja, wamiliki wa biashara na wasafirishaji waliosajiliwa JamiiMarket.',

          businessManagement: 'Usimamizi wa Biashara',
          businessManagementDescription:
            'Kagua na simamia biashara za ndani zinazofanya kazi kwenye soko.',

          productsServicesManagement: 'Bidhaa na Huduma',
          productsServicesManagementDescription:
            'Simamia bidhaa na huduma zilizowekwa na biashara zilizosajiliwa.',

          orderManagement: 'Oda',
          orderManagementDescription:
            'Fuatilia oda za soko na hali ya usindikaji wake.',

          deliveryManagement: 'Usafirishaji',
          deliveryManagementDescription:
            'Fuatilia shughuli za usafirishaji, ugawaji na hali ya usafirishaji.',

          paymentManagement: 'Malipo',
          paymentManagementDescription:
            'Fuatilia miamala ya malipo na hali ya uthibitishaji wa malipo.',

          recentActivity: 'Shughuli za Hivi Karibuni',
          latestAdminActions: 'Hatua za hivi karibuni za kiutawala',
          noActivity: 'Hakuna shughuli kwa sasa',
          noActivityDescription:
            'Shughuli za kiutawala zitaonekana hapa kumbukumbu halisi zitakapopokelewa kutoka backend.',
          viewActivityLogs: 'Angalia Kumbukumbu za Shughuli',

          administration: 'Usimamizi',
          administrationDescription:
            'Simamia wasimamizi wa mfumo na kumbukumbu za kiutawala.',

          adminManagement: 'Usimamizi wa Admin',
          adminManagementDescription:
            'Simamia akaunti za wasimamizi',

          activityLogs: 'Kumbukumbu za Shughuli',
          activityLogsDescription:
            'Kagua shughuli za wasimamizi',

          adminPortal: 'Sehemu ya Admin',
          frontendRunning: 'Muonekano wa mfumo unaendelea kufanya kazi',

          backendPending: 'Muunganisho wa Backend Unasubiri',
          backendDescription:
            'Admin Portal kwa sasa inatumia hali ya frontend na browser storage pale inapohitajika. Watumiaji, biashara, bidhaa, huduma, oda, usafirishaji, malipo na kumbukumbu za shughuli zita loaded kutoka backend API itakapounganishwa.',
        }
      : {
          administration: 'JamiiMarket Administration',
          dashboard: 'Admin Dashboard',
          dashboardDescription:
            'Manage users, local businesses, products, services, orders, deliveries and payments from one central marketplace administration portal.',

          marketplaceOverview: 'Marketplace Overview',
          marketplaceOverviewDescription:
            'Live marketplace statistics will appear here after the backend API is connected.',

          totalUsers: 'Total Users',
          usersDescription:
            'Customers, business owners and delivery riders',

          businesses: 'Businesses',
          businessesDescription:
            'Registered local businesses',

          productsServices: 'Products & Services',
          productsServicesDescription:
            'Marketplace listings',

          orders: 'Orders',
          ordersDescription:
            'Marketplace orders',

          marketplaceManagement: 'Marketplace Management',
          marketplaceManagementDescription:
            'Access the main operational areas of JamiiMarket.',

          userManagement: 'User Management',
          userManagementDescription:
            'Manage customers, business owners and delivery riders registered on JamiiMarket.',

          businessManagement: 'Business Management',
          businessManagementDescription:
            'Review and manage local businesses operating on the marketplace.',

          productsServicesManagement: 'Products & Services',
          productsServicesManagementDescription:
            'Manage products and services listed by registered businesses.',

          orderManagement: 'Orders',
          orderManagementDescription:
            'Monitor marketplace orders and their processing status.',

          deliveryManagement: 'Deliveries',
          deliveryManagementDescription:
            'Monitor delivery operations, assignments and delivery status.',

          paymentManagement: 'Payments',
          paymentManagementDescription:
            'Monitor payment transactions and payment verification status.',

          recentActivity: 'Recent Activity',
          latestAdminActions: 'Latest administrative actions',
          noActivity: 'No activity available',
          noActivityDescription:
            'Administrative activity will appear here when real activity logs are received from the backend.',
          viewActivityLogs: 'View Activity Logs',

          administration: 'Administration',
          administrationDescription:
            'Manage platform administrators and administrative records.',

          adminManagement: 'Admin Management',
          adminManagementDescription:
            'Manage administrator accounts',

          activityLogs: 'Activity Logs',
          activityLogsDescription:
            'Review administrator activity',

          adminPortal: 'Admin Portal',
          frontendRunning: 'Frontend interface is running',

          backendPending: 'Backend connection pending',
          backendDescription:
            'The Admin Portal currently uses frontend state and browser storage where applicable. Real users, businesses, products, services, orders, deliveries, payments and activity records will be loaded from the backend when the API is integrated.',
        }

  const statistics = [
    {
      title: text.totalUsers,
      value: '0',
      description: text.usersDescription,
      icon: Users,
      href: '/admin/users',
    },
    {
      title: text.businesses,
      value: '0',
      description: text.businessesDescription,
      icon: Building2,
      href: '/admin/businesses',
    },
    {
      title: text.productsServices,
      value: '0',
      description: text.productsServicesDescription,
      icon: Package,
      href: '/admin/products',
    },
    {
      title: text.orders,
      value: '0',
      description: text.ordersDescription,
      icon: ClipboardList,
      href: '/admin/orders',
    },
  ]

  const managementCards = [
    {
      title: text.userManagement,
      description: text.userManagementDescription,
      icon: Users,
      href: '/admin/users',
    },
    {
      title: text.businessManagement,
      description: text.businessManagementDescription,
      icon: Building2,
      href: '/admin/businesses',
    },
    {
      title: text.productsServicesManagement,
      description: text.productsServicesManagementDescription,
      icon: Package,
      href: '/admin/products',
    },
    {
      title: text.orderManagement,
      description: text.orderManagementDescription,
      icon: ClipboardList,
      href: '/admin/orders',
    },
    {
      title: text.deliveryManagement,
      description: text.deliveryManagementDescription,
      icon: Bike,
      href: '/admin/deliveries',
    },
    {
      title: text.paymentManagement,
      description: text.paymentManagementDescription,
      icon: CreditCard,
      href: '/admin/payments',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Dashboard welcome section */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-indigo-100">
              <ShieldCheck className="h-4 w-4" />
              {text.administration}
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {text.dashboard}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
              {text.dashboardDescription}
            </p>
          </div>

          <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/20 bg-white/10 lg:flex">
            <ShieldCheck className="h-12 w-12" />
          </div>
        </div>
      </section>

      {/* Marketplace overview */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            {text.marketplaceOverview}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {text.marketplaceOverviewDescription}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((stat) => {
            const Icon = stat.icon

            return (
              <Link
                key={stat.title}
                to={stat.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500" />
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {stat.description}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Marketplace management */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            {text.marketplaceManagement}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {text.marketplaceManagementDescription}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {managementCards.map((card) => {
            const Icon = card.icon

            return (
              <Link
                key={card.title}
                to={card.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500" />
                </div>

                <h3 className="mt-5 font-semibold text-slate-900">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {card.description}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Administration and activity */}
      <section className="grid gap-4 lg:grid-cols-2">
        {/* Recent activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                {text.recentActivity}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {text.latestAdminActions}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Activity className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
            <Activity className="mx-auto h-8 w-8 text-slate-300" />

            <h3 className="mt-3 font-medium text-slate-700">
              {text.noActivity}
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-sm leading-5 text-slate-500">
              {text.noActivityDescription}
            </p>

            <Link
              to="/admin/activity"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              {text.viewActivityLogs}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Administration controls */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                {text.administration}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {text.administrationDescription}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <UserCog className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {/* Admin management */}
            <Link
              to="/admin/management"
              className="group flex items-center justify-between rounded-xl bg-slate-50 p-4 transition hover:bg-indigo-50"
            >
              <div className="flex items-center gap-3">
                <UserCog className="h-5 w-5 text-indigo-600" />

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {text.adminManagement}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {text.adminManagementDescription}
                  </p>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
            </Link>

            {/* Activity logs */}
            <Link
              to="/admin/activity"
              className="group flex items-center justify-between rounded-xl bg-slate-50 p-4 transition hover:bg-indigo-50"
            >
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-indigo-600" />

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {text.activityLogs}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {text.activityLogsDescription}
                  </p>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
            </Link>

            {/* Frontend status */}
            <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />

              <div>
                <p className="text-sm font-semibold text-emerald-800">
                  {text.adminPortal}
                </p>

                <p className="mt-1 text-xs text-emerald-700">
                  {text.frontendRunning}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Backend integration notice */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

          <div>
            <h2 className="font-semibold text-amber-900">
              {text.backendPending}
            </h2>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              {text.backendDescription}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboardPage

