import { useState } from 'react'
import {
  ArrowLeft,
  Bike,
  CheckCircle2,
  Clock3,
  KeyRound,
  MapPin,
  Navigation,
  Package,
  Phone,
  Store,
  Truck,
} from 'lucide-react'
import { Link } from 'react-router-dom'

function ActiveDeliveryPage() {
  const [pin, setPin] = useState('')
  const [message, setMessage] = useState('')

  // The active delivery will come from the backend later.
  const activeDelivery = null

  const handleVerifyPin = (event) => {
    event.preventDefault()

    if (pin.length !== 4) {
      setMessage('Please enter the 4-digit delivery PIN.')
      return
    }

    setMessage(
      'PIN verification will be connected to the backend when delivery services are implemented.'
    )
  }

  if (!activeDelivery) {
    return (
      <div className="space-y-6">

        {/* Page header */}
        <div>
          <p className="text-sm font-medium text-emerald-600">
            Delivery Operations
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Active Delivery
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Manage your current delivery from pickup through successful
            customer handover.
          </p>
        </div>

        {/* Empty state */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex min-h-[420px] flex-col items-center justify-center text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600">
              <Bike size={38} />
            </div>

            <h2 className="mt-6 text-xl font-bold text-slate-900 sm:text-2xl">
              No active delivery
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
              You currently do not have an active delivery. Accept a delivery
              request from the Available Deliveries section to start a
              delivery.
            </p>

            <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/delivery/available"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                <Truck size={18} />
                Find Available Deliveries
              </Link>

              <Link
                to="/delivery/my-deliveries"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Package size={18} />
                My Deliveries
              </Link>
            </div>
          </div>
        </section>

        {/* Delivery workflow */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Delivery Workflow
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your active delivery will follow these steps.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {/* Step 1 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <CheckCircle2 size={20} />
              </div>

              <p className="mt-4 text-sm font-bold text-slate-900">
                1. Accept
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Accept an available delivery request.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Store size={20} />
              </div>

              <p className="mt-4 text-sm font-bold text-slate-900">
                2. Pickup
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Navigate to the business and collect the order.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Navigation size={20} />
              </div>

              <p className="mt-4 text-sm font-bold text-slate-900">
                3. Delivery
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Travel to the customer's delivery location.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <KeyRound size={20} />
              </div>

              <p className="mt-4 text-sm font-bold text-slate-900">
                4. Verify PIN
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Customer provides the 4-digit proof-of-delivery PIN.
              </p>
            </div>

            {/* Step 5 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <CheckCircle2 size={20} />
              </div>

              <p className="mt-4 text-sm font-bold text-slate-900">
                5. Complete
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Confirm successful delivery and finish the order.
              </p>
            </div>

          </div>
        </section>

        {/* Important information */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock3 size={20} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              Live Status
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Delivery status will update as you move through each stage.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <MapPin size={20} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              Location
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Business and customer locations will be provided by the
              delivery system.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <KeyRound size={20} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              Proof of Delivery
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              A 4-digit customer PIN will be required before an order can be
              marked as delivered.
            </p>
          </div>

        </section>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Active delivery header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/delivery/my-deliveries"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
          >
            <ArrowLeft size={17} />
            Back to My Deliveries
          </Link>

          <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Active Delivery
          </h1>
        </div>

        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700">
          <Clock3 size={16} />
          {activeDelivery.status}
        </span>
      </div>

      {/* Delivery details */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Business */}
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Store size={21} />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Pickup From
                </p>

                <p className="font-bold text-slate-900">
                  {activeDelivery.businessName}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-slate-400" />

              <p className="text-sm leading-6 text-slate-600">
                {activeDelivery.businessAddress}
              </p>
            </div>
          </div>

          {/* Customer */}
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <MapPin size={21} />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Deliver To
                </p>

                <p className="font-bold text-slate-900">
                  {activeDelivery.customerName}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-slate-400" />

              <p className="text-sm leading-6 text-slate-600">
                {activeDelivery.customerAddress}
              </p>
            </div>
          </div>

        </div>

        {/* Delivery actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Navigation size={18} />
            Open Navigation
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Phone size={18} />
            Contact Customer
          </button>
        </div>
      </section>

      {/* Proof of delivery */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <KeyRound size={21} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Proof of Delivery
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Ask the customer for their 4-digit PIN and enter it below to
              confirm delivery.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleVerifyPin}
          className="mt-6 max-w-md"
        >
          <label
            htmlFor="delivery-pin"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Customer PIN
          </label>

          <input
            id="delivery-pin"
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(event) => {
              const value = event.target.value.replace(/\D/g, '')
              setPin(value)
              setMessage('')
            }}
            placeholder="Enter 4-digit PIN"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-lg font-bold tracking-[0.4em] text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />

          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <CheckCircle2 size={18} />
            Verify & Complete Delivery
          </button>

          {message && (
            <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-700">
              {message}
            </p>
          )}
        </form>
      </section>

      {/* Order information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Package size={20} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Order Information
            </h2>

            <p className="text-sm text-slate-500">
              Delivery order details
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
              Order Number
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {activeDelivery.orderNumber}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
              Items
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {activeDelivery.itemCount}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
              Distance
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {activeDelivery.distance}
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default ActiveDeliveryPage

