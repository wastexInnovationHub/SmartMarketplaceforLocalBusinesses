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

import { useLanguage } from '../../i18n/LanguageContext'

function DeliveryEarningsPage() {
  const { language } = useLanguage()
  const isSwahili = language === 'sw'

  const [searchTerm, setSearchTerm] = useState('')
  const [period, setPeriod] = useState('all')

  // Real earnings will come from the backend payment and delivery system.
  const earnings = []

  const text = {
    financialOverview: isSwahili ? 'Muhtasari wa Fedha' : 'Financial Overview',
    earnings: isSwahili ? 'Mapato' : 'Earnings',
    description: isSwahili
      ? 'Fuatilia mapato yako ya usafirishaji na malipo ya usafirishaji yaliyokamilika.'
      : 'Track your delivery earnings and completed delivery payments.',
    deliveryHistory: isSwahili ? 'Historia ya Usafirishaji' : 'Delivery History',

    totalEarnings: isSwahili ? 'Jumla ya Mapato' : 'Total Earnings',
    verifiedDeliveryEarnings: isSwahili
      ? 'Mapato ya usafirishaji yaliyothibitishwa'
      : 'Verified delivery earnings',

    todaysEarnings: isSwahili ? 'Mapato ya Leo' : "Today's Earnings",
    todaysCompletedDeliveries: isSwahili
      ? 'Mapato kutoka usafirishaji uliokamilika leo'
      : "Earnings from today's completed deliveries",

    completed: isSwahili ? 'Imekamilika' : 'Completed',
    deliveriesContributing: isSwahili
      ? 'Usafirishaji unaochangia mapato'
      : 'Deliveries contributing to earnings',

    pending: isSwahili ? 'Inasubiri' : 'Pending',
    awaitingVerification: isSwahili
      ? 'Mapato yanayosubiri kuthibitishwa'
      : 'Earnings awaiting verification',

    earningsRecords: isSwahili ? 'Rekodi za Mapato' : 'Earnings Records',
    recordsDescription: isSwahili
      ? 'Rekodi za malipo ya huduma za usafirishaji zilizokamilika.'
      : 'Payment records for completed delivery services.',

    searchEarnings: isSwahili
      ? 'Tafuta mapato...'
      : 'Search earnings...',

    allTime: isSwahili ? 'Muda Wote' : 'All Time',
    today: isSwahili ? 'Leo' : 'Today',
    thisWeek: isSwahili ? 'Wiki Hii' : 'This Week',
    thisMonth: isSwahili ? 'Mwezi Huu' : 'This Month',

    noEarningsYet: isSwahili ? 'Bado Hakuna Mapato' : 'No earnings yet',
    noEarningsDescription: isSwahili
      ? 'Mapato yako ya usafirishaji yaliyothibitishwa yataonekana hapa baada ya kukamilisha maombi ya usafirishaji.'
      : 'Your verified delivery earnings will appear here after you complete delivery requests.',

    findDeliveries: isSwahili ? 'Tafuta Usafirishaji' : 'Find Deliveries',

    verifiedEarnings: isSwahili
      ? 'Mapato Yaliyothibitishwa'
      : 'Verified Earnings',
    verifiedEarningsDescription: isSwahili
      ? 'Mapato yatarekodiwa tu baada ya usafirishaji husika kuthibitishwa kwa mafanikio.'
      : 'Earnings will only be recorded after the corresponding delivery has been successfully verified.',

    paymentTracking: isSwahili
      ? 'Ufuatiliaji wa Malipo'
      : 'Payment Tracking',
    paymentTrackingDescription: isSwahili
      ? 'Hali ya malipo na taarifa za malipo yako zitatolewa na mfumo wa malipo wa backend.'
      : 'Payment status and payout information will be supplied by the backend payment system.',

    earningsGrowth: isSwahili
      ? 'Ukuaji wa Mapato'
      : 'Earnings Growth',
    earningsGrowthDescription: isSwahili
      ? 'Baada ya taarifa halisi za usafirishaji kupatikana, sehemu hii inaweza kuonyesha mwenendo wa mapato na utendaji wako kwa muda.'
      : 'Once real delivery data is available, this area can show earning trends and performance over time.',
  }

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
    { value: 'all', label: text.allTime },
    { value: 'today', label: text.today },
    { value: 'week', label: text.thisWeek },
    { value: 'month', label: text.thisMonth },
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <p className="text-sm font-medium text-emerald-600">
          {text.financialOverview}
        </p>

        <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {text.earnings}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              {text.description}
            </p>
          </div>

          <Link
            to="/delivery/history"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <History size={18} />
            {text.deliveryHistory}
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
                {text.totalEarnings}
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
            {text.verifiedDeliveryEarnings}
          </p>
        </div>

        {/* Today */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {text.todaysEarnings}
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
            {text.todaysCompletedDeliveries}
          </p>
        </div>

        {/* Completed */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {text.completed}
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
            {text.deliveriesContributing}
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {text.pending}
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
            {text.awaitingVerification}
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
                {text.earningsRecords}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {text.recordsDescription}
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
                placeholder={text.searchEarnings}
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
                {text.noEarningsYet}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {text.noEarningsDescription}
              </p>

              <Link
                to="/delivery/available"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <TrendingUp size={18} />
                {text.findDeliveries}
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
            {text.verifiedEarnings}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {text.verifiedEarningsDescription}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Wallet size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            {text.paymentTracking}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {text.paymentTrackingDescription}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <TrendingUp size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            {text.earningsGrowth}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {text.earningsGrowthDescription}
          </p>
        </div>
      </section>
    </div>
  )
}

export default DeliveryEarningsPage

