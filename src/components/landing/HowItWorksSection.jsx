import {
  Search,
  ShoppingBag,
  CreditCard,
  Truck,
  CheckCircle2,
  ArrowRight,
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
      className="overflow-hidden bg-[#F6F3F2] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F2E0C3] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#326460] sm:text-sm">
            <CheckCircle2 size={17} />
            {isSwahili ? 'Mchakato Rahisi' : 'Simple process'}
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl lg:text-5xl">
            {isSwahili
              ? 'Jinsi JamiiMarket Inavyofanya Kazi'
              : 'How JamiiMarket Works'}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#56423D] sm:text-lg sm:leading-8">
            {isSwahili
              ? 'Njia rahisi ya kugundua biashara za ndani, kuchagua unachohitaji, kuweka oda, na kuipokea kupitia chaguo zinazopatikana.'
              : 'A simple journey from discovering local businesses to choosing, ordering, and receiving what you need.'}
          </p>
        </div>

        {/* Visual introduction */}
        <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-[#DDC0BA] bg-[#F2E0C3] shadow-[0_18px_45px_-18px_rgba(160,63,40,0.18)]">
          <div className="grid items-center lg:grid-cols-[0.9fr_1.1fr]">

            <div className="relative order-2 p-7 sm:p-10 lg:order-1 lg:p-12">
              <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#326460]">
                {isSwahili
                  ? 'Kutoka kugundua hadi kupokea'
                  : 'From discovery to delivery'}
              </span>

              <h3 className="mt-3 max-w-xl text-2xl font-bold leading-tight text-[#1B1C1C] sm:text-3xl">
                {isSwahili
                  ? 'Kila hatua imeundwa kuwa rahisi kueleweka.'
                  : 'A marketplace journey designed to feel simple.'}
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[#56423D] sm:text-base sm:leading-7">
                {isSwahili
                  ? 'JamiiMarket inaunganisha hatua muhimu za safari ya ununuzi katika sehemu moja, kutoka kutafuta biashara hadi kupokea oda.'
                  : 'JamiiMarket brings the key parts of the shopping journey together, from finding a business to receiving an order.'}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#A03F28]">
                {isSwahili ? 'Gundua. Chagua. Agiza. Pokea.' : 'Discover. Choose. Order. Receive.'}
                <ArrowRight size={17} />
              </div>
            </div>

            <div className="relative order-1 h-[280px] overflow-hidden lg:order-2 lg:h-[350px]">
              <img
                src="/images/customer-business.png"
                alt={
                  isSwahili
                    ? 'Mteja na biashara katika soko la ndani'
                    : 'Customer and local business interaction'
                }
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

          </div>
        </div>

        {/* Steps */}
        <div className="relative mt-14">

          {/* Desktop connecting line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-[#DDC0BA] lg:block" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step) => {
              const Icon = step.icon

              return (
                <article
                  key={step.number}
                  className="group relative rounded-3xl border border-[#DDC0BA] bg-[#FCF9F8] p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0_16px_40px_-16px_rgba(160,63,40,0.24)]"
                >
                  {/* Number and icon */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F2E0C3] text-[#A03F28] transition duration-300 group-hover:bg-[#A03F28] group-hover:text-white">
                      <Icon size={26} />
                    </div>

                    <span className="text-3xl font-black tracking-tight text-[#DDC0BA]/60 transition duration-300 group-hover:text-[#A03F28]/25">
                      {step.number}
                    </span>
                  </div>

                  {/* Step label */}
                  <div className="mt-6">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#326460]">
                      {isSwahili
                        ? `Hatua ${step.number}`
                        : `Step ${step.number}`}
                    </span>

                    <h3 className="mt-2 text-xl font-bold text-[#1B1C1C]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#56423D]">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="mt-6 h-1 w-10 rounded-full bg-[#DDC0BA] transition-all duration-300 group-hover:w-16 group-hover:bg-[#A03F28]" />
                </article>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

export default HowItWorksSection

