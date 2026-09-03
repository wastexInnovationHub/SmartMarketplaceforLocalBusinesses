import {
EyeOff,
Store,
Users,
MapPin,
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

return ( <section
   id="about"
   className="scroll-mt-20 bg-[#FCF9F8] px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
 > <div className="mx-auto max-w-7xl"> <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">


      {/* Introduction */}
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#326460]">
          {isSwahili
            ? 'Tatizo Tunaloleta Suluhisho'
            : 'The Problem We Solve'}
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl">
          {isSwahili
            ? 'Kuleta biashara za ndani katika soko moja la kidijitali.'
            : 'Bringing local commerce into one digital marketplace.'}
        </h2>

        <p className="mt-5 text-base leading-7 text-[#56423D]">
          {isSwahili
            ? 'JamiiMarket imeundwa kuwaunganisha wateja na biashara za ndani zinazoshiriki, bidhaa, huduma, na chaguo za usafirishaji kupitia jukwaa moja.'
            : 'JamiiMarket is designed to connect customers with participating local businesses, products, services, and delivery options through a single platform.'}
        </p>
      </div>

      {/* Information cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {points.map((point) => {
          const Icon = point.icon

          return (
            <article
              key={point.title}
              className="rounded-2xl border border-[#DDC0BA] bg-[#F6F3F2] p-6 transition hover:-translate-y-1 hover:shadow-[0_8px_32px_-8px_rgba(192,87,62,0.12)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2E0C3] text-[#695D46]">
                <Icon size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#1B1C1C]">
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
</section>

)
}

export default AboutSection
