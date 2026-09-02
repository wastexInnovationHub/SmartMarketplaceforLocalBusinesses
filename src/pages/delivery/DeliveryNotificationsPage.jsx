import { useMemo, useState } from 'react'
import {
  Bell,
  CheckCheck,
  Clock3,
  Info,
  Package,
  Search,
  Settings,
  Truck,
} from 'lucide-react'

function DeliveryNotificationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  // Real notifications will come from the backend and Socket.io later.
  const notifications = []

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const search = searchTerm.trim().toLowerCase()

      const matchesSearch =
        !search ||
        notification.title?.toLowerCase().includes(search) ||
        notification.message?.toLowerCase().includes(search)

      const matchesFilter =
        filter === 'all' ||
        notification.type?.toLowerCase() === filter

      return matchesSearch && matchesFilter
    })
  }, [notifications, searchTerm, filter])

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'payment', label: 'Payment' },
    { value: 'system', label: 'System' },
  ]

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div>
        <p className="text-sm font-medium text-emerald-600">
          Communication Center
        </p>

        <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Notifications
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Stay updated about delivery requests, payments, and important
              account activity.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="inline-flex w-fit cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400"
            title="Available when notifications are connected to the backend"
          >
            <CheckCheck size={18} />
            Mark All as Read
          </button>
        </div>
      </div>

      {/* Notification summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Notifications
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                0
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Bell size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Unread
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                0
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Clock3 size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Read
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                0
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <CheckCheck size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications section */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="border-b border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Notification Center
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest delivery and account notifications.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search notifications..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {filters.map((option) => {
              const active = filter === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Notification list */}
        <div className="p-5 sm:p-6">

          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Bell size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No notifications yet
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Delivery requests, payment updates, and important system
                messages will appear here when they become available.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-4 rounded-2xl border p-4 transition ${
                    notification.read
                      ? 'border-slate-200 bg-white'
                      : 'border-emerald-200 bg-emerald-50/40'
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    {notification.type === 'delivery' && (
                      <Truck size={20} />
                    )}

                    {notification.type === 'payment' && (
                      <Package size={20} />
                    )}

                    {notification.type === 'system' && (
                      <Info size={20} />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="font-semibold text-slate-900">
                        {notification.title}
                      </h3>

                      <span className="shrink-0 text-xs text-slate-400">
                        {notification.time}
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Notification information */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Truck size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Delivery Alerts
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            New delivery requests and important delivery status changes can
            appear here.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Package size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Payment Updates
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Payment verification and payout updates will be delivered through
            the notification system.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Settings size={20} />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            System Messages
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Important account and platform messages will be displayed here.
          </p>
        </div>

      </section>
    </div>
  )
}

export default DeliveryNotificationsPage

