import { useMemo, useState } from 'react'
import {
  ShoppingBag,
  Search,
  SlidersHorizontal,
  RefreshCw,
  Eye,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

function BusinessOrdersPage() {
  const { language } = useLanguage()

  const text = {
    en: {
      orders: 'Orders',
      description: 'Manage and process customer orders',

      totalOrders: 'Total Orders',
      allCustomerOrders: 'All customer orders',

      pending: 'Pending',
      waitingForAction: 'Waiting for action',

      activeOrders: 'Active Orders',
      currentlyBeingProcessed: 'Currently being processed',

      completed: 'Completed',
      successfullyCompleted: 'Successfully completed',

      orderManagement: 'Order Management',
      orderManagementDescription:
        'Review and manage orders received by your business.',

      searchOrders: 'Search orders...',

      filterByStatus: 'Filter by status',

      all: 'All',
      accepted: 'Accepted',
      preparing: 'Preparing',
      ready: 'Ready',
      cancelled: 'Cancelled',

      noOrdersYet: 'No orders yet',
      noOrdersFound: 'No orders found',

      noOrdersDescription:
        'Customer orders will appear here when customers purchase your products.',

      noOrdersFilterDescription:
        'Try changing your search or status filter.',

      clearFilters: 'Clear Filters',

      order: 'Order',
      customer: 'Customer',
      items: 'Items',
      total: 'Total',
      status: 'Status',
      action: 'Action',

      viewOrder: 'View order',

      orderDetails: 'Order',
      customerLabel: 'Customer',
      statusLabel: 'Status',
    },

    sw: {
      orders: 'Oda',
      description: 'Simamia na kushughulikia oda za wateja',

      totalOrders: 'Jumla ya Oda',
      allCustomerOrders: 'Oda zote za wateja',

      pending: 'Inasubiri',
      waitingForAction: 'Inasubiri hatua',

      activeOrders: 'Oda Zinazoendelea',
      currentlyBeingProcessed: 'Zinashughulikiwa kwa sasa',

      completed: 'Imekamilika',
      successfullyCompleted: 'Zimekamilika kwa mafanikio',

      orderManagement: 'Usimamizi wa Oda',
      orderManagementDescription:
        'Kagua na simamia oda zilizopokelewa na biashara yako.',

      searchOrders: 'Tafuta oda...',

      filterByStatus: 'Chuja kwa hali',

      all: 'Zote',
      accepted: 'Imekubaliwa',
      preparing: 'Inaandaliwa',
      ready: 'Iko Tayari',
      cancelled: 'Imeghairiwa',

      noOrdersYet: 'Bado Hakuna Oda',
      noOrdersFound: 'Hakuna Oda Zilizopatikana',

      noOrdersDescription:
        'Oda za wateja zitaonekana hapa wateja watakaponunua bidhaa zako.',

      noOrdersFilterDescription:
        'Jaribu kubadilisha utafutaji au kichujio cha hali.',

      clearFilters: 'Futa Vichujio',

      order: 'Oda',
      customer: 'Mteja',
      items: 'Vitu',
      total: 'Jumla',
      status: 'Hali',
      action: 'Kitendo',

      viewOrder: 'Angalia oda',

      orderDetails: 'Oda',
      customerLabel: 'Mteja',
      statusLabel: 'Hali',
    },
  }

  const currentText = text[language] || text.en

  const [orders, setOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const statuses = [
    {
      value: 'All',
      label: currentText.all,
    },
    {
      value: 'Pending',
      label: currentText.pending,
    },
    {
      value: 'Accepted',
      label: currentText.accepted,
    },
    {
      value: 'Preparing',
      label: currentText.preparing,
    },
    {
      value: 'Ready',
      label: currentText.ready,
    },
    {
      value: 'Completed',
      label: currentText.completed,
    },
    {
      value: 'Cancelled',
      label: currentText.cancelled,
    },
  ]

  const filteredOrders = useMemo(() => {
    const search = searchTerm.toLowerCase().trim()

    return orders.filter((order) => {
      const matchesSearch =
        !search ||
        order.orderNumber.toLowerCase().includes(search) ||
        order.customerName.toLowerCase().includes(search)

      const matchesStatus =
        statusFilter === 'All' ||
        order.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [orders, searchTerm, statusFilter])

  const pendingOrders = orders.filter(
    (order) => order.status === 'Pending'
  )

  const activeOrders = orders.filter((order) =>
    ['Accepted', 'Preparing', 'Ready'].includes(order.status)
  )

  const completedOrders = orders.filter(
    (order) => order.status === 'Completed'
  )

  const handleClearFilters = () => {
    setSearchTerm('')
    setStatusFilter('All')
  }

  const handleViewOrder = (order) => {
    const message =
      language === 'sw'
        ? `${currentText.orderDetails} ${order.orderNumber}\n\n${currentText.customerLabel}: ${order.customerName}\n${currentText.statusLabel}: ${getStatusLabel(
            order.status
          )}`
        : `${currentText.orderDetails} ${order.orderNumber}\n\n${currentText.customerLabel}: ${order.customerName}\n${currentText.statusLabel}: ${getStatusLabel(
            order.status
          )}`

    window.alert(message)
  }

  const getStatusLabel = (status) => {
    const matchingStatus = statuses.find(
      (item) => item.value === status
    )

    return matchingStatus?.label || status
  }

  const getStatusStyle = (status) => {
    if (status === 'Completed') {
      return 'bg-green-50 text-green-700'
    }

    if (status === 'Cancelled') {
      return 'bg-red-50 text-red-700'
    }

    if (status === 'Pending') {
      return 'bg-yellow-50 text-yellow-700'
    }

    return 'bg-blue-50 text-blue-700'
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#F3FAF8] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">

      <div className="mx-auto max-w-7xl">

        {/* Page header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#326460] text-white shadow-sm">
              <ShoppingBag size={22} />
            </div>

            <div className="min-w-0">

              <h1 className="truncate text-xl font-bold text-[#1B1C1C] sm:text-2xl">
                {currentText.orders}
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                {currentText.description}
              </p>

            </div>

          </div>

        </div>

        {/* Order statistics */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-gray-500">
              {currentText.totalOrders}
            </p>

            <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
              {orders.length}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {currentText.allCustomerOrders}
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-gray-500">
              {currentText.pending}
            </p>

            <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
              {pendingOrders.length}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {currentText.waitingForAction}
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-gray-500">
              {currentText.activeOrders}
            </p>

            <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
              {activeOrders.length}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {currentText.currentlyBeingProcessed}
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-gray-500">
              {currentText.completed}
            </p>

            <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
              {completedOrders.length}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {currentText.successfullyCompleted}
            </p>

          </div>

        </div>

        {/* Orders card */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Card header */}
          <div className="border-b border-gray-200 p-4 sm:p-5 lg:p-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h2 className="text-base font-semibold text-[#1B1C1C] sm:text-lg">
                  {currentText.orderManagement}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {currentText.orderManagementDescription}
                </p>

              </div>

              {/* Search */}
              <div className="relative w-full lg:w-72">

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
                  placeholder={currentText.searchOrders}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#326460] focus:bg-white focus:ring-2 focus:ring-[#326460]/10"
                />

              </div>

            </div>

            {/* Filters */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">

              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <SlidersHorizontal size={17} />
                {currentText.filterByStatus}
              </div>

              <div className="flex flex-1 flex-wrap gap-2">

                {statuses.map((status) => (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() =>
                      setStatusFilter(status.value)
                    }
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      statusFilter === status.value
                        ? 'bg-[#326460] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}

              </div>

            </div>

          </div>

          {/* Orders */}
          {filteredOrders.length === 0 ? (

            <div className="px-5 py-14 text-center sm:px-8 sm:py-20">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#326460]/10 text-[#326460]">
                <ShoppingBag size={30} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#1B1C1C]">
                {orders.length === 0
                  ? currentText.noOrdersYet
                  : currentText.noOrdersFound}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {orders.length === 0
                  ? currentText.noOrdersDescription
                  : currentText.noOrdersFilterDescription}
              </p>

              {orders.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  <RefreshCw size={17} />
                  {currentText.clearFilters}
                </button>
              )}

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-[900px] w-full">

                <thead>

                  <tr className="border-b border-gray-200 bg-gray-50 text-left">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.order}
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.customer}
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.items}
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.total}
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.status}
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.action}
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredOrders.map((order) => (

                    <tr
                      key={order.id}
                      className="border-b border-gray-100 transition last:border-0 hover:bg-gray-50/70"
                    >

                      <td className="px-6 py-4">

                        <p className="text-sm font-semibold text-[#1B1C1C]">
                          {order.orderNumber}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {order.date}
                        </p>

                      </td>

                      <td className="px-6 py-4">

                        <p className="text-sm font-medium text-[#1B1C1C]">
                          {order.customerName}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {order.customerPhone}
                        </p>

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.items}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-[#1B1C1C]">
                        TZS {order.total.toLocaleString()}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end">

                          <button
                            type="button"
                            onClick={() =>
                              handleViewOrder(order)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-[#326460]"
                            aria-label={`${currentText.viewOrder} ${order.orderNumber}`}
                            title={currentText.viewOrder}
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

export default BusinessOrdersPage

