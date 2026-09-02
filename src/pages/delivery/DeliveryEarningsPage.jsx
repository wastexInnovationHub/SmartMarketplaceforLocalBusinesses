import { useMemo, useState } from 'react'
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  History,
  Search,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'

function DeliveryEarningsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [period, setPeriod] = useState('all')

  // Real earnings will come from the backend payment and delivery system.
  const earnings = []

  const filteredEarnings = useMemo(() => {
    return earnings.filter((earning) => {
      const search = searchTerm.trim().toLowerCase()

      const matchesSearch =
        !search ||
        earning.orderNumber?.toLowerCase().includes(search) ||
        earning.date?.toLowerCase().includes(search)

      const matchesPeriod =
        period === 'all' ||
        earning.period?.toLowerCase() === period

      return matchesSearch && matchesPeriod
    })
  }, [earnings, searchTerm, period])

  const periodOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
  ]

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div>
        <p className="text-sm font-medium text-emerald-600">
          Financial Overview
        </p>

        <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Earnings
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Track your delivery earnings and completed delivery payments.
            </p>
          </div>

          <Link
            to="/delivery/history"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <History size={18} />
            Delivery History
          </Link>
        </div>
      </div>

      {/* Earnings summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total earnings */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Earnings
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                TSh 0
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <Wallet size={21} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Verified delivery earnings
          </p>
        </div>

        {/* Today */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Today's Earnings
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                TSh 0
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <CalendarDays size={21} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Earnings from today's completed deliveries
          </p>
        </div>

        {/* Completed */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Completed
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                0
              </p>
            </div>

            <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
              <CheckCircle2 size={21} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Deliveries contributing to earnings
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Pending
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                TSh 0
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Clock3 size={21} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Earnings awaiting verification
          </p>
        </div>
      </div>

      {/* Earnings records */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Section header */}
        <div className="border-b border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Earnings Records
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Payment records for completed delivery services.
              </p>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search earnings..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Period filters */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {periodOptions.map((option) => {
              const active = period === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPeriod(option.value)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Records */}
        <div className="p-5 sm:p-6">
          {filteredEarnings.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <DollarSign size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No earnings yet
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Your verified delivery earnings will appear here after you
                complete delivery requests.
              </p>

              <Link
                to="/delivery/available"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <TrendingUp size={18} />
                Find Deliveries
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEarnings.map((earning) => (
                <div
                  key={earning.id}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-200 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold text-slate-900">
                        {earning.orderNumber}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {earning.date}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="font-bold text-emerald-600">
                        TSh {earning.amount}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {earning.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Earnings information */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Verified Earnings
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Earnings will only be recorded after the corresponding delivery
            has been successfully verified.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Wallet size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Payment Tracking
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Payment status and payout information will be supplied by the
            backend payment system.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <TrendingUp size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Earnings Growth
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Once real delivery data is available, this area can show earning
            trends and performance over time.
          </p>
        </div>

      </section>
    </div>
  )
}

export default DeliveryEarningsPage

