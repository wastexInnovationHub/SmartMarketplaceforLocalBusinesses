import { useMemo, useState } from 'react'
import {
  Bike,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Search,
  Truck,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'

function MyDeliveriesPage() {
  const { language } = useLanguage()
  const isSwahili = language === 'sw'

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Real delivery records will come from the backend later.
  const deliveries = []

  const text = {
    deliveryManagement: isSwahili
      ? 'Usimamizi wa Usafirishaji'
      : 'Delivery Management',

    myDeliveries: isSwahili
      ? 'Usafirishaji Wangu'
      : 'My Deliveries',

    description: isSwahili
      ? 'Angalia na simamia maombi ya usafirishaji uliyokubali au kukamilisha.'
      : 'View and manage delivery requests you have accepted or completed.',

    findDeliveries: isSwahili
      ? 'Tafuta Usafirishaji'
      : 'Find Deliveries',

    accepted: isSwahili
      ? 'Yaliyokubaliwa'
      : 'Accepted',

    active: isSwahili
      ? 'Yanayoendelea'
      : 'Active',

    pickedUp: isSwahili
      ? 'Yaliyokwisha Chukuliwa'
      : 'Picked Up',

    delivered: isSwahili
      ? 'Yaliyofikishwa'
      : 'Delivered',

    waitingToBeCompleted: isSwahili
      ? 'Usafirishaji unaosubiri kukamilishwa'
      : 'Deliveries waiting to be completed',

    currentlyInProgress: isSwahili
      ? 'Usafirishaji unaoendelea kwa sasa'
      : 'Deliveries currently in progress',

    ordersCollected: isSwahili
      ? 'Oda zilizochukuliwa kutoka kwa biashara'
      : 'Orders collected from businesses',

    successfullyCompleted: isSwahili
      ? 'Usafirishaji uliokamilishwa kwa mafanikio'
      : 'Successfully completed deliveries',

    deliveryRecords: isSwahili
      ? 'Rekodi za Usafirishaji'
      : 'Delivery Records',

    recordsDescription: isSwahili
      ? 'Maombi yako ya usafirishaji uliyokubali na kukamilisha.'
      : 'Your accepted and completed delivery requests.',

    searchDeliveries: isSwahili
      ? 'Tafuta usafirishaji...'
      : 'Search deliveries...',

    allDeliveries: isSwahili
      ? 'Usafirishaji Wote'
      : 'All Deliveries',

    pickedUpFilter: isSwahili
      ? 'Yaliyokwisha Chukuliwa'
      : 'Picked Up',

    outForDelivery: isSwahili
      ? 'Yapo Njiani'
      : 'Out for Delivery',

    noDeliveryRecords: isSwahili
      ? 'Bado Hakuna Rekodi za Usafirishaji'
      : 'No delivery records yet',

    noDeliveryRecordsDescription: isSwahili
      ? 'Baada ya kukubali ombi la usafirishaji, litaonekana hapa ili uweze kufuatilia maendeleo na historia yake.'
      : 'Once you accept a delivery request, it will appear here so you can track its progress and history.',

    browseAvailable: isSwahili
      ? 'Angalia Usafirishaji Uliopo'
      : 'Browse Available Deliveries',

    viewDelivery: isSwahili
      ? 'Angalia Usafirishaji'
      : 'View Delivery',

    acceptedDeliveries: isSwahili
      ? 'Usafirishaji Uliokubaliwa'
      : 'Accepted Deliveries',

    acceptedDeliveriesDescription: isSwahili
      ? 'Usafirishaji unaokubali utaingia moja kwa moja kwenye rekodi zako za usafirishaji backend itakapounganishwa.'
      : 'Deliveries you accept will move into your delivery records automatically once the backend is connected.',

    pickupProgress: isSwahili
      ? 'Maendeleo ya Kuchukua Oda'
      : 'Pickup Progress',

    pickupProgressDescription: isSwahili
      ? 'Hali ya kuchukua na kupeleka oda itasasishwa unapoendelea na hatua za mchakato wa usafirishaji.'
      : 'Pickup and delivery status will update as you progress through the order lifecycle.',

    completedDeliveries: isSwahili
      ? 'Usafirishaji Uliokamilika'
      : 'Completed Deliveries',

    completedDeliveriesDescription: isSwahili
      ? 'Oda zilizowasilishwa kwa mafanikio zitaendelea kupatikana hapa kwa ufuatiliaji na historia ya usafirishaji.'
      : 'Successfully delivered orders will remain available here for tracking and delivery history.',
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
    {
      value: 'all',
      label: text.allDeliveries,
    },
    {
      value: 'accepted',
      label: text.accepted,
    },
    {
      value: 'picked up',
      label: text.pickedUpFilter,
    },
    {
      value: 'out for delivery',
      label: text.outForDelivery,
    },
    {
      value: 'delivered',
      label: text.delivered,
    },
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
              {text.myDeliveries}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              {text.description}
            </p>
          </div>

          <Link
            to="/delivery/available"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <Truck size={18} />
            {text.findDeliveries}
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Accepted */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {text.accepted}
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                0
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Clock3 size={21} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            {text.waitingToBeCompleted}
          </p>
        </div>

        {/* Active */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {text.active}
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                0
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Bike size={21} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            {text.currentlyInProgress}
          </p>
        </div>

        {/* Picked Up */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {text.pickedUp}
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                0
              </p>
            </div>

            <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
              <Package size={21} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            {text.ordersCollected}
          </p>
        </div>

        {/* Delivered */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {text.delivered}
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
            {text.successfullyCompleted}
          </p>
        </div>
      </div>

      {/* Delivery list section */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Section header */}
        <div className="border-b border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {text.deliveryRecords}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {text.recordsDescription}
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
                placeholder={text.searchDeliveries}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Status filters */}
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

        {/* Delivery records */}
        <div className="p-5 sm:p-6">
          {filteredDeliveries.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Bike size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {text.noDeliveryRecords}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {text.noDeliveryRecordsDescription}
              </p>

              <Link
                to="/delivery/available"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <Truck size={18} />
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

                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
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
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to="/delivery/active"
                        className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                      >
                        {text.viewDelivery}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Information section */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Clock3 size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            {text.acceptedDeliveries}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {text.acceptedDeliveriesDescription}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Package size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            {text.pickupProgress}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {text.pickupProgressDescription}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            {text.completedDeliveries}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {text.completedDeliveriesDescription}
          </p>
        </div>
      </section>
    </div>
  )
}

export default MyDeliveriesPage

