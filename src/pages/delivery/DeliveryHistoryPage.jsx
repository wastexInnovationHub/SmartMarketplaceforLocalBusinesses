import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  Clock3,
  History,
  MapPin,
  Package,
  Search,
  XCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'

function DeliveryHistoryPage() {
  const { language } = useLanguage()
  const isSwahili = language === 'sw'

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Completed and cancelled deliveries will come from the backend later.
  const deliveries = []

  const text = {
    deliveryManagement: isSwahili
      ? 'Usimamizi wa Usafirishaji'
      : 'Delivery Management',

    deliveryHistory: isSwahili
      ? 'Historia ya Usafirishaji'
      : 'Delivery History',

    description: isSwahili
      ? 'Kagua usafirishaji uliokamilisha au kughairi.'
      : 'Review deliveries you have completed or cancelled.',

    myDeliveries: isSwahili
      ? 'Usafirishaji Wangu'
      : 'My Deliveries',

    completedDeliveries: isSwahili
      ? 'Usafirishaji Uliokamilika'
      : 'Completed Deliveries',

    successfullyDelivered: isSwahili
      ? 'Oda zilizowasilishwa kwa mafanikio'
      : 'Successfully delivered orders',

    cancelledDeliveries: isSwahili
      ? 'Usafirishaji Ulioghairiwa'
      : 'Cancelled Deliveries',

    cancelledRecords: isSwahili
      ? 'Usafirishaji ulioghairiwa'
      : 'Deliveries that were cancelled',

    totalRecords: isSwahili
      ? 'Jumla ya Rekodi'
      : 'Total Records',

    completedAndCancelled: isSwahili
      ? 'Rekodi zilizokamilika na kughairiwa'
      : 'Completed and cancelled records',

    deliveryRecords: isSwahili
      ? 'Rekodi za Usafirishaji'
      : 'Delivery Records',

    previousActivity: isSwahili
      ? 'Shughuli zako za awali za usafirishaji.'
      : 'Your previous delivery activity.',

    searchHistory: isSwahili
      ? 'Tafuta historia...'
      : 'Search history...',

    all: isSwahili ? 'Zote' : 'All',

    delivered: isSwahili
      ? 'Imefikishwa'
      : 'Delivered',

    cancelled: isSwahili
      ? 'Imeghairiwa'
      : 'Cancelled',

    noHistoryYet: isSwahili
      ? 'Bado Hakuna Historia ya Usafirishaji'
      : 'No delivery history yet',

    noHistoryDescription: isSwahili
      ? 'Usafirishaji uliokamilika au kughairiwa utaonekana hapa baada ya kuanza kukubali maombi ya usafirishaji.'
      : 'Completed or cancelled deliveries will appear here after you start accepting delivery requests.',

    browseAvailable: isSwahili
      ? 'Angalia Usafirishaji Uliopo'
      : 'Browse Available Deliveries',

    viewDetails: isSwahili
      ? 'Angalia Maelezo'
      : 'View Details',

    completed: isSwahili
      ? 'Imekamilika'
      : 'Completed',

    distance: isSwahili
      ? 'Umbali'
      : 'Distance',

    completedDeliveriesInfo: isSwahili
      ? 'Usafirishaji Uliokamilika'
      : 'Completed Deliveries',

    completedInfoDescription: isSwahili
      ? 'Usafirishaji uliokamilika kwa mafanikio utahifadhiwa hapa kwa ajili ya marejeo ya baadaye.'
      : 'Successfully completed deliveries will be stored here for future reference.',

    cancelledDeliveriesInfo: isSwahili
      ? 'Usafirishaji Ulioghairiwa'
      : 'Cancelled Deliveries',

    cancelledInfoDescription: isSwahili
      ? 'Rekodi za usafirishaji ulioghairiwa zitabaki hapa ili shughuli ziweze kukaguliwa baadaye.'
      : 'Cancelled delivery records will remain available so activity can be reviewed later.',

    deliveryTimeline: isSwahili
      ? 'Ratiba ya Usafirishaji'
      : 'Delivery Timeline',

    timelineDescription: isSwahili
      ? 'Muda wa usafirishaji na mabadiliko ya hali yatatolewa na mfumo wa usafirishaji wa backend.'
      : 'Delivery timestamps and status changes will be provided by the backend delivery system.',
  }

  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((delivery) => {
      const search = searchTerm.trim().toLowerCase()

      const matchesSearch =
        !search ||
        delivery.orderNumber?.toLowerCase().includes(search) ||
        delivery.businessName?.toLowerCase().includes(search) ||
        delivery.customerArea?.toLowerCase().includes(search)

      const matchesStatus =
        statusFilter === 'all' ||
        delivery.status?.toLowerCase() === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [deliveries, searchTerm, statusFilter])

  const statusOptions = [
    { value: 'all', label: text.all },
    { value: 'delivered', label: text.delivered },
    { value: 'cancelled', label: text.cancelled },
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <p className="text-sm font-medium text-emerald-600">
          {text.deliveryManagement}
        </p>

        <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {text.deliveryHistory}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              {text.description}
            </p>
          </div>

          <Link
            to="/delivery/my-deliveries"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <History size={18} />
            {text.myDeliveries}
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Completed */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {text.completedDeliveries}
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                0
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <CheckCircle2 size={21} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            {text.successfullyDelivered}
          </p>
        </div>

        {/* Cancelled */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {text.cancelledDeliveries}
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                0
              </p>
            </div>

            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <XCircle size={21} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            {text.cancelledRecords}
          </p>
        </div>

        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {text.totalRecords}
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                0
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <History size={21} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            {text.completedAndCancelled}
          </p>
        </div>
      </div>

      {/* History section */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Section header */}
        <div className="border-b border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {text.deliveryRecords}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {text.previousActivity}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={text.searchHistory}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {statusOptions.map((option) => {
              const active = statusFilter === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatusFilter(option.value)}
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
          {filteredDeliveries.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-200 text-slate-500">
                <History size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {text.noHistoryYet}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {text.noHistoryDescription}
              </p>

              <Link
                to="/delivery/available"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <Package size={18} />
                {text.browseAvailable}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-200 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {delivery.orderNumber}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            delivery.status?.toLowerCase() === 'delivered'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {delivery.status}
                        </span>
                      </div>

                      <p className="mt-2 font-semibold text-slate-800">
                        {delivery.businessName}
                      </p>

                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={16} />
                        <span>{delivery.customerArea}</span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                        <span>
                          {text.completed}: {delivery.completedAt}
                        </span>

                        <span>
                          {text.distance}: {delivery.distance}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      {text.viewDetails}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Information cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            {text.completedDeliveriesInfo}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {text.completedInfoDescription}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <XCircle size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            {text.cancelledDeliveriesInfo}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {text.cancelledInfoDescription}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Clock3 size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            {text.deliveryTimeline}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {text.timelineDescription}
          </p>
        </div>
      </section>
    </div>
  )
}

export default DeliveryHistoryPage

