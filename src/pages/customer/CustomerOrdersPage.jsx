
import { useMemo, useState } from 'react'
import {
  ShoppingBag,
  Package,
  Clock3,
  CheckCircle2,
  XCircle,
  Search,
  ArrowRight,
  RefreshCw,
  X,
  Store,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const orderStatuses = [
  {
    label: 'All Orders',
    value: 'all',
    icon: ShoppingBag,
  },
  {
    label: 'Pending',
    value: 'pending',
    icon: Clock3,
  },
  {
    label: 'Completed',
    value: 'completed',
    icon: CheckCircle2,
  },
  {
    label: 'Cancelled',
    value: 'cancelled',
    icon: XCircle,
  },
]

function CustomerOrdersPage() {
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  /*
   * IMPORTANT:
   * Keep this empty until the real backend order API
   * is connected.
   *
   * No fake orders are displayed.
   */
  const orders = []

  const filteredOrders = useMemo(() => {
    let result = orders

    if (selectedStatus !== 'all') {
      result = result.filter(
        (order) => order.status === selectedStatus
      )
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter((order) => {
        return (
          order.id?.toString().toLowerCase().includes(query) ||
          order.businessName?.toLowerCase().includes(query) ||
          order.productName?.toLowerCase().includes(query)
        )
      })
    }

    return result
  }, [search, selectedStatus])

  const clearFilters = () => {
    setSearch('')
    setSelectedStatus('all')
  }

  const hasFilters =
    search.trim() !== '' || selectedStatus !== 'all'

  const selectedStatusLabel =
    orderStatuses.find(
      (status) => status.value === selectedStatus
    )?.label || 'All Orders'

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <section>
        <div className="rounded-3xl border border-[#E4D4CF] bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0EC] text-[#A03F28]">
                <ShoppingBag size={27} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#326460]">
                  Customer
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl">
                  My Orders
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#695D46] sm:text-base">
                  View and track the orders you place through JamiiMarket.
                </p>
              </div>

            </div>

            {/* ONE SAFE MARKETPLACE DESTINATION */}
            <Link
              to="/customer/businesses"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#A03F28] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#812914] active:scale-[0.98]"
            >
              <Store size={18} />
              Browse Businesses
              <ArrowRight size={17} />
            </Link>

          </div>
        </div>
      </section>


      {/* =====================================================
          SEARCH + FILTERS
      ===================================================== */}
      <section className="rounded-2xl border border-[#E4D4CF] bg-white p-4 shadow-sm sm:p-5">

        <div className="flex flex-col gap-3 lg:flex-row">

          {/* SEARCH */}
          <div className="relative flex-1">

            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A726C]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by order, product, or business..."
              className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-11 text-sm text-[#1B1C1C] outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#7A706C] transition hover:bg-[#F2EDEA] hover:text-[#A03F28]"
              >
                <X size={17} />
              </button>
            )}

          </div>

          {/* CLEAR FILTERS */}
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDC0BA] bg-[#FCF9F8] px-5 py-3 text-sm font-semibold text-[#56423D] transition hover:border-[#A03F28] hover:text-[#A03F28]"
            >
              <RefreshCw size={16} />
              Clear
            </button>
          )}

        </div>


        {/* STATUS FILTERS */}
        <div className="mt-5 border-t border-[#EEE7E4] pt-5">

          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#8A726C]">
            Order status
          </p>

          <div className="flex gap-2 overflow-x-auto pb-1">

            {orderStatuses.map((status) => {
              const Icon = status.icon
              const active = selectedStatus === status.value

              return (
                <button
                  key={status.value}
                  type="button"
                  onClick={() => setSelectedStatus(status.value)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    active
                      ? 'bg-[#A03F28] text-white shadow-sm'
                      : 'border border-[#DDC0BA] bg-[#FCF9F8] text-[#56423D] hover:border-[#A03F28] hover:text-[#A03F28]'
                  }`}
                >
                  <Icon size={16} />
                  {status.label}
                </button>
              )
            })}

          </div>
        </div>

      </section>


      {/* =====================================================
          RESULTS HEADER
      ===================================================== */}
      <section>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#326460]">
              Orders
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#1B1C1C]">
              {selectedStatusLabel}
            </h2>

            <p className="mt-1 text-sm text-[#8A726C]">
              {filteredOrders.length} order
              {filteredOrders.length === 1 ? '' : 's'}
              {search ? ` matching "${search}"` : ''}
            </p>
          </div>

        </div>

      </section>


      {/* =====================================================
          RESULTS
      ===================================================== */}
      <section>

        {filteredOrders.length > 0 ? (

          <div className="space-y-4">

            {filteredOrders.map((order) => (

              <article
                key={order.id}
                className="rounded-2xl border border-[#E4D4CF] bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0EC] text-[#A03F28]">
                      <Package size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#1B1C1C]">
                        {order.productName}
                      </h3>

                      <p className="mt-1 text-sm text-[#8A726C]">
                        Order #{order.id}
                      </p>

                      {order.businessName && (
                        <p className="mt-1 text-xs text-[#695D46]">
                          {order.businessName}
                        </p>
                      )}
                    </div>

                  </div>

                  <span className="w-fit rounded-full bg-[#FFF0EC] px-3 py-1.5 text-xs font-bold capitalize text-[#A03F28]">
                    {order.status}
                  </span>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */
          <div className="overflow-hidden rounded-3xl border border-[#E4D4CF] bg-white shadow-sm">

            <div className="relative px-6 py-14 text-center sm:px-10 sm:py-16">

              {/* Decorative background */}
              <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF4F0]" />

              <div className="relative">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF0EC] text-[#A03F28]">
                  <Package size={36} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#1B1C1C]">
                  {hasFilters
                    ? 'No matching orders'
                    : 'You have no orders yet'}
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#695D46]">
                  {hasFilters
                    ? 'No real orders match your current search or status filter. Try changing the filters or clear them to see all available orders.'
                    : 'When you place an order through JamiiMarket, your order information will appear here.'}
                </p>


                {/* ACTIONS */}
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">

                  {hasFilters ? (

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDC0BA] bg-[#FCF9F8] px-5 py-3 text-sm font-semibold text-[#56423D] transition hover:border-[#A03F28] hover:text-[#A03F28]"
                    >
                      <RefreshCw size={17} />
                      Clear Filters
                    </button>

                  ) : (

                    <Link
                      to="/customer/businesses"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A03F28] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#812914] active:scale-[0.98]"
                    >
                      <Search size={18} />
                      Find Businesses
                      <ArrowRight size={17} />
                    </Link>

                  )}

                  <Link
                    to="/customer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDC0BA] bg-white px-5 py-3 text-sm font-semibold text-[#56423D] transition hover:border-[#326460] hover:text-[#326460]"
                  >
                    Back to Dashboard
                  </Link>

                </div>


                {/* Honest data message */}
                <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-[#FCF9F8] px-5 py-4 text-left">

                  <div className="flex gap-3">

                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E9F3F1] text-[#326460]">
                      <ShoppingBag size={16} />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#1B1C1C]">
                        Real order data only
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#8A726C]">
                        No sample orders, prices, businesses, dates, or delivery
                        details are displayed. Orders will appear after the
                        marketplace is connected to the real backend data.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

      </section>

    </div>
  )
}

export default CustomerOrdersPage

