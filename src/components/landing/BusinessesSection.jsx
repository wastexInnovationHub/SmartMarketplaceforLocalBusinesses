import {
  Store,
  ShoppingBag,
  Utensils,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

function BusinessesSection() {
  const { language } = useLanguage()
  const isSwahili = language === 'sw'

  const businessTypes = [
    {
      icon: Store,
      title: isSwahili ? 'Maduka ya Ndani' : 'Local Shops',
      description: isSwahili
        ? 'Gundua bidhaa zinazotolewa na maduka na biashara za ndani kupitia soko moja.'
        : 'Discover products offered by local shops and businesses through one marketplace.',
    },
    {
      icon: Utensils,
      title: isSwahili ? 'Wauzaji wa Chakula' : 'Food Vendors',
      description: isSwahili
        ? 'Pata wauzaji wa chakula na chunguza bidhaa za chakula wanazotoa.'
        : 'Find food vendors and explore the food products they make available.',
    },
    {
      icon: ShoppingBag,
      title: isSwahili ? 'Bidhaa' : 'Products',
      description: isSwahili
        ? 'Vinjari bidhaa zinazopatikana na uchague kulingana na kile kinachotolewa na biashara za ndani.'
        : 'Browse available products and choose items based on what local businesses offer.',
    },
  ]

  return (
    <section
      id="businesses"
      className="scroll-mt-20 overflow-hidden bg-[#FCF9F8] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F2E0C3] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#326460] sm:text-sm">
            <Store size={17} />
            {isSwahili ? 'Soko la Ndani' : 'Local marketplace'}
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl lg:text-5xl">
            {isSwahili
              ? 'Gundua biashara zinazokuzunguka.'
              : 'Discover businesses around you.'}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#56423D] sm:text-lg sm:leading-8">
            {isSwahili
              ? 'JamiiMarket inaunganisha biashara za ndani, bidhaa, wauzaji wa chakula, wateja, na huduma za usafirishaji katika soko moja lililounganishwa.'
              : 'JamiiMarket brings local businesses, products, food vendors, customers, and delivery services together in one connected marketplace.'}
          </p>
        </div>

        {/* Main marketplace visual */}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Main image */}
          <div className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-[#DDC0BA] bg-[#F2E0C3] shadow-[0_20px_50px_-20px_rgba(160,63,40,0.2)] sm:min-h-[480px]">
            <img
              src="/images/local-businesses.png"
              alt={
                isSwahili
                  ? 'Biashara mbalimbali za ndani'
                  : 'Different local businesses'
              }
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

            {/* Image caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="max-w-lg">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#326460] backdrop-blur-sm">
                  <CheckCircle2 size={14} />
                  {isSwahili ? 'Biashara za ndani' : 'Local businesses'}
                </span>

                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                  {isSwahili
                    ? 'Mahali pa kugundua kile kinachopatikana karibu nawe.'
                    : 'A place to discover what local businesses have to offer.'}
                </h3>
              </div>
            </div>
          </div>

          {/* Supporting content */}
          <div className="flex flex-col gap-5">

            {/* Business owner image */}
            <div className="relative h-52 overflow-hidden rounded-[2rem] border border-[#DDC0BA] bg-[#F6F3F2] shadow-sm sm:h-64 lg:h-56">
              <img
                src="/images/business-owner.png"
                alt={
                  isSwahili
                    ? 'Mmiliki wa biashara ya ndani'
                    : 'Local business owner'
                }
                className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-sm font-bold text-white">
                  {isSwahili
                    ? 'Biashara zinapata nafasi ya kuonekana'
                    : 'Businesses get a place to be discovered'}
                </p>
              </div>
            </div>

            {/* Categories */}
            <div className="grid gap-3">
              {businessTypes.map((business) => {
                const Icon = business.icon

                return (
                  <article
                    key={business.title}
                    className="group rounded-2xl border border-[#DDC0BA] bg-[#F6F3F2] p-4 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_30px_-12px_rgba(160,63,40,0.2)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2E0C3] text-[#A03F28] transition duration-300 group-hover:bg-[#A03F28] group-hover:text-white">
                        <Icon size={20} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-[#1B1C1C]">
                          {business.title}
                        </h3>

                        <p className="mt-1 text-sm leading-5 text-[#56423D]">
                          {business.description}
                        </p>
                      </div>

                      <ArrowRight
                        size={18}
                        className="mt-1 shrink-0 text-[#DDC0BA] transition duration-300 group-hover:translate-x-1 group-hover:text-[#A03F28]"
                      />
                    </div>
                  </article>
                )
              })}
            </div>

          </div>
        </div>

        {/* Explore action */}
        <div className="mt-8 flex justify-center">
          <a
            href="/login"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#A03F28] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#812914] hover:shadow-md active:scale-[0.98]"
          >
            {isSwahili ? 'Gundua Soko' : 'Explore Marketplace'}
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Honest backend note */}
        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-[#DDC0BA] bg-[#F2E0C3]/50 p-5">
          <MapPin
            size={20}
            className="mt-0.5 shrink-0 text-[#A03F28]"
          />

          <p className="text-sm leading-6 text-[#56423D]">
            {isSwahili
              ? 'Upatikanaji wa biashara, bidhaa, maeneo, bei, na taarifa nyingine za soko vitaonyeshwa kutoka kwenye backend na hifadhidata iliyounganishwa zitakapopatikana.'
              : 'Business availability, products, locations, prices, and other marketplace information will be displayed from the connected backend and database when available.'}
          </p>
        </div>

      </div>
    </section>
  )
}

export default BusinessesSection

