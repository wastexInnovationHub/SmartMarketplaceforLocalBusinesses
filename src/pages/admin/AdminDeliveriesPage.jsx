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

const formatStatus = (status) => {
  if (!status) return 'Unknown'

  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
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

function AdminDeliveriesPage() {
  const [deliveries, setDeliveries] = useState(initialDeliveries)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [selectedDelivery, setSelectedDelivery] = useState(null)
  const [editingDelivery, setEditingDelivery] = useState(null)

  const filteredDeliveries = useMemo(() => {
    const searchValue = search.trim().toLowerCase()

    return deliveries.filter((delivery) => {
      const matchesSearch =
        !searchValue ||
        delivery.orderId?.toLowerCase().includes(searchValue) ||
        delivery.customerName?.toLowerCase().includes(searchValue) ||
        delivery.riderName?.toLowerCase().includes(searchValue) ||
        delivery.businessName?.toLowerCase().includes(searchValue)

      const matchesStatus =
        statusFilter === 'all' ||
        delivery.status === statusFilter

      const matchesMethod =
        methodFilter === 'all' ||
        delivery.deliveryMethod === methodFilter

      return matchesSearch && matchesStatus && matchesMethod
    })
  }, [deliveries, search, statusFilter, methodFilter])

  const totalDeliveries = deliveries.length

  const pendingDeliveries = deliveries.filter(
    (delivery) => delivery.status === 'pending'
  ).length

  const activeDeliveries = deliveries.filter(
    (delivery) =>
      ['assigned', 'picked_up', 'out_for_delivery'].includes(
        delivery.status
      )
  ).length

  const completedDeliveries = deliveries.filter(
    (delivery) => delivery.status === 'delivered'
  ).length

  // Update a delivery status
  const handleStatusUpdate = (deliveryId, newStatus) => {
    setDeliveries((currentDeliveries) =>
      currentDeliveries.map((delivery) =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : delivery
      )
    )

    setEditingDelivery(null)
  }

  return (
    <section className="space-y-6">
      {/* Page header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
          Marketplace Operations
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Delivery Management
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Monitor delivery operations, assigned riders, pickup progress,
          customer deliveries, and completed delivery jobs.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Truck}
          label="Total Deliveries"
          value={totalDeliveries}
          description="All delivery records"
        />

        <StatCard
          icon={Clock3}
          label="Pending"
          value={pendingDeliveries}
          description="Waiting for assignment"
        />

        <StatCard
          icon={Bike}
          label="Active Deliveries"
          value={activeDeliveries}
          description="Currently in progress"
        />

        <StatCard
          icon={CheckCircle}
          label="Delivered"
          value={completedDeliveries}
          description="Successfully completed"
        />
      </div>

      {/* Management panel */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Filters */}
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Delivery Operations
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search and monitor delivery jobs from the marketplace.
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
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search deliveries..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-64"
                />
              </div>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >
                <option value="all">All Statuses</option>

                {deliveryStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>

              {/* Delivery method filter */}
              <select
                value={methodFilter}
                onChange={(event) => setMethodFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >
                <option value="all">All Methods</option>

                {deliveryMethods.map((method) => (
                  <option key={method} value={method}>
                    {formatStatus(method)}
                  </option>
                ))}
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
                    Delivery
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Business
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Rider
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Method
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredDeliveries.map((delivery) => (
                  <tr
                    key={delivery.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {delivery.orderId || 'Unknown order'}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {delivery.deliveryAddress || 'Address unavailable'}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {delivery.customerName || 'Not assigned'}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {delivery.businessName || 'Not assigned'}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {delivery.riderName || 'Unassigned'}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {formatStatus(delivery.deliveryMethod)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                          delivery.status
                        )}`}
                      >
                        {formatStatus(delivery.status)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedDelivery(delivery)}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                        >
                          <Eye size={15} />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingDelivery(delivery)}
                          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <PackageCheck size={30} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              No delivery records
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              There are currently no delivery records available. Real
              delivery jobs will appear here after the backend delivery
              system is connected.
            </p>
          </div>
        )}
      </div>

      {/* Backend notice */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
        <div className="flex gap-3">
          <MapPin className="mt-0.5 shrink-0 text-indigo-600" size={20} />

          <div>
            <h3 className="font-semibold text-indigo-900">
              Delivery backend integration
            </h3>

            <p className="mt-1 text-sm leading-6 text-indigo-800">
              Delivery assignments, rider locations, pickup confirmation,
              Proof of Delivery PIN verification, and delivery status
              updates will be connected to the backend later. This page
              currently uses empty frontend state and does not invent
              delivery activity.
            </p>
          </div>
        </div>
      </div>

      {/* View delivery modal */}
      {selectedDelivery && (
        <Modal
          title="Delivery Details"
          onClose={() => setSelectedDelivery(null)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem
              label="Order"
              value={selectedDelivery.orderId}
            />

            <DetailItem
              label="Status"
              value={formatStatus(selectedDelivery.status)}
            />

            <DetailItem
              label="Customer"
              value={selectedDelivery.customerName}
            />

            <DetailItem
              label="Rider"
              value={selectedDelivery.riderName || 'Unassigned'}
            />

            <DetailItem
              label="Business"
              value={selectedDelivery.businessName}
            />

            <DetailItem
              label="Method"
              value={formatStatus(selectedDelivery.deliveryMethod)}
            />

            <DetailItem
              label="Pickup Location"
              value={selectedDelivery.pickupAddress}
            />

            <DetailItem
              label="Delivery Address"
              value={selectedDelivery.deliveryAddress}
            />

            <DetailItem
              label="Proof of Delivery"
              value={
                selectedDelivery.proofOfDelivery
                  ? 'Verified'
                  : 'Not verified'
              }
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setSelectedDelivery(null)}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* Update delivery modal */}
      {editingDelivery && (
        <Modal
          title="Update Delivery Status"
          onClose={() => setEditingDelivery(null)}
        >
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">
              {editingDelivery.orderId || 'Delivery'}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Select the current delivery status.
            </p>
          </div>

          <div className="mt-5 space-y-2">
            {deliveryStatuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() =>
                  handleStatusUpdate(editingDelivery.id, status)
                }
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  editingDelivery.status === status
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50'
                }`}
              >
                <span>{formatStatus(status)}</span>

                {editingDelivery.status === status && (
                  <CheckCircle size={18} />
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setEditingDelivery(null)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </section>
  )
}

// Statistics card
function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

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
function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-900">
        {value || 'Not available'}
      </p>
    </div>
  )
}

// Reusable modal
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
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

