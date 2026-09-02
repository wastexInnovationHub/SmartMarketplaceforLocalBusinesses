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

function DeliveryHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Completed and cancelled deliveries will come from the backend later.
  const deliveries = []

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
    { value: 'all', label: 'All' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div>
        <p className="text-sm font-medium text-emerald-600">
          Delivery Management
        </p>

        <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Delivery History
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Review deliveries you have completed or cancelled.
            </p>
          </div>

          <Link
            to="/delivery/my-deliveries"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <History size={18} />
            My Deliveries
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
                Completed Deliveries
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
            Successfully delivered orders
          </p>
        </div>

        {/* Cancelled */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Cancelled Deliveries
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
            Deliveries that were cancelled
          </p>
        </div>

        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Records
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
            Completed and cancelled records
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
                Delivery Records
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your previous delivery activity.
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
                placeholder="Search history..."
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
                No delivery history yet
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Completed or cancelled deliveries will appear here after you
                start accepting delivery requests.
              </p>

              <Link
                to="/delivery/available"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <Package size={18} />
                Browse Available Deliveries
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
                          Completed: {delivery.completedAt}
                        </span>

                        <span>
                          Distance: {delivery.distance}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      View Details
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
            Completed Deliveries
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Successfully completed deliveries will be stored here for future
            reference.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <XCircle size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Cancelled Deliveries
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Cancelled delivery records will remain available so activity can
            be reviewed later.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Clock3 size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Delivery Timeline
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Delivery timestamps and status changes will be provided by the
            backend delivery system.
          </p>
        </div>

      </section>
    </div>
  )
}

export default DeliveryHistoryPage

