import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'

function LandingFooter() {
  const currentYear = new Date().getFullYear()

  const { language, setLanguage } = useLanguage()

  const isSwahili = language === 'sw'

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage)
  }

  return (
    <footer className="border-t border-stone-200 bg-[#F6F3F2]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">

        {/* Footer columns */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <a
              href="#home"
              className="text-xl font-bold text-[#A03F28]"
            >
              JamiiMarket
            </a>

            <p className="mt-3 max-w-sm text-sm leading-6 text-stone-600">
              {isSwahili
                ? 'Soko la kidijitali linalowaunganisha wateja, biashara za ndani, na waendesha usafirishaji.'
                : 'A localized digital marketplace connecting customers, local businesses, and delivery riders.'}
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-stone-900">
              {isSwahili ? 'Jukwaa' : 'Platform'}
            </h3>

            <div className="mt-3 flex flex-col gap-2 text-sm text-stone-600">
              <a
                href="#home"
                className="transition hover:text-[#A03F28]"
              >
                {isSwahili ? 'Nyumbani' : 'Home'}
              </a>

              <a
                href="#about"
                className="transition hover:text-[#A03F28]"
              >
                {isSwahili ? 'Kuhusu' : 'About'}
              </a>

              <a
                href="#how-it-works"
                className="transition hover:text-[#A03F28]"
              >
                {isSwahili
                  ? 'Jinsi Inavyofanya Kazi'
                  : 'How It Works'}
              </a>

              <a
                href="#businesses"
                className="transition hover:text-[#A03F28]"
              >
                {isSwahili ? 'Biashara' : 'Businesses'}
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-stone-900">
              {isSwahili ? 'Msaada' : 'Support'}
            </h3>

            <div className="mt-3 flex flex-col gap-2 text-sm text-stone-600">
              <a
                href="#help"
                className="transition hover:text-[#A03F28]"
              >
                {isSwahili ? 'Msaada' : 'Help'}
              </a>

              <a
                href="#help"
                className="transition hover:text-[#A03F28]"
              >
                {isSwahili
                  ? 'Maswali Yanayoulizwa Mara kwa Mara'
                  : 'FAQs'}
              </a>

              <a
                href="#help"
                className="transition hover:text-[#A03F28]"
              >
                {isSwahili ? 'Wasiliana Nasi' : 'Contact'}
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-stone-900">
              {isSwahili ? 'Kisheria' : 'Legal'}
            </h3>

            <div className="mt-3 flex flex-col gap-2 text-sm text-stone-600">
              <Link
                to="/privacy"
                className="transition hover:text-[#A03F28]"
              >
                {isSwahili
                  ? 'Sera ya Faragha'
                  : 'Privacy Policy'}
              </Link>

              <Link
                to="/terms"
                className="transition hover:text-[#A03F28]"
              >
                {isSwahili
                  ? 'Masharti ya Huduma'
                  : 'Terms of Service'}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-10 flex flex-col gap-5 border-t border-stone-200 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">

          {/* Copyright */}
          <p>
            © {currentYear} JamiiMarket.{' '}
            {isSwahili
              ? 'Haki zote zimehifadhiwa.'
              : 'All rights reserved.'}
          </p>

          {/* Language switcher */}
          <div className="flex items-center gap-1 rounded-full border border-stone-300 bg-white p-1 shadow-sm">

            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={`
                rounded-full px-4 py-2 text-xs font-semibold
                transition-all
                ${
                  !isSwahili
                    ? 'bg-[#A03F28] text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-[#A03F28]'
                }
              `}
            >
              English
            </button>

            <button
              type="button"
              onClick={() => handleLanguageChange('sw')}
              className={`
                rounded-full px-4 py-2 text-xs font-semibold
                transition-all
                ${
                  isSwahili
                    ? 'bg-[#326460] text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-[#326460]'
                }
              `}
            >
              Kiswahili
            </button>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter

