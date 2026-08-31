
import {
  EyeOff,
  Store,
  Users,
  MapPin,
} from 'lucide-react'

function AboutSection() {
  const points = [
    {
      icon: EyeOff,
      title: 'Local businesses need visibility',
      description:
        'JamiiMarket provides a digital space where local businesses can present their products and services to customers.',
    },
    {
      icon: Store,
      title: 'One connected marketplace',
      description:
        'Customers can discover participating local businesses and available marketplace listings through one platform.',
    },
    {
      icon: Users,
      title: 'Built for different participants',
      description:
        'The platform is designed to support customers, businesses, and delivery participants within the marketplace.',
    },
    {
      icon: MapPin,
      title: 'Focused on local commerce',
      description:
        'JamiiMarket is designed around connecting marketplace participants within their local communities.',
    },
  ]

  return (
    <section
      id="about"
      className="scroll-mt-20 bg-[#FCF9F8] px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          {/* Introduction */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#326460]">
              The Problem We Solve
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl">
              Bringing local commerce into one digital marketplace.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#56423D]">
              JamiiMarket is designed to connect customers with participating
              local businesses, products, services, and delivery options
              through a single platform.
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

