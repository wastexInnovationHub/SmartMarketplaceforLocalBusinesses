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
import { useLanguage } from '../../i18n/LanguageContext'

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
const { language } = useLanguage()

const text = {
en: {
marketplaceFinance: 'Marketplace Finance',
paymentManagement: 'Payment Management',
headerDescription:
'Monitor customer payments, transaction statuses, payment methods, refunds, and marketplace payment activity.',


  totalPayments: 'Total Payments',
  allPaymentRecords: 'All payment records',
  pending: 'Pending',
  awaitingConfirmation: 'Awaiting confirmation',
  successful: 'Successful',
  confirmedPayments: 'Confirmed payments',
  failed: 'Failed',
  unsuccessfulPayments: 'Unsuccessful payments',

  paymentTransactions: 'Payment Transactions',
  transactionsDescription:
    'Search and monitor marketplace payment transactions.',
  searchPayments: 'Search payments...',
  allStatuses: 'All Statuses',
  allMethods: 'All Methods',

  transaction: 'Transaction',
  customer: 'Customer',
  business: 'Business',
  amount: 'Amount',
  method: 'Method',
  status: 'Status',
  actions: 'Actions',

  unknownTransaction: 'Unknown transaction',
  order: 'Order',
  unavailable: 'Unavailable',
  notAvailable: 'Not available',
  phoneUnavailable: 'Phone unavailable',
  amountUnavailable: 'Amount unavailable',

  view: 'View',
  update: 'Update',

  noPaymentRecords: 'No payment records',
  noPaymentRecordsDescription:
    'There are currently no payment transactions available. Real payment records will appear here after the backend payment system is connected.',

  paymentVerification: 'Payment Verification',
  paymentVerificationDescription:
    'Payment status must be confirmed by the backend using the relevant payment provider. The frontend must never treat a button click as proof that money was received. Refunds, escrow release, and payment reconciliation will also be handled by the backend.',

  paymentDetails: 'Payment Details',
  transactionId: 'Transaction ID',
  orderId: 'Order ID',
  paymentMethod: 'Payment Method',
  providerReference: 'Provider Reference',
  created: 'Created',
  close: 'Close',

  updatePaymentStatus: 'Update Payment Status',
  paymentTransaction: 'Payment transaction',
  updatePaymentDescription:
    'Select the status received from the payment backend/provider.',
  productionPaymentWarning:
    'In production, administrators should not manually mark a payment as paid unless the backend/provider has verified the transaction.',
  cancel: 'Cancel',

  unknown: 'Unknown',
},

sw: {
  marketplaceFinance: 'Fedha za Soko',
  paymentManagement: 'Usimamizi wa Malipo',
  headerDescription:
    'Fuatilia malipo ya wateja, hali za miamala, njia za malipo, marejesho ya fedha, na shughuli za malipo za soko.',

  totalPayments: 'Jumla ya Malipo',
  allPaymentRecords: 'Rekodi zote za malipo',
  pending: 'Inasubiri',
  awaitingConfirmation: 'Inasubiri uthibitisho',
  successful: 'Yamefanikiwa',
  confirmedPayments: 'Malipo yaliyothibitishwa',
  failed: 'Yameshindikana',
  unsuccessfulPayments: 'Malipo ambayo hayakufanikiwa',

  paymentTransactions: 'Miamala ya Malipo',
  transactionsDescription:
    'Tafuta na fuatilia miamala ya malipo ya soko.',
  searchPayments: 'Tafuta malipo...',
  allStatuses: 'Hali Zote',
  allMethods: 'Njia Zote',

  transaction: 'Muamala',
  customer: 'Mteja',
  business: 'Biashara',
  amount: 'Kiasi',
  method: 'Njia',
  status: 'Hali',
  actions: 'Vitendo',

  unknownTransaction: 'Muamala usiojulikana',
  order: 'Oda',
  unavailable: 'Haipatikani',
  notAvailable: 'Haipatikani',
  phoneUnavailable: 'Namba ya simu haipatikani',
  amountUnavailable: 'Kiasi hakipatikani',

  view: 'Angalia',
  update: 'Sasisha',

  noPaymentRecords: 'Hakuna Rekodi za Malipo',
  noPaymentRecordsDescription:
    'Kwa sasa hakuna miamala ya malipo inayopatikana. Rekodi halisi za malipo zitaonekana hapa baada ya mfumo wa malipo wa backend kuunganishwa.',

  paymentVerification: 'Uthibitishaji wa Malipo',
  paymentVerificationDescription:
    'Hali ya malipo lazima ithibitishwe na backend kupitia mtoa huduma husika wa malipo. Frontend haipaswi kamwe kuchukulia kubonyeza kitufe kama uthibitisho kwamba fedha zimepokelewa. Marejesho ya fedha, kuachiliwa kwa fedha za escrow, na upatanishaji wa malipo pia vitasimamiwa na backend.',

  paymentDetails: 'Maelezo ya Malipo',
  transactionId: 'Kitambulisho cha Muamala',
  orderId: 'Kitambulisho cha Oda',
  paymentMethod: 'Njia ya Malipo',
  providerReference: 'Rejea ya Mtoa Huduma',
  created: 'Imeundwa',
  close: 'Funga',

  updatePaymentStatus: 'Sasisha Hali ya Malipo',
  paymentTransaction: 'Muamala wa malipo',
  updatePaymentDescription:
    'Chagua hali iliyopokelewa kutoka kwa backend au mtoa huduma wa malipo.',
  productionPaymentWarning:
    'Katika mfumo halisi, wasimamizi hawapaswi kuweka malipo kuwa yamelipwa kwa mikono isipokuwa backend au mtoa huduma athibitishe muamala.',
  cancel: 'Ghairi',

  unknown: 'Haijulikani',
},


}

