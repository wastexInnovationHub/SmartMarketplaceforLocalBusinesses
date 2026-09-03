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
Palette,
ArrowLeft,
RefreshCw,
Navigation,
Smartphone,
Shirt,
Sparkles,
Home,
HeartPulse,
BookOpen,
Tractor,
Fish,
Hammer,
Car,
Laptop,
BriefcaseBusiness,
SprayCan,
Truck,
Hotel,
PartyPopper,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'

// Business categories used for marketplace discovery.
const categories = [
{ name: 'All', icon: Store },
{ name: 'Groceries', icon: ShoppingBag },
{ name: 'Food & Restaurants', icon: Utensils },
{ name: 'Fashion & Clothing', icon: Shirt },
{ name: 'Beauty & Personal Care', icon: Sparkles },
{ name: 'Electronics', icon: Smartphone },
{ name: 'Home & Furniture', icon: Home },
{ name: 'Health & Wellness', icon: HeartPulse },
{ name: 'Books & Education', icon: BookOpen },
{ name: 'Crafts & Handmade', icon: Palette },
{ name: 'Agriculture', icon: Tractor },
{ name: 'Fish & Seafood', icon: Fish },
{ name: 'Construction & Hardware', icon: Hammer },
{ name: 'Automotive', icon: Car },
{ name: 'Technology & Digital Services', icon: Laptop },
{ name: 'Professional Services', icon: BriefcaseBusiness },
{ name: 'Cleaning Services', icon: SprayCan },
{ name: 'Transport & Delivery', icon: Truck },
{ name: 'Accommodation', icon: Hotel },
{ name: 'Events & Entertainment', icon: PartyPopper },
{ name: 'Other', icon: Store },
]

