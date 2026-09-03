import {
  Search,
  ShoppingBag,
  CreditCard,
  Truck,
  CheckCircle2,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

function HowItWorksSection() {
  const { language } = useLanguage()
  const isSwahili = language === 'sw'

  const steps = [
    {
      number: '01',
      icon: Search,
      title: isSwahili ? 'Gundua' : 'Discover',
      description: isSwahili
        ? 'Vinjari biashara za ndani, bidhaa, chakula, na huduma zinazopatikana kupitia JamiiMarket.'
        : 'Browse local businesses, products, food, and services available through JamiiMarket.',
    },
    {
      number: '02',
      icon: ShoppingBag,
      title: isSwahili ? 'Chagua' : 'Choose',
      description: isSwahili
        ? 'Chunguza bidhaa au huduma zinazopatikana na uchague unachotaka kununua.'
        : 'Explore available products or services and select what you want to purchase.',
    },
    {
      number: '03',
      icon: CreditCard,
      title: isSwahili ? 'Agiza' : 'Order',
      description: isSwahili
        ? 'Weka oda yako kwa kutumia chaguo zinazotolewa na soko.'
        : 'Place your order using the options provided by the marketplace.',
    },
    {
      number: '04',
      icon: Truck,
      title: isSwahili ? 'Pokea' : 'Receive',
      description: isSwahili
        ? 'Fuatilia oda yako na uipokee kupitia chaguo la usafirishaji au kuchukua bidhaa linalopatikana.'
        : 'Track the order and receive it through the available delivery or collection option.',
    },
  ]

  return (
    <section
      id="how-it-works"
      className="bg-[#F6F3F2] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#326460]">
            <CheckCircle2 size={17} />
            {isSwahili ? 'Mchakato Rahisi' : 'Simple process'}
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl lg:text-5xl">
            {isSwahili
              ? 'Jinsi JamiiMarket Inavyofanya Kazi'
              : 'How JamiiMarket Works'}
          </h2>

          <p className="mt-4 text-base leading-7 text-[#56423D] sm:text-lg sm:leading-8">
            {isSwahili
              ? 'Njia rahisi ya kugundua biashara za ndani, kuchagua unachohitaji, kuweka oda, na kuipokea kupitia chaguo zinazopatikana.'
              : 'A simple way to discover local businesses, choose what you need, place an order, and receive it through the available options.'}
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className="group relative rounded-3xl border border-[#DDC0BA] bg-[#FCF9F8] p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_35px_-15px_rgba(160,63,40,0.25)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2E0C3] text-[#A03F28]">
                    <Icon size={23} />
                  </div>

                  <span className="text-3xl font-bold text-[#DDC0BA]/70">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#1B1C1C]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#56423D]">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection

