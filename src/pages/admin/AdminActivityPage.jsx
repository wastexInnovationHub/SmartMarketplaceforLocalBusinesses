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

const formatValue = (value) => {
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

function AdminActivityPage() {
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
          Security & Monitoring
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Activity Logs
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Monitor important administrator and marketplace
          events for security, accountability, and system
          auditing.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Activity}
          label="Total Activities"
          value={totalActivities}
          description="Recorded system events"
        />

        <StatCard
          icon={CheckCircle}
          label="Successful"
          value={successfulActivities}
          description="Completed successfully"
        />

        <StatCard
          icon={AlertCircle}
          label="Warnings"
          value={warningActivities}
          description="Events requiring attention"
        />

        <StatCard
          icon={XCircle}
          label="Failed"
          value={failedActivities}
          description="Unsuccessful events"
        />
      </div>

      {/* Activity log panel */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Filters */}
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                System Activity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review recorded actions and system events.
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
                  placeholder="Search activity..."
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
                  All Activity Types
                </option>

                {activityTypes.map((type) => (
                  <option key={type} value={type}>
                    {formatValue(type)}
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
                  All Statuses
                </option>

                {activityStatuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {formatValue(status)}
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
                    Event
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actor
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Time
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
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
                                'Unknown action'}
                            </p>

                            <p className="mt-1 max-w-md text-xs text-slate-500">
                              {activity.description ||
                                'No description available'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {activity.actorName ||
                            'System'}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {activity.actorEmail ||
                            'Email unavailable'}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                          {formatValue(
                            activity.type
                          )}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                            activity.status
                          )}`}
                        >
                          {formatValue(
                            activity.status
                          )}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {activity.createdAt ||
                          'Time unavailable'}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedActivity(
                              activity
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                        >
                          <Eye size={15} />
                          View
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
              No activity recorded
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              There are currently no activity records
              available. Real audit events will appear here
              after the backend logging system is connected.
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
              Backend audit logging
            </h3>

            <p className="mt-1 text-sm leading-6 text-indigo-800">
              Login events, administrator actions, user
              changes, business changes, order updates,
              delivery events, payment events, and security
              events should be recorded by the backend with
              accurate timestamps and actor information.
              Frontend activity must not be treated as a
              trusted audit trail.
            </p>
          </div>
        </div>
      </div>

      {/* View activity modal */}
      {selectedActivity && (
        <Modal
          title="Activity Details"
          onClose={() =>
            setSelectedActivity(null)
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem
              label="Action"
              value={selectedActivity.action}
            />

            <DetailItem
              label="Type"
              value={formatValue(
                selectedActivity.type
              )}
            />

            <DetailItem
              label="Actor"
              value={
                selectedActivity.actorName
              }
            />

            <DetailItem
              label="Actor Email"
              value={
                selectedActivity.actorEmail
              }
            />

            <DetailItem
              label="Status"
              value={formatValue(
                selectedActivity.status
              )}
            />

            <DetailItem
              label="Target"
              value={selectedActivity.target}
            />

            <DetailItem
              label="IP Address"
              value={selectedActivity.ipAddress}
            />

            <DetailItem
              label="Timestamp"
              value={selectedActivity.createdAt}
            />
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Description
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-700">
              {selectedActivity.description ||
                'No description available'}
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
              Close
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
function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-slate-900">
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

