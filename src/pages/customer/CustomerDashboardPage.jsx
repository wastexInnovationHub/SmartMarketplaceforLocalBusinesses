import {
ArrowRight,
Heart,
Search,
ShoppingBag,
Sparkles,
Store,
UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'

function CustomerDashboardPage() {
const { language } = useLanguage()

const isSwahili = language === 'sw'

const text = {
marketplaceBadge: isSwahili
? 'Soko la Mteja'
: 'Customer Marketplace',


welcome: isSwahili
  ? 'Karibu JamiiMarket'
  : 'Welcome to JamiiMarket',

welcomeDescription: isSwahili
  ? 'Gundua biashara za ndani, bidhaa, chakula, kazi za mikono, na huduma zinazopatikana kupitia soko.'
  : 'Discover local businesses, products, food, crafts, and services available through the marketplace.',

browseMarketplace: isSwahili
  ? 'Angalia Soko'
  : 'Browse Marketplace',

myFavorites: isSwahili
  ? 'Ninavyovipenda'
  : 'My Favorites',

quickAccess: isSwahili
  ? 'Ufikiaji wa Haraka'
  : 'Quick Access',

whatWouldYouLikeToDo: isSwahili
  ? 'Ungependa kufanya nini?'
  : 'What would you like to do?',

businesses: isSwahili
  ? 'Biashara'
  : 'Businesses',

discoverLocalBusinesses: isSwahili
  ? 'Gundua biashara za ndani na angalia bidhaa na huduma wanazotoa.'
  : 'Discover local businesses and explore their available products and services.',

exploreBusinesses: isSwahili
  ? 'Angalia Biashara'
  : 'Explore Businesses',

myOrders: isSwahili
  ? 'Oda Zangu'
  : 'My Orders',

viewTrackOrders: isSwahili
  ? 'Angalia na fuatilia oda zako za soko katika sehemu moja.'
  : 'View and track your marketplace orders in one place.',

viewOrders: isSwahili
  ? 'Angalia Oda'
  : 'View Orders',

favorites: isSwahili
  ? 'Ninavyovipenda'
  : 'Favorites',

saveBusinessesProducts: isSwahili
  ? 'Hifadhi biashara na bidhaa unazopenda ili uzipate tena kwa urahisi.'
  : 'Save businesses and products that you want to find again.',

viewFavorites: isSwahili
  ? 'Angalia Ninavyovipenda'
  : 'View Favorites',

myProfile: isSwahili
  ? 'Wasifu Wangu'
  : 'My Profile',

manageCustomerAccount: isSwahili
  ? 'Simamia akaunti yako na taarifa zako binafsi.'
  : 'Manage your customer account and personal information.',

openProfile: isSwahili
  ? 'Fungua Wasifu'
  : 'Open Profile',

exploreTheMarketplace: isSwahili
  ? 'Chunguza Soko'
  : 'Explore the Marketplace',

marketplaceIntroduction: isSwahili
  ? 'Gundua biashara za ndani zinazoshiriki na angalia bidhaa na huduma wanazopatikana kupitia JamiiMarket.'
  : 'Discover participating local businesses and explore the products and services they make available through JamiiMarket.',

localBusinesses: isSwahili
  ? 'Biashara za Ndani'
  : 'Local Businesses',

exploreParticipatingBusinesses: isSwahili
  ? 'Angalia biashara za ndani zinazoshiriki kwenye soko.'
  : 'Explore businesses participating in the marketplace.',

searchAndDiscover: isSwahili
  ? 'Tafuta na Gundua'
  : 'Search & Discover',

searchBusinessesDescription: isSwahili
  ? 'Tafuta biashara kwa jina, maelezo, au aina ya biashara.'
  : 'Search businesses by name, description, or category.',

saveFavorites: isSwahili
  ? 'Hifadhi Unavyovipenda'
  : 'Save Favorites',

saveFavoritesDescription: isSwahili
  ? 'Hifadhi biashara na bidhaa unazopenda ili uzipate kwa urahisi baadaye.'
  : 'Keep businesses and products you like easy to find.',

recentOrders: isSwahili
  ? 'Oda za Hivi Karibuni'
  : 'Recent Orders',

recentOrdersDescription: isSwahili
  ? 'Oda zako mpya za soko zitaonekana hapa.'
  : 'Your latest marketplace orders will appear here.',

noOrdersYet: isSwahili
  ? 'Bado Huna Oda'
  : 'No Orders Yet',

ordersWillAppearHere: isSwahili
  ? 'Oda utakazoweka kupitia soko zitaonekana hapa pamoja na hali na maelezo yake.'
  : 'Orders you place through the marketplace will appear here with their current status and details.',

startBrowsing: isSwahili
  ? 'Anza Kuangalia'
  : 'Start Browsing',

yourFavorites: isSwahili
  ? 'Ninavyovipenda'
  : 'Your Favorites',

favoritesWillAppearHere: isSwahili
  ? 'Biashara na bidhaa utakazohifadhi zitaonekana hapa.'
  : 'Businesses and products you save will appear here.',

noFavoritesYet: isSwahili
  ? 'Bado Hujahifadhi Unavyovipenda'
  : 'No Favorites Yet',

browseAndSaveFavorites: isSwahili
  ? 'Angalia soko na uhifadhi biashara au bidhaa unazotaka kuzipata tena.'
  : 'Browse the marketplace and save businesses or products you want to find again.',

browseBusinesses: isSwahili
  ? 'Angalia Biashara'
  : 'Browse Businesses',

readyToExplore: isSwahili
  ? 'Uko Tayari Kuchunguza?'
  : 'Ready to Explore?',

exploreRealMarketplaceBusinesses: isSwahili
  ? 'Angalia biashara halisi zinazopatikana kwenye soko na chunguza bidhaa na huduma wanazotoa.'
  : 'Browse real marketplace businesses and explore the products and services they make available.',


}

return ( <div className="mx-auto w-full max-w-7xl space-y-8 px-1">


  {/* Welcome section */}
  <section className="relative overflow-hidden rounded-3xl bg-[#A03F28] text-white shadow-[0_20px_50px_-25px_rgba(160,63,40,0.5)]">

    {/* Decorative background shapes */}
    <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

    <div className="pointer-events-none absolute -bottom-28 right-20 h-60 w-60 rounded-full bg-[#326460]/30" />

    <div className="relative px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">

      <div className="max-w-3xl">

        {/* Marketplace badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#F2E0C3] backdrop-blur-sm">

          <Sparkles
            size={15}
            className="text-[#F2E0C3]"
          />

          <span className="text-[#F2E0C3]">
            {text.marketplaceBadge}
          </span>

        </div>

        {/* Welcome heading */}
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {text.welcome} 👋
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
          {text.welcomeDescription}
        </p>

        {/* Main customer actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          {/* Browse marketplace */}
          <Link
            to="/customer/businesses"
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#A03F28] shadow-md transition-all duration-200 hover:bg-[#FFF4F0] hover:shadow-lg active:scale-[0.98]"
          >
            <Search
              size={18}
              className="shrink-0 text-[#A03F28]"
            />

            <span className="text-[#A03F28]">
              {text.browseMarketplace}
            </span>

            <ArrowRight
              size={17}
              className="shrink-0 text-[#A03F28] transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          {/* Favorites */}
          <Link
            to="/customer/favorites"
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 active:scale-[0.98]"
          >
            <Heart
              size={18}
              className="shrink-0 text-white"
            />

            <span className="text-white">
              {text.myFavorites}
            </span>
          </Link>

        </div>
      </div>
    </div>
  </section>

  {/* Quick access */}
  <section>

    <div className="mb-5">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#326460]">
        {text.quickAccess}
      </p>

      <h2 className="mt-1.5 text-2xl font-bold text-[#1B1C1C]">
        {text.whatWouldYouLikeToDo}
      </h2>
    </div>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

      {/* Businesses */}
      <Link
        to="/customer/businesses"
        className="group rounded-2xl border border-[#E4D4CF] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#A03F28] hover:shadow-lg"
      >

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0EB] text-[#A03F28] transition-all duration-200 group-hover:bg-[#A03F28] group-hover:text-white">

          <Store
            size={22}
            className="text-current"
          />

        </div>

        <h3 className="mt-5 text-base font-bold text-[#1B1C1C]">
          {text.businesses}
        </h3>

        <p className="mt-2 text-sm leading-5 text-[#695D46]">
          {text.discoverLocalBusinesses}
        </p>

        <div className="mt-5 flex items-center gap-1 text-xs font-bold text-[#A03F28]">

          <span className="text-[#A03F28]">
            {text.exploreBusinesses}
          </span>

          <ArrowRight
            size={14}
            className="text-[#A03F28] transition-transform group-hover:translate-x-1"
          />

        </div>

      </Link>

      {/* Orders */}
      <Link
        to="/customer/orders"
        className="group rounded-2xl border border-[#E4D4CF] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#326460] hover:shadow-lg"
      >

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9F3F1] text-[#326460] transition-all duration-200 group-hover:bg-[#326460] group-hover:text-white">

          <ShoppingBag
            size={22}
            className="text-current"
          />

        </div>

        <h3 className="mt-5 text-base font-bold text-[#1B1C1C]">
          {text.myOrders}
        </h3>

        <p className="mt-2 text-sm leading-5 text-[#695D46]">
          {text.viewTrackOrders}
        </p>

        <div className="mt-5 flex items-center gap-1 text-xs font-bold text-[#326460]">

          <span className="text-[#326460]">
            {text.viewOrders}
          </span>

          <ArrowRight
            size={14}
            className="text-[#326460] transition-transform group-hover:translate-x-1"
          />

        </div>

      </Link>

      {/* Favorites */}
      <Link
        to="/customer/favorites"
        className="group rounded-2xl border border-[#E4D4CF] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#A03F28] hover:shadow-lg"
      >

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2E0C3] text-[#695D46] transition-all duration-200 group-hover:bg-[#695D46] group-hover:text-white">

          <Heart
            size={22}
            className="text-current"
          />

        </div>

        <h3 className="mt-5 text-base font-bold text-[#1B1C1C]">
          {text.favorites}
        </h3>

        <p className="mt-2 text-sm leading-5 text-[#695D46]">
          {text.saveBusinessesProducts}
        </p>

        <div className="mt-5 flex items-center gap-1 text-xs font-bold text-[#695D46]">

          <span className="text-[#695D46]">
            {text.viewFavorites}
          </span>

          <ArrowRight
            size={14}
            className="text-[#695D46] transition-transform group-hover:translate-x-1"
          />

        </div>

      </Link>

      {/* Customer profile */}
      <Link
        to="/customer/profile"
        className="group rounded-2xl border border-[#E4D4CF] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#326460] hover:shadow-lg"
      >

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9F3F1] text-[#326460] transition-all duration-200 group-hover:bg-[#326460] group-hover:text-white">

          <UserRound
            size={22}
            className="text-current"
          />

        </div>

        <h3 className="mt-5 text-base font-bold text-[#1B1C1C]">
          {text.myProfile}
        </h3>

        <p className="mt-2 text-sm leading-5 text-[#695D46]">
          {text.manageCustomerAccount}
        </p>

        <div className="mt-5 flex items-center gap-1 text-xs font-bold text-[#326460]">

          <span className="text-[#326460]">
            {text.openProfile}
          </span>

          <ArrowRight
            size={14}
            className="text-[#326460] transition-transform group-hover:translate-x-1"
          />

        </div>

      </Link>

    </div>
  </section>

  {/* Marketplace introduction */}
  <section className="rounded-2xl border border-[#E4D4CF] bg-white p-6 shadow-sm sm:p-7">

    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

      <div>

        <div className="flex items-center gap-2">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0EB]">
            <Store
              size={20}
              className="text-[#A03F28]"
            />
          </div>

          <h2 className="text-xl font-bold text-[#1B1C1C]">
            {text.exploreTheMarketplace}
          </h2>

        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#695D46]">
          {text.marketplaceIntroduction}
        </p>

      </div>

      {/* Marketplace navigation */}
      <Link
        to="/customer/businesses"
        className="group inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#A03F28] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#812914] hover:shadow-md active:scale-[0.98]"
      >

        <Search
          size={18}
          className="text-white"
        />

        <span className="text-white">
          {text.browseMarketplace}
        </span>

        <ArrowRight
          size={17}
          className="text-white transition-transform group-hover:translate-x-1"
        />

      </Link>

    </div>

    {/* Marketplace features */}
    <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">

      {/* Local businesses */}
      <div className="rounded-xl bg-[#FFF7F4] p-5">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFE8E0]">
          <Store
            size={19}
            className="text-[#A03F28]"
          />
        </div>

        <h3 className="mt-4 font-bold text-[#1B1C1C]">
          {text.localBusinesses}
        </h3>

        <p className="mt-1.5 text-sm leading-5 text-[#695D46]">
          {text.exploreParticipatingBusinesses}
        </p>

      </div>

      {/* Search and discovery */}
      <div className="rounded-xl bg-[#F2F8F7] p-5">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DDEDEA]">
          <Search
            size={19}
            className="text-[#326460]"
          />
        </div>

        <h3 className="mt-4 font-bold text-[#1B1C1C]">
          {text.searchAndDiscover}
        </h3>

        <p className="mt-1.5 text-sm leading-5 text-[#695D46]">
          {text.searchBusinessesDescription}
        </p>

      </div>

      {/* Favorites */}
      <div className="rounded-xl bg-[#FBF7EF] p-5">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2E0C3]">
          <Heart
            size={19}
            className="text-[#695D46]"
          />
        </div>

        <h3 className="mt-4 font-bold text-[#1B1C1C]">
          {text.saveFavorites}
        </h3>

        <p className="mt-1.5 text-sm leading-5 text-[#695D46]">
          {text.saveFavoritesDescription}
        </p>

      </div>

    </div>
  </section>

  {/* Recent customer activity */}
  <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">

    {/* Recent orders */}
    <div className="rounded-2xl border border-[#E4D4CF] bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div>
          <h2 className="text-lg font-bold text-[#1B1C1C]">
            {text.recentOrders}
          </h2>

          <p className="mt-1 text-sm text-[#695D46]">
            {text.recentOrdersDescription}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E9F3F1]">
          <ShoppingBag
            size={19}
            className="text-[#326460]"
          />
        </div>

      </div>

      {/* Empty orders state */}
      <div className="mt-5 rounded-xl border border-dashed border-[#DCCBC6] bg-[#FCF9F8] px-5 py-9 text-center">

        <ShoppingBag
          size={27}
          className="mx-auto text-[#9A837C]"
        />

        <p className="mt-3 text-sm font-bold text-[#1B1C1C]">
          {text.noOrdersYet}
        </p>

        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#695D46]">
          {text.ordersWillAppearHere}
        </p>

        <Link
          to="/customer/businesses"
          className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#A03F28] hover:underline"
        >
          <span className="text-[#A03F28]">
            {text.startBrowsing}
          </span>

          <ArrowRight
            size={13}
            className="text-[#A03F28]"
          />
        </Link>

      </div>
    </div>

    {/* Favorite items */}
    <div className="rounded-2xl border border-[#E4D4CF] bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div>
          <h2 className="text-lg font-bold text-[#1B1C1C]">
            {text.yourFavorites}
          </h2>

          <p className="mt-1 text-sm text-[#695D46]">
            {text.favoritesWillAppearHere}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF0EB]">
          <Heart
            size={19}
            className="text-[#A03F28]"
          />
        </div>

      </div>

      {/* Empty favorites state */}
      <div className="mt-5 rounded-xl border border-dashed border-[#DCCBC6] bg-[#FCF9F8] px-5 py-9 text-center">

        <Heart
          size={27}
          className="mx-auto text-[#9A837C]"
        />

        <p className="mt-3 text-sm font-bold text-[#1B1C1C]">
          {text.noFavoritesYet}
        </p>

        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#695D46]">
          {text.browseAndSaveFavorites}
        </p>

        <Link
          to="/customer/businesses"
          className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#A03F28] hover:underline"
        >
          <span className="text-[#A03F28]">
            {text.browseBusinesses}
          </span>

          <ArrowRight
            size={13}
            className="text-[#A03F28]"
          />
        </Link>

      </div>
    </div>

  </section>

  {/* Final marketplace call to action */}
  <section className="rounded-2xl border border-[#E4D4CF] bg-gradient-to-r from-[#FFF9F6] to-[#F4F9F8] p-6 shadow-sm sm:p-7">

    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F2E0C3]">
        <Store
          size={22}
          className="text-[#695D46]"
        />
      </div>

      <div className="flex-1">

        <h2 className="text-sm font-bold text-[#1B1C1C]">
          {text.readyToExplore}
        </h2>

        <p className="mt-1 text-xs leading-5 text-[#695D46] sm:text-sm">
          {text.exploreRealMarketplaceBusinesses}
        </p>

      </div>

      <Link
        to="/customer/businesses"
        className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#326460] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#264D4A] hover:shadow-md active:scale-[0.98]"
      >

        <span className="text-white">
          {text.exploreBusinesses}
        </span>

        <ArrowRight
          size={16}
          className="text-white transition-transform group-hover:translate-x-1"
        />

      </Link>

    </div>
  </section>

</div>

)
}

export default CustomerDashboardPage
