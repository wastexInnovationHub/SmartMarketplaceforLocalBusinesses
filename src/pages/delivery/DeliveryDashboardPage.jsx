import {
  ArrowRight,
  Bike,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Power,
  Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'

function DeliveryDashboardPage() {
  const { language } = useLanguage()
  const isSwahili = language === 'sw'

  const text = {
    deliveryRider: isSwahili ? 'Msafirishaji' : 'Delivery Rider',

    welcome: isSwahili
      ? 'Karibu kwenye Dashibodi yako ya Usafirishaji 👋'
      : 'Welcome to your Delivery Dashboard 👋',

    welcomeDescription: isSwahili
      ? 'Simamia maombi ya usafirishaji, fuatilia usafirishaji unaoendelea, na wajulishe wateja wako kuhusu oda zao kutoka sehemu moja.'
      : 'Manage delivery requests, track active deliveries, and keep your customers updated from one place.',

    availability: isSwahili ? 'Upatikanaji' : 'Availability',

    offline: isSwahili ? 'Haipo Mtandaoni' : 'Offline',

    notReceivingDeliveries: isSwahili
      ? 'Hupokei maombi ya usafirishaji'
      : 'You are not receiving deliveries',

    goOnline: isSwahili ? 'Washa Mtandaoni' : 'Go Online',

    todaysOverview: isSwahili
      ? 'Muhtasari wa Leo'
      : "Today's Overview",

    todaysActivity: isSwahili
      ? 'Shughuli zako za usafirishaji za leo.'
      : 'Your delivery activity for today.',

    todaysDeliveries: isSwahili
      ? 'Usafirishaji wa Leo'
      : "Today's Deliveries",

    noDeliveriesYet: isSwahili
      ? 'Bado hakuna usafirishaji'
      : 'No deliveries yet',

    completed: isSwahili ? 'Imekamilika' : 'Completed',

    completedDeliveries: isSwahili
      ? 'Usafirishaji uliokamilika'
      : 'Completed deliveries',

    inProgress: isSwahili ? 'Unaendelea' : 'In Progress',

    activeDeliveries: isSwahili
      ? 'Usafirishaji unaoendelea'
      : 'Active deliveries',

    todaysEarnings: isSwahili
      ? 'Mapato ya Leo'
      : "Today's Earnings",

    noEarningsYet: isSwahili
      ? 'Bado hakuna mapato'
      : 'No earnings yet',

    activeDelivery: isSwahili
      ? 'Usafirishaji Unaendelea'
      : 'Active Delivery',

    currentDeliveryDescription: isSwahili
      ? 'Usafirishaji wako wa sasa utaonekana hapa.'
      : 'Your current delivery will appear here.',

    viewActiveDelivery: isSwahili
      ? 'Angalia Usafirishaji Unaendelea'
      : 'View Active Delivery',

    noActiveDelivery: isSwahili
      ? 'Hakuna usafirishaji unaoendelea'
      : 'No active delivery',

    activeDeliveryDescription: isSwahili
      ? 'Ukikubali ombi la usafirishaji, taarifa za kuchukua mzigo na taarifa za mteja zitaonekana hapa.'
      : 'When you accept a delivery request, pickup and customer information will appear here.',

    availableDeliveries: isSwahili
      ? 'Usafirishaji Uliopo'
      : 'Available Deliveries',

    availableDeliveriesDescription: isSwahili
      ? 'Maombi ya usafirishaji unayoweza kuyakubali.'
      : 'Delivery requests available for you to accept.',

    viewAll: isSwahili ? 'Angalia Zote' : 'View All',

    noDeliveryRequests: isSwahili
      ? 'Hakuna maombi ya usafirishaji'
      : 'No delivery requests available',

    noDeliveryRequestsDescription: isSwahili
      ? 'Maombi mapya ya usafirishaji yataonekana hapa yatakapotumwa kwa wasafirishaji wanaopatikana katika eneo lako.'
      : 'New delivery requests will appear here when they are assigned to available riders in your area.',

    quickActions: isSwahili
      ? 'Vitendo vya Haraka'
      : 'Quick Actions',

    quickActionsDescription: isSwahili
      ? 'Fikia kwa haraka zana zako za usafirishaji.'
      : 'Quickly access your delivery tools.',

    findDeliveries: isSwahili
      ? 'Tafuta Usafirishaji'
      : 'Find Deliveries',

    findDeliveriesDescription: isSwahili
      ? 'Angalia maombi ya usafirishaji yaliyopo.'
      : 'View available delivery requests.',

    deliveryHistory: isSwahili
      ? 'Historia ya Usafirishaji'
      : 'Delivery History',

    deliveryHistoryDescription: isSwahili
      ? 'Angalia usafirishaji uliokamilisha.'
      : 'Review your completed deliveries.',

    viewEarnings: isSwahili
      ? 'Angalia Mapato'
      : 'View Earnings',

    viewEarningsDescription: isSwahili
      ? 'Fuatilia mapato yako ya usafirishaji.'
      : 'Track your delivery earnings.',
  }

  const dashboardStats = [
    {
      title: text.todaysDeliveries,
      value: '0',
      description: text.noDeliveriesYet,
      icon: Package,
    },
    {
      title: text.completed,
      value: '0',
      description: text.completedDeliveries,
      icon: CheckCircle2,
    },
    {
      title: text.inProgress,
      value: '0',
      description: text.activeDeliveries,
      icon: Clock3,
    },
    {
      title: text.todaysEarnings,
      value: 'TSh 0',
      description: text.noEarningsYet,
      icon: Wallet,
    },
  ]

  return (
    <div className="space-y-7">

      {/* Dashboard welcome section */}
      <section className="rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Bike size={16} />

              {text.deliveryRider}
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              {text.welcome}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
              {text.welcomeDescription}
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm lg:min-w-[220px]">

            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100">
              {text.availability}
            </p>

            <div className="mt-3 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <Power size={20} />
              </div>

              <div>
                <p className="font-semibold">
                  {text.offline}
                </p>

                <p className="text-xs text-emerald-100">
                  {text.notReceivingDeliveries}
                </p>
              </div>

            </div>

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              {text.goOnline}
            </button>

          </div>

        </div>
      </section>

      {/* Dashboard statistics */}
      <section>

        <div className="mb-4">

          <h2 className="text-lg font-bold text-slate-900">
            {text.todaysOverview}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {text.todaysActivity}
          </p>

        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {dashboardStats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon size={21} />
                  </div>

                </div>

                <p className="mt-4 text-xs text-slate-400">
                  {stat.description}
                </p>

              </div>
            )
          })}

        </div>
      </section>

      {/* Active delivery */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="font-bold text-slate-900">
              {text.activeDelivery}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {text.currentDeliveryDescription}
            </p>

          </div>

          <Link
            to="/delivery/active"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            {text.viewActiveDelivery}

            <ArrowRight size={16} />
          </Link>

        </div>

        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <MapPin size={28} />
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-900">
            {text.noActiveDelivery}
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            {text.activeDeliveryDescription}
          </p>

        </div>
      </section>

      {/* Available delivery requests */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="font-bold text-slate-900">
              {text.availableDeliveries}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {text.availableDeliveriesDescription}
            </p>

          </div>

          <Link
            to="/delivery/available"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            {text.viewAll}

            <ArrowRight size={16} />
          </Link>

        </div>

        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Package size={28} />
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-900">
            {text.noDeliveryRequests}
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            {text.noDeliveryRequestsDescription}
          </p>

        </div>
      </section>

      {/* Quick actions */}
      <section>

        <div className="mb-4">

          <h2 className="text-lg font-bold text-slate-900">
            {text.quickActions}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {text.quickActionsDescription}
          </p>

        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <Link
            to="/delivery/available"
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Package size={21} />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">

              <div>

                <h3 className="font-semibold text-slate-900">
                  {text.findDeliveries}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {text.findDeliveriesDescription}
                </p>

              </div>

              <ArrowRight
                size={18}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-600"
              />

            </div>
          </Link>

          <Link
            to="/delivery/history"
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock3 size={21} />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">

              <div>

                <h3 className="font-semibold text-slate-900">
                  {text.deliveryHistory}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {text.deliveryHistoryDescription}
                </p>

              </div>

              <ArrowRight
                size={18}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
              />

            </div>
          </Link>

          <Link
            to="/delivery/earnings"
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Wallet size={21} />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">

              <div>

                <h3 className="font-semibold text-slate-900">
                  {text.viewEarnings}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {text.viewEarningsDescription}
                </p>

              </div>

              <ArrowRight
                size={18}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-amber-600"
              />

            </div>
          </Link>

        </div>
      </section>

    </div>
  )
}

export default DeliveryDashboardPage

