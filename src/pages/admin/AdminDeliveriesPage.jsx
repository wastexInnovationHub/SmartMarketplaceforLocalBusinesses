import { useMemo, useState } from 'react'
import {
Bike,
CheckCircle,
Clock3,
Eye,
MapPin,
PackageCheck,
Search,
Truck,
XCircle,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const initialDeliveries = []

const deliveryStatuses = [
'pending',
'assigned',
'picked_up',
'out_for_delivery',
'delivered',
'cancelled',
]

const deliveryMethods = [
'business_delivery',
'jamii_delivery',
'pickup',
]

function AdminDeliveriesPage() {
const { language } = useLanguage()

const text =
language === 'sw'
? {
marketplaceOperations: 'Uendeshaji wa Soko',
pageTitle: 'Usimamizi wa Usafirishaji',
pageDescription:
'Fuatilia shughuli za usafirishaji, wasafirishaji waliogawiwa, maendeleo ya kuchukua oda, oda za wateja na usafirishaji uliokamilika.',


      totalDeliveries: 'Jumla ya Usafirishaji',
      allDeliveryRecords: 'Rekodi zote za usafirishaji',
      pending: 'Inasubiri',
      waitingForAssignment: 'Inasubiri kugawiwa',
      activeDeliveries: 'Usafirishaji Unaendelea',
      currentlyInProgress: 'Unaendelea kwa sasa',
      delivered: 'Imefikishwa',
      successfullyCompleted: 'Imekamilika kwa mafanikio',

      deliveryOperations: 'Uendeshaji wa Usafirishaji',
      searchAndMonitor:
        'Tafuta na fuatilia kazi za usafirishaji kutoka kwenye soko.',

      searchDeliveries: 'Tafuta usafirishaji...',
      allStatuses: 'Hali Zote',
      allMethods: 'Njia Zote',

      delivery: 'Usafirishaji',
      customer: 'Mteja',
      business: 'Biashara',
      rider: 'Msafirishaji',
      method: 'Njia',
      status: 'Hali',
      actions: 'Vitendo',

      unknownOrder: 'Oda Isiyojulikana',
      addressUnavailable: 'Anwani haipo',
      notAssigned: 'Hajagawiwa',
      unassigned: 'Hajapangiwa',
      view: 'Angalia',
      update: 'Sasisha',

      noDeliveryRecords: 'Hakuna Rekodi za Usafirishaji',
      noDeliveryRecordsDescription:
        'Kwa sasa hakuna rekodi za usafirishaji. Kazi halisi za usafirishaji zitaonekana hapa baada ya mfumo wa usafirishaji wa backend kuunganishwa.',

      deliveryBackendIntegration:
        'Muunganisho wa Backend wa Usafirishaji',
      deliveryBackendDescription:
        'Ugawaji wa usafirishaji, maeneo ya wasafirishaji, uthibitisho wa kuchukua oda, uthibitishaji wa PIN ya Uthibitisho wa Kukabidhi Oda, na masasisho ya hali ya usafirishaji vitaunganishwa na backend baadaye. Ukurasa huu kwa sasa unatumia hali tupu ya frontend na hauundi shughuli za uongo za usafirishaji.',

      deliveryDetails: 'Maelezo ya Usafirishaji',
      order: 'Oda',
      pickupLocation: 'Eneo la Kuchukua',
      deliveryAddress: 'Anwani ya Kuwasilisha',
      proofOfDelivery: 'Uthibitisho wa Kukabidhi Oda',
      verified: 'Imethibitishwa',
      notVerified: 'Haijathibitishwa',
      close: 'Funga',
      closeModal: 'Funga dirisha',

      updateDeliveryStatus:
        'Sasisha Hali ya Usafirishaji',
      selectCurrentStatus:
        'Chagua hali ya sasa ya usafirishaji.',
      cancel: 'Ghairi',

      unknown: 'Haijulikani',
      addressUnavailableShort: 'Anwani haipo',

      pendingStatus: 'Inasubiri',
      assignedStatus: 'Imepangiwa Msafirishaji',
      pickedUpStatus: 'Imechukuliwa',
      outForDeliveryStatus: 'Iko Njiani',
      deliveredStatus: 'Imefikishwa',
      cancelledStatus: 'Imeghairiwa',

      businessDelivery: 'Usafirishaji wa Biashara',
      jamiiDelivery: 'Usafirishaji wa JamiiMarket',
      pickupMethod: 'Kuchukua Mwenyewe',
    }
  : {
      marketplaceOperations: 'Marketplace Operations',
      pageTitle: 'Delivery Management',
      pageDescription:
        'Monitor delivery operations, assigned riders, pickup progress, customer deliveries, and completed delivery jobs.',

      totalDeliveries: 'Total Deliveries',
      allDeliveryRecords: 'All delivery records',
      pending: 'Pending',
      waitingForAssignment: 'Waiting for assignment',
      activeDeliveries: 'Active Deliveries',
      currentlyInProgress: 'Currently in progress',
      delivered: 'Delivered',
      successfullyCompleted: 'Successfully completed',

      deliveryOperations: 'Delivery Operations',
      searchAndMonitor:
        'Search and monitor delivery jobs from the marketplace.',

      searchDeliveries: 'Search deliveries...',
      allStatuses: 'All Statuses',
      allMethods: 'All Methods',

      delivery: 'Delivery',
      customer: 'Customer',
      business: 'Business',
      rider: 'Rider',
      method: 'Method',
      status: 'Status',
      actions: 'Actions',

      unknownOrder: 'Unknown order',
      addressUnavailable: 'Address unavailable',
      notAssigned: 'Not assigned',
      unassigned: 'Unassigned',
      view: 'View',
      update: 'Update',

      noDeliveryRecords: 'No Delivery Records',
      noDeliveryRecordsDescription:
        'There are currently no delivery records available. Real delivery jobs will appear here after the backend delivery system is connected.',

      deliveryBackendIntegration:
        'Delivery Backend Integration',
      deliveryBackendDescription:
        'Delivery assignments, rider locations, pickup confirmation, Proof of Delivery PIN verification, and delivery status updates will be connected to the backend later. This page currently uses empty frontend state and does not invent delivery activity.',

      deliveryDetails: 'Delivery Details',
      order: 'Order',
      pickupLocation: 'Pickup Location',
      deliveryAddress: 'Delivery Address',
      proofOfDelivery: 'Proof of Delivery',
      verified: 'Verified',
      notVerified: 'Not verified',
      close: 'Close',
      closeModal: 'Close modal',

      updateDeliveryStatus:
        'Update Delivery Status',
      selectCurrentStatus:
        'Select the current delivery status.',
      cancel: 'Cancel',

      unknown: 'Unknown',
      addressUnavailableShort: 'Address unavailable',

      pendingStatus: 'Pending',
      assignedStatus: 'Assigned',
      pickedUpStatus: 'Picked Up',
      outForDeliveryStatus: 'Out for Delivery',
      deliveredStatus: 'Delivered',
      cancelledStatus: 'Cancelled',

      businessDelivery: 'Business Delivery',
      jamiiDelivery: 'JamiiMarket Delivery',
      pickupMethod: 'Pickup',
    }


const getStatusLabel = (status) => {
const labels = {
pending: text.pendingStatus,
assigned: text.assignedStatus,
picked_up: text.pickedUpStatus,
out_for_delivery: text.outForDeliveryStatus,
delivered: text.deliveredStatus,
cancelled: text.cancelledStatus,
}


return labels[status] || text.unknown

}

const getMethodLabel = (method) => {
const labels = {
business_delivery: text.businessDelivery,
jamii_delivery: text.jamiiDelivery,
pickup: text.pickupMethod,
}


return labels[method] || text.unknown


}

const getStatusClasses = (status) => {
switch (status) {
case 'pending':
return 'bg-amber-50 text-amber-700 border-amber-200'


  case 'assigned':
    return 'bg-blue-50 text-blue-700 border-blue-200'

  case 'picked_up':
    return 'bg-violet-50 text-violet-700 border-violet-200'

  case 'out_for_delivery':
    return 'bg-indigo-50 text-indigo-700 border-indigo-200'

  case 'delivered':
    return 'bg-emerald-50 text-emerald-700 border-emerald-200'

  case 'cancelled':
    return 'bg-red-50 text-red-700 border-red-200'

  default:
    return 'bg-slate-50 text-slate-700 border-slate-200'
}


}

const [deliveries, setDeliveries] =
useState(initialDeliveries)

const [search, setSearch] =
useState('')

const [statusFilter, setStatusFilter] =
useState('all')

const [methodFilter, setMethodFilter] =
useState('all')

const [selectedDelivery, setSelectedDelivery] =
useState(null)

const [editingDelivery, setEditingDelivery] =
useState(null)

const filteredDeliveries = useMemo(() => {
const searchValue = search.trim().toLowerCase()


return deliveries.filter((delivery) => {
  const matchesSearch =
    !searchValue ||
    delivery.orderId
      ?.toLowerCase()
      .includes(searchValue) ||
    delivery.customerName
      ?.toLowerCase()
      .includes(searchValue) ||
    delivery.riderName
      ?.toLowerCase()
      .includes(searchValue) ||
    delivery.businessName
      ?.toLowerCase()
      .includes(searchValue)

  const matchesStatus =
    statusFilter === 'all' ||
    delivery.status === statusFilter

  const matchesMethod =
    methodFilter === 'all' ||
    delivery.deliveryMethod === methodFilter

  return (
    matchesSearch &&
    matchesStatus &&
    matchesMethod
  )
})


}, [
deliveries,
search,
statusFilter,
methodFilter,
])

const totalDeliveries = deliveries.length

const pendingDeliveries =
deliveries.filter(
(delivery) =>
delivery.status === 'pending'
).length

const activeDeliveries =
deliveries.filter((delivery) =>
[
'assigned',
'picked_up',
'out_for_delivery',
].includes(delivery.status)
).length

const completedDeliveries =
deliveries.filter(
(delivery) =>
delivery.status === 'delivered'
).length

// Update delivery status
const handleStatusUpdate = (
deliveryId,
newStatus
) => {
setDeliveries(
(currentDeliveries) =>
currentDeliveries.map(
(delivery) =>
delivery.id === deliveryId
? {
...delivery,
status: newStatus,
updatedAt:
new Date().toISOString(),
}
: delivery
)
)


setEditingDelivery(null)


}

return ( <section className="space-y-6">
{/* Page header */} <div> <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
{text.marketplaceOperations} </p>


    <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
      {text.pageTitle}
    </h1>

    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
      {text.pageDescription}
    </p>
  </div>

  {/* Statistics */}
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <StatCard
      icon={Truck}
      label={text.totalDeliveries}
      value={totalDeliveries}
      description={text.allDeliveryRecords}
    />

    <StatCard
      icon={Clock3}
      label={text.pending}
      value={pendingDeliveries}
      description={text.waitingForAssignment}
    />

    <StatCard
      icon={Bike}
      label={text.activeDeliveries}
      value={activeDeliveries}
      description={text.currentlyInProgress}
    />

    <StatCard
      icon={CheckCircle}
      label={text.delivered}
      value={completedDeliveries}
      description={text.successfullyCompleted}
    />
  </div>

  {/* Management panel */}
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    {/* Filters */}
    <div className="border-b border-slate-200 p-4 sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {text.deliveryOperations}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {text.searchAndMonitor}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:flex">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder={
                text.searchDeliveries
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-64"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">
              {text.allStatuses}
            </option>

            {deliveryStatuses.map(
              (status) => (
                <option
                  key={status}
                  value={status}
                >
                  {getStatusLabel(status)}
                </option>
              )
            )}
          </select>

          {/* Delivery method filter */}
          <select
            value={methodFilter}
            onChange={(event) =>
              setMethodFilter(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">
              {text.allMethods}
            </option>

            {deliveryMethods.map(
              (method) => (
                <option
                  key={method}
                  value={method}
                >
                  {getMethodLabel(method)}
                </option>
              )
            )}
          </select>
        </div>
      </div>
    </div>

    {/* Delivery table */}
    {filteredDeliveries.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="min-w-[1050px] w-full">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {text.delivery}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {text.customer}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {text.business}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {text.rider}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {text.method}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {text.status}
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                {text.actions}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredDeliveries.map(
              (delivery) => (
                <tr
                  key={delivery.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">
                      {delivery.orderId ||
                        text.unknownOrder}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {delivery.deliveryAddress ||
                        text.addressUnavailable}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {delivery.customerName ||
                      text.notAssigned}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {delivery.businessName ||
                      text.notAssigned}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {delivery.riderName ||
                      text.unassigned}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {getMethodLabel(
                      delivery.deliveryMethod
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                        delivery.status
                      )}`}
                    >
                      {getStatusLabel(
                        delivery.status
                      )}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedDelivery(
                            delivery
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                      >
                        <Eye size={15} />
                        {text.view}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setEditingDelivery(
                            delivery
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                      >
                        {text.update}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <PackageCheck size={30} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-900">
          {text.noDeliveryRecords}
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {text.noDeliveryRecordsDescription}
        </p>
      </div>
    )}
  </div>

  {/* Backend notice */}
  <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
    <div className="flex gap-3">
      <MapPin
        className="mt-0.5 shrink-0 text-indigo-600"
        size={20}
      />

      <div>
        <h3 className="font-semibold text-indigo-900">
          {text.deliveryBackendIntegration}
        </h3>

        <p className="mt-1 text-sm leading-6 text-indigo-800">
          {text.deliveryBackendDescription}
        </p>
      </div>
    </div>
  </div>

  {/* View delivery modal */}
  {selectedDelivery && (
    <Modal
      title={text.deliveryDetails}
      onClose={() =>
        setSelectedDelivery(null)
      }
      closeLabel={text.closeModal}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <DetailItem
          label={text.order}
          value={
            selectedDelivery.orderId
          }
          fallback={text.unknown}
        />

        <DetailItem
          label={text.status}
          value={getStatusLabel(
            selectedDelivery.status
          )}
          fallback={text.unknown}
        />

        <DetailItem
          label={text.customer}
          value={
            selectedDelivery.customerName
          }
          fallback={text.notAssigned}
        />

        <DetailItem
          label={text.rider}
          value={
            selectedDelivery.riderName
          }
          fallback={text.unassigned}
        />

        <DetailItem
          label={text.business}
          value={
            selectedDelivery.businessName
          }
          fallback={text.notAssigned}
        />

        <DetailItem
          label={text.method}
          value={getMethodLabel(
            selectedDelivery.deliveryMethod
          )}
          fallback={text.unknown}
        />

        <DetailItem
          label={text.pickupLocation}
          value={
            selectedDelivery.pickupAddress
          }
          fallback={text.addressUnavailableShort}
        />

        <DetailItem
          label={text.deliveryAddress}
          value={
            selectedDelivery.deliveryAddress
          }
          fallback={text.addressUnavailableShort}
        />

        <DetailItem
          label={text.proofOfDelivery}
          value={
            selectedDelivery.proofOfDelivery
              ? text.verified
              : text.notVerified
          }
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() =>
            setSelectedDelivery(null)
          }
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          {text.close}
        </button>
      </div>
    </Modal>
  )}

  {/* Update delivery modal */}
  {editingDelivery && (
    <Modal
      title={text.updateDeliveryStatus}
      onClose={() =>
        setEditingDelivery(null)
      }
      closeLabel={text.closeModal}
    >
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-900">
          {editingDelivery.orderId ||
            text.delivery}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {text.selectCurrentStatus}
        </p>
      </div>

      <div className="mt-5 space-y-2">
        {deliveryStatuses.map(
          (status) => (
            <button
              key={status}
              type="button"
              onClick={() =>
                handleStatusUpdate(
                  editingDelivery.id,
                  status
                )
              }
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                editingDelivery.status ===
                status
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50'
              }`}
            >
              <span>
                {getStatusLabel(status)}
              </span>

              {editingDelivery.status ===
                status && (
                <CheckCircle size={18} />
              )}
            </button>
          )
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() =>
            setEditingDelivery(null)
          }
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          {text.cancel}
        </button>
      </div>
    </Modal>
  )}
</section>


)
}

// Statistics card
function StatCard({
icon: Icon,
label,
value,
description,
}) {
return ( <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"> <div className="flex items-start justify-between gap-4"> <div> <p className="text-sm font-medium text-slate-500">
{label} </p>


      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>

    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
      <Icon size={22} />
    </div>
  </div>
</div>


)
}

// Reusable detail item
function DetailItem({
label,
value,
fallback,
}) {
return ( <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"> <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
{label} </p>


  <p className="mt-1 text-sm font-medium text-slate-900">
    {value || fallback}
  </p>
</div>


)
}

// Reusable modal
function Modal({
title,
children,
onClose,
closeLabel,
}) {
return ( <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"> <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"> <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4"> <h2 className="text-lg font-bold text-slate-900">
{title} </h2>


      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        aria-label={closeLabel}
      >
        <XCircle size={20} />
      </button>
    </div>

    <div className="p-5">
      {children}
    </div>
  </div>
</div>


)
}

export default AdminDeliveriesPage
