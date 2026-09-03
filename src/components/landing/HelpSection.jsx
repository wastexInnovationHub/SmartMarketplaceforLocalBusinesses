import { useState } from 'react'
import {
ChevronDown,
HelpCircle,
MessageCircle,
Phone,
Smartphone,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

function HelpSection() {
const [openIndex, setOpenIndex] = useState(null)
const { language } = useLanguage()
const isSwahili = language === 'sw'

const faqs = [
{
question: isSwahili
? 'JamiiMarket ni nini?'
: 'What is JamiiMarket?',
answer: isSwahili
? 'JamiiMarket ni soko la ndani linalowaunganisha wateja na biashara za ndani, maduka, wauzaji wa chakula, na waendesha usafirishaji kupitia jukwaa moja.'
: 'JamiiMarket is a local marketplace that connects customers with local businesses, shops, food vendors, and delivery riders in one platform.',
},
{
question: isSwahili
? 'Ninawezaje kupata bidhaa za ndani?'
: 'How can I find local products?',
answer: isSwahili
? 'Utaweza kuvinjari biashara na bidhaa zinazopatikana katika jamii yako na kuchagua unachotaka kununua.'
: 'You will be able to browse businesses and products available in your community and choose what you want to purchase.',
},
{
question: isSwahili
? 'Je, biashara za ndani zinaweza kujiunga na JamiiMarket?'
: 'Can local businesses join JamiiMarket?',
answer: isSwahili
? 'Ndiyo. Biashara za ndani zinaweza kujisajili na kuunda uwepo wa biashara zao kwenye JamiiMarket ili kuwafikia wateja katika jamii zao.'
: 'Yes. Local businesses can register and create their business presence on JamiiMarket to reach customers in their community.',
},
{
question: isSwahili
? 'Je, ninaweza kuagiza chakula na bidhaa nyingine?'
: 'Can I order food and other products?',
answer: isSwahili
? 'Ndiyo. JamiiMarket imeundwa kusaidia aina mbalimbali za biashara za ndani, zikiwemo maduka na wauzaji wa chakula.'
: 'Yes. JamiiMarket is designed to support different types of local businesses, including shops and food vendors.',
},
{
question: isSwahili
? 'Usafirishaji unafanyaje kazi?'
: 'How does delivery work?',
answer: isSwahili
? 'Waendesha usafirishaji wanaweza kusaidia kuunganisha biashara na wateja na kusaidia katika usafirishaji wa oda za ndani.'
: 'Delivery riders can help connect businesses with customers and support local order delivery.',
},
]

const toggleFaq = (index) => {
setOpenIndex(openIndex === index ? null : index)
}

return ( <section
   id="help"
   className="scroll-mt-20 bg-[#FCF9F8] px-4 py-16 sm:px-6 lg:px-10 lg:py-24"
 > <div className="mx-auto max-w-5xl">


    {/* Section heading */}
    <div className="mx-auto max-w-2xl text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F2E0C3] text-[#A03F28]">
        <HelpCircle size={24} />
      </div>

      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#326460]">
        {isSwahili ? 'Msaada na Usaidizi' : 'Help & Support'}
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl">
        {isSwahili
          ? 'Maswali Yanayoulizwa Mara kwa Mara'
          : 'Frequently Asked Questions'}
      </h2>

      <p className="mt-4 text-base leading-7 text-[#56423D]">
        {isSwahili
          ? 'Pata majibu ya maswali ya kawaida kuhusu kutumia JamiiMarket.'
          : 'Find answers to common questions about using JamiiMarket.'}
      </p>
    </div>

    {/* FAQ list */}
    <div className="mx-auto mt-10 max-w-3xl space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-2xl border border-[#DDC0BA] bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-[#F6F3F2]"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-[#1B1C1C] sm:text-base">
                {faq.question}
              </span>

              <ChevronDown
                size={20}
                className={`shrink-0 text-[#A03F28] transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="border-t border-[#E4E2E1] px-5 pb-5 pt-4">
                <p className="text-sm leading-6 text-[#56423D]">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>

    {/* Support card */}
    <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-[#F2E0C3] p-6 text-center shadow-sm sm:p-8">

      {/* Icon */}
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#A03F28] text-white">
        <MessageCircle size={22} />
      </div>

      <h3 className="mt-4 text-xl font-bold text-[#1B1C1C]">
        {isSwahili ? 'Bado unahitaji msaada?' : 'Still need help?'}
      </h3>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#56423D]">
        {isSwahili
          ? 'Unahitaji msaada kuhusu JamiiMarket? Wasiliana moja kwa moja na timu yetu ya usaidizi kupitia simu, WhatsApp, au SMS.'
          : 'Need assistance with JamiiMarket? Contact our support team directly by phone, WhatsApp, or SMS.'}
      </p>

      {/* Support number */}
      <p className="mt-4 text-lg font-bold tracking-wide text-[#A03F28]">
        0675 788 310
      </p>

      <p className="mt-1 text-xs text-[#695D46]">
        {isSwahili ? 'Msaada wa JamiiMarket' : 'JamiiMarket Support'}
      </p>

      {/* Contact buttons */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

        {/* Call */}
        <a
          href="tel:0675788310"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#A03F28] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#812914] active:scale-[0.98]"
        >
          <Phone size={18} />
          {isSwahili ? 'Piga Simu' : 'Call Us'}
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/255675788310"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#326460] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>

        {/* SMS */}
        <a
          href="sms:0675788310"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#A03F28] bg-white px-5 py-3 text-sm font-semibold text-[#A03F28] transition hover:bg-[#F5E5DF] active:scale-[0.98]"
        >
          <Smartphone size={18} />
          SMS
        </a>
      </div>
    </div>
  </div>
</section>

)
}

export default HelpSection
