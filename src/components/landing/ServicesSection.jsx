import {
  ShoppingCart,
  Store,
  Truck,
  Users,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

function ServicesSection() {
  const { language } = useLanguage()
  const isSwahili = language === 'sw'

  const services = [
    {
      icon: ShoppingCart,
      title: isSwahili ? 'Soko la Bidhaa' : 'Marketplace',
      description: isSwahili
        ? 'Vinjari bidhaa na huduma zinazotolewa na biashara za ndani zinazoshiriki.'
        : 'Browse products and services made available by participating local businesses.',
    },
    {
      icon: Store,
      title: isSwahili ? 'Uwepo wa Biashara' : 'Business Presence',
      description: isSwahili
        ? 'Nafasi ya kidijitali kwa biashara za ndani kuwasilisha bidhaa na huduma zinazopatikana.'
        : 'A digital space for local businesses to present their available products and services.',
    },
    {
      icon: Truck,
      title: isSwahili ? 'Usafirishaji' : 'Delivery',
      description: isSwahili
        ? 'Unganisha oda na chaguo zinazopatikana za usafirishaji kupitia soko.'
        : 'Connect orders with available delivery options through the marketplace.',
    },
    {
      icon: Users,
      title: isSwahili ? 'Jamii' : 'Community',
      description: isSwahili
        ? 'Jenga mazingira yaliyounganishwa ambapo wateja na biashara za ndani wanaweza kuwasiliana.'
        : 'Create a connected environment where customers and local businesses can interact.',
    },
  ]

  return (
    <section
      id="services"
      className="scroll-mt-20 bg-[#F6F3F2] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#326460]">
              {isSwahili ? 'Tunachotoa' : 'What we provide'}
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl lg:text-5xl">
              {isSwahili
                ? 'Kila kitu muhimu kwa biashara ya ndani, pamoja.'
                : 'The essential pieces of local commerce, together.'}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#56423D] sm:text-lg sm:leading-8">
              {isSwahili
                ? 'JamiiMarket inaunganisha biashara, bidhaa, wateja na huduma za soko katika uzoefu mmoja wa kidijitali.'
                : 'JamiiMarket brings businesses, products, customers, and marketplace services together in one digital experience.'}
            </p>
          </div>

          <div className="hidden rounded-full border border-[#DDC0BA] bg-[#FCF9F8] px-5 py-3 text-sm font-medium text-[#326460] lg:block">
            {isSwahili ? 'Imejengwa kwa jamii' : 'Built around the community'}
          </div>
        </div>

        {/* Marketplace visual */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#326460]">
            <img
              src="/images/marketplace-products.png"
              alt={
                isSwahili
                  ? 'Bidhaa katika soko la JamiiMarket'
                  : 'Products in the JamiiMarket marketplace'
              }
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C1C]/75 via-[#1B1C1C]/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="max-w-md">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#326460] backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#326460]" />
                  {isSwahili ? 'Soko la ndani' : 'Local marketplace'}
                </span>

                <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  {isSwahili
                    ? 'Gundua kile kinachopatikana karibu nawe.'
                    : 'Discover what is available around you.'}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#F6F3F2]">
                  {isSwahili
                    ? 'Pata nafasi ya kugundua bidhaa na huduma kutoka kwa biashara zinazoshiriki.'
                    : 'Discover products and services made available by participating local businesses.'}
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon

              return (
                <div
                  key={service.title}
                  className="group rounded-3xl border border-[#DDC0BA] bg-[#FCF9F8] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#A03F28]/40 hover:shadow-[0_15px_40px_-20px_rgba(160,63,40,0.3)] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F2E0C3] text-[#A03F28] transition duration-300 group-hover:bg-[#A03F28] group-hover:text-white">
                      <Icon size={22} />
                    </div>

                    <span className="text-xs font-semibold text-[#DDC0BA]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#1B1C1C]">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#56423D]">
                    {service.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#326460]">
                    <CheckCircle2 size={15} />
                    <span>
                      {isSwahili ? 'Sehemu ya JamiiMarket' : 'Part of JamiiMarket'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 overflow-hidden rounded-[2rem] bg-[#A03F28]">
          <div className="flex flex-col gap-6 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-[#F2E0C3]">
                <span className="h-px w-8 bg-[#F2E0C3]" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                  {isSwahili ? 'Jiunge na soko' : 'Join the marketplace'}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                {isSwahili
                  ? 'Uko tayari kuchunguza JamiiMarket?'
                  : 'Ready to explore JamiiMarket?'}
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#FBE9E4]">
                {isSwahili
                  ? 'Ingia ili kupata vipengele vya soko vinavyopatikana kwa akaunti yako.'
                  : 'Sign in to access the marketplace features available to your account.'}
              </p>
            </div>

            <a
              href="/login"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#A03F28] transition duration-200 hover:bg-[#FFF5F2] hover:shadow-lg"
            >
              {isSwahili ? 'Anza' : 'Get Started'}
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection