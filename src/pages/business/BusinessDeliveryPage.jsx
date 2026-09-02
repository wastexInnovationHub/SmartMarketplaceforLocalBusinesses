import { useMemo, useState } from 'react'
import {
  Truck,
  Search,
  SlidersHorizontal,
  RefreshCw,
  Eye,
  MapPin,
  PackageCheck,
  Store,
  Bike,
  UserRound,
} from 'lucide-react'

function BusinessDeliveryPage() {
  const [deliveries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [methodFilter, setMethodFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const deliveryMethods = [
    'All',
    'Customer Pickup',
    'Business Delivery',
    'Marketplace Rider',
  ]

  const deliveryStatuses = [
    'All',
    'Pending',
    'Preparing',
    'Ready',
    'Assigned',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
  ]

  const filteredDeliveries = useMemo(() => {
    const search = searchTerm.toLowerCase().trim()

    return deliveries.filter((delivery) => {
      const matchesSearch =
        !search ||
        delivery.orderNumber.toLowerCase().includes(search) ||
        delivery.customerName.toLowerCase().includes(search)

      const matchesMethod =
        methodFilter === 'All' ||
        delivery.method === methodFilter

      const matchesStatus =
        statusFilter === 'All' ||
        delivery.status === statusFilter

      return (
        matchesSearch &&
        matchesMethod &&
        matchesStatus
      )
    })
  }, [
    deliveries,
    searchTerm,
    methodFilter,
    statusFilter,
  ])

  const pendingDeliveries = deliveries.filter(
    (delivery) => delivery.status === 'Pending'
  )

  const activeDeliveries = deliveries.filter((delivery) =>
    [
      'Preparing',
      'Ready',
      'Assigned',
      'Out for Delivery',
    ].includes(delivery.status)
  )

  const completedDeliveries = deliveries.filter(
    (delivery) => delivery.status === 'Delivered'
  )

  const handleClearFilters = () => {
    setSearchTerm('')
    setMethodFilter('All')
    setStatusFilter('All')
  }

  const handleViewDelivery = (delivery) => {
    window.alert(
      `Delivery ${delivery.orderNumber}\n\nCustomer: ${delivery.customerName}\nMethod: ${delivery.method}\nStatus: ${delivery.status}`
    )
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#F3FAF8] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">

      <div className="mx-auto max-w-7xl">

        {/* Page header */}
        <div className="flex flex-col gap-4">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#326460] text-white shadow-sm">
              <Truck size={22} />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-[#1B1C1C] sm:text-2xl">
                Delivery
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                Manage order pickup and delivery arrangements
              </p>
            </div>

          </div>

        </div>

        {/* Delivery overview */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Deliveries
                </p>

                <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
                  {deliveries.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#326460]/10 text-[#326460]">
                <Truck size={19} />
              </div>

            </div>

            <p className="mt-2 text-xs text-gray-400">
              Delivery records
            </p>

          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending
                </p>

                <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
                  {pendingDeliveries.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <PackageCheck size={19} />
              </div>

            </div>

            <p className="mt-2 text-xs text-gray-400">
              Awaiting delivery action
            </p>

          </div>

          {/* Active */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active
                </p>

                <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
                  {activeDeliveries.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Bike size={19} />
              </div>

            </div>

            <p className="mt-2 text-xs text-gray-400">
              Currently in progress
            </p>

          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Delivered
                </p>

                <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
                  {completedDeliveries.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <PackageCheck size={19} />
              </div>

            </div>

            <p className="mt-2 text-xs text-gray-400">
              Successfully delivered
            </p>

          </div>

        </div>

        {/* Delivery methods */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#326460]/10 text-[#326460]">
              <Truck size={19} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#1B1C1C] sm:text-lg">
                Delivery Methods
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Delivery options available for your customers
              </p>
            </div>

          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* Customer pickup */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#326460] shadow-sm">
                <Store size={19} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#1B1C1C]">
                Customer Pickup
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Customers collect their orders directly from your business.
              </p>

              <span className="mt-4 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                Available when configured
              </span>

            </div>

            {/* Business delivery */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#326460] shadow-sm">
                <Truck size={19} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#1B1C1C]">
                Business Delivery
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Your business handles delivery directly to the customer.
              </p>

              <span className="mt-4 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                Available when configured
              </span>

            </div>

            {/* Marketplace rider */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#326460] shadow-sm">
                <Bike size={19} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#1B1C1C]">
                Marketplace Rider
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                A registered marketplace delivery rider handles the order.
              </p>

              <span className="mt-4 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                Available when configured
              </span>

            </div>

          </div>

        </section>

        {/* Delivery management */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Header */}
          <div className="border-b border-gray-200 p-4 sm:p-5 lg:p-6">

            <div className="flex flex-col gap-4">

              <div>
                <h2 className="text-base font-semibold text-[#1B1C1C] sm:text-lg">
                  Delivery Management
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Track pickup and delivery status for your orders.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full lg:max-w-sm">

                <Search
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search order or customer..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#326460] focus:bg-white focus:ring-2 focus:ring-[#326460]/10"
                />

              </div>

            </div>

            {/* Filters */}
            <div className="mt-5 space-y-4">

              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <SlidersHorizontal size={17} />
                Delivery method
              </div>

              <div className="flex flex-wrap gap-2">

                {deliveryMethods.map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() =>
                      setMethodFilter(method)
                    }
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      methodFilter === method
                        ? 'bg-[#326460] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {method}
                  </button>
                ))}

              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <PackageCheck size={17} />
                Delivery status
              </div>

              <div className="flex flex-wrap gap-2">

                {deliveryStatuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() =>
                      setStatusFilter(status)
                    }
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      statusFilter === status
                        ? 'bg-[#326460] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}

              </div>

            </div>

          </div>

          {/* Delivery content */}
          {filteredDeliveries.length === 0 ? (

            <div className="px-5 py-14 text-center sm:px-8 sm:py-20">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#326460]/10 text-[#326460]">
                <Truck size={30} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#1B1C1C]">
                {deliveries.length === 0
                  ? 'No deliveries yet'
                  : 'No deliveries found'}
              </h3>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
                {deliveries.length === 0
                  ? 'Delivery information will appear here when customer orders require pickup or delivery.'
                  : 'Try changing your search or delivery filters.'}
              </p>

              {deliveries.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  <RefreshCw size={17} />
                  Clear Filters
                </button>
              )}

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-[1050px] w-full">

                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Order
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Method
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Destination
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Rider / Handler
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredDeliveries.map((delivery) => (

                    <tr
                      key={delivery.id}
                      className="border-b border-gray-100 transition last:border-0 hover:bg-gray-50/70"
                    >

                      <td className="px-6 py-4">

                        <p className="text-sm font-semibold text-[#1B1C1C]">
                          {delivery.orderNumber}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {delivery.date}
                        </p>

                      </td>

                      <td className="px-6 py-4">

                        <p className="text-sm font-medium text-[#1B1C1C]">
                          {delivery.customerName}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {delivery.customerPhone}
                        </p>

                      </td>

                      <td className="px-6 py-4">

                        <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          {delivery.method === 'Customer Pickup' && (
                            <Store size={13} />
                          )}

                          {delivery.method === 'Business Delivery' && (
                            <Truck size={13} />
                          )}

                          {delivery.method === 'Marketplace Rider' && (
                            <Bike size={13} />
                          )}

                          {delivery.method}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin
                            size={16}
                            className="shrink-0 text-gray-400"
                          />

                          <span>
                            {delivery.destination}
                          </span>
                        </div>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2 text-sm text-gray-600">

                          <UserRound
                            size={16}
                            className="shrink-0 text-gray-400"
                          />

                          <span>
                            {delivery.handler}
                          </span>

                        </div>

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            delivery.status === 'Delivered'
                              ? 'bg-green-50 text-green-700'
                              : delivery.status === 'Cancelled'
                                ? 'bg-red-50 text-red-700'
                                : delivery.status === 'Pending'
                                  ? 'bg-yellow-50 text-yellow-700'
                                  : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {delivery.status}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end">

                          <button
                            type="button"
                            onClick={() =>
                              handleViewDelivery(delivery)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-[#326460]"
                            aria-label={`View delivery for ${delivery.orderNumber}`}
                          >
                            <Eye size={17} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </div>

    </div>
  )
}

export default BusinessDeliveryPage

