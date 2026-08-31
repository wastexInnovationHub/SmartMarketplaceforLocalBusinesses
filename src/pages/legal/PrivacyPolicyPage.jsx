import { Link } from 'react-router-dom'
import LandingHeader from '../../components/landing/LandingHeader'
import LandingFooter from '../../components/landing/LandingFooter'

function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#56423D]">
              This policy explains how information may be collected and used
              when you use JamiiMarket.
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
                1. Information We May Collect
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                Depending on how you use JamiiMarket, the platform may collect
                information such as your name, phone number, email address,
                account information, business information, and information
                needed to provide marketplace services.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                2. Location Information
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                JamiiMarket may request access to your device location to
                support location-based marketplace features, such as finding
                nearby businesses, improving delivery coordination, or
                providing relevant local services.
              </p>

              <p className="mt-3 leading-7 text-[#56423D]">
                Location access requires your permission through your device
                or browser. You can deny or disable location access through
                your device or browser settings.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                3. How Information Is Used
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                Information may be used to create and manage accounts,
                authenticate users, provide marketplace services, process
                orders, support delivery activities, communicate with users,
                improve the platform, and maintain platform security.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                4. Business Information
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                Businesses may provide information such as business name,
                category, location, contact details, products, and services.
                Some of this information may be displayed publicly to help
                customers discover and interact with local businesses.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                5. Sharing Information
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                Information may be shared when necessary to provide requested
                marketplace services, process transactions, coordinate
                deliveries, maintain security, comply with legal requirements,
                or operate supporting technical services.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                6. Account Security
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                Users should protect their passwords and account credentials.
                Do not share your password with other people. If you believe
                that your account has been accessed without authorization,
                contact the support team as soon as possible.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                7. Cookies and Technical Data
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                The platform may use cookies, local storage, logs, and similar
                technical mechanisms where necessary to maintain sessions,
                remember settings, improve functionality, and understand
                platform performance.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                8. Data Retention
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                Information may be retained for as long as reasonably
                necessary to provide services, maintain records, resolve
                disputes, improve security, or meet applicable legal and
                operational requirements.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                9. Your Choices
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                You may control certain information through your account
                settings and device permissions. You may also contact
                JamiiMarket support regarding questions about your personal
                information.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                10. Policy Updates
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                This Privacy Policy may be updated as JamiiMarket develops.
                The updated version will be made available through the
                platform.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold">
                11. Contact
              </h2>

              <p className="mt-3 leading-7 text-[#56423D]">
                For privacy or account questions, please contact JamiiMarket
                support through the available support channels.
              </p>
            </article>

            {/* Navigation */}
            <div className="border-t border-[#DDC0BA] pt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/terms"
                  className="rounded-full bg-[#A03F28] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#812914]"
                >
                  Read Terms of Service
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

export default PrivacyPolicyPage

