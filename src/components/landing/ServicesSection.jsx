import {
ShoppingCart,
Store,
Truck,
Users,
ArrowRight,
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

return ( <section
   id="services"
   className="scroll-mt-20 bg-[#F6F3F2] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
 > <div className="mx-auto max-w-7xl">

    {/* Heading */}
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#326460]">
        {isSwahili ? 'Tunachotoa' : 'What we provide'}
      </span>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl lg:text-5xl">
        {isSwahili
          ? 'Huduma zilizojengwa kwa ajili ya biashara za ndani.'
          : 'Services built around local commerce.'}
      </h2>

      <p className="mt-4 text-base leading-7 text-[#56423D] sm:text-lg sm:leading-8">
        {isSwahili
          ? 'JamiiMarket imeundwa kuleta vipengele muhimu vya biashara za ndani pamoja katika jukwaa moja.'
          : 'JamiiMarket is designed to bring the essential parts of local commerce together in one platform.'}
      </p>
    </div>

    {/* Services */}
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => {
        const Icon = service.icon

        return (
          <div
            key={service.title}
            className="rounded-3xl border border-[#DDC0BA] bg-[#FCF9F8] p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_35px_-15px_rgba(160,63,40,0.2)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2E0C3] text-[#A03F28]">
              <Icon size={23} />
            </div>

            <h3 className="mt-6 text-xl font-bold text-[#1B1C1C]">
              {service.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#56423D]">
              {service.description}
            </p>
          </div>
        )
      })}
    </div>

    {/* CTA */}
    <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl bg-[#A03F28] p-7 text-center sm:p-9 lg:flex-row lg:text-left">
      <div>
        <h3 className="text-2xl font-bold text-white">
          {isSwahili
            ? 'Uko tayari kuchunguza JamiiMarket?'
            : 'Ready to explore JamiiMarket?'}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#FBE9E4]">
          {isSwahili
            ? 'Ingia ili kupata vipengele vya soko vinavyopatikana kwa akaunti yako.'
            : 'Sign in to access the marketplace features available to your account.'}
        </p>
      </div>

      <a
        href="/login"
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#A03F28] transition hover:bg-[#FFF5F2]"
      >
        {isSwahili ? 'Anza' : 'Get Started'}
        <ArrowRight size={18} />
      </a>
    </div>
  </div>
</section>
)
}

export default ServicesSection
