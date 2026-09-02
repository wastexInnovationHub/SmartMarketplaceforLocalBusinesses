import { useMemo, useState } from 'react'
import {
  Bike,
  Filter,
  MapPin,
  Package,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from 'lucide-react'

function AvailableDeliveriesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [distanceFilter, setDistanceFilter] = useState('all')

  // Real delivery requests will come from the backend.
  const deliveries = []

  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((delivery) => {
      const search = searchTerm.trim().toLowerCase()

      const matchesSearch =
        !search ||
        delivery.orderNumber?.toLowerCase().includes(search) ||
        delivery.businessName?.toLowerCase().includes(search) ||
        delivery.customerArea?.toLowerCase().includes(search)

      const matchesDistance =
        distanceFilter === 'all' ||
        Number(delivery.distanceKm) <= Number(distanceFilter)

      return matchesSearch && matchesDistance
    })
  }, [searchTerm, distanceFilter])

  return (
    <div className="space-y-7">

      {/* Page header */}
      <section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
              <Bike size={18} />
              Delivery Requests
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Available Deliveries
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Find delivery requests available for you and accept a delivery
              when you are ready.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>
      </section>

      {/* Availability notice */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <Bike size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-amber-900">
              You are currently offline
            </h2>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              Go online from your Delivery Dashboard to become available for
              new delivery requests.
            </p>
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          {/* Search */}
          <div className="relative w-full xl:max-w-xl">
            <Search
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by order, business, or area..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <SlidersHorizontal
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={distanceFilter}
                onChange={(event) => setDistanceFilter(event.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-48"
              >
                <option value="all">Any distance</option>
                <option value="2">Within 2 km</option>
                <option value="5">Within 5 km</option>
                <option value="10">Within 10 km</option>
              </select>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Filter size={17} />
              More Filters
            </button>
          </div>
        </div>
      </section>

      {/* Delivery request results */}
      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Delivery Requests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Requests available in your delivery area.
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {filteredDeliveries.length} available
          </span>
        </div>

        {filteredDeliveries.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Package size={28} />
            </div>

            <h3 className="mt-5 text-base font-semibold text-slate-900">
              No delivery requests available
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
              There are currently no delivery requests available for you.
              New requests will appear here when businesses have orders ready
              for delivery.
            </p>

            <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <RefreshCw size={17} />
                Check Again
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                      New Delivery
                    </p>

                    <h3 className="mt-1 font-bold text-slate-900">
                      {delivery.orderNumber}
                    </h3>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Available
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Pickup
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {delivery.businessName}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {delivery.businessAddress}
                      </p>
                    </div>
                  </div>

                  <div className="ml-4 h-5 border-l border-dashed border-slate-300" />

                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Drop-off
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {delivery.customerArea}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {delivery.customerAddress}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                  <div>
                    <p className="text-xs text-slate-400">
                      Distance
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {delivery.distanceKm} km
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Delivery Fee
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      TSh {delivery.deliveryFee}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-5 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  View & Accept Delivery
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Delivery information */}
      <section className="grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <MapPin size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Nearby requests
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Delivery requests will be matched based on your location and
            availability.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Bike size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Stay available
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Keep your delivery status online when you are ready to receive
            delivery requests.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Package size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Order information
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Pickup, drop-off, distance, and delivery details will come from
            the real order when the backend is connected.
          </p>
        </div>

      </section>

    </div>
  )
}

export default AvailableDeliveriesPage

