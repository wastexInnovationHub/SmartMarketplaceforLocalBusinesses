import { useMemo, useState } from 'react'
import {
Heart,
Search,
ShoppingBag,
Store,
ArrowRight,
Trash2,
X,
ChevronRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'

function CustomerFavoritesPage() {
const { language } = useLanguage()
const isSwahili = language === 'sw'

const [search, setSearch] = useState('')

// Real favorite data will come from the customer favorites API.
// Keep these arrays empty until the backend is connected.
const favoriteProducts = []
const favoriteBusinesses = []

const normalizedSearch = search.trim().toLowerCase()

const filteredProducts = useMemo(() => {
if (!normalizedSearch) {
return favoriteProducts
}


return favoriteProducts.filter((product) => {
  const name = product?.name?.toLowerCase() || ''
  const category = product?.category?.toLowerCase() || ''

  return (
    name.includes(normalizedSearch) ||
    category.includes(normalizedSearch)
  )
})


}, [normalizedSearch])

const filteredBusinesses = useMemo(() => {
if (!normalizedSearch) {
return favoriteBusinesses
}


return favoriteBusinesses.filter((business) => {
  const name = business?.name?.toLowerCase() || ''
  const category = business?.category?.toLowerCase() || ''
  const description =
    business?.description?.toLowerCase() || ''

  return (
    name.includes(normalizedSearch) ||
    category.includes(normalizedSearch) ||
    description.includes(normalizedSearch)
  )
})


}, [normalizedSearch])

const totalFavorites =
filteredProducts.length + filteredBusinesses.length

const hasFavorites = totalFavorites > 0

const clearSearch = () => {
setSearch('')
}

const text = {
customer: isSwahili ? 'Mteja' : 'Customer',


favorites: isSwahili
  ? 'Ninavyovipenda'
  : 'Favorites',

description: isSwahili
  ? 'Hifadhi bidhaa na biashara unazopenda sehemu moja ili uzipate kwa urahisi.'
  : 'Keep the products and businesses you love in one convenient place.',

browseMarketplace: isSwahili
  ? 'Angalia Soko'
  : 'Browse Marketplace',

searchPlaceholder: isSwahili
  ? 'Tafuta bidhaa au biashara ulizohifadhi...'
  : 'Search your saved products or businesses...',

searchFavorites: isSwahili
  ? 'Tafuta unavyovipenda'
  : 'Search favorites',

clearFavoritesSearch: isSwahili
  ? 'Futa utafutaji wa unavyovipenda'
  : 'Clear favorites search',

findBusinesses: isSwahili
  ? 'Tafuta Biashara'
  : 'Find Businesses',

savedProducts: isSwahili
  ? 'Bidhaa Ulizohifadhi'
  : 'Saved Products',

productsYouSaved: isSwahili
  ? 'Bidhaa ulizohifadhi'
  : 'Products you saved',

savedBusinesses: isSwahili
  ? 'Biashara Ulizohifadhi'
  : 'Saved Businesses',

businessesYouSaved: isSwahili
  ? 'Biashara ulizohifadhi'
  : 'Businesses you saved',

noMatchingFavorites: isSwahili
  ? 'Hakuna Unavyovipenda Vinavyolingana'
  : 'No matching favorites',

favoritesEmpty: isSwahili
  ? 'Bado Hujahifadhi Unavyovipenda'
  : 'Your favorites are empty',

noMatchingDescription: isSwahili
  ? `Hakuna kitu ulichohifadhi kinacholingana na "${search}". Jaribu utafutaji mwingine.`
  : `Nothing in your saved items matches "${search}". Try a different search.`,

emptyDescription: isSwahili
  ? 'Hifadhi biashara na bidhaa unazopenda wakati wa kuangalia soko, na zitaonekana hapa.'
  : 'Save businesses and products while browsing the marketplace and they will appear here.',

clearSearch: isSwahili
  ? 'Futa Utafutaji'
  : 'Clear Search',

exploreMarketplace: isSwahili
  ? 'Chunguza Soko'
  : 'Explore Marketplace',

howFavoritesWork: isSwahili
  ? 'Jinsi Ninavyovipenda Vinavyofanya Kazi'
  : 'How Favorites work',

howFavoritesDescription: isSwahili
  ? 'Taarifa halisi za soko zikishaunganishwa, utaweza kuhifadhi biashara na bidhaa hapa ili uzipate kwa urahisi baadaye.'
  : 'When real marketplace data is connected, you can save businesses and products here for quick access later.',

favoriteProducts: isSwahili
  ? 'Bidhaa Ninazozipenda'
  : 'Favorite Products',

favoriteBusinesses: isSwahili
  ? 'Biashara Ninazozipenda'
  : 'Favorite Businesses',

savedProduct: isSwahili
  ? 'bidhaa iliyohifadhiwa'
  : 'saved product',

savedProductsPlural: isSwahili
  ? 'bidhaa zilizohifadhiwa'
  : 'saved products',

savedBusiness: isSwahili
  ? 'biashara iliyohifadhiwa'
  : 'saved business',

savedBusinessesPlural: isSwahili
  ? 'biashara zilizohifadhiwa'
  : 'saved businesses',

removeProduct: isSwahili
  ? 'Ondoa bidhaa hii kwenye ninavyovipenda'
  : 'Remove product from favorites',

removeBusiness: isSwahili
  ? 'Ondoa biashara hii kwenye ninavyovipenda'
  : 'Remove business from favorites',

viewStore: isSwahili
  ? 'Angalia Duka'
  : 'View Store',

lookingForSomething: isSwahili
  ? 'Unatafuta kitu cha kuhifadhi?'
  : 'Looking for something to save?',

lookingDescription: isSwahili
  ? 'Angalia soko na uhifadhi biashara au bidhaa unazotaka kuzipata tena baadaye.'
  : 'Browse the marketplace and save businesses or products you want to revisit later.',

browseBusinesses: isSwahili
  ? 'Angalia Biashara'
  : 'Browse Businesses',


}

return ( <div className="min-h-full w-full">


  {/* Page header */}
  <section className="mb-7">
    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

      <div className="min-w-0">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0EC] text-[#A03F28]">
            <Heart
              size={23}
              strokeWidth={2.2}
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#326460]">
              {text.customer}
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl">
              {text.favorites}
            </h1>
          </div>

        </div>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#56423D] sm:text-base">
          {text.description}
        </p>

      </div>

      <Link
        to="/customer/businesses"
        className="group inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-[#A03F28] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#812914] hover:shadow-md active:translate-y-0"
      >
        <Search size={18} />

        {text.browseMarketplace}

        <ArrowRight
          size={17}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </Link>

    </div>
  </section>

  {/* Search */}
  <section className="rounded-2xl border border-[#E4D4CF] bg-white p-4 shadow-sm sm:p-5">

    <div className="flex flex-col gap-3 lg:flex-row">

      <div className="relative flex-1">

        <Search
          size={19}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A726C]"
        />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={text.searchPlaceholder}
          aria-label={text.searchFavorites}
          className="w-full rounded-xl border border-[#D9D3D0] bg-[#FCF9F8] py-3.5 pl-11 pr-11 text-sm text-[#1B1C1C] outline-none transition placeholder:text-[#9B918D] focus:border-[#A03F28] focus:ring-2 focus:ring-[#A03F28]/10"
        />

        {search && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label={text.clearFavoritesSearch}
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#7A706C] transition hover:bg-[#FFF0EC] hover:text-[#A03F28]"
          >
            <X size={17} />
          </button>
        )}

      </div>

      <Link
        to="/customer/businesses"
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDC0BA] bg-[#FCF9F8] px-5 py-3 text-sm font-bold text-[#56423D] transition hover:border-[#A03F28] hover:bg-[#FFF4F0] hover:text-[#A03F28]"
      >
        <Store size={17} />
        {text.findBusinesses}
      </Link>

    </div>
  </section>

  {/* Summary cards */}
  <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

    <div className="rounded-2xl border border-[#E4D4CF] bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between gap-4">

        <div>
          <p className="text-sm font-semibold text-[#756763]">
            {text.savedProducts}
          </p>

          <p className="mt-2 text-3xl font-bold text-[#A03F28]">
            {filteredProducts.length}
          </p>

          <p className="mt-1 text-xs text-[#9A8984]">
            {text.productsYouSaved}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0EC] text-[#A03F28]">
          <ShoppingBag size={22} />
        </div>

      </div>

    </div>

    <div className="rounded-2xl border border-[#E4D4CF] bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between gap-4">

        <div>
          <p className="text-sm font-semibold text-[#756763]">
            {text.savedBusinesses}
          </p>

          <p className="mt-2 text-3xl font-bold text-[#326460]">
            {filteredBusinesses.length}
          </p>

          <p className="mt-1 text-xs text-[#9A8984]">
            {text.businessesYouSaved}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DDF0ED] text-[#326460]">
          <Store size={22} />
        </div>

      </div>

    </div>

  </section>

  {/* Favorites content */}
  <section className="mt-7">

    {!hasFavorites ? (

      <div className="overflow-hidden rounded-3xl border border-[#E4D4CF] bg-white shadow-sm">

        <div className="flex min-h-[430px] flex-col items-center justify-center px-6 py-14 text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF0EC] text-[#A03F28]">
            <Heart
              size={34}
              strokeWidth={1.8}
            />
          </div>

          <h2 className="mt-6 text-2xl font-bold tracking-tight text-[#1B1C1C]">
            {search
              ? text.noMatchingFavorites
              : text.favoritesEmpty}
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#56423D]">
            {search
              ? text.noMatchingDescription
              : text.emptyDescription}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDC0BA] bg-white px-5 py-3 text-sm font-bold text-[#56423D] transition hover:border-[#A03F28] hover:bg-[#FFF4F0] hover:text-[#A03F28]"
              >
                <X size={17} />
                {text.clearSearch}
              </button>
            )}

            <Link
              to="/customer/businesses"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#A03F28] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#812914] hover:shadow-md"
            >
              <Search size={18} />

              {text.exploreMarketplace}

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>

          </div>

          <div className="mt-8 flex max-w-lg items-start gap-3 rounded-2xl bg-[#FCF9F8] p-4 text-left">

            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#DDF0ED] text-[#326460]">
              <Heart size={16} />
            </div>

            <div>
              <p className="text-xs font-bold text-[#1B1C1C]">
                {text.howFavoritesWork}
              </p>

              <p className="mt-1 text-xs leading-5 text-[#756763]">
                {text.howFavoritesDescription}
              </p>
            </div>

          </div>

        </div>

      </div>

    ) : (

      <div className="space-y-8">

        {/* Favorite products */}
        {filteredProducts.length > 0 && (
          <section>

            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0EC] text-[#A03F28]">
                <ShoppingBag size={19} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#1B1C1C]">
                  {text.favoriteProducts}
                </h2>

                <p className="mt-0.5 text-xs text-[#8A726C]">
                  {filteredProducts.length}{' '}
                  {filteredProducts.length === 1
                    ? text.savedProduct
                    : text.savedProductsPlural}
                </p>
              </div>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="rounded-2xl border border-[#E4D4CF] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <h3 className="truncate font-bold text-[#1B1C1C]">
                        {product.name}
                      </h3>

                      {product.category && (
                        <p className="mt-1 text-sm text-[#8A726C]">
                          {product.category}
                        </p>
                      )}

                    </div>

                    <button
                      type="button"
                      aria-label={`${text.removeProduct}: ${product.name}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#A03F28] transition hover:bg-[#FFF0EC]"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </article>
              ))}

            </div>

          </section>
        )}

        {/* Favorite businesses */}
        {filteredBusinesses.length > 0 && (
          <section>

            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DDF0ED] text-[#326460]">
                <Store size={19} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#1B1C1C]">
                  {text.favoriteBusinesses}
                </h2>

                <p className="mt-0.5 text-xs text-[#8A726C]">
                  {filteredBusinesses.length}{' '}
                  {filteredBusinesses.length === 1
                    ? text.savedBusiness
                    : text.savedBusinessesPlural}
                </p>
              </div>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {filteredBusinesses.map((business) => (
                <article
                  key={business.id}
                  className="rounded-2xl border border-[#E4D4CF] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <h3 className="truncate font-bold text-[#1B1C1C]">
                        {business.name}
                      </h3>

                      {business.category && (
                        <p className="mt-1 text-sm text-[#8A726C]">
                          {business.category}
                        </p>
                      )}

                    </div>

                    <button
                      type="button"
                      aria-label={`${text.removeBusiness}: ${business.name}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#A03F28] transition hover:bg-[#FFF0EC]"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                  <Link
                    to={`/customer/businesses/${business.id}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#326460] transition hover:text-[#244D4A]"
                  >
                    {text.viewStore}
                    <ChevronRight size={16} />
                  </Link>

                </article>
              ))}

            </div>

          </section>
        )}

      </div>

    )}

  </section>

  {/* Bottom navigation */}
  <section className="mt-7 rounded-2xl border border-[#E4D4CF] bg-gradient-to-r from-[#FFF9F6] to-[#F4F9F8] p-5 shadow-sm sm:p-6">

    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <div className="flex items-start gap-3">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2E0C3] text-[#695D46]">
          <Store size={20} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#1B1C1C]">
            {text.lookingForSomething}
          </h3>

          <p className="mt-1 text-xs leading-5 text-[#756763] sm:text-sm">
            {text.lookingDescription}
          </p>
        </div>

      </div>

      <Link
        to="/customer/businesses"
        className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#A03F28] bg-white px-4 py-2.5 text-sm font-bold text-[#A03F28] transition hover:bg-[#A03F28] hover:text-white"
      >
        {text.browseBusinesses}

        <ChevronRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>

    </div>

  </section>

</div>

)
}

export default CustomerFavoritesPage
