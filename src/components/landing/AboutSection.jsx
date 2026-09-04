import {
  EyeOff,
  Store,
  Users,
  MapPin,
  ArrowUpRight,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

function AboutSection() {
  const { language } = useLanguage()
  const isSwahili = language === 'sw'

  const points = [
    {
      icon: EyeOff,
      title: isSwahili
        ? 'Biashara za ndani zinahitaji kuonekana'
        : 'Local businesses need visibility',
      description: isSwahili
        ? 'JamiiMarket inatoa nafasi ya kidijitali ambapo biashara za ndani zinaweza kuwasilisha bidhaa na huduma zao kwa wateja.'
        : 'JamiiMarket provides a digital space where local businesses can present their products and services to customers.',
    },
    {
      icon: Store,
      title: isSwahili
        ? 'Soko moja lililounganishwa'
        : 'One connected marketplace',
      description: isSwahili
        ? 'Wateja wanaweza kugundua biashara za ndani zinazoshiriki na bidhaa au huduma zinazopatikana kupitia jukwaa moja.'
        : 'Customers can discover participating local businesses and available marketplace listings through one platform.',
    },
    {
      icon: Users,
      title: isSwahili
        ? 'Imejengwa kwa washiriki mbalimbali'
        : 'Built for different participants',
      description: isSwahili
        ? 'Jukwaa limeundwa kusaidia wateja, biashara, na washiriki wa huduma za usafirishaji ndani ya soko.'
        : 'The platform is designed to support customers, businesses, and delivery participants within the marketplace.',
    },
    {
      icon: MapPin,
      title: isSwahili
        ? 'Inalenga biashara za ndani'
        : 'Focused on local commerce',
      description: isSwahili
        ? 'JamiiMarket imeundwa kuunganisha washiriki wa soko ndani ya jamii zao za karibu.'
        : 'JamiiMarket is designed around connecting marketplace participants within their local communities.',
    },
  ]

  return (
    <section
      id="about"
      className="scroll-mt-20 overflow-hidden bg-[#FCF9F8] px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

          {/* Visual */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#DDC0BA] bg-[#F2E0C3] shadow-[0_20px_50px_-18px_rgba(160,63,40,0.2)]">
              <img
                src="/images/community-commerce.png"
                alt={
                  isSwahili
                    ? 'Jamii na biashara za ndani zikiunganishwa'
                    : 'Community and local businesses connected'
                }
                className="h-[360px] w-full object-cover sm:h-[460px] lg:h-[560px]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            {/* Floating message */}
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#A03F28] text-white">
                  <Store size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#1B1C1C]">
                    {isSwahili
                      ? 'Biashara na jamii, pamoja'
                      : 'Businesses and communities, together'}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#56423D]">
                    {isSwahili
                      ? 'Jukwaa moja la kugundua na kuunganisha fursa za biashara za ndani.'
                      : 'One platform for discovering and connecting local commerce opportunities.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative badge */}
            <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#326460] text-white shadow-lg sm:right-6 sm:top-6">
              <ArrowUpRight size={21} />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#326460]">
              {isSwahili
                ? 'Tatizo Tunaloleta Suluhisho'
                : 'The Problem We Solve'}
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl lg:text-5xl lg:leading-tight">
              {isSwahili
                ? 'Kuleta biashara za ndani katika soko moja la kidijitali.'
                : 'Bringing local commerce into one digital marketplace.'}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#56423D] sm:text-lg">
              {isSwahili
                ? 'JamiiMarket imeundwa kuwaunganisha wateja na biashara za ndani zinazoshiriki, bidhaa, huduma, na chaguo za usafirishaji kupitia jukwaa moja.'
                : 'JamiiMarket is designed to connect customers with participating local businesses, products, services, and delivery options through a single platform.'}
            </p>

            {/* Information cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map((point) => {
                const Icon = point.icon

                return (
                  <article
                    key={point.title}
                    className="group rounded-2xl border border-[#DDC0BA] bg-[#F6F3F2] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_35px_-12px_rgba(160,63,40,0.2)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F2E0C3] text-[#695D46] transition duration-300 group-hover:bg-[#A03F28] group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-[#1B1C1C]">
                      {point.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#56423D]">
                      {point.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutSection

