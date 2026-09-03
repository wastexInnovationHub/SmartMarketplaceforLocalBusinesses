import { useState } from 'react'
import {
  Bell,
  CheckCheck,
  Trash2,
  RefreshCw,
  Package,
  CreditCard,
  Truck,
  User,
  Info,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

function BusinessNotificationsPage() {
  const { language } = useLanguage()

  const text = {
    en: {
      notifications: 'Notifications',
      description: 'Stay updated about your business activity',
      markAllAsRead: 'Mark All as Read',

      yourNotifications: 'Your Notifications',
      notificationsDescription:
        'Order, payment, delivery, and account updates will appear here.',
      clearAll: 'Clear All',

      all: 'All',
      order: 'Order',
      payment: 'Payment',
      delivery: 'Delivery',
      account: 'Account',

      noNotificationsYet: 'No notifications yet',
      noNotificationsFound: 'No notifications found',

      noNotificationsDescription:
        'New orders, payment updates, delivery updates, and important account activity will appear here.',

      noMatchingNotifications:
        'There are no notifications matching the selected category.',

      showAllNotifications: 'Show All Notifications',

      markNotificationAsRead: 'Mark notification as read',
      markAsRead: 'Mark as read',
      deleteNotification: 'Delete notification',

      notificationCenter: 'Notification Center',
      notificationCenterDescription:
        'This notification center is ready to receive real marketplace events. Once the backend is connected, notifications can be generated from orders, payments, deliveries, and account activity.',

      confirmClearAll:
        'Are you sure you want to clear all notifications?',
    },

    sw: {
      notifications: 'Arifa',
      description: 'Pata taarifa kuhusu shughuli za biashara yako',
      markAllAsRead: 'Weka Zote Kuwa Zimesomwa',

      yourNotifications: 'Arifa Zako',
      notificationsDescription:
        'Masasisho ya oda, malipo, usafirishaji, na akaunti yataonekana hapa.',
      clearAll: 'Futa Zote',

      all: 'Zote',
      order: 'Oda',
      payment: 'Malipo',
      delivery: 'Usafirishaji',
      account: 'Akaunti',

      noNotificationsYet: 'Bado Hakuna Arifa',
      noNotificationsFound: 'Hakuna Arifa Zilizopatikana',

      noNotificationsDescription:
        'Oda mpya, masasisho ya malipo, masasisho ya usafirishaji, na shughuli muhimu za akaunti zitaonekana hapa.',

      noMatchingNotifications:
        'Hakuna arifa zinazolingana na aina uliyochagua.',

      showAllNotifications: 'Onyesha Arifa Zote',

      markNotificationAsRead: 'Weka arifa kuwa imesomwa',
      markAsRead: 'Weka kuwa imesomwa',
      deleteNotification: 'Futa arifa',

      notificationCenter: 'Kituo cha Arifa',
      notificationCenterDescription:
        'Kituo hiki cha arifa kiko tayari kupokea matukio halisi ya JamiiMarket. Backend itakapounganishwa, arifa zitatengenezwa kutokana na oda, malipo, usafirishaji, na shughuli za akaunti.',

      confirmClearAll:
        'Una uhakika unataka kufuta arifa zote?',
    },
  }

  const currentText = text[language] || text.en

  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('All')

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length

  const filteredNotifications =
    filter === 'All'
      ? notifications
      : notifications.filter(
          (notification) => notification.type === filter
        )

  const notificationFilters = [
    {
      value: 'All',
      label: currentText.all,
    },
    {
      value: 'Order',
      label: currentText.order,
    },
    {
      value: 'Payment',
      label: currentText.payment,
    },
    {
      value: 'Delivery',
      label: currentText.delivery,
    },
    {
      value: 'Account',
      label: currentText.account,
    },
  ]

  const handleMarkAllAsRead = () => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    )
  }

  const handleMarkAsRead = (notificationId) => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const handleDelete = (notificationId) => {
    setNotifications((previousNotifications) =>
      previousNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    )
  }

  const handleClearAll = () => {
    const confirmed = window.confirm(
      currentText.confirmClearAll
    )

    if (!confirmed) {
      return
    }

    setNotifications([])
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'Order':
        return Package

      case 'Payment':
        return CreditCard

      case 'Delivery':
        return Truck

      case 'Account':
        return User

      default:
        return Info
    }
  }

  const getNotificationIconStyle = (type) => {
    switch (type) {
      case 'Order':
        return 'bg-blue-50 text-blue-600'

      case 'Payment':
        return 'bg-green-50 text-green-600'

      case 'Delivery':
        return 'bg-orange-50 text-orange-600'

      case 'Account':
        return 'bg-purple-50 text-purple-600'

      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#F3FAF8] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-3">

            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#326460] text-white shadow-sm">

              <Bell size={22} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}

            </div>

            <div className="min-w-0">

              <h1 className="truncate text-xl font-bold text-[#1B1C1C] sm:text-2xl">
                {currentText.notifications}
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                {currentText.description}
              </p>

            </div>

          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-[#326460] sm:w-auto"
            >
              <CheckCheck size={18} />
              {currentText.markAllAsRead}
            </button>
          )}

        </div>

        {/* Notification controls */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

            <div>

              <h2 className="text-base font-semibold text-[#1B1C1C] sm:text-lg">
                {currentText.yourNotifications}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {currentText.notificationsDescription}
              </p>

            </div>

            {notifications.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={17} />
                {currentText.clearAll}
              </button>
            )}

          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto border-b border-gray-100 p-4">

            {notificationFilters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  filter === item.value
                    ? 'bg-[#326460] text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}

          </div>

          {/* Empty state / notifications */}
          {filteredNotifications.length === 0 ? (

            <div className="px-5 py-14 text-center sm:px-8 sm:py-20">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#326460]/10 text-[#326460]">
                <Bell size={30} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#1B1C1C]">
                {notifications.length === 0
                  ? currentText.noNotificationsYet
                  : currentText.noNotificationsFound}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {notifications.length === 0
                  ? currentText.noNotificationsDescription
                  : currentText.noMatchingNotifications}
              </p>

              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={() => setFilter('All')}
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  <RefreshCw size={17} />
                  {currentText.showAllNotifications}
                </button>
              )}

            </div>

          ) : (

            <div className="divide-y divide-gray-100">

              {filteredNotifications.map((notification) => {

                const Icon = getNotificationIcon(
                  notification.type
                )

                return (
                  <div
                    key={notification.id}
                    className={`flex gap-4 p-4 transition sm:p-5 ${
                      notification.read
                        ? 'bg-white'
                        : 'bg-[#F3FAF8]/60'
                    }`}
                  >

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getNotificationIconStyle(
                        notification.type
                      )}`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                          <div className="flex items-center gap-2">

                            <h3 className="text-sm font-semibold text-[#1B1C1C]">
                              {notification.title}
                            </h3>

                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-[#326460]" />
                            )}

                          </div>

                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            {notification.message}
                          </p>

                          <p className="mt-2 text-xs text-gray-400">
                            {notification.time}
                          </p>

                        </div>

                        <div className="flex shrink-0 items-center gap-1">

                          {!notification.read && (
                            <button
                              type="button"
                              onClick={() =>
                                handleMarkAsRead(
                                  notification.id
                                )
                              }
                              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#326460]"
                              aria-label={
                                currentText.markNotificationAsRead
                              }
                              title={currentText.markAsRead}
                            >
                              <CheckCheck size={17} />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(notification.id)
                            }
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                            aria-label={
                              currentText.deleteNotification
                            }
                            title={currentText.deleteNotification}
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                )
              })}

            </div>
          )}

        </section>

        {/* Notification information */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#326460]/10 text-[#326460]">
              <Info size={20} />
            </div>

            <div>

              <h2 className="text-base font-semibold text-[#1B1C1C]">
                {currentText.notificationCenter}
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                {currentText.notificationCenterDescription}
              </p>

            </div>

          </div>

        </section>

      </div>

    </div>
  )
}

export default BusinessNotificationsPage

