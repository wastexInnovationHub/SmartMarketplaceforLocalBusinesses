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

function DeliveryDashboardPage() {
  const dashboardStats = [
    {
      title: "Today's Deliveries",
      value: '0',
      description: 'No deliveries yet',
      icon: Package,
    },
    {
      title: 'Completed',
      value: '0',
      description: 'Completed deliveries',
      icon: CheckCircle2,
    },
    {
      title: 'In Progress',
      value: '0',
      description: 'Active deliveries',
      icon: Clock3,
    },
    {
      title: "Today's Earnings",
      value: 'TSh 0',
      description: 'No earnings yet',
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
              Delivery Rider
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Welcome to your Delivery Dashboard 👋
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
              Manage delivery requests, track active deliveries, and keep
              your customers updated from one place.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm lg:min-w-[220px]">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100">
              Availability
            </p>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <Power size={20} />
              </div>

              <div>
                <p className="font-semibold">
                  Offline
                </p>

                <p className="text-xs text-emerald-100">
                  You are not receiving deliveries
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Go Online
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard statistics */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Today's Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your delivery activity for today.
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
              Active Delivery
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your current delivery will appear here.
            </p>
          </div>

          <Link
            to="/delivery/active"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            View Active Delivery
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <MapPin size={28} />
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-900">
            No active delivery
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            When you accept a delivery request, pickup and customer
            information will appear here.
          </p>
        </div>
      </section>

      {/* Available delivery requests */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-slate-900">
              Available Deliveries
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Delivery requests available for you to accept.
            </p>
          </div>

          <Link
            to="/delivery/available"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Package size={28} />
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-900">
            No delivery requests available
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            New delivery requests will appear here when they are assigned
            to available riders in your area.
          </p>
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quickly access your delivery tools.
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
                  Find Deliveries
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  View available delivery requests.
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
                  Delivery History
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Review your completed deliveries.
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
                  View Earnings
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Track your delivery earnings.
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

