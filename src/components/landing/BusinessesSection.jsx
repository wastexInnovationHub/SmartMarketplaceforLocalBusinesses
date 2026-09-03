import {
  Store,
  ShoppingBag,
  Utensils,
  MapPin,
  ArrowRight,
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
      className="scroll-mt-20 bg-[#FCF9F8] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Introduction */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#326460]">
              {isSwahili ? 'Soko la Ndani' : 'Local marketplace'}
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl lg:text-5xl">
              {isSwahili
                ? 'Gundua biashara zinazokuzunguka.'
                : 'Discover businesses around you.'}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#56423D] sm:text-lg sm:leading-8">
              {isSwahili
                ? 'JamiiMarket inaunganisha biashara za ndani, bidhaa, wauzaji wa chakula, wateja, na huduma za usafirishaji katika soko moja lililounganishwa.'
                : 'JamiiMarket brings local businesses, products, food vendors, customers, and delivery services together in one connected marketplace.'}
            </p>

            <a
              href="/login"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#A03F28] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#812914]"
            >
              {isSwahili ? 'Gundua Soko' : 'Explore Marketplace'}
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Business categories */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {businessTypes.map((business) => {
              const Icon = business.icon

              return (
                <div
                  key={business.title}
                  className="rounded-3xl border border-[#DDC0BA] bg-[#F6F3F2] p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_35px_-15px_rgba(160,63,40,0.2)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F2E0C3] text-[#A03F28]">
                      <Icon size={23} />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#1B1C1C]">
                        {business.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#56423D]">
                        {business.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Location note */}
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

