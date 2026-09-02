import { useMemo, useState } from 'react'
import {
  AlertCircle,
  CheckCircle,
  Clock3,
  CreditCard,
  Eye,
  Search,
  XCircle,
} from 'lucide-react'

const initialPayments = []

const paymentStatuses = [
  'pending',
  'paid',
  'failed',
  'refunded',
]

const paymentMethods = [
  'mpesa',
  'airtel_money',
  'tigo_pesa',
  'paystack',
]

const formatStatus = (value) => {
  if (!value) return 'Unknown'

  return value
    .split('_')
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ')
}

const getStatusClasses = (status) => {
  switch (status) {
    case 'paid':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700'

    case 'pending':
      return 'border-amber-200 bg-amber-50 text-amber-700'

    case 'failed':
      return 'border-red-200 bg-red-50 text-red-700'

    case 'refunded':
      return 'border-violet-200 bg-violet-50 text-violet-700'

    default:
      return 'border-slate-200 bg-slate-50 text-slate-700'
  }
}

function AdminPaymentsPage() {
  const [payments, setPayments] = useState(initialPayments)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [editingPayment, setEditingPayment] = useState(null)

  const filteredPayments = useMemo(() => {
    const searchValue = search.trim().toLowerCase()

    return payments.filter((payment) => {
      const matchesSearch =
        !searchValue ||
        payment.transactionId
          ?.toLowerCase()
          .includes(searchValue) ||
        payment.orderId
          ?.toLowerCase()
          .includes(searchValue) ||
        payment.customerName
          ?.toLowerCase()
          .includes(searchValue) ||
        payment.businessName
          ?.toLowerCase()
          .includes(searchValue) ||
        payment.phone
          ?.toLowerCase()
          .includes(searchValue)

      const matchesStatus =
        statusFilter === 'all' ||
        payment.status === statusFilter

      const matchesMethod =
        methodFilter === 'all' ||
        payment.paymentMethod === methodFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod
      )
    })
  }, [
    payments,
    search,
    statusFilter,
    methodFilter,
  ])

  const totalPayments = payments.length

  const pendingPayments = payments.filter(
    (payment) => payment.status === 'pending'
  ).length

  const successfulPayments = payments.filter(
    (payment) => payment.status === 'paid'
  ).length

  const failedPayments = payments.filter(
    (payment) => payment.status === 'failed'
  ).length

  const handleStatusUpdate = (
    paymentId,
    newStatus
  ) => {
    setPayments((currentPayments) =>
      currentPayments.map((payment) =>
        payment.id === paymentId
          ? {
              ...payment,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : payment
      )
    )

    setEditingPayment(null)
  }

  return (
    <section className="space-y-6">
      {/* Page header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
          Marketplace Finance
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Payment Management
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Monitor customer payments, transaction statuses,
          payment methods, refunds, and marketplace payment
          activity.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CreditCard}
          label="Total Payments"
          value={totalPayments}
          description="All payment records"
        />

        <StatCard
          icon={Clock3}
          label="Pending"
          value={pendingPayments}
          description="Awaiting confirmation"
        />

        <StatCard
          icon={CheckCircle}
          label="Successful"
          value={successfulPayments}
          description="Confirmed payments"
        />

        <StatCard
          icon={AlertCircle}
          label="Failed"
          value={failedPayments}
          description="Unsuccessful payments"
        />
      </div>

      {/* Payment management */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Filters */}
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Payment Transactions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search and monitor marketplace payment
                transactions.
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
                    setSearch(event.target.value)
                  }
                  placeholder="Search payments..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-64"
                />
              </div>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >
                <option value="all">
                  All Statuses
                </option>

                {paymentStatuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {formatStatus(status)}
                  </option>
                ))}
              </select>

              {/* Payment method filter */}
              <select
                value={methodFilter}
                onChange={(event) =>
                  setMethodFilter(event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >
                <option value="all">
                  All Methods
                </option>

                {paymentMethods.map((method) => (
                  <option
                    key={method}
                    value={method}
                  >
                    {formatStatus(method)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Payment table */}
        {filteredPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-[1050px] w-full">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Transaction
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Business
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Amount
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
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {payment.transactionId ||
                          'Unknown transaction'}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Order:{' '}
                        {payment.orderId ||
                          'Unavailable'}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {payment.customerName ||
                          'Not available'}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {payment.phone ||
                          'Phone unavailable'}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {payment.businessName ||
                        'Not available'}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                      {payment.amount != null
                        ? `${payment.currency || 'TZS'} ${Number(
                            payment.amount
                          ).toLocaleString()}`
                        : 'Amount unavailable'}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {formatStatus(
                        payment.paymentMethod
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                          payment.status
                        )}`}
                      >
                        {formatStatus(
                          payment.status
                        )}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPayment(
                              payment
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                        >
                          <Eye size={15} />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setEditingPayment(
                              payment
                            )
                          }
                          className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
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
              <CreditCard size={30} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              No payment records
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              There are currently no payment transactions
              available. Real payment records will appear
              here after the backend payment system is
              connected.
            </p>
          </div>
        )}
      </div>

      {/* Payment security notice */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
        <div className="flex gap-3">
          <AlertCircle
            className="mt-0.5 shrink-0 text-amber-600"
            size={20}
          />

          <div>
            <h3 className="font-semibold text-amber-900">
              Payment verification
            </h3>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              Payment status must be confirmed by the
              backend using the relevant payment provider.
              The frontend must never treat a button click
              as proof that money was received. Refunds,
              escrow release, and payment reconciliation will
              also be handled by the backend.
            </p>
          </div>
        </div>
      </div>

      {/* View payment modal */}
      {selectedPayment && (
        <Modal
          title="Payment Details"
          onClose={() =>
            setSelectedPayment(null)
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem
              label="Transaction ID"
              value={
                selectedPayment.transactionId
              }
            />

            <DetailItem
              label="Order ID"
              value={selectedPayment.orderId}
            />

            <DetailItem
              label="Customer"
              value={
                selectedPayment.customerName
              }
            />

            <DetailItem
              label="Business"
              value={
                selectedPayment.businessName
              }
            />

            <DetailItem
              label="Phone"
              value={selectedPayment.phone}
            />

            <DetailItem
              label="Payment Method"
              value={formatStatus(
                selectedPayment.paymentMethod
              )}
            />

            <DetailItem
              label="Amount"
              value={
                selectedPayment.amount != null
                  ? `${selectedPayment.currency || 'TZS'} ${Number(
                      selectedPayment.amount
                    ).toLocaleString()}`
                  : null
              }
            />

            <DetailItem
              label="Status"
              value={formatStatus(
                selectedPayment.status
              )}
            />

            <DetailItem
              label="Provider Reference"
              value={
                selectedPayment.providerReference
              }
            />

            <DetailItem
              label="Created"
              value={selectedPayment.createdAt}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() =>
                setSelectedPayment(null)
              }
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* Update payment modal */}
      {editingPayment && (
        <Modal
          title="Update Payment Status"
          onClose={() =>
            setEditingPayment(null)
          }
        >
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">
              {editingPayment.transactionId ||
                'Payment transaction'}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Select the status received from the payment
              backend/provider.
            </p>
          </div>

          <div className="mt-5 space-y-2">
            {paymentStatuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() =>
                  handleStatusUpdate(
                    editingPayment.id,
                    status
                  )
                }
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  editingPayment.status === status
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50'
                }`}
              >
                <span>
                  {formatStatus(status)}
                </span>

                {editingPayment.status ===
                  status && (
                  <CheckCircle size={18} />
                )}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm leading-6 text-red-800">
              In production, administrators should not
              manually mark a payment as paid unless the
              backend/provider has verified the transaction.
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() =>
                setEditingPayment(null)
              }
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
function StatCard({
  icon: Icon,
  label,
  value,
  description,
}) {
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

export default AdminPaymentsPage

