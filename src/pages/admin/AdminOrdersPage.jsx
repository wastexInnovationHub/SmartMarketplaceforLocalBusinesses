import { useMemo, useState } from 'react'
import {
  AlertCircle,
  Bike,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Eye,
  MapPin,
  Package,
  Pencil,
  Search,
  Store,
  Trash2,
  User,
  X,
  XCircle,
} from 'lucide-react'

// Empty until real orders are loaded from the backend.
const initialOrders = []

const orderStatuses = [
  'pending',
  'accepted',
  'preparing',
  'ready',
  'out_for_delivery',
  'delivered',
  'cancelled',
]

const paymentStatuses = [
  'pending',
  'paid',
  'failed',
  'refunded',
]

const deliveryMethods = [
  'business_delivery',
  'jamii_delivery',
  'pickup',
]

const emptyEditForm = {
  status: 'pending',
  paymentStatus: 'pending',
}

// Admin Order Management page
function AdminOrdersPage() {
  const [orders, setOrders] = useState(initialOrders)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [deliveryFilter, setDeliveryFilter] = useState('all')

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderToDelete, setOrderToDelete] = useState(null)

  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [editForm, setEditForm] = useState(emptyEditForm)

  // Filter orders using the selected search and filters
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.trim().toLowerCase()

      const matchesSearch =
        !searchValue ||
        String(order.id || '')
          .toLowerCase()
          .includes(searchValue) ||
        order.customerName
          ?.toLowerCase()
          .includes(searchValue) ||
        order.businessName
          ?.toLowerCase()
          .includes(searchValue)

      const matchesStatus =
        statusFilter === 'all' ||
        order.status === statusFilter

      const matchesPayment =
        paymentFilter === 'all' ||
        order.paymentStatus === paymentFilter

      const matchesDelivery =
        deliveryFilter === 'all' ||
        order.deliveryMethod === deliveryFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment &&
        matchesDelivery
      )
    })
  }, [
    orders,
    search,
    statusFilter,
    paymentFilter,
    deliveryFilter,
  ])

  // Open order details
  const openDetailsModal = (order) => {
    setSelectedOrder(order)
    setShowDetailsModal(true)
  }

  // Open order status editor
  const openEditModal = (order) => {
    setSelectedOrder(order)

    setEditForm({
      status: order.status || 'pending',
      paymentStatus:
        order.paymentStatus || 'pending',
    })

    setShowEditModal(true)
  }

  // Open delete/cancel confirmation
  const openDeleteModal = (order) => {
    setOrderToDelete(order)
    setShowDeleteModal(true)
  }

  // Update order fields in the edit form
  const handleEditChange = (event) => {
    const { name, value } = event.target

    setEditForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  // Save order status/payment changes
  const handleEditSubmit = (event) => {
    event.preventDefault()

    if (!selectedOrder) {
      return
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              ...editForm,
            }
          : order,
      ),
    )

    setSelectedOrder((currentOrder) => ({
      ...currentOrder,
      ...editForm,
    }))

    setShowEditModal(false)
  }

  // Cancel an order
  const confirmCancelOrder = () => {
    if (!orderToDelete) {
      return
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderToDelete.id
          ? {
              ...order,
              status: 'cancelled',
            }
          : order,
      ),
    )

    setOrderToDelete(null)
    setShowDeleteModal(false)
  }

  // Order statistics
  const totalOrders = orders.length

  const pendingOrders = orders.filter(
    (order) => order.status === 'pending',
  ).length

  const activeOrders = orders.filter((order) =>
    [
      'accepted',
      'preparing',
      'ready',
      'out_for_delivery',
    ].includes(order.status),
  ).length

  const deliveredOrders = orders.filter(
    (order) => order.status === 'delivered',
  ).length

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600">
          <ClipboardList className="h-4 w-4" />
          Marketplace Management
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Order Management
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          Monitor marketplace orders, payment states, delivery
          methods, and order progress.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={ClipboardList}
          label="Total Orders"
          value={totalOrders}
        />

        <StatCard
          icon={Clock3}
          label="Pending Orders"
          value={pendingOrders}
        />

        <StatCard
          icon={Package}
          label="Active Orders"
          value={activeOrders}
        />

        <StatCard
          icon={CheckCircle2}
          label="Delivered Orders"
          value={deliveredOrders}
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search order, customer, business..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All Order Statuses</option>

            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {formatStatus(status)}
              </option>
            ))}
          </select>

          <select
            value={paymentFilter}
            onChange={(event) =>
              setPaymentFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All Payment Statuses</option>

            {paymentStatuses.map((status) => (
              <option key={status} value={status}>
                {formatStatus(status)}
              </option>
            ))}
          </select>

          <select
            value={deliveryFilter}
            onChange={(event) =>
              setDeliveryFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All Delivery Methods</option>

            {deliveryMethods.map((method) => (
              <option key={method} value={method}>
                {formatDeliveryMethod(method)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Marketplace Orders
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredOrders.length} order
            {filteredOrders.length === 1 ? '' : 's'} shown.
          </p>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
              <ClipboardList className="h-8 w-8 text-indigo-500" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              No orders found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              There are currently no marketplace orders, or no
              orders match your search and filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1200px] w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">Order</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Business</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Payment</th>
                  <th className="px-5 py-4">Delivery</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        #{order.id}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-800">
                        {order.customerName ||
                          'Not provided'}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {order.customerPhone ||
                          'No phone'}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {order.businessName ||
                        'Not provided'}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                      {formatCurrency(order.total)}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge
                        type="payment"
                        value={order.paymentStatus}
                      />
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {formatDeliveryMethod(
                        order.deliveryMethod,
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge
                        type="order"
                        value={order.status}
                      />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <ActionButton
                          title="View order"
                          onClick={() =>
                            openDetailsModal(order)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </ActionButton>

                        <ActionButton
                          title="Edit order"
                          onClick={() =>
                            openEditModal(order)
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </ActionButton>

                        <ActionButton
                          title="Cancel order"
                          onClick={() =>
                            openDeleteModal(order)
                          }
                          danger
                          disabled={
                            order.status === 'cancelled' ||
                            order.status === 'delivered'
                          }
                        >
                          <XCircle className="h-4 w-4" />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order details modal */}
      {showDetailsModal && selectedOrder && (
        <Modal
          title={`Order #${selectedOrder.id}`}
          onClose={() => setShowDetailsModal(false)}
          wide
        >
          <div className="space-y-5">
            {/* Order summary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <SummaryBox
                icon={ClipboardList}
                label="Order Status"
                value={formatStatus(
                  selectedOrder.status,
                )}
              />

              <SummaryBox
                icon={CheckCircle2}
                label="Payment"
                value={formatStatus(
                  selectedOrder.paymentStatus,
                )}
              />

              <SummaryBox
                icon={Package}
                label="Total"
                value={formatCurrency(
                  selectedOrder.total,
                )}
              />
            </div>

            {/* Customer and business */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoSection
                icon={User}
                title="Customer"
              >
                <DetailRow
                  label="Name"
                  value={
                    selectedOrder.customerName ||
                    'Not provided'
                  }
                />

                <DetailRow
                  label="Phone"
                  value={
                    selectedOrder.customerPhone ||
                    'Not provided'
                  }
                />

                <DetailRow
                  label="Address"
                  value={
                    selectedOrder.customerAddress ||
                    'Not provided'
                  }
                />
              </InfoSection>

              <InfoSection
                icon={Store}
                title="Business"
              >
                <DetailRow
                  label="Business"
                  value={
                    selectedOrder.businessName ||
                    'Not provided'
                  }
                />

                <DetailRow
                  label="Phone"
                  value={
                    selectedOrder.businessPhone ||
                    'Not provided'
                  }
                />

                <DetailRow
                  label="Address"
                  value={
                    selectedOrder.businessAddress ||
                    'Not provided'
                  }
                />
              </InfoSection>
            </div>

            {/* Delivery information */}
            <InfoSection
              icon={Bike}
              title="Delivery Information"
            >
              <DetailRow
                label="Method"
                value={formatDeliveryMethod(
                  selectedOrder.deliveryMethod,
                )}
              />

              <DetailRow
                label="Rider"
                value={
                  selectedOrder.riderName ||
                  'Not assigned'
                }
              />

              <DetailRow
                label="Delivery Address"
                value={
                  selectedOrder.deliveryAddress ||
                  selectedOrder.customerAddress ||
                  'Not provided'
                }
              />
            </InfoSection>

            {/* Order items */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Package className="h-4 w-4 text-indigo-600" />

                <h3 className="font-semibold text-slate-900">
                  Order Items
                </h3>
              </div>

              {selectedOrder.items?.length ? (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <div className="divide-y divide-slate-100">
                    {selectedOrder.items.map(
                      (item, index) => (
                        <div
                          key={
                            item.id ||
                            `${item.name}-${index}`
                          }
                          className="flex items-center justify-between gap-4 p-4"
                        >
                          <div>
                            <p className="font-medium text-slate-800">
                              {item.name ||
                                'Unnamed item'}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Quantity: {item.quantity || 0}
                            </p>
                          </div>

                          <p className="font-semibold text-slate-800">
                            {formatCurrency(item.total)}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
                  No order item details available.
                </div>
              )}
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock3 className="h-4 w-4" />
              Created:{' '}
              {formatDate(selectedOrder.createdAt)}
            </div>
          </div>
        </Modal>
      )}

      {/* Edit order modal */}
      {showEditModal && selectedOrder && (
        <Modal
          title={`Edit Order #${selectedOrder.id}`}
          onClose={() => setShowEditModal(false)}
        >
          <form
            onSubmit={handleEditSubmit}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Order Status
              </label>

              <select
                name="status"
                value={editForm.status}
                onChange={handleEditChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Payment Status
              </label>

              <select
                name="paymentStatus"
                value={editForm.paymentStatus}
                onChange={handleEditChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                {paymentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                <p className="text-sm leading-6 text-amber-800">
                  In the production version, order status and
                  payment status must be validated by the
                  backend. The admin interface should not
                  independently mark an order as paid.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Cancel order confirmation */}
      {showDeleteModal && orderToDelete && (
        <Modal
          title="Cancel Order"
          onClose={() => setShowDeleteModal(false)}
        >
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <XCircle className="h-7 w-7 text-red-600" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Cancel order #{orderToDelete.id}?
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              This will change the order status to
              <span className="font-semibold text-red-600">
                {' '}
                Cancelled
              </span>
              .
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() =>
                  setShowDeleteModal(false)
                }
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Keep Order
              </button>

              <button
                type="button"
                onClick={confirmCancelOrder}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// Statistics card
function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

// Summary box
function SummaryBox({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
        <Icon className="h-4 w-4" />
        {label}
      </div>

      <p className="mt-2 text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  )
}

// Information section
function InfoSection({
  icon: Icon,
  title,
  children,
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-indigo-600" />

        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}

// Detail row
function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-medium text-slate-800 sm:text-right">
        {value}
      </span>
    </div>
  )
}

// Status badge
function StatusBadge({ type, value }) {
  if (!value) {
    return (
      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
        Not available
      </span>
    )
  }

  let className =
    'bg-slate-100 text-slate-600'

  if (type === 'order') {
    if (value === 'delivered') {
      className = 'bg-emerald-50 text-emerald-700'
    } else if (value === 'cancelled') {
      className = 'bg-red-50 text-red-700'
    } else if (value === 'out_for_delivery') {
      className = 'bg-blue-50 text-blue-700'
    } else if (value === 'preparing') {
      className = 'bg-amber-50 text-amber-700'
    } else if (value === 'ready') {
      className = 'bg-purple-50 text-purple-700'
    } else {
      className = 'bg-slate-100 text-slate-700'
    }
  }

  if (type === 'payment') {
    if (value === 'paid') {
      className = 'bg-emerald-50 text-emerald-700'
    } else if (value === 'failed') {
      className = 'bg-red-50 text-red-700'
    } else if (value === 'refunded') {
      className = 'bg-purple-50 text-purple-700'
    } else {
      className = 'bg-amber-50 text-amber-700'
    }
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}
    >
      {formatStatus(value)}
    </span>
  )
}

// Reusable action button
function ActionButton({
  children,
  title,
  onClick,
  danger = false,
  disabled = false,
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
        disabled
          ? 'cursor-not-allowed border-slate-100 text-slate-300'
          : danger
            ? 'border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600'
            : 'border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
      }`}
    >
      {children}
    </button>
  )
}

// Reusable modal
function Modal({
  title,
  children,
  onClose,
  wide = false,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
      <div
        className={`max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white shadow-2xl ${
          wide ? 'max-w-4xl' : 'max-w-xl'
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  )
}

// Format an order status for display
function formatStatus(value) {
  if (!value) {
    return 'Not provided'
  }

  return value
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    )
}

// Format delivery method for display
function formatDeliveryMethod(value) {
  if (!value) {
    return 'Not provided'
  }

  const labels = {
    business_delivery: 'Business Delivery',
    jamii_delivery: 'JamiiMarket Delivery',
    pickup: 'Pickup',
  }

  return labels[value] || formatStatus(value)
}

// Format currency
function formatCurrency(value) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return 'Not provided'
  }

  const number = Number(value)

  if (Number.isNaN(number)) {
    return String(value)
  }

  return `TSh ${number.toLocaleString()}`
}

// Format order date
function formatDate(value) {
  if (!value) {
    return 'Date not available'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Date not available'
  }

  return date.toLocaleString()
}

export default AdminOrdersPage

