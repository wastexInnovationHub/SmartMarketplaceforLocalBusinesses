import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock3,
  Search,
  ShoppingBag,
  Heart,
  Package,
  Wrench,
  Store,
  AlertCircle,
  X,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

function CustomerBusinessStorefrontPage() {
  const { businessId } = useParams()

  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('all')

  /*
   * Real business information will come from the backend.
   *
   * Do not add fake business information here.
   *
   * Expected future business structure:
   *
   * {
   *   id,
   *   name,
   *   category,
   *   description,
   *   bannerImage,
   *   logoImage,
   *   address,
   *   phone,
   *   email,
   *   openingHours,
   *   deliveryAvailable,
   *   pickupAvailable,
   *   isOpen
   * }
   */
  const business = null

  /*
   * Real products and services will come from the backend
   * for the selected business.
   *
   * Expected future item structure:
   *
   * {
   *   id,
   *   businessId,
   *   name,
   *   description,
   *   category,
   *   itemType: 'product' | 'service',
   *   unit,
   *   pricingType,
   *   price,
   *   stock,
   *   lowStockThreshold,
   *   status,
   *   isActive,
   *   image
   * }
   */
  const items = []

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()

    return items.filter((item) => {
      const matchesType =
        activeType === 'all' ||
        item.itemType === activeType

      const matchesSearch =
        !query ||
        item.name?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query)

      return matchesType && matchesSearch
    })
  }, [items, search, activeType])

  const clearSearch = () => {
    setSearch('')
  }

  /*
   * The storefront cannot display a business until the real
   * backend business data is available.
   */
  if (!business) {
    return (
      <div className="mx-auto w-full max-w-7xl space-y-6">

        {/* Back navigation */}
        <Link
          to="/customer/businesses"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#326460] transition hover:text-[#A03F28]"
        >
          <ArrowLeft size={17} />
          Back to Businesses
        </Link>

        {/* Business unavailable state */}
        <section className="overflow-hidden rounded-3xl border border-[#E4D4CF] bg-white shadow-sm">

          <div className="relative px-6 py-16 text-center sm:px-10 sm:py-20">

            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF4F0]" />

            <div className="relative">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF0EC] text-[#A03F28]">
                <Store size={36} />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-[#326460]">
                Business Storefront
              </p>

              <h1 className="mt-2 text-2xl font-bold text-[#1B1C1C] sm:text-3xl">
                Business information is not available yet
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#695D46] sm:text-base">
                This storefront is ready for real business data, but no
                business information is currently available for this page.
                Business details and products will appear here when the
                marketplace is connected to the backend.
              </p>

              <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-[#FCF9F8] px-5 py-4 text-left">

                <div className="flex gap-3">

                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E9F3F1] text-[#326460]">
                    <AlertCircle size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#1B1C1C]">
                      Real marketplace data only
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#8A726C]">
                      No sample business, products, services, prices,
                      address, phone number, opening hours, or delivery
                      information has been added.
                    </p>
                  </div>

                </div>

              </div>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">

                <Link
                  to="/customer/businesses"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A03F28] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#812914] active:scale-[0.98]"
                >
                  <Store size={18} />
                  Browse Businesses
                </Link>

                <Link
                  to="/customer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDC0BA] bg-white px-5 py-3 text-sm font-semibold text-[#56423D] transition hover:border-[#326460] hover:text-[#326460]"
                >
                  Back to Dashboard
                </Link>

              </div>

            </div>

          </div>

        </section>

      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">

      {/* Back navigation */}
      <Link
        to="/customer/businesses"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#326460] transition hover:text-[#A03F28]"
      >
        <ArrowLeft size={17} />
        Back to Businesses
      </Link>

      {/* Business header */}
      <section className="overflow-hidden rounded-3xl border border-[#E4D4CF] bg-white shadow-sm">

        {/* Business banner */}
        <div className="relative h-48 bg-[#F2EDEA] sm:h-64">

          {business.bannerImage ? (
            <img
              src={business.bannerImage}
              alt={`${business.name} banner`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Store
                size={54}
                className="text-[#C8B7B1]"
              />
            </div>
          )}

          <button
            type="button"
            aria-label="Save business"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#A03F28] shadow-sm backdrop-blur transition hover:bg-white"
          >
            <Heart size={20} />
          </button>

        </div>

        {/* Business information */}
        <div className="p-6 sm:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            <div className="flex gap-4">

              <div className="-mt-16 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-[#FFF0EC] text-[#A03F28] shadow-sm">
                {business.logoImage ? (
                  <img
                    src={business.logoImage}
                    alt={`${business.name} logo`}
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <Store size={30} />
                )}
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#326460]">
                  {business.category}
                </p>

                <h1 className="mt-1 text-2xl font-bold text-[#1B1C1C] sm:text-3xl">
                  {business.name}
                </h1>

                {business.description && (
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#695D46]">
                    {business.description}
                  </p>
                )}
              </div>

            </div>

            <span
              className={`w-fit rounded-full px-4 py-2 text-xs font-bold ${
                business.isOpen
                  ? 'bg-[#E9F3F1] text-[#326460]'
                  : 'bg-[#FFF0EC] text-[#A03F28]'
              }`}
            >
              {business.isOpen ? 'Open now' : 'Closed'}
            </span>

          </div>

          {/* Business contact details */}
          <div className="mt-7 grid gap-3 border-t border-[#EEE7E4] pt-6 sm:grid-cols-2 lg:grid-cols-4">

            {business.address && (
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#A03F28]"
                />
                <div>
                  <p className="text-xs font-bold text-[#1B1C1C]">
                    Address
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#8A726C]">
                    {business.address}
                  </p>
                </div>
              </div>
            )}

            {business.phone && (
              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-[#A03F28]"
                />
                <div>
                  <p className="text-xs font-bold text-[#1B1C1C]">
                    Phone
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#8A726C]">
                    {business.phone}
                  </p>
                </div>
              </div>
            )}

            {business.email && (
              <div className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-[#A03F28]"
                />
                <div>
                  <p className="text-xs font-bold text-[#1B1C1C]">
                    Email
                  </p>
                  <p className="mt-1 break-all text-xs leading-5 text-[#8A726C]">
                    {business.email}
                  </p>
                </div>
              </div>
            )}

            {business.openingHours && (
              <div className="flex items-start gap-3">
                <Clock3
                  size={18}
                  className="mt-0.5 shrink-0 text-[#A03F28]"
                />
                <div>
                  <p className="text-xs font-bold text-[#1B1C1C]">
                    Opening Hours
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#8A726C]">
                    {business.openingHours}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Fulfillment options */}
          <div className="mt-6 flex flex-wrap gap-2">

            {business.deliveryAvailable && (
              <span className="rounded-full bg-[#E9F3F1] px-3 py-1.5 text-xs font-semibold text-[#326460]">
                Business Delivery Available
              </span>
            )}

            {business.pickupAvailable && (
              <span className="rounded-full bg-[#F2EDEA] px-3 py-1.5 text-xs font-semibold text-[#56423D]">
                Pickup Available
              </span>
            )}

          </div>

        </div>

      </section>

      {/* Products and services */}
      <section className="space-y-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#326460]">
              Store
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#1B1C1C]">
              Products & Services
            </h2>

            <p className="mt-1 text-sm text-[#8A726C]">
              Browse what this business currently offers.
            </p>
          </div>

          <div className="relative w-full lg:max-w-sm">

            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A726C]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search this store..."
              className="w-full rounded-xl border border-[#D9D3D0] bg-white py-3 pl-11 pr-11 text-sm text-[#1B1C1C] outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear store search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#7A706C] transition hover:bg-[#F2EDEA] hover:text-[#A03F28]"
              >
                <X size={16} />
              </button>
            )}

          </div>

        </div>

        {/* Product/service filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">

          <button
            type="button"
            onClick={() => setActiveType('all')}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
              activeType === 'all'
                ? 'bg-[#A03F28] text-white'
                : 'border border-[#DDC0BA] bg-white text-[#56423D] hover:border-[#A03F28] hover:text-[#A03F28]'
            }`}
          >
            <Store size={16} />
            All
          </button>

          <button
            type="button"
            onClick={() => setActiveType('product')}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
              activeType === 'product'
                ? 'bg-[#A03F28] text-white'
                : 'border border-[#DDC0BA] bg-white text-[#56423D] hover:border-[#A03F28] hover:text-[#A03F28]'
            }`}
          >
            <Package size={16} />
            Products
          </button>

          <button
            type="button"
            onClick={() => setActiveType('service')}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
              activeType === 'service'
                ? 'bg-[#A03F28] text-white'
                : 'border border-[#DDC0BA] bg-white text-[#56423D] hover:border-[#A03F28] hover:text-[#A03F28]'
            }`}
          >
            <Wrench size={16} />
            Services
          </button>

        </div>

        {/* Store items */}
        {filteredItems.length > 0 ? (

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-[#E4D4CF] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >

                <div className="flex h-44 items-center justify-center bg-[#F7F3F1]">

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : item.itemType === 'service' ? (
                    <Wrench
                      size={42}
                      className="text-[#C8B7B1]"
                    />
                  ) : (
                    <Package
                      size={42}
                      className="text-[#C8B7B1]"
                    />
                  )}

                </div>

                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <p className="text-xs font-semibold text-[#326460]">
                        {item.category}
                      </p>

                      <h3 className="mt-1 font-bold text-[#1B1C1C]">
                        {item.name}
                      </h3>
                    </div>

                    <span className="shrink-0 rounded-full bg-[#F2EDEA] px-2.5 py-1 text-[11px] font-bold capitalize text-[#56423D]">
                      {item.itemType}
                    </span>

                  </div>

                  {item.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#8A726C]">
                      {item.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-end justify-between gap-3">

                    <div>
                      <p className="text-lg font-bold text-[#A03F28]">
                        {item.price}
                      </p>

                      <p className="text-xs text-[#8A726C]">
                        {item.itemType === 'service'
                          ? item.pricingType === 'per_hour'
                            ? 'per hour'
                            : 'per service'
                          : `per ${item.unit || 'item'}`}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#A03F28] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#812914]"
                    >
                      <ShoppingBag size={15} />
                      Add to Cart
                    </button>

                  </div>

                </div>

              </article>
            ))}

          </div>

        ) : (

          <div className="rounded-3xl border border-[#E4D4CF] bg-white px-6 py-14 text-center shadow-sm sm:px-10">

            <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-[#FFF0EC] text-[#A03F28]">
              {search || activeType !== 'all' ? (
                <Search size={32} />
              ) : (
                <Package size={32} />
              )}
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#1B1C1C]">
              {search || activeType !== 'all'
                ? 'No matching items'
                : 'No products or services available yet'}
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#695D46]">
              {search || activeType !== 'all'
                ? 'No real products or services match your current search or filter.'
                : 'This business does not have real products or services available in the marketplace yet.'}
            </p>

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#DDC0BA] bg-white px-5 py-3 text-sm font-semibold text-[#56423D] transition hover:border-[#A03F28] hover:text-[#A03F28]"
              >
                <X size={17} />
                Clear Search
              </button>
            )}

          </div>

        )}

      </section>

      {/* Future cart notice */}
      <section className="rounded-2xl border border-[#D9E8E5] bg-[#F4FAF8] p-5 sm:p-6">

        <div className="flex items-start gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E9F3F1] text-[#326460]">
            <ShoppingBag size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-[#1B1C1C]">
              Smart cart coming next
            </p>

            <p className="mt-1 text-xs leading-5 text-[#6C7F7B] sm:text-sm">
              Products and services will be added to the JamiiMarket smart
              cart. The cart will support items from multiple businesses and
              prepare them for the appropriate checkout and order flow.
            </p>
          </div>

        </div>

      </section>

    </div>
  )
}

export default CustomerBusinessStorefrontPage

