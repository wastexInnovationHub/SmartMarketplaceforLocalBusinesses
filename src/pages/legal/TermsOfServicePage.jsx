
import { Link } from 'react-router-dom'
import LandingHeader from '../../components/landing/LandingHeader'
import LandingFooter from '../../components/landing/LandingFooter'

function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FCF9F8] text-[#1B1C1C]">
      <LandingHeader />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-[#F2E0C3] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#326460]">
              Legal
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Terms of Service
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#56423D]">
              These terms explain the basic rules for using JamiiMarket and
              participating in its local marketplace.
            </p>

            <p className="mt-4 text-sm text-[#7A706C]">
              Last updated: August 31, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-4xl space-y-10">

            <article>
              <h2 className="text-2xl font-bold">
                1. About JamiiMarket
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                JamiiMarket is a local marketplace platform designed to
                connect customers, businesses, food vendors, delivery riders,
                and other participants in local commerce.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                2. Creating an Account
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                You must provide accurate information when creating an
                account. You are responsible for keeping your login
                credentials secure and for activities performed through your
                account.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                3. User Roles
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                JamiiMarket may support different account types, including
                customers, businesses, and delivery riders. Your account role
                is determined by the platform based on your account
                information and registration details.
              </p>

              <p className="mt-3 leading-7 text-[#56423D]">
                Business and delivery-rider accounts may require administrative
                approval before they can access certain platform features.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                4. Businesses and Products
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                Businesses are responsible for the accuracy of information
                they provide about their business, products, prices,
                availability, and services.
              </p>

              <p className="mt-3 leading-7 text-[#56423D]">
                Businesses must only list products and services that they are
                legally permitted to sell or provide.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                5. Delivery Riders
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                Delivery riders must provide accurate information during
                registration. Rider accounts may require approval by an
                administrator before delivery services can be performed
                through the platform.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                6. Orders and Transactions
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                Orders, payments, cancellations, refunds, and delivery
                arrangements may be subject to additional rules displayed
                during the relevant transaction.
              </p>

              <p className="mt-3 leading-7 text-[#56423D]">
                Users should review order information carefully before
                confirming a transaction.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                7. Prohibited Activities
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                Users must not use JamiiMarket for unlawful activities,
                fraudulent transactions, misleading listings, unauthorized
                access, harassment, or activities that could harm other users
                or the platform.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                8. Account Suspension
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                JamiiMarket may restrict, suspend, or terminate an account
                where there is a reasonable basis to believe that the account
                has violated these terms, applicable rules, or platform
                requirements.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                9. Platform Changes
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                JamiiMarket may add, modify, or remove features as the
                platform develops. Important changes to these terms may be
                communicated through the platform.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                10. Contact
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                If you need assistance with JamiiMarket, please contact the
                support team using the available support channels on the
                platform.
              </p>
            </article>

            {/* Navigation */}
            <div className="border-t border-[#DDC0BA] pt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/privacy"
                  className="rounded-full bg-[#A03F28] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#812914]"
                >
                  Read Privacy Policy
                </Link>

                <Link
                  to="/"
                  className="rounded-full border border-[#A03F28] px-6 py-3 text-center text-sm font-semibold text-[#A03F28] transition hover:bg-[#F5E5DF]"
                >
                  Back to Home
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}

export default TermsOfServicePage