const currentText = language === 'sw' ? text.sw : text.en

const statusLabels = {
en: {
pending: 'Pending',
paid: 'Paid',
failed: 'Failed',
refunded: 'Refunded',
},
sw: {
pending: 'Inasubiri',
paid: 'Imelipwa',
failed: 'Imeshindikana',
refunded: 'Imerejeshwa',
},
}

const methodLabels = {
en: {
mpesa: 'M-Pesa',
airtel_money: 'Airtel Money',
tigo_pesa: 'Tigo Pesa',
paystack: 'Paystack',
},
sw: {
mpesa: 'M-Pesa',
airtel_money: 'Airtel Money',
tigo_pesa: 'Tigo Pesa',
paystack: 'Paystack',
},
}

const formatStatus = (value) => {
if (!value) {
return currentText.unknown
}


return (
  statusLabels[language]?.[value] ||
  methodLabels[language]?.[value] ||
  value
    .split('_')
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(' ')
)


}

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
(payment) => payment.status === 'pending',
).length

const successfulPayments = payments.filter(
(payment) => payment.status === 'paid',
).length

const failedPayments = payments.filter(
(payment) => payment.status === 'failed',
).length

const handleStatusUpdate = (
paymentId,
newStatus,
) => {
setPayments((currentPayments) =>
currentPayments.map((payment) =>
payment.id === paymentId
? {
...payment,
status: newStatus,
updatedAt: new Date().toISOString(),
}
: payment,
),
)


setEditingPayment(null)


}

