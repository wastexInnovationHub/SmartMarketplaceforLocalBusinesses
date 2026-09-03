import { useMemo, useState } from 'react'
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Eye,
  FileText,
  Search,
  ShieldCheck,
  UserCog,
  X,
  XCircle,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const initialActivities = []

const activityTypes = [
  'login',
  'user',
  'business',
  'product',
  'order',
  'delivery',
  'payment',
  'admin',
  'system',
]

const activityStatuses = [
  'success',
  'warning',
  'failed',
]

function AdminActivityPage() {
  const { language } = useLanguage()

  const text =
    language === 'sw'
      ? {
          pageSection: 'Usalama na Ufuatiliaji',
          pageTitle: 'Kumbukumbu za Shughuli',
          pageDescription:
            'Fuatilia matukio muhimu ya wasimamizi na soko kwa ajili ya usalama, uwajibikaji na ukaguzi wa mfumo.',

          totalActivities: 'Jumla ya Shughuli',
          recordedEvents: 'Matukio ya mfumo yaliyorekodiwa',

          successful: 'Zilizofanikiwa',
          completedSuccessfully: 'Zilizokamilika kwa mafanikio',

          warnings: 'Tahadhari',
          requiringAttention: 'Matukio yanayohitaji umakini',

          failed: 'Zilizoshindikana',
          unsuccessfulEvents: 'Matukio ambayo hayakufanikiwa',

          systemActivity: 'Shughuli za Mfumo',
          reviewActions:
            'Kagua hatua zilizorekodiwa na matukio ya mfumo.',

          searchActivity: 'Tafuta shughuli...',
          allActivityTypes: 'Aina Zote za Shughuli',
          allStatuses: 'Hali Zote',

          event: 'Tukio',
          actor: 'Aliyefanya',
          type: 'Aina',
          status: 'Hali',
          time: 'Muda',
          action: 'Kitendo',

          unknownAction: 'Kitendo hakijulikani',
          noDescription: 'Hakuna maelezo yaliyopo',
          system: 'Mfumo',
          emailUnavailable: 'Barua pepe haipo',
          timeUnavailable: 'Muda haupo',
          view: 'Angalia',

          noActivityRecorded: 'Hakuna Shughuli Zilizorekodiwa',
          noActivityDescription:
            'Kwa sasa hakuna kumbukumbu za shughuli. Matukio halisi ya ukaguzi yataonekana hapa baada ya mfumo wa backend wa kuhifadhi kumbukumbu kuunganishwa.',

          backendAuditLogging: 'Kumbukumbu za Ukaguzi za Backend',
          backendAuditDescription:
            'Matukio ya kuingia, hatua za wasimamizi, mabadiliko ya watumiaji na biashara, masasisho ya oda, matukio ya usafirishaji, malipo na usalama yanapaswa kurekodiwa na backend pamoja na muda sahihi na taarifa za aliyefanya kitendo. Shughuli za frontend hazipaswi kuchukuliwa kama kumbukumbu salama ya ukaguzi.',

          activityDetails: 'Maelezo ya Shughuli',
          actionLabel: 'Kitendo',
          typeLabel: 'Aina',
          actorLabel: 'Aliyefanya',
          actorEmail: 'Barua Pepe ya Aliyefanya',
          statusLabel: 'Hali',
          target: 'Lengo',
          ipAddress: 'Anwani ya IP',
          timestamp: 'Muda wa Tukio',
          notAvailable: 'Haipo',
          description: 'Maelezo',
          close: 'Funga',
          closeModal: 'Funga dirisha',

          login: 'Kuingia',
          user: 'Mtumiaji',
          business: 'Biashara',
          product: 'Bidhaa',
          order: 'Oda',
          delivery: 'Usafirishaji',
          payment: 'Malipo',
          admin: 'Admin',
          systemType: 'Mfumo',

          success: 'Imefanikiwa',
          warning: 'Tahadhari',
          failedStatus: 'Imeshindikana',
        }
      : {
          pageSection: 'Security & Monitoring',
          pageTitle: 'Activity Logs',
          pageDescription:
            'Monitor important administrator and marketplace events for security, accountability, and system auditing.',

          totalActivities: 'Total Activities',
          recordedEvents: 'Recorded system events',

          successful: 'Successful',
          completedSuccessfully: 'Completed successfully',

          warnings: 'Warnings',
          requiringAttention: 'Events requiring attention',

          failed: 'Failed',
          unsuccessfulEvents: 'Unsuccessful events',

          systemActivity: 'System Activity',
          reviewActions:
            'Review recorded actions and system events.',

          searchActivity: 'Search activity...',
          allActivityTypes: 'All Activity Types',
          allStatuses: 'All Statuses',

          event: 'Event',
          actor: 'Actor',
          type: 'Type',
          status: 'Status',
          time: 'Time',
          action: 'Action',

          unknownAction: 'Unknown action',
          noDescription: 'No description available',
          system: 'System',
          emailUnavailable: 'Email unavailable',
          timeUnavailable: 'Time unavailable',
          view: 'View',

          noActivityRecorded: 'No activity recorded',
          noActivityDescription:
            'There are currently no activity records available. Real audit events will appear here after the backend logging system is connected.',

          backendAuditLogging: 'Backend audit logging',
          backendAuditDescription:
            'Login events, administrator actions, user changes, business changes, order updates, delivery events, payment events, and security events should be recorded by the backend with accurate timestamps and actor information. Frontend activity must not be treated as a trusted audit trail.',

          activityDetails: 'Activity Details',
          actionLabel: 'Action',
          typeLabel: 'Type',
          actorLabel: 'Actor',
          actorEmail: 'Actor Email',
          statusLabel: 'Status',
          target: 'Target',
          ipAddress: 'IP Address',
          timestamp: 'Timestamp',
          notAvailable: 'Not available',
          description: 'Description',
          close: 'Close',
          closeModal: 'Close modal',

          login: 'Login',
          user: 'User',
          business: 'Business',
          product: 'Product',
          order: 'Order',
          delivery: 'Delivery',
          payment: 'Payment',
          admin: 'Admin',
          systemType: 'System',

          success: 'Success',
          warning: 'Warning',
          failedStatus: 'Failed',
        }

  const getTypeLabel = (type) => {
    const labels = {
      login: text.login,
      user: text.user,
      business: text.business,
      product: text.product,
      order: text.order,
      delivery: text.delivery,
      payment: text.payment,
      admin: text.admin,
      system: text.systemType,
    }

    return labels[type] || text.systemType
  }

  const getStatusLabel = (status) => {
    const labels = {
      success: text.success,
      warning: text.warning,
      failed: text.failedStatus,
    }

    return labels[status] || status
  }

  const getStatusClasses = (status) => {
    switch (status) {
      case 'success':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700'

      case 'warning':
        return 'border-amber-200 bg-amber-50 text-amber-700'

      case 'failed':
        return 'border-red-200 bg-red-50 text-red-700'

      default:
        return 'border-slate-200 bg-slate-50 text-slate-700'
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'login':
        return ShieldCheck

      case 'user':
        return UserCog

      case 'business':
        return FileText

      case 'product':
        return FileText

      case 'order':
        return Activity

      case 'delivery':
        return Activity

      case 'payment':
        return Activity

      case 'admin':
        return ShieldCheck

      default:
        return Activity
    }
  }

  const [activities] = useState(initialActivities)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedActivity, setSelectedActivity] = useState(null)

  const filteredActivities = useMemo(() => {
    const searchValue = search.trim().toLowerCase()

    return activities.filter((activity) => {
      const matchesSearch =
        !searchValue ||
        activity.action
          ?.toLowerCase()
          .includes(searchValue) ||
        activity.actorName
          ?.toLowerCase()
          .includes(searchValue) ||
        activity.actorEmail
          ?.toLowerCase()
          .includes(searchValue) ||
        activity.description
          ?.toLowerCase()
          .includes(searchValue) ||
        activity.target
          ?.toLowerCase()
          .includes(searchValue)

      const matchesType =
        typeFilter === 'all' ||
        activity.type === typeFilter

      const matchesStatus =
        statusFilter === 'all' ||
        activity.status === statusFilter

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      )
    })
  }, [
    activities,
    search,
    typeFilter,
    statusFilter,
  ])

  const totalActivities = activities.length

  const successfulActivities = activities.filter(
    (activity) => activity.status === 'success'
  ).length

  const warningActivities = activities.filter(
    (activity) => activity.status === 'warning'
  ).length

  const failedActivities = activities.filter(
    (activity) => activity.status === 'failed'
  ).length

  return (
    <section className="space-y-6">
      {/* Page header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
          {text.pageSection}
        </p>

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
          icon={Activity}
          label={text.totalActivities}
          value={totalActivities}
          description={text.recordedEvents}
        />

        <StatCard
          icon={CheckCircle}
          label={text.successful}
          value={successfulActivities}
          description={text.completedSuccessfully}
        />

        <StatCard
          icon={AlertCircle}
          label={text.warnings}
          value={warningActivities}
          description={text.requiringAttention}
        />

        <StatCard
          icon={XCircle}
          label={text.failed}
          value={failedActivities}
          description={text.unsuccessfulEvents}
        />
      </div>

      {/* Activity log panel */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Filters */}
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {text.systemActivity}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {text.reviewActions}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
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
                  placeholder={text.searchActivity}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Activity type */}
              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >
                <option value="all">
                  {text.allActivityTypes}
                </option>

                {activityTypes.map((type) => (
                  <option key={type} value={type}>
                    {getTypeLabel(type)}
                  </option>
                ))}
              </select>

              {/* Activity status */}
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >
                <option value="all">
                  {text.allStatuses}
                </option>

                {activityStatuses.map((status) => (
                  <option key={status} value={status}>
                    {getStatusLabel(status)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Activity table */}
        {filteredActivities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-[1050px] w-full">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {text.event}
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {text.actor}
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {text.type}
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {text.status}
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {text.time}
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {text.action}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredActivities.map((activity) => {
                  const ActivityIcon =
                    getActivityIcon(activity.type)

                  return (
                    <tr
                      key={activity.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <ActivityIcon size={18} />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {activity.action ||
                                text.unknownAction}
                            </p>

                            <p className="mt-1 max-w-md text-xs text-slate-500">
                              {activity.description ||
                                text.noDescription}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {activity.actorName ||
                            text.system}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {activity.actorEmail ||
                            text.emailUnavailable}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                          {getTypeLabel(activity.type)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                            activity.status
                          )}`}
                        >
                          {getStatusLabel(activity.status)}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {activity.createdAt ||
                          text.timeUnavailable}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedActivity(activity)
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                        >
                          <Eye size={15} />
                          {text.view}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Activity size={30} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              {text.noActivityRecorded}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {text.noActivityDescription}
            </p>
          </div>
        )}
      </div>

      {/* Audit log notice */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
        <div className="flex gap-3">
          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-indigo-600"
          />

          <div>
            <h3 className="font-semibold text-indigo-900">
              {text.backendAuditLogging}
            </h3>

            <p className="mt-1 text-sm leading-6 text-indigo-800">
              {text.backendAuditDescription}
            </p>
          </div>
        </div>
      </div>

      {/* View activity modal */}
      {selectedActivity && (
        <Modal
          title={text.activityDetails}
          onClose={() =>
            setSelectedActivity(null)
          }
          closeLabel={text.closeModal}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem
              label={text.actionLabel}
              value={selectedActivity.action}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.typeLabel}
              value={getTypeLabel(
                selectedActivity.type
              )}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.actorLabel}
              value={selectedActivity.actorName}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.actorEmail}
              value={selectedActivity.actorEmail}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.statusLabel}
              value={getStatusLabel(
                selectedActivity.status
              )}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.target}
              value={selectedActivity.target}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.ipAddress}
              value={selectedActivity.ipAddress}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.timestamp}
              value={selectedActivity.createdAt}
              fallback={text.notAvailable}
            />
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {text.description}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-700">
              {selectedActivity.description ||
                text.noDescription}
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() =>
                setSelectedActivity(null)
              }
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              {text.close}
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

// Detail item
function DetailItem({
  label,
  value,
  fallback,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-slate-900">
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
            aria-label={closeLabel}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminActivityPage

