import { useMemo, useState } from 'react'
import {
  Search,
  Store,
  MapPin,
  Phone,
  Mail,
  Heart,
  SlidersHorizontal,
  X,
  ShoppingBag,
  Utensils,
  Wrench,
  Palette,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const categories = [
  { name: 'All', icon: Store },
  { name: 'Retail', icon: ShoppingBag },
  { name: 'Food', icon: Utensils },
  { name: 'Services', icon: Wrench },
  { name: 'Crafts', icon: Palette },
]

function CustomerBusinessesPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  /*
   * IMPORTANT:
   * Keep this connected to your real backend when the API is ready.
   * Do not add fake businesses here.
   */
  const businesses = []

  const filteredBusinesses = useMemo(() => {
    const query = search.trim().toLowerCase()

    return businesses.filter((business) => {
      const name = business.name?.toLowerCase() || ''
      const description = business.description?.toLowerCase() || ''

      const matchesSearch =
        !query ||
        name.includes(query) ||
        description.includes(query)

      const matchesCategory =
        selectedCategory === 'All' ||
        business.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [businesses, search, selectedCategory])

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('All')
  }

  const hasFilters = search.trim() || selectedCategory !== 'All'

  return (
    <div className="min-h-full bg-[#FCF9F8]">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <section className="mb-7">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div className="min-w-0">

            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#326460]">
              <Store size={17} />
              <span>Customer Marketplace</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl">
              Discover Businesses
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#695D46] sm:text-base">
              Find businesses, shops, food providers, crafts, and service
              providers available through JamiiMarket.
            </p>

          </div>

          <Link
            to="/customer/dashboard"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-[#DDC0BA] bg-white px-4 py-3 text-sm font-semibold text-[#56423D] shadow-sm transition hover:border-[#A03F28] hover:text-[#A03F28]"
          >
            <ArrowLeft size={17} />
            Dashboard
          </Link>

        </div>
      </section>


      {/* =====================================================
          SEARCH PANEL
      ===================================================== */}
      <section className="rounded-2xl border border-[#E4D4CF] bg-white p-4 shadow-sm sm:p-5">

        <div className="flex flex-col gap-3 lg:flex-row">

          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A726C]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search businesses..."
              className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-11 text-sm text-[#1B1C1C] outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#7A706C] transition hover:bg-[#F2EDEA] hover:text-[#A03F28]"
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}

          </div>

          <button
            type="button"
            onClick={() => setShowFilters((current) => !current)}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
              showFilters
                ? 'bg-[#A03F28] text-white'
                : 'border border-[#DDC0BA] bg-white text-[#56423D] hover:border-[#A03F28] hover:text-[#A03F28]'
            }`}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

        </div>


        {/* Filters */}
        {showFilters && (
          <div className="mt-5 border-t border-[#E8E3E1] pt-5">

            <div className="mb-3 flex items-center justify-between">

              <p className="text-sm font-bold text-[#1B1C1C]">
                Business category
              </p>

              {selectedCategory !== 'All' && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  className="text-xs font-bold text-[#A03F28] hover:underline"
                >
                  Reset category
                </button>
              )}

            </div>

            <div className="flex flex-wrap gap-2">

              {categories.map((category) => {
                const Icon = category.icon
                const active = selectedCategory === category.name

                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => setSelectedCategory(category.name)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      active
                        ? 'bg-[#A03F28] text-white shadow-sm'
                        : 'border border-[#DDC0BA] bg-[#FCF9F8] text-[#56423D] hover:border-[#A03F28] hover:text-[#A03F28]'
                    }`}
                  >
                    <Icon size={16} />
                    {category.name}
                  </button>
                )
              })}

            </div>
          </div>
        )}

      </section>


      {/* =====================================================
          CATEGORY SHORTCUTS
      ===================================================== */}
      <section className="mt-7">

        <div className="mb-4 flex items-end justify-between gap-4">

          <div>
            <h2 className="text-xl font-bold text-[#1B1C1C]">
              Browse by category
            </h2>

            <p className="mt-1 text-sm text-[#8A726C]">
              Choose a category to narrow your search.
            </p>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="shrink-0 text-sm font-bold text-[#A03F28] hover:underline"
            >
              Clear
            </button>
          )}

        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

          {categories.map((category) => {
            const Icon = category.icon
            const active = selectedCategory === category.name

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => setSelectedCategory(category.name)}
                className={`group rounded-2xl border p-4 text-left transition ${
                  active
                    ? 'border-[#A03F28] bg-[#FFF4F0] shadow-sm'
                    : 'border-[#E4D4CF] bg-white hover:-translate-y-0.5 hover:border-[#A03F28] hover:shadow-sm'
                }`}
              >

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                    active
                      ? 'bg-[#A03F28] text-white'
                      : 'bg-[#E9F3F1] text-[#326460] group-hover:bg-[#DDF0ED]'
                  }`}
                >
                  <Icon size={20} />
                </div>

                <p className="mt-3 text-sm font-bold text-[#1B1C1C]">
                  {category.name}
                </p>

              </button>
            )
          })}

        </div>

      </section>


      {/* =====================================================
          RESULTS
      ===================================================== */}
      <section className="mt-8">

        <div className="mb-4 flex items-end justify-between gap-4">

          <div>
            <h2 className="text-xl font-bold text-[#1B1C1C]">
              Available Businesses
            </h2>

            <p className="mt-1 text-sm text-[#8A726C]">
              {filteredBusinesses.length} businesses available
            </p>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="hidden items-center gap-1.5 text-sm font-semibold text-[#A03F28] hover:underline sm:flex"
            >
              <X size={15} />
              Clear filters
            </button>
          )}

        </div>


        {/* =====================================================
            EMPTY STATE
        ===================================================== */}
        {filteredBusinesses.length === 0 ? (

          <div className="overflow-hidden rounded-3xl border border-[#E4D4CF] bg-white shadow-sm">

            <div className="relative px-6 py-14 text-center sm:px-10 sm:py-16">

              {/* Decorative circles */}
              <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#FFF4F0]" />
              <div className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-[#E9F3F1]" />

              <div className="relative">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E9F3F1] text-[#326460]">
                  <Store size={36} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#1B1C1C]">
                  {search
                    ? `No businesses found`
                    : selectedCategory !== 'All'
                      ? `No ${selectedCategory.toLowerCase()} businesses available`
                      : 'No businesses available yet'}
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#695D46]">
                  {search
                    ? `We could not find a business matching "${search}". Try another search term or clear your filters.`
                    : 'There are currently no business records available to display. Businesses will appear here when they are provided by the marketplace system.'}
                </p>


                {/* No fake data message */}
                {!search && selectedCategory === 'All' && (
                  <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-[#E4D4CF] bg-[#FCF9F8] p-4 text-left">

                    <div className="flex gap-3">

                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF0EB] text-[#A03F28]">
                        <MapPin size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#1B1C1C]">
                          Marketplace data will appear here
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#695D46]">
                          This page does not create sample businesses,
                          addresses, phone numbers, prices, or other fake
                          marketplace information.
                        </p>
                      </div>

                    </div>

                  </div>
                )}


                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A03F28] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#812914]"
                    >
                      <RefreshCw size={17} />
                      Clear filters
                    </button>
                  )}

                  <Link
                    to="/customer/dashboard"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDC0BA] bg-white px-5 py-3 text-sm font-bold text-[#56423D] transition hover:border-[#A03F28] hover:text-[#A03F28]"
                  >
                    <ArrowLeft size={17} />
                    Back to dashboard
                  </Link>

                </div>

              </div>
            </div>
          </div>

        ) : (

          /* =====================================================
             REAL BUSINESS RESULTS
          ===================================================== */
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {filteredBusinesses.map((business) => (

              <article
                key={business.id}
                className="overflow-hidden rounded-2xl border border-[#E4D4CF] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >

                <div className="flex h-40 items-center justify-center bg-[#E9F3F1]">
                  <Store size={45} className="text-[#326460]" />
                </div>

                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <h3 className="font-bold text-[#1B1C1C]">
                        {business.name}
                      </h3>

                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#326460]">
                        {business.category}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="rounded-full p-2 text-[#8A726C] transition hover:bg-[#FFF4F0] hover:text-[#A03F28]"
                      aria-label={`Add ${business.name} to favorites`}
                    >
                      <Heart size={19} />
                    </button>

                  </div>

                  <p className="mt-3 text-sm leading-6 text-[#56423D]">
                    {business.description}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-[#6B625F]">

                    {business.address && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{business.address}</span>
                      </div>
                    )}

                    {business.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        <span>{business.phone}</span>
                      </div>
                    )}

                    {business.email && (
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        <span>{business.email}</span>
                      </div>
                    )}

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </div>
  )
}

export default CustomerBusinessesPage