function CustomerBusinessesPage() {
const { language } = useLanguage()
const isSwahili = language === 'sw'

const [search, setSearch] = useState('')
const [selectedCategory, setSelectedCategory] = useState('All')
const [showFilters, setShowFilters] = useState(false)

// Simple English and Kiswahili category names.
const categoryLabels = {
All: isSwahili ? 'Zote' : 'All',
Groceries: isSwahili ? 'Vyakula na Mahitaji' : 'Groceries',
'Food & Restaurants': isSwahili
? 'Chakula na Migahawa'
: 'Food & Restaurants',
'Fashion & Clothing': isSwahili
? 'Mavazi'
: 'Fashion & Clothing',
'Beauty & Personal Care': isSwahili
? 'Urembo na Huduma Binafsi'
: 'Beauty & Personal Care',
Electronics: isSwahili ? 'Vifaa vya Elektroniki' : 'Electronics',
'Home & Furniture': isSwahili
? 'Nyumbani na Samani'
: 'Home & Furniture',
'Health & Wellness': isSwahili
? 'Afya na Ustawi'
: 'Health & Wellness',
'Books & Education': isSwahili
? 'Vitabu na Elimu'
: 'Books & Education',
'Crafts & Handmade': isSwahili
? 'Kazi za Mikono'
: 'Crafts & Handmade',
Agriculture: isSwahili ? 'Kilimo' : 'Agriculture',
'Fish & Seafood': isSwahili
? 'Samaki na Vyakula vya Baharini'
: 'Fish & Seafood',
'Construction & Hardware': isSwahili
? 'Ujenzi na Vifaa'
: 'Construction & Hardware',
Automotive: isSwahili ? 'Magari na Vyombo vya Usafiri' : 'Automotive',
'Technology & Digital Services': isSwahili
? 'Teknolojia na Huduma za Kidijitali'
: 'Technology & Digital Services',
'Professional Services': isSwahili
? 'Huduma za Kitaaluma'
: 'Professional Services',
'Cleaning Services': isSwahili
? 'Huduma za Usafi'
: 'Cleaning Services',
'Transport & Delivery': isSwahili
? 'Usafiri na Usafirishaji'
: 'Transport & Delivery',
Accommodation: isSwahili ? 'Malazi' : 'Accommodation',
'Events & Entertainment': isSwahili
? 'Matukio na Burudani'
: 'Events & Entertainment',
Other: isSwahili ? 'Nyingine' : 'Other',
}

// Real business data will come from the backend API.
// Do not add fake businesses here.
const businesses = []

// Filter businesses by search term and selected category.
const filteredBusinesses = useMemo(() => {
const query = search.trim().toLowerCase()


return businesses.filter((business) => {
  const name = business.name?.toLowerCase() || ''
  const description =
    business.description?.toLowerCase() || ''
  const category =
    business.category?.toLowerCase() || ''

  const matchesSearch =
    !query ||
    name.includes(query) ||
    description.includes(query) ||
    category.includes(query)

  const matchesCategory =
    selectedCategory === 'All' ||
    business.category === selectedCategory

  return matchesSearch && matchesCategory
})


}, [businesses, search, selectedCategory])

// Clear search and category filters.
const clearFilters = () => {
setSearch('')
setSelectedCategory('All')
}

const hasFilters =
search.trim() || selectedCategory !== 'All'

const text = {
customerMarketplace: isSwahili
? 'Soko la Mteja'
: 'Customer Marketplace',


discoverBusinesses: isSwahili
  ? 'Gundua Biashara'
  : 'Discover Businesses',

discoverBusinessesDescription: isSwahili
  ? 'Tafuta maduka, migahawa, watoa huduma, mafundi, wataalamu, na biashara nyingine zinazopatikana kupitia JamiiMarket.'
  : 'Find local shops, restaurants, service providers, artisans, professionals, and other businesses available through JamiiMarket.',

dashboard: isSwahili ? 'Dashibodi' : 'Dashboard',

discoverNearbyBusinesses: isSwahili
  ? 'Gundua Biashara Zilizo Karibu'
  : 'Discover nearby businesses',

nearbyDescription: isSwahili
  ? 'Biashara halisi zilizo karibu nawe zitaonekana hapa wakati huduma ya eneo na taarifa za soko zitakapounganishwa.'
  : 'Location-based discovery will show real businesses near you when location services and marketplace data are available.',

locationComingSoon: isSwahili
  ? 'Eneo Linakuja Hivi Karibuni'
  : 'Location Coming Soon',

locationTitle: isSwahili
  ? 'Huduma ya eneo itawezeshwa wakati mfumo wa kutafuta biashara kwa eneo utakapounganishwa.'
  : 'Location discovery will be enabled when the marketplace location service is connected',

searchPlaceholder: isSwahili
  ? 'Tafuta biashara, huduma, au aina ya biashara...'
  : 'Search businesses, services, or categories...',

clearSearch: isSwahili
  ? 'Futa utafutaji'
  : 'Clear search',

filters: isSwahili ? 'Vichujio' : 'Filters',

businessCategory: isSwahili
  ? 'Aina ya biashara'
  : 'Business category',

resetCategory: isSwahili
  ? 'Weka upya aina'
  : 'Reset category',

browseByCategory: isSwahili
  ? 'Angalia kwa Aina ya Biashara'
  : 'Browse by category',

categoryDescription: isSwahili
  ? 'Chagua aina ya biashara ili kupunguza matokeo ya utafutaji.'
  : 'Choose a business category to narrow your search.',

clear: isSwahili ? 'Futa' : 'Clear',

availableBusinesses: isSwahili
  ? 'Biashara Zinazopatikana'
  : 'Available Businesses',

business: isSwahili ? 'biashara' : 'business',

businesses: isSwahili ? 'biashara' : 'businesses',

available: isSwahili ? 'zinazopatikana' : 'available',

noBusinessesFound: isSwahili
  ? 'Hakuna Biashara Iliyopatikana'
  : 'No businesses found',

noCategoryBusinesses: isSwahili
  ? 'Hakuna biashara za aina hii zinazopatikana'
  : 'No businesses available in this category',

noBusinessesYet: isSwahili
  ? 'Bado Hakuna Biashara'
  : 'No businesses available yet',

searchNotFound: isSwahili
  ? 'Hatukupata biashara inayolingana na utafutaji wako. Jaribu neno jingine au futa vichujio.'
  : `We could not find a business matching "${search}". Try another search term or clear your filters.`,

businessDataWaiting: isSwahili
  ? 'Tunasubiri taarifa za soko'
  : 'Waiting for marketplace data',

transparencyMessage: isSwahili
  ? 'Ukurasa huu hautengenezi biashara za mfano, anwani, namba za simu, maeneo, au taarifa nyingine za uongo. Biashara halisi zitaonekana baada ya taarifa za soko kuunganishwa.'
  : 'This page does not create sample businesses, addresses, phone numbers, locations, or other fake marketplace information.',

clearFilters: isSwahili
  ? 'Futa vichujio'
  : 'Clear filters',

backToDashboard: isSwahili
  ? 'Rudi kwenye dashibodi'
  : 'Back to dashboard',

viewStore: isSwahili
  ? 'Angalia Duka'
  : 'View Store',

addToFavorites: isSwahili
  ? 'Ongeza kwenye ninavyovipenda'
  : 'Add to favorites',

}

return ( <div className="min-h-full bg-[#FCF9F8]"> <div className="mx-auto max-w-7xl">


    {/* Page header */}
    <section className="mb-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#326460]">
            <Store size={17} />

            <span>
              {text.customerMarketplace}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl">
            {text.discoverBusinesses}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#695D46] sm:text-base">
            {text.discoverBusinessesDescription}
          </p>
        </div>

        <Link
          to="/customer/dashboard"
          className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-[#DDC0BA] bg-white px-4 py-3 text-sm font-semibold text-[#56423D] shadow-sm transition hover:border-[#A03F28] hover:text-[#A03F28]"
        >
          <ArrowLeft size={17} />
          {text.dashboard}
        </Link>
      </div>
    </section>

    {/* Nearby business discovery */}
    <section className="mb-7 overflow-hidden rounded-2xl border border-[#D9E8E5] bg-[#E9F3F1]">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#326460] text-white">
            <Navigation size={20} />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#1B1C1C]">
              {text.discoverNearbyBusinesses}
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-5 text-[#695D46]">
              {text.nearbyDescription}
            </p>
          </div>
        </div>

        {/* Real location functionality will be connected later. */}
        <button
          type="button"
          disabled
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#BFD6D2] bg-white px-5 py-3 text-sm font-semibold text-[#7B8D8A] opacity-80"
          title={text.locationTitle}
        >
          <MapPin size={17} />
          {text.locationComingSoon}
        </button>
      </div>
    </section>

    {/* Search and filter panel */}
    <section className="rounded-2xl border border-[#E4D4CF] bg-white p-4 shadow-sm sm:p-5">

      <div className="flex flex-col gap-3 lg:flex-row">

        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A726C]"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={text.searchPlaceholder}
            className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-11 text-sm text-[#1B1C1C] outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#7A706C] transition hover:bg-[#F2EDEA] hover:text-[#A03F28]"
              aria-label={text.clearSearch}
            >
              <X size={17} />
            </button>
          )}
        </div>

        {/* Filter button */}
        <button
          type="button"
          onClick={() =>
            setShowFilters((current) => !current)
          }
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
            showFilters
              ? 'bg-[#A03F28] text-white'
              : 'border border-[#DDC0BA] bg-white text-[#56423D] hover:border-[#A03F28] hover:text-[#A03F28]'
          }`}
        >
          <SlidersHorizontal size={18} />
          {text.filters}
        </button>
      </div>

      {/* Category filters */}
      {showFilters && (
        <div className="mt-5 border-t border-[#E8E3E1] pt-5">

          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-[#1B1C1C]">
              {text.businessCategory}
            </p>

            {selectedCategory !== 'All' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className="text-xs font-bold text-[#A03F28] hover:underline"
              >
                {text.resetCategory}
              </button>
            )}
          </div>

          <div className="flex max-h-72 flex-wrap gap-2 overflow-y-auto">
            {categories.map((category) => {
              const Icon = category.icon
              const active =
                selectedCategory === category.name

              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category.name)
                  }
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    active
                      ? 'bg-[#A03F28] text-white shadow-sm'
                      : 'border border-[#DDC0BA] bg-[#FCF9F8] text-[#56423D] hover:border-[#A03F28] hover:text-[#A03F28]'
                  }`}
                >
                  <Icon size={16} />
                  {categoryLabels[category.name]}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </section>

    {/* Category shortcuts */}
    <section className="mt-7">

      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1C1C]">
            {text.browseByCategory}
          </h2>

          <p className="mt-1 text-sm text-[#8A726C]">
            {text.categoryDescription}
          </p>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="shrink-0 text-sm font-bold text-[#A03F28] hover:underline"
          >
            {text.clear}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

        {categories.map((category) => {
          const Icon = category.icon
          const active =
            selectedCategory === category.name

          return (
            <button
              key={category.name}
              type="button"
              onClick={() =>
                setSelectedCategory(category.name)
              }
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

              <p className="mt-3 text-sm font-bold leading-5 text-[#1B1C1C]">
                {categoryLabels[category.name]}
              </p>
            </button>
          )
        })}
      </div>
    </section>

    {/* Business results */}
    <section className="mt-8">

      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1C1C]">
            {text.availableBusinesses}
          </h2>

          <p className="mt-1 text-sm text-[#8A726C]">
            {filteredBusinesses.length}{' '}
            {filteredBusinesses.length === 1
              ? text.business
              : text.businesses}{' '}
            {text.available}
          </p>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="hidden items-center gap-1.5 text-sm font-semibold text-[#A03F28] hover:underline sm:flex"
          >
            <X size={15} />
            {text.clearFilters}
          </button>
        )}
      </div>

      {/* Empty state */}
      {filteredBusinesses.length === 0 ? (
        <div className="overflow-hidden rounded-3xl border border-[#E4D4CF] bg-white shadow-sm">

          <div className="relative px-6 py-14 text-center sm:px-10 sm:py-16">

            <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#FFF4F0]" />

            <div className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-[#E9F3F1]" />

            <div className="relative">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E9F3F1] text-[#326460]">
                <Store size={36} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#1B1C1C]">
                {search
                  ? text.noBusinessesFound
                  : selectedCategory !== 'All'
                    ? isSwahili
                      ? `Hakuna biashara za ${categoryLabels[selectedCategory].toLowerCase()} zinazopatikana`
                      : `No ${selectedCategory.toLowerCase()} businesses available`
                    : text.noBusinessesYet}
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#695D46]">
                {search
                  ? text.searchNotFound
                  : isSwahili
                    ? 'Orodha ya biashara itaonekana hapa wakati taarifa halisi za biashara za soko zitakapopatikana.'
                    : 'Business listings will appear here when real marketplace business data is available.'}
              </p>

              {/* Data transparency message */}
              {!search &&
                selectedCategory === 'All' && (
                  <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-[#E4D4CF] bg-[#FCF9F8] p-4 text-left">

                    <div className="flex gap-3">

                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF0EB] text-[#A03F28]">
                        <MapPin size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#1B1C1C]">
                          {text.businessDataWaiting}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#695D46]">
                          {text.transparencyMessage}
                        </p>
                      </div>

                    </div>
                  </div>
                )}

              {/* Empty state actions */}
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A03F28] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#812914]"
                  >
                    <RefreshCw size={17} />
                    {text.clearFilters}
                  </button>
                )}

                <Link
                  to="/customer/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDC0BA] bg-white px-5 py-3 text-sm font-bold text-[#56423D] transition hover:border-[#A03F28] hover:text-[#A03F28]"
                >
                  <ArrowLeft size={17} />
                  {text.backToDashboard}
                </Link>
              </div>

            </div>
          </div>
        </div>
      ) : (

        // Business cards
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {filteredBusinesses.map((business) => (
            <article
              key={business.id}
              className="overflow-hidden rounded-2xl border border-[#E4D4CF] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >

              {/* Business image or banner */}
              <div className="flex h-40 items-center justify-center bg-[#E9F3F1]">

                {business.bannerImage ? (
                  <img
                    src={business.bannerImage}
                    alt={business.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Store
                    size={45}
                    className="text-[#326460]"
                  />
                )}
              </div>

              <div className="p-5">

                {/* Business name and favorite */}
                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-[#1B1C1C]">
                      {business.name}
                    </h3>

                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#326460]">
                      {categoryLabels[business.category] ||
                        business.category}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="shrink-0 rounded-full p-2 text-[#8A726C] transition hover:bg-[#FFF4F0] hover:text-[#A03F28]"
                    aria-label={text.addToFavorites}
                  >
                    <Heart size={19} />
                  </button>
                </div>

                {/* Business description */}
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#56423D]">
                  {business.description}
                </p>

                {/* Business contact information */}
                <div className="mt-4 space-y-2 text-sm text-[#6B625F]">

                  {business.address && (
                    <div className="flex items-start gap-2">
                      <MapPin
                        size={16}
                        className="mt-0.5 shrink-0"
                      />
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
                      <span className="truncate">
                        {business.email}
                      </span>
                    </div>
                  )}
                </div>

                {/* Business storefront */}
                <Link
                  to={`/customer/businesses/${business.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#326460] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#28534f]"
                >
                  {text.viewStore}

                  <ArrowLeft
                    size={16}
                    className="rotate-180"
                  />
                </Link>

              </div>
            </article>
          ))}
        </div>
      )}
    </section>

  </div>
</div>
)
}

export default CustomerBusinessesPage
