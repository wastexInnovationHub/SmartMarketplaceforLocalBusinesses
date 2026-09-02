import { useState } from 'react'
import {
  CreditCard,
  Search,
  SlidersHorizontal,
  RefreshCw,
  Eye,
  Wallet,
  CheckCircle2,
  Clock3,
  XCircle,
} from 'lucide-react'

function BusinessPaymentsPage() {
  const [payments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [methodFilter, setMethodFilter] = useState('All')

  const filteredPayments = payments.filter((payment) => {
    const search = searchTerm.toLowerCase().trim()

    const matchesSearch =
      !search ||
      payment.paymentReference?.toLowerCase().includes(search) ||
      payment.orderNumber?.toLowerCase().includes(search) ||
      payment.customerName?.toLowerCase().includes(search)

    const matchesStatus =
      statusFilter === 'All' ||
      payment.status === statusFilter

    const matchesMethod =
      methodFilter === 'All' ||
      payment.method === methodFilter

    return matchesSearch && matchesStatus && matchesMethod
  })

  const totalPayments = payments.length

  const successfulPayments = payments.filter(
    (payment) => payment.status === 'Completed'
  ).length

  const pendingPayments = payments.filter(
    (payment) => payment.status === 'Pending'
  ).length

  const failedPayments = payments.filter(
    (payment) => payment.status === 'Failed'
  ).length

  const handleClearFilters = () => {
    setSearchTerm('')
    setStatusFilter('All')
    setMethodFilter('All')
  }

  const handleViewPayment = (payment) => {
    window.alert(
      `Payment Reference: ${payment.paymentReference}\n` +
        `Order: ${payment.orderNumber}\n` +
        `Customer: ${payment.customerName}\n` +
        `Amount: TZS ${payment.amount.toLocaleString()}\n` +
        `Method: ${payment.method}\n` +
        `Status: ${payment.status}`
    )
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#F3FAF8] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#326460] text-white shadow-sm">
              <CreditCard size={22} />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-[#1B1C1C] sm:text-2xl">
                Payments
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                Monitor payments received from your customers
              </p>
            </div>
          </div>
        </div>

        {/* Payment overview */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Payments
                </p>

                <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
                  {totalPayments}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#326460]/10 text-[#326460]">
                <Wallet size={21} />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Recorded payments
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Completed
                </p>

                <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
                  {successfulPayments}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={21} />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Successfully completed
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending
                </p>

                <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
                  {pendingPayments}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <Clock3 size={21} />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Awaiting confirmation
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Failed
                </p>

                <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
                  {failedPayments}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <XCircle size={21} />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Unsuccessful payments
            </p>
          </div>
        </section>

        {/* Payment management */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col gap-4">

              <div>
                <h2 className="text-base font-semibold text-[#1B1C1C] sm:text-lg">
                  Payment Transactions
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  View and monitor customer payment transactions.
                </p>
              </div>

              {/* Search and filters */}
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

                <div className="relative min-w-0 flex-1">
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
                    placeholder="Search payment, order or customer..."
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#326460] focus:bg-white focus:ring-2 focus:ring-[#326460]/10"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                    className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-600 outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>

                  <select
                    value={methodFilter}
                    onChange={(event) =>
                      setMethodFilter(event.target.value)
                    }
                    className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-600 outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10"
                  >
                    <option value="All">All Methods</option>
                    <option value="Mobile Money">
                      Mobile Money
                    </option>
                    <option value="Bank Card">
                      Bank Card
                    </option>
                    <option value="Bank Transfer">
                      Bank Transfer
                    </option>
                    <option value="Cash">
                      Cash
                    </option>
                  </select>

                  <button
                    type="button"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-[#326460]"
                  >
                    <SlidersHorizontal size={17} />
                    Filter
                  </button>

                </div>
              </div>
            </div>
          </div>

          {/* Empty state */}
          {filteredPayments.length === 0 ? (
            <div className="px-5 py-14 text-center sm:px-8 sm:py-20">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#326460]/10 text-[#326460]">
                <CreditCard size={30} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#1B1C1C]">
                {payments.length === 0
                  ? 'No payment transactions yet'
                  : 'No payments found'}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {payments.length === 0
                  ? 'Customer payment transactions will appear here after the payment system is connected.'
                  : 'Try changing your search or filters to find a payment transaction.'}
              </p>

              {payments.length > 0 && (
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

              <table className="min-w-[1000px] w-full">

                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Payment
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Order
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Method
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
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-100 transition last:border-0 hover:bg-gray-50/70"
                    >

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#326460]/10 text-[#326460]">
                            <CreditCard size={18} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-[#1B1C1C]">
                              {payment.paymentReference}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-500">
                              {payment.date}
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-700">
                        {payment.orderNumber}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {payment.customerName}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-[#1B1C1C]">
                        TZS {payment.amount.toLocaleString()}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {payment.method}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            payment.status === 'Completed'
                              ? 'bg-green-50 text-green-700'
                              : payment.status === 'Pending'
                                ? 'bg-yellow-50 text-yellow-700'
                                : payment.status === 'Failed'
                                  ? 'bg-red-50 text-red-700'
                                  : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end">

                          <button
                            type="button"
                            onClick={() =>
                              handleViewPayment(payment)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-[#326460]"
                            aria-label={`View payment ${payment.paymentReference}`}
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

        {/* Payment methods */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex items-start gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#326460]/10 text-[#326460]">
              <Wallet size={21} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#1B1C1C]">
                Supported Payment Methods
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Your payment methods will become active when the
                marketplace payment system is connected.
              </p>
            </div>

          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-[#1B1C1C]">
                Mobile Money
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Mobile money payments
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-[#1B1C1C]">
                Bank Card
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Card-based payments
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-[#1B1C1C]">
                Bank Transfer
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Direct bank payments
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-[#1B1C1C]">
                Cash
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Where cash payment is allowed
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  )
}

export default BusinessPaymentsPage

