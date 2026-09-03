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
import { useLanguage } from '../../i18n/LanguageContext'

function BusinessDeliveryPage() {
  const { language } = useLanguage()

  const text = {
    en: {
      delivery: 'Delivery',
      description: 'Manage order pickup and delivery arrangements',

      totalDeliveries: 'Total Deliveries',
      deliveryRecords: 'Delivery records',

      pending: 'Pending',
      awaitingAction: 'Awaiting delivery action',

      active: 'Active',
      currentlyInProgress: 'Currently in progress',

      delivered: 'Delivered',
      successfullyDelivered: 'Successfully delivered',

      deliveryMethods: 'Delivery Methods',
      deliveryMethodsDescription:
        'Delivery options available for your customers',

      customerPickup: 'Customer Pickup',
      customerPickupDescription:
        'Customers collect their orders directly from your business.',

      businessDelivery: 'Business Delivery',
      businessDeliveryDescription:
        'Your business handles delivery directly to the customer.',

      marketplaceRider: 'Marketplace Rider',
      marketplaceRiderDescription:
        'A registered marketplace delivery rider handles the order.',

      availableWhenConfigured: 'Available when configured',

      deliveryManagement: 'Delivery Management',
      deliveryManagementDescription:
        'Track pickup and delivery status for your orders.',

      searchPlaceholder: 'Search order or customer...',

      deliveryMethod: 'Delivery method',
      deliveryStatus: 'Delivery status',

      all: 'All',
      customerPickupFilter: 'Customer Pickup',
      businessDeliveryFilter: 'Business Delivery',
      marketplaceRiderFilter: 'Marketplace Rider',

      pendingStatus: 'Pending',
      preparing: 'Preparing',
      ready: 'Ready',
      assigned: 'Assigned',
      outForDelivery: 'Out for Delivery',
      deliveredStatus: 'Delivered',
      cancelled: 'Cancelled',

      noDeliveriesYet: 'No deliveries yet',
      noDeliveriesFound: 'No deliveries found',

      noDeliveriesDescription:
        'Delivery information will appear here when customer orders require pickup or delivery.',

      noDeliveriesFilterDescription:
        'Try changing your search or delivery filters.',

      clearFilters: 'Clear Filters',

      order: 'Order',
      customer: 'Customer',
      method: 'Method',
      destination: 'Destination',
      riderHandler: 'Rider / Handler',
      status: 'Status',
      action: 'Action',

      viewDelivery: 'View delivery',

      deliveryAlert: 'Delivery',
      customerLabel: 'Customer',
      methodLabel: 'Method',
      statusLabel: 'Status',

      openNotifications: 'View notifications',
    },

    sw: {
      delivery: 'Usafirishaji',
      description:
        'Simamia uchukuaji wa oda na mipango ya usafirishaji',

      totalDeliveries: 'Jumla ya Usafirishaji',
      deliveryRecords: 'Rekodi za usafirishaji',

      pending: 'Inasubiri',
      awaitingAction: 'Inasubiri hatua ya usafirishaji',

      active: 'Unaendelea',
      currentlyInProgress: 'Unaendelea kwa sasa',

      delivered: 'Imefikishwa',
      successfullyDelivered: 'Imefikishwa kwa mafanikio',

      deliveryMethods: 'Njia za Usafirishaji',
      deliveryMethodsDescription:
        'Chaguo za usafirishaji zinazopatikana kwa wateja wako',

      customerPickup: 'Mteja Anachukua',
      customerPickupDescription:
        'Wateja huchukua oda zao moja kwa moja kwenye biashara yako.',

      businessDelivery: 'Usafirishaji wa Biashara',
      businessDeliveryDescription:
        'Biashara yako inapeleka oda moja kwa moja kwa mteja.',

      marketplaceRider: 'Msafirishaji wa JamiiMarket',
      marketplaceRiderDescription:
        'Msafirishaji aliyesajiliwa wa JamiiMarket anashughulikia oda.',

      availableWhenConfigured: 'Inapatikana baada ya kusanidiwa',

      deliveryManagement: 'Usimamizi wa Usafirishaji',
      deliveryManagementDescription:
        'Fuatilia hali ya uchukuaji na usafirishaji wa oda zako.',

      searchPlaceholder: 'Tafuta oda au mteja...',

      deliveryMethod: 'Njia ya usafirishaji',
      deliveryStatus: 'Hali ya usafirishaji',

      all: 'Zote',
      customerPickupFilter: 'Mteja Anachukua',
      businessDeliveryFilter: 'Usafirishaji wa Biashara',
      marketplaceRiderFilter: 'Msafirishaji wa JamiiMarket',

      pendingStatus: 'Inasubiri',
      preparing: 'Inaandaliwa',
      ready: 'Iko Tayari',
      assigned: 'Imepangiwa Msafirishaji',
      outForDelivery: 'Iko Njiani',
      deliveredStatus: 'Imefikishwa',
      cancelled: 'Imeghairiwa',

      noDeliveriesYet: 'Bado Hakuna Usafirishaji',
      noDeliveriesFound: 'Hakuna Usafirishaji Uliopatikana',

      noDeliveriesDescription:
        'Taarifa za usafirishaji zitaonekana hapa oda za wateja zitakapohitaji kuchukuliwa au kupelekwa.',

      noDeliveriesFilterDescription:
        'Jaribu kubadilisha utafutaji au vichujio vya usafirishaji.',

      clearFilters: 'Futa Vichujio',

      order: 'Oda',
      customer: 'Mteja',
      method: 'Njia',
      destination: 'Eneo la Kuwasilisha',
      riderHandler: 'Msafirishaji / Mhudumu',
      status: 'Hali',
      action: 'Kitendo',

      viewDelivery: 'Angalia usafirishaji',

      deliveryAlert: 'Usafirishaji',
      customerLabel: 'Mteja',
      methodLabel: 'Njia',
      statusLabel: 'Hali',

      openNotifications: 'Angalia arifa',
    },
  }

  const currentText = text[language] || text.en

  const [deliveries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [methodFilter, setMethodFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const deliveryMethods = [
    {
      value: 'All',
      label: currentText.all,
    },
    {
      value: 'Customer Pickup',
      label: currentText.customerPickupFilter,
    },
    {
      value: 'Business Delivery',
      label: currentText.businessDeliveryFilter,
    },
    {
      value: 'Marketplace Rider',
      label: currentText.marketplaceRiderFilter,
    },
  ]

  const deliveryStatuses = [
    {
      value: 'All',
      label: currentText.all,
    },
    {
      value: 'Pending',
      label: currentText.pendingStatus,
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
      value: 'Assigned',
      label: currentText.assigned,
    },
    {
      value: 'Out for Delivery',
      label: currentText.outForDelivery,
    },
    {
      value: 'Delivered',
      label: currentText.deliveredStatus,
    },
    {
      value: 'Cancelled',
      label: currentText.cancelled,
    },
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
      `${currentText.deliveryAlert} ${delivery.orderNumber}\n\n` +
      `${currentText.customerLabel}: ${delivery.customerName}\n` +
      `${currentText.methodLabel}: ${delivery.method}\n` +
      `${currentText.statusLabel}: ${delivery.status}`
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
                {currentText.delivery}
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                {currentText.description}
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
                  {currentText.totalDeliveries}
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
              {currentText.deliveryRecords}
            </p>

          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  {currentText.pending}
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
              {currentText.awaitingAction}
            </p>

          </div>

          {/* Active */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  {currentText.active}
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
              {currentText.currentlyInProgress}
            </p>

          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  {currentText.delivered}
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
              {currentText.successfullyDelivered}
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
                {currentText.deliveryMethods}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {currentText.deliveryMethodsDescription}
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
                {currentText.customerPickup}
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                {currentText.customerPickupDescription}
              </p>

              <span className="mt-4 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                {currentText.availableWhenConfigured}
              </span>

            </div>

            {/* Business delivery */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#326460] shadow-sm">
                <Truck size={19} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#1B1C1C]">
                {currentText.businessDelivery}
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                {currentText.businessDeliveryDescription}
              </p>

              <span className="mt-4 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                {currentText.availableWhenConfigured}
              </span>

            </div>

            {/* Marketplace rider */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#326460] shadow-sm">
                <Bike size={19} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#1B1C1C]">
                {currentText.marketplaceRider}
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                {currentText.marketplaceRiderDescription}
              </p>

              <span className="mt-4 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                {currentText.availableWhenConfigured}
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
                  {currentText.deliveryManagement}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {currentText.deliveryManagementDescription}
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
                  placeholder={currentText.searchPlaceholder}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#326460] focus:bg-white focus:ring-2 focus:ring-[#326460]/10"
                />

              </div>

            </div>

            {/* Filters */}
            <div className="mt-5 space-y-4">

              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <SlidersHorizontal size={17} />
                {currentText.deliveryMethod}
              </div>

              <div className="flex flex-wrap gap-2">

                {deliveryMethods.map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() =>
                      setMethodFilter(method.value)
                    }
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      methodFilter === method.value
                        ? 'bg-[#326460] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {method.label}
                  </button>
                ))}

              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <PackageCheck size={17} />
                {currentText.deliveryStatus}
              </div>

              <div className="flex flex-wrap gap-2">

                {deliveryStatuses.map((status) => (
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

          {/* Delivery content */}
          {filteredDeliveries.length === 0 ? (

            <div className="px-5 py-14 text-center sm:px-8 sm:py-20">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#326460]/10 text-[#326460]">
                <Truck size={30} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#1B1C1C]">
                {deliveries.length === 0
                  ? currentText.noDeliveriesYet
                  : currentText.noDeliveriesFound}
              </h3>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
                {deliveries.length === 0
                  ? currentText.noDeliveriesDescription
                  : currentText.noDeliveriesFilterDescription}
              </p>

              {deliveries.length > 0 && (
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

              <table className="min-w-[1050px] w-full">

                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.order}
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.customer}
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.method}
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.destination}
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.riderHandler}
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
                            aria-label={`${currentText.viewDelivery} ${delivery.orderNumber}`}
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

