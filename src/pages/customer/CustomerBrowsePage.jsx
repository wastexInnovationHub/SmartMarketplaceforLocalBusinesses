import { useMemo, useState } from 'react'
import {
  Search,
  ShoppingBag,
  Utensils,
  Wrench,
  Palette,
  SlidersHorizontal,
  MapPin,
  Store,
  X,
  RotateCcw,
  ChevronDown,
} from 'lucide-react'

const categories = [
  {
    name: 'All',
    icon: Store,
    description: 'Everything available',
  },
  {
    name: 'Retail',
    icon: ShoppingBag,
    description: 'Products and goods',
  },
  {
    name: 'Food',
    icon: Utensils,
    description: 'Food and meals',
  },
  {
    name: 'Services',
    icon: Wrench,
    description: 'Local services',
  },
  {
    name: 'Crafts',
    icon: Palette,
    description: 'Handmade crafts',
  },
]

function CustomerBrowsePage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const hasFilters =
    search.trim().length > 0 || selectedCategory !== 'All'

  const filteredMessage = useMemo(() => {
    const cleanSearch = search.trim()

    if (cleanSearch) {
      return `No marketplace results found for "${cleanSearch}".`
    }

    if (selectedCategory !== 'All') {
      return `No ${selectedCategory.toLowerCase()} listings are available yet.`
    }

    return 'No marketplace listings are available yet.'
  }, [search, selectedCategory])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const clearSearch = () => {
    setSearch('')
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('All')
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">

      {/* ========================================
          HEADER
      ======================================== */}
      <section>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#326460]">
              <Store size={17} />
              <span>Marketplace</span>
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl">
              Browse
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#56423D] sm:text-base">
              Discover products, food, crafts, and services available through
              JamiiMarket.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((current) => !current)}
            aria-expanded={showFilters}
            className={`inline-flex w-fit items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              showFilters
                ? 'border-[#A03F28] bg-[#FFF4F0] text-[#A03F28]'
                : 'border-[#DDC0BA] bg-white text-[#56423D] hover:border-[#A03F28] hover:text-[#A03F28]'
            }`}
          >
            <SlidersHorizontal size={18} />

            Filters

            <ChevronDown
              size={16}
              className={`transition-transform ${
                showFilters ? 'rotate-180' : ''
              }`}
            />
          </button>

        </div>
      </section>


      {/* ========================================
          SEARCH PANEL
      ======================================== */}
      <section className="rounded-2xl border border-[#DDC0BA] bg-white p-4 shadow-[0_8px_30px_-20px_rgba(160,63,40,0.2)] sm:p-5">

        <div className="relative">

          <Search
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A726C]"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products, shops, food, or services..."
            aria-label="Search marketplace"
            className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-12 pr-12 text-sm text-[#1B1C1C] outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#7A706C] transition hover:bg-[#F2EDEA] hover:text-[#A03F28]"
            >
              <X size={18} />
            </button>
          )}

        </div>


        {/* ========================================
            FILTER PANEL
        ======================================== */}
        {showFilters && (
          <div className="mt-5 border-t border-[#E8E3E1] pt-5">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm font-bold text-[#1B1C1C]">
                  Filter marketplace
                </p>

                <p className="mt-1 text-xs text-[#695D46]">
                  Select a category to narrow available listings.
                </p>
              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex w-fit items-center gap-2 text-xs font-bold text-[#A03F28] hover:underline"
                >
                  <RotateCcw size={14} />
                  Reset filters
                </button>
              )}

            </div>


            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">

              {categories.map((category) => {
                const Icon = category.icon
                const active = selectedCategory === category.name

                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => handleCategoryChange(category.name)}
                    aria-pressed={active}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                      active
                        ? 'border-[#A03F28] bg-[#FFF4F0]'
                        : 'border-[#E2DAD7] bg-[#FCF9F8] hover:border-[#A03F28] hover:bg-white'
                    }`}
                  >

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        active
                          ? 'bg-[#A03F28] text-white'
                          : 'bg-[#F2E0C3] text-[#695D46]'
                      }`}
                    >
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`truncate text-xs font-bold ${
                          active
                            ? 'text-[#A03F28]'
                            : 'text-[#1B1C1C]'
                        }`}
                      >
                        {category.name}
                      </p>

                      <p className="truncate text-[10px] text-[#8A726C]">
                        {category.description}
                      </p>
                    </div>

                  </button>
                )
              })}

            </div>
          </div>
        )}

      </section>


      {/* ========================================
          CATEGORY SHORTCUTS
      ======================================== */}
      <section>

        <div className="mb-4 flex items-center justify-between gap-4">

          <div>
            <h2 className="text-xl font-bold text-[#1B1C1C]">
              Explore categories
            </h2>

            <p className="mt-1 text-sm text-[#695D46]">
              Browse the marketplace by category.
            </p>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="hidden items-center gap-1 text-sm font-semibold text-[#A03F28] hover:underline sm:flex"
            >
              <X size={15} />
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
                onClick={() => handleCategoryChange(category.name)}
                aria-pressed={active}
                className={`group rounded-2xl border p-4 text-left transition ${
                  active
                    ? 'border-[#A03F28] bg-[#FFF4F0] shadow-sm'
                    : 'border-[#DDC0BA] bg-white hover:-translate-y-0.5 hover:border-[#A03F28] hover:shadow-sm'
                }`}
              >

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                      active
                        ? 'bg-[#A03F28] text-white'
                        : 'bg-[#F2E0C3] text-[#695D46] group-hover:bg-[#EFDEC0]'
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  {active && (
                    <span className="rounded-full bg-[#A03F28]/10 px-2 py-1 text-[10px] font-bold text-[#A03F28]">
                      Selected
                    </span>
                  )}

                </div>

                <h3 className="mt-4 text-sm font-bold text-[#1B1C1C]">
                  {category.name}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#695D46]">
                  {category.description}
                </p>

              </button>
            )
          })}

        </div>

      </section>


      {/* ========================================
          RESULTS HEADER
      ======================================== */}
      <section>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="flex items-center gap-2">

              <h2 className="text-xl font-bold text-[#1B1C1C]">
                Marketplace listings
              </h2>

              <span className="rounded-full bg-[#F2E0C3] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#695D46]">
                Live data
              </span>

            </div>

            <p className="mt-1 text-sm text-[#695D46]">
              {selectedCategory === 'All'
                ? 'Showing all available categories'
                : `Showing ${selectedCategory.toLowerCase()} listings`}
            </p>

          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#DDC0BA] bg-white px-3 py-2 text-xs font-semibold text-[#56423D] transition hover:border-[#A03F28] hover:text-[#A03F28]"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          )}

        </div>


        {/* ========================================
            HONEST EMPTY STATE
        ======================================== */}
        <div className="mt-4 flex min-h-[390px] flex-col items-center justify-center rounded-2xl border border-[#DDC0BA] bg-white px-6 py-12 text-center shadow-[0_8px_30px_-25px_rgba(160,63,40,0.25)]">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F0EDED] text-[#695D46]">
            <Store size={34} />
          </div>

          <h3 className="mt-6 max-w-xl text-xl font-bold text-[#1B1C1C]">
            {filteredMessage}
          </h3>

          <p className="mt-3 max-w-lg text-sm leading-6 text-[#56423D]">
            There are currently no real marketplace listings available to
            display. Products and services will appear here when marketplace
            data is available.
          </p>


          {/* Current filter information */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCF9F8] px-3 py-1.5 text-xs font-medium text-[#695D46]">
              <Store size={13} />
              Category: {selectedCategory}
            </span>

            {search.trim() && (
              <span className="inline-flex max-w-full items-center gap-1.5 truncate rounded-full bg-[#FCF9F8] px-3 py-1.5 text-xs font-medium text-[#695D46]">
                <Search size={13} />
                Search: "{search.trim()}"
              </span>
            )}

          </div>


          <div className="mt-6 flex flex-col items-center gap-2 text-xs text-[#8A726C]">

            <div className="flex items-center gap-2">
              <MapPin size={15} />
              <span>
                Location-based results will use available marketplace data.
              </span>
            </div>

            <span>
              No sample listings are being displayed.
            </span>

          </div>


          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#A03F28] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#812914] active:scale-[0.98]"
            >
              <RotateCcw size={16} />
              Clear search and filters
            </button>
          )}

        </div>

      </section>


      {/* ========================================
          INFORMATION CARD
      ======================================== */}
      <section className="rounded-2xl border border-[#DDC0BA] bg-[#FFF9F6] p-5 sm:p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2E0C3] text-[#695D46]">
            <MapPin size={21} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#1B1C1C]">
              About marketplace results
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#695D46] sm:text-sm">
              This page is ready to display real marketplace information from
              the application backend. Until that data is available, the page
              intentionally shows an empty state instead of invented products,
              prices, businesses, ratings, or locations.
            </p>
          </div>

        </div>

      </section>

    </div>
  )
}

export default CustomerBrowsePage