return ( <section className="space-y-6">
{/* Page header */} <div> <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
{currentText.marketplaceFinance} </p>


    <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
      {currentText.paymentManagement}
    </h1>

    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
      {currentText.headerDescription}
    </p>
  </div>

  {/* Statistics */}
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <StatCard
      icon={CreditCard}
      label={currentText.totalPayments}
      value={totalPayments}
      description={currentText.allPaymentRecords}
    />

    <StatCard
      icon={Clock3}
      label={currentText.pending}
      value={pendingPayments}
      description={currentText.awaitingConfirmation}
    />

    <StatCard
      icon={CheckCircle}
      label={currentText.successful}
      value={successfulPayments}
      description={currentText.confirmedPayments}
    />

    <StatCard
      icon={AlertCircle}
      label={currentText.failed}
      value={failedPayments}
      description={currentText.unsuccessfulPayments}
    />
  </div>

  {/* Payment management */}
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    {/* Filters */}
    <div className="border-b border-slate-200 p-4 sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {currentText.paymentTransactions}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {currentText.transactionsDescription}
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
              placeholder={currentText.searchPayments}
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
              {currentText.allStatuses}
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
              {currentText.allMethods}
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
                {currentText.transaction}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {currentText.customer}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {currentText.business}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {currentText.amount}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {currentText.method}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {currentText.status}
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                {currentText.actions}
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
                      currentText.unknownTransaction}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {currentText.order}:{' '}
                    {payment.orderId ||
                      currentText.unavailable}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-slate-700">
                    {payment.customerName ||
                      currentText.notAvailable}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {payment.phone ||
                      currentText.phoneUnavailable}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  {payment.businessName ||
                    currentText.notAvailable}
                </td>

                <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                  {payment.amount != null
                    ? `${payment.currency || 'TZS'} ${Number(
                        payment.amount,
                      ).toLocaleString()}`
                    : currentText.amountUnavailable}
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  {formatStatus(
                    payment.paymentMethod,
                  )}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                      payment.status,
                    )}`}
                  >
                    {formatStatus(
                      payment.status,
                    )}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPayment(payment)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      <Eye size={15} />
                      {currentText.view}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setEditingPayment(payment)
                      }
                      className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                    >
                      {currentText.update}
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
          {currentText.noPaymentRecords}
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {currentText.noPaymentRecordsDescription}
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
          {currentText.paymentVerification}
        </h3>

        <p className="mt-1 text-sm leading-6 text-amber-800">
          {currentText.paymentVerificationDescription}
        </p>
      </div>
    </div>
  </div>

  {/* View payment modal */}
  {selectedPayment && (
    <Modal
      title={currentText.paymentDetails}
      onClose={() =>
        setSelectedPayment(null)
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <DetailItem
          label={currentText.transactionId}
          value={
            selectedPayment.transactionId
          }
          unavailableText={currentText.notAvailable}
        />

        <DetailItem
          label={currentText.orderId}
          value={selectedPayment.orderId}
          unavailableText={currentText.notAvailable}
        />

        <DetailItem
          label={currentText.customer}
          value={
            selectedPayment.customerName
          }
          unavailableText={currentText.notAvailable}
        />

        <DetailItem
          label={currentText.business}
          value={
            selectedPayment.businessName
          }
          unavailableText={currentText.notAvailable}
        />

        <DetailItem
          label={currentText.phoneUnavailable}
          value={selectedPayment.phone}
          unavailableText={currentText.notAvailable}
        />

        <DetailItem
          label={currentText.paymentMethod}
          value={formatStatus(
            selectedPayment.paymentMethod,
          )}
          unavailableText={currentText.notAvailable}
        />

        <DetailItem
          label={currentText.amount}
          value={
            selectedPayment.amount != null
              ? `${selectedPayment.currency || 'TZS'} ${Number(
                  selectedPayment.amount,
                ).toLocaleString()}`
              : null
          }
          unavailableText={currentText.notAvailable}
        />

        <DetailItem
          label={currentText.status}
          value={formatStatus(
            selectedPayment.status,
          )}
          unavailableText={currentText.notAvailable}
        />

        <DetailItem
          label={currentText.providerReference}
          value={
            selectedPayment.providerReference
          }
          unavailableText={currentText.notAvailable}
        />

        <DetailItem
          label={currentText.created}
          value={selectedPayment.createdAt}
          unavailableText={currentText.notAvailable}
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
          {currentText.close}
        </button>
      </div>
    </Modal>
  )}

  {/* Update payment modal */}
  {editingPayment && (
    <Modal
      title={currentText.updatePaymentStatus}
      onClose={() =>
        setEditingPayment(null)
      }
    >
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-900">
          {editingPayment.transactionId ||
            currentText.paymentTransaction}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {currentText.updatePaymentDescription}
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
                status,
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
          {currentText.productionPaymentWarning}
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
          {currentText.cancel}
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
unavailableText,
}) {
return ( <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"> <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
{label} </p>


  <p className="mt-1 text-sm font-medium text-slate-900">
    {value || unavailableText}
  </p>
</div>


)
}

// Reusable modal
function Modal({ title, children, onClose }) {
return ( <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"> <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"> <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4"> <h2 className="text-lg font-bold text-slate-900">
{title} </h2>


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
