function LandingFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 bg-[#F6F3F2]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a
              href="#home"
              className="text-xl font-bold text-[#A03F28]"
            >
              JamiiMarket
            </a>

            <p className="mt-3 max-w-sm text-sm leading-6 text-stone-600">
              A localized digital marketplace connecting customers,
              local businesses, and delivery riders.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-stone-900">
              Platform
            </h3>

            <div className="mt-3 flex flex-col gap-2 text-sm text-stone-600">
              <a href="#home" className="hover:text-[#A03F28]">
                Home
              </a>
              <a href="#about" className="hover:text-[#A03F28]">
                About
              </a>
              <a href="#how-it-works" className="hover:text-[#A03F28]">
                How It Works
              </a>
              <a href="#businesses" className="hover:text-[#A03F28]">
                Businesses
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-stone-900">
              Support
            </h3>

            <div className="mt-3 flex flex-col gap-2 text-sm text-stone-600">
              <a href="#help" className="hover:text-[#A03F28]">
                Help
              </a>
              <a href="#help" className="hover:text-[#A03F28]">
                FAQs
              </a>
              <a href="#help" className="hover:text-[#A03F28]">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-stone-900">
              Legal
            </h3>

            <div className="mt-3 flex flex-col gap-2 text-sm text-stone-600">
              <a href="/privacy" className="hover:text-[#A03F28]">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-[#A03F28]">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-stone-200 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} JamiiMarket. All rights reserved.
          </p>

          <p>
            English / Kiswahili
          </p>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter