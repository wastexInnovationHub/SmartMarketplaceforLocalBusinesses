import { ArrowRight, Store } from 'lucide-react'
import heroMarket from '../../assets/images/hero-market.jpg'

function HeroSection() {
  return (
    <section
      id="home"
      className="overflow-hidden bg-[#FCF9F8] px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-10 lg:pb-20 lg:pt-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          
          {/* Text */}
          <div className="text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#F2E0C3] px-4 py-2 text-sm font-semibold text-[#695D46]">
              <Store size={16} />
              <span>Local commerce, connected</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#1B1C1C] sm:text-5xl lg:text-6xl">
              Local Businesses.
              <br />

              <span className="text-[#A03F28]">
                Local Products.
              </span>

              <br />

              One Connected Marketplace.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#56423D] sm:text-lg sm:leading-8 lg:mx-0">
              Connecting customers, shops, food vendors, and riders
              seamlessly across your community.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="/login"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#A03F28] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#812914] active:scale-[0.98]"
              >
                Explore Marketplace
                <ArrowRight size={18} />
              </a>

              <a
                href="/register"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F2E0C3] px-6 py-3 text-sm font-semibold text-[#231A08] transition hover:bg-[#E6D0AB] active:scale-[0.98]"
              >
                Join JamiiMarket
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-[#DDC0BA] bg-[#F0EDEB] shadow-[0_12px_40px_-12px_rgba(160,63,40,0.16)]">
              <img
                src={heroMarket}
                alt="Local marketplace and community vendors"
                className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[500px]"
              />

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Small information card */}
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/50 bg-white/90 p-4 shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs">
              <p className="text-sm font-semibold text-[#1B1C1C]">
                Built around local communities
              </p>

              <p className="mt-1 text-xs leading-5 text-[#56423D]">
                Discover local products, services, businesses, and
                delivery options through one marketplace.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection