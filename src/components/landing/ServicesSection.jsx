import {
  ShoppingCart,
  Store,
  Truck,
  Users,
  ArrowRight,
} from 'lucide-react'

function ServicesSection() {
  const services = [
    {
      icon: ShoppingCart,
      title: 'Marketplace',
      description:
        'Browse products and services made available by participating local businesses.',
    },
    {
      icon: Store,
      title: 'Business Presence',
      description:
        'A digital space for local businesses to present their available products and services.',
    },
    {
      icon: Truck,
      title: 'Delivery',
      description:
        'Connect orders with available delivery options through the marketplace.',
    },
    {
      icon: Users,
      title: 'Community',
      description:
        'Create a connected environment where customers and local businesses can interact.',
    },
  ]

  return (
    <section
      id="services"
      className="scroll-mt-20 bg-[#F6F3F2] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#326460]">
            What we provide
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl lg:text-5xl">
            Services built around local commerce.
          </h2>

          <p className="mt-4 text-base leading-7 text-[#56423D] sm:text-lg sm:leading-8">
            JamiiMarket is designed to bring the essential parts of local
            commerce together in one platform.
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
              Ready to explore JamiiMarket?
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#FBE9E4]">
              Sign in to access the marketplace features available to your
              account.
            </p>
          </div>

          <a
            href="/login"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#A03F28] transition hover:bg-[#FFF5F2]"
          >
            Get Started
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection