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
import { useLanguage } from '../../i18n/LanguageContext'

function BusinessPaymentsPage() {
  const { language } = useLanguage()

  const text = {
    en: {
      payments: 'Payments',
      description: 'Monitor payments received from your customers',

      totalPayments: 'Total Payments',
      recordedPayments: 'Recorded payments',

      completed: 'Completed',
      successfullyCompleted: 'Successfully completed',

      pending: 'Pending',
      awaitingConfirmation: 'Awaiting confirmation',

      failed: 'Failed',
      unsuccessfulPayments: 'Unsuccessful payments',

      paymentTransactions: 'Payment Transactions',
      paymentTransactionsDescription:
        'View and monitor customer payment transactions.',

      searchPayments: 'Search payment, order or customer...',

      allStatuses: 'All Statuses',
      allMethods: 'All Methods',

      completedStatus: 'Completed',
      pendingStatus: 'Pending',
      failedStatus: 'Failed',
      refundedStatus: 'Refunded',

      mobileMoney: 'Mobile Money',
      bankCard: 'Bank Card',
      bankTransfer: 'Bank Transfer',
      cash: 'Cash',

      filter: 'Filter',

      noPaymentTransactionsYet:
        'No payment transactions yet',

      noPaymentsFound: 'No payments found',

      noPaymentsDescription:
        'Customer payment transactions will appear here after the payment system is connected.',

      noPaymentsFilterDescription:
        'Try changing your search or filters to find a payment transaction.',

      clearFilters: 'Clear Filters',

      payment: 'Payment',
      order: 'Order',
      customer: 'Customer',
      amount: 'Amount',
      method: 'Method',
      status: 'Status',
      action: 'Action',

      viewPayment: 'View payment',

      paymentReference: 'Payment Reference',
      customerLabel: 'Customer',
      amountLabel: 'Amount',
      methodLabel: 'Method',
      statusLabel: 'Status',

      supportedPaymentMethods: 'Supported Payment Methods',

      supportedPaymentMethodsDescription:
        'Your payment methods will become active when the marketplace payment system is connected.',

      mobileMoneyDescription: 'Mobile money payments',
      bankCardDescription: 'Card-based payments',
      bankTransferDescription: 'Direct bank payments',
      cashDescription: 'Where cash payment is allowed',
    },

    sw: {
      payments: 'Malipo',
      description: 'Fuatilia malipo yaliyopokelewa kutoka kwa wateja wako',

      totalPayments: 'Jumla ya Malipo',
      recordedPayments: 'Malipo yaliyorekodiwa',

      completed: 'Imekamilika',
      successfullyCompleted: 'Yaliyokamilika kwa mafanikio',

      pending: 'Inasubiri',
      awaitingConfirmation: 'Inasubiri uthibitisho',

      failed: 'Yameshindikana',
      unsuccessfulPayments: 'Malipo ambayo hayakufanikiwa',

      paymentTransactions: 'Miamala ya Malipo',
      paymentTransactionsDescription:
        'Angalia na fuatilia miamala ya malipo ya wateja.',

      searchPayments: 'Tafuta malipo, oda au mteja...',

      allStatuses: 'Hali Zote',
      allMethods: 'Njia Zote',

      completedStatus: 'Imekamilika',
      pendingStatus: 'Inasubiri',
      failedStatus: 'Imeshindikana',
      refundedStatus: 'Imerejeshwa',

      mobileMoney: 'Pesa za Simu',
      bankCard: 'Kadi ya Benki',
      bankTransfer: 'Uhamisho wa Benki',
      cash: 'Fedha Taslimu',

      filter: 'Chuja',

      noPaymentTransactionsYet:
        'Bado Hakuna Miamala ya Malipo',

      noPaymentsFound: 'Hakuna Malipo Yaliyopatikana',

      noPaymentsDescription:
        'Miamala ya malipo ya wateja itaonekana hapa baada ya mfumo wa malipo kuunganishwa.',

      noPaymentsFilterDescription:
        'Jaribu kubadilisha utafutaji au vichujio ili kupata muamala wa malipo.',

      clearFilters: 'Futa Vichujio',

      payment: 'Malipo',
      order: 'Oda',
      customer: 'Mteja',
      amount: 'Kiasi',
      method: 'Njia',
      status: 'Hali',
      action: 'Kitendo',

      viewPayment: 'Angalia malipo',

      paymentReference: 'Rejea ya Malipo',
      customerLabel: 'Mteja',
      amountLabel: 'Kiasi',
      methodLabel: 'Njia',
      statusLabel: 'Hali',

      supportedPaymentMethods: 'Njia za Malipo Zinazotumika',

      supportedPaymentMethodsDescription:
        'Njia za malipo zitaanza kufanya kazi mfumo wa malipo wa JamiiMarket utakapounganishwa.',

      mobileMoneyDescription: 'Malipo kwa pesa za simu',
      bankCardDescription: 'Malipo kwa kadi',
      bankTransferDescription: 'Malipo ya moja kwa moja kupitia benki',
      cashDescription: 'Mahali ambapo malipo ya fedha taslimu yanaruhusiwa',
    },
  }

  const currentText = text[language] || text.en

  const [payments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [methodFilter, setMethodFilter] = useState('All')

  const statusOptions = [
    {
      value: 'All',
      label: currentText.allStatuses,
    },
    {
      value: 'Completed',
      label: currentText.completedStatus,
    },
    {
      value: 'Pending',
      label: currentText.pendingStatus,
    },
    {
      value: 'Failed',
      label: currentText.failedStatus,
    },
    {
      value: 'Refunded',
      label: currentText.refundedStatus,
    },
  ]

  const methodOptions = [
    {
      value: 'All',
      label: currentText.allMethods,
    },
    {
      value: 'Mobile Money',
      label: currentText.mobileMoney,
    },
    {
      value: 'Bank Card',
      label: currentText.bankCard,
    },
    {
      value: 'Bank Transfer',
      label: currentText.bankTransfer,
    },
    {
      value: 'Cash',
      label: currentText.cash,
    },
  ]

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

  const getStatusLabel = (status) => {
    const matchingStatus = statusOptions.find(
      (option) => option.value === status
    )

    return matchingStatus?.label || status
  }

  const getMethodLabel = (method) => {
    const matchingMethod = methodOptions.find(
      (option) => option.value === method
    )

    return matchingMethod?.label || method
  }

  const handleViewPayment = (payment) => {
    window.alert(
      `${currentText.paymentReference}: ${payment.paymentReference}\n` +
        `${currentText.order}: ${payment.orderNumber}\n` +
        `${currentText.customerLabel}: ${payment.customerName}\n` +
        `${currentText.amountLabel}: TZS ${payment.amount.toLocaleString()}\n` +
        `${currentText.methodLabel}: ${getMethodLabel(payment.method)}\n` +
        `${currentText.statusLabel}: ${getStatusLabel(payment.status)}`
    )
  }

  const getStatusStyle = (status) => {
    if (status === 'Completed') {
      return 'bg-green-50 text-green-700'
    }

    if (status === 'Pending') {
      return 'bg-yellow-50 text-yellow-700'
    }

    if (status === 'Failed') {
      return 'bg-red-50 text-red-700'
    }

    return 'bg-gray-100 text-gray-700'
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
                {currentText.payments}
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                {currentText.description}
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
                  {currentText.totalPayments}
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
              {currentText.recordedPayments}
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  {currentText.completed}
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
              {currentText.successfullyCompleted}
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  {currentText.pending}
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
              {currentText.awaitingConfirmation}
            </p>

          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  {currentText.failed}
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
              {currentText.unsuccessfulPayments}
            </p>

          </div>

        </section>

        {/* Payment management */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 p-4 sm:p-5 lg:p-6">

            <div className="flex flex-col gap-4">

              <div>

                <h2 className="text-base font-semibold text-[#1B1C1C] sm:text-lg">
                  {currentText.paymentTransactions}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {currentText.paymentTransactionsDescription}
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
                    placeholder={currentText.searchPayments}
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
                    {statusOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={methodFilter}
                    onChange={(event) =>
                      setMethodFilter(event.target.value)
                    }
                    className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-600 outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10"
                  >
                    {methodOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-[#326460]"
                  >
                    <SlidersHorizontal size={17} />
                    {currentText.filter}
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
                  ? currentText.noPaymentTransactionsYet
                  : currentText.noPaymentsFound}

              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">

                {payments.length === 0
                  ? currentText.noPaymentsDescription
                  : currentText.noPaymentsFilterDescription}

              </p>

              {payments.length > 0 && (
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

              <table className="min-w-[1000px] w-full">

                <thead>

                  <tr className="border-b border-gray-200 bg-gray-50 text-left">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.payment}
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.order}
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.customer}
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.amount}
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {currentText.method}
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
                        {getMethodLabel(payment.method)}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            payment.status
                          )}`}
                        >
                          {getStatusLabel(payment.status)}
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
                            aria-label={`${currentText.viewPayment} ${payment.paymentReference}`}
                            title={currentText.viewPayment}
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
                {currentText.supportedPaymentMethods}
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                {currentText.supportedPaymentMethodsDescription}
              </p>

            </div>

          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

              <p className="text-sm font-semibold text-[#1B1C1C]">
                {currentText.mobileMoney}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {currentText.mobileMoneyDescription}
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

              <p className="text-sm font-semibold text-[#1B1C1C]">
                {currentText.bankCard}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {currentText.bankCardDescription}
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

              <p className="text-sm font-semibold text-[#1B1C1C]">
                {currentText.bankTransfer}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {currentText.bankTransferDescription}
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

              <p className="text-sm font-semibold text-[#1B1C1C]">
                {currentText.cash}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {currentText.cashDescription}
              </p>

            </div>

          </div>

        </section>

      </div>

    </div>
  )
}

export default BusinessPaymentsPage

