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

function CustomerDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-1">

      {/* =====================================================
          WELCOME SECTION
      ===================================================== */}
      <section className="relative overflow-hidden rounded-3xl bg-[#A03F28] text-white shadow-[0_20px_50px_-25px_rgba(160,63,40,0.5)]">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

        <div className="pointer-events-none absolute -bottom-28 right-20 h-60 w-60 rounded-full bg-[#326460]/30" />

        <div className="relative px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">

          <div className="max-w-3xl">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider !text-[#F2E0C3] backdrop-blur-sm">
              <Sparkles
                size={15}
                className="!text-[#F2E0C3]"
              />

              <span className="!text-[#F2E0C3]">
                Customer Marketplace
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold tracking-tight !text-white sm:text-4xl lg:text-5xl">
              Welcome to JamiiMarket 👋
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-sm leading-6 !text-white/80 sm:text-base">
              Discover local businesses, products, food, crafts, and services
              available through the marketplace.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              {/* BROWSE BUSINESSES */}
              <Link
                to="/customer/businesses"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold !text-[#A03F28] shadow-md transition-all duration-200 hover:bg-[#FFF4F0] hover:shadow-lg active:scale-[0.98]"
              >
                <Search
                  size={18}
                  className="shrink-0 !text-[#A03F28]"
                />

                <span className="!text-[#A03F28]">
                  Browse Marketplace
                </span>

                <ArrowRight
                  size={17}
                  className="shrink-0 !text-[#A03F28] transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>


              {/* FAVORITES */}
              <Link
                to="/customer/favorites"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-semibold !text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 active:scale-[0.98]"
              >
                <Heart
                  size={18}
                  className="shrink-0 !text-white"
                />

                <span className="!text-white">
                  My Favorites
                </span>
              </Link>

            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          QUICK ACCESS
      ===================================================== */}
      <section>

        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.15em] !text-[#326460]">
            Quick access
          </p>

          <h2 className="mt-1.5 text-2xl font-bold !text-[#1B1C1C]">
            What would you like to do?
          </h2>
        </div>


        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {/* =================================================
              BUSINESSES
          ================================================= */}
          <Link
            to="/customer/businesses"
            className="group rounded-2xl border border-[#E4D4CF] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#A03F28] hover:shadow-lg"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0EB] !text-[#A03F28] transition-all duration-200 group-hover:bg-[#A03F28] group-hover:!text-white">

              <Store
                size={22}
                className="!text-current"
              />

            </div>

            <h3 className="mt-5 text-base font-bold !text-[#1B1C1C]">
              Businesses
            </h3>

            <p className="mt-2 text-sm leading-5 !text-[#695D46]">
              Discover local businesses and their marketplace listings.
            </p>

            <div className="mt-5 flex items-center gap-1 text-xs font-bold !text-[#A03F28]">
              <span className="!text-[#A03F28]">
                Explore businesses
              </span>

              <ArrowRight
                size={14}
                className="!text-[#A03F28] transition-transform group-hover:translate-x-1"
              />
            </div>

          </Link>


          {/* =================================================
              ORDERS
          ================================================= */}
          <Link
            to="/customer/orders"
            className="group rounded-2xl border border-[#E4D4CF] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#326460] hover:shadow-lg"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9F3F1] !text-[#326460] transition-all duration-200 group-hover:bg-[#326460] group-hover:!text-white">

              <ShoppingBag
                size={22}
                className="!text-current"
              />

            </div>

            <h3 className="mt-5 text-base font-bold !text-[#1B1C1C]">
              My Orders
            </h3>

            <p className="mt-2 text-sm leading-5 !text-[#695D46]">
              View and track your marketplace orders in one place.
            </p>

            <div className="mt-5 flex items-center gap-1 text-xs font-bold !text-[#326460]">

              <span className="!text-[#326460]">
                View orders
              </span>

              <ArrowRight
                size={14}
                className="!text-[#326460] transition-transform group-hover:translate-x-1"
              />

            </div>

          </Link>


          {/* =================================================
              FAVORITES
          ================================================= */}
          <Link
            to="/customer/favorites"
            className="group rounded-2xl border border-[#E4D4CF] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#A03F28] hover:shadow-lg"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2E0C3] !text-[#695D46] transition-all duration-200 group-hover:bg-[#695D46] group-hover:!text-white">

              <Heart
                size={22}
                className="!text-current"
              />

            </div>

            <h3 className="mt-5 text-base font-bold !text-[#1B1C1C]">
              Favorites
            </h3>

            <p className="mt-2 text-sm leading-5 !text-[#695D46]">
              Keep your favorite products and businesses in one place.
            </p>

            <div className="mt-5 flex items-center gap-1 text-xs font-bold !text-[#695D46]">

              <span className="!text-[#695D46]">
                View favorites
              </span>

              <ArrowRight
                size={14}
                className="!text-[#695D46] transition-transform group-hover:translate-x-1"
              />

            </div>

          </Link>


          {/* =================================================
              PROFILE
          ================================================= */}
          <Link
            to="/customer/profile"
            className="group rounded-2xl border border-[#E4D4CF] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#326460] hover:shadow-lg"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9F3F1] !text-[#326460] transition-all duration-200 group-hover:bg-[#326460] group-hover:!text-white">

              <UserRound
                size={22}
                className="!text-current"
              />

            </div>

            <h3 className="mt-5 text-base font-bold !text-[#1B1C1C]">
              My Profile
            </h3>

            <p className="mt-2 text-sm leading-5 !text-[#695D46]">
              Manage your customer account and personal information.
            </p>

            <div className="mt-5 flex items-center gap-1 text-xs font-bold !text-[#326460]">

              <span className="!text-[#326460]">
                Open profile
              </span>

              <ArrowRight
                size={14}
                className="!text-[#326460] transition-transform group-hover:translate-x-1"
              />

            </div>

          </Link>

        </div>
      </section>


      {/* =====================================================
          MARKETPLACE SECTION
      ===================================================== */}
      <section className="rounded-2xl border border-[#E4D4CF] bg-white p-6 shadow-sm sm:p-7">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0EB]">
                <Store
                  size={20}
                  className="!text-[#A03F28]"
                />
              </div>

              <h2 className="text-xl font-bold !text-[#1B1C1C]">
                Explore the Marketplace
              </h2>

            </div>

            <p className="mt-3 max-w-2xl text-sm leading-6 !text-[#695D46]">
              Find businesses and explore the products and services they make
              available through JamiiMarket.
            </p>

          </div>


          {/* IMPORTANT:
              SAME ROUTE AS THE OTHER BUSINESS LINKS
          */}
          <Link
            to="/customer/businesses"
            className="group inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#A03F28] px-5 py-3 text-sm font-bold !text-white shadow-sm transition-all duration-200 hover:bg-[#812914] hover:shadow-md active:scale-[0.98]"
          >

            <Search
              size={18}
              className="!text-white"
            />

            <span className="!text-white">
              Browse Marketplace
            </span>

            <ArrowRight
              size={17}
              className="!text-white transition-transform group-hover:translate-x-1"
            />

          </Link>

        </div>


        {/* Marketplace features */}
        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Businesses */}
          <div className="rounded-xl bg-[#FFF7F4] p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFE8E0]">
              <Store
                size={19}
                className="!text-[#A03F28]"
              />
            </div>

            <h3 className="mt-4 font-bold !text-[#1B1C1C]">
              Local Businesses
            </h3>

            <p className="mt-1.5 text-sm leading-5 !text-[#695D46]">
              Explore businesses participating in the marketplace.
            </p>

          </div>


          {/* Discover */}
          <div className="rounded-xl bg-[#F2F8F7] p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DDEDEA]">
              <Search
                size={19}
                className="!text-[#326460]"
              />
            </div>

            <h3 className="mt-4 font-bold !text-[#1B1C1C]">
              Discover
            </h3>

            <p className="mt-1.5 text-sm leading-5 !text-[#695D46]">
              Search and discover available marketplace listings.
            </p>

          </div>


          {/* Favorites */}
          <div className="rounded-xl bg-[#FBF7EF] p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2E0C3]">
              <Heart
                size={19}
                className="!text-[#695D46]"
              />
            </div>

            <h3 className="mt-4 font-bold !text-[#1B1C1C]">
              Save Favorites
            </h3>

            <p className="mt-1.5 text-sm leading-5 !text-[#695D46]">
              Save businesses and products you want to find again.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          RECENT ACTIVITY
      ===================================================== */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* ===================================================
            ORDERS
        =================================================== */}
        <div className="rounded-2xl border border-[#E4D4CF] bg-white p-6 shadow-sm">

          <div className="flex items-start justify-between">

            <div>
              <h2 className="text-lg font-bold !text-[#1B1C1C]">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm !text-[#695D46]">
                Your latest marketplace orders will appear here.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E9F3F1]">
              <ShoppingBag
                size={19}
                className="!text-[#326460]"
              />
            </div>

          </div>


          <div className="mt-5 rounded-xl border border-dashed border-[#DCCBC6] bg-[#FCF9F8] px-5 py-9 text-center">

            <ShoppingBag
              size={27}
              className="mx-auto !text-[#9A837C]"
            />

            <p className="mt-3 text-sm font-bold !text-[#1B1C1C]">
              No orders yet
            </p>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 !text-[#695D46]">
              When you place an order, its status and details will appear here.
            </p>

            <Link
              to="/customer/businesses"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold !text-[#A03F28] hover:underline"
            >
              <span className="!text-[#A03F28]">
                Start browsing
              </span>

              <ArrowRight
                size={13}
                className="!text-[#A03F28]"
              />
            </Link>

          </div>

        </div>


        {/* ===================================================
            FAVORITES
        =================================================== */}
        <div className="rounded-2xl border border-[#E4D4CF] bg-white p-6 shadow-sm">

          <div className="flex items-start justify-between">

            <div>
              <h2 className="text-lg font-bold !text-[#1B1C1C]">
                Your Favorites
              </h2>

              <p className="mt-1 text-sm !text-[#695D46]">
                Businesses and products you save will appear here.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF0EB]">
              <Heart
                size={19}
                className="!text-[#A03F28]"
              />
            </div>

          </div>


          <div className="mt-5 rounded-xl border border-dashed border-[#DCCBC6] bg-[#FCF9F8] px-5 py-9 text-center">

            <Heart
              size={27}
              className="mx-auto !text-[#9A837C]"
            />

            <p className="mt-3 text-sm font-bold !text-[#1B1C1C]">
              No favorites yet
            </p>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 !text-[#695D46]">
              Browse the marketplace and save businesses or products you like.
            </p>

            <Link
              to="/customer/favorites"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold !text-[#A03F28] hover:underline"
            >
              <span className="!text-[#A03F28]">
                Find favorites
              </span>

              <ArrowRight
                size={13}
                className="!text-[#A03F28]"
              />
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL DISCOVERY CARD
      ===================================================== */}
      <section className="rounded-2xl border border-[#E4D4CF] bg-gradient-to-r from-[#FFF9F6] to-[#F4F9F8] p-6 shadow-sm sm:p-7">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F2E0C3]">
            <Store
              size={22}
              className="!text-[#695D46]"
            />
          </div>

          <div className="flex-1">

            <h2 className="text-sm font-bold !text-[#1B1C1C]">
              Ready to explore?
            </h2>

            <p className="mt-1 text-xs leading-5 !text-[#695D46] sm:text-sm">
              Browse the available businesses and marketplace content
              provided by the system.
            </p>

          </div>

          <Link
            to="/customer/businesses"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#326460] px-5 py-3 text-sm font-bold !text-white shadow-sm transition-all duration-200 hover:bg-[#264D4A] hover:shadow-md active:scale-[0.98]"
          >

            <span className="!text-white">
              Explore Businesses
            </span>

            <ArrowRight
              size={16}
              className="!text-white transition-transform group-hover:translate-x-1"
            />

          </Link>

        </div>

      </section>

    </div>
  )
}

export default CustomerDashboardPage

