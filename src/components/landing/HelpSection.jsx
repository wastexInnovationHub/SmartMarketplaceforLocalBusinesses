import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

function HelpSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'What is JamiiMarket?',
      answer:
        'JamiiMarket is a local marketplace designed to connect customers with participating local businesses, products, food vendors, and delivery services through one platform.',
    },
    {
      question: 'Who can use JamiiMarket?',
      answer:
        'The platform is designed for customers, local businesses, food vendors, and delivery participants. The features available to each user depend on their account role.',
    },
    {
      question: 'How do I access the marketplace?',
      answer:
        'You can register for an account or sign in if you already have one. After authentication, the features available to your account can be accessed through the appropriate marketplace interface.',
    },
    {
      question: 'Are the products and prices real?',
      answer:
        'Marketplace products, prices, business information, availability, and other transactional information should come from the connected backend and database. The landing page does not display invented marketplace data.',
    },
    {
      question: 'How does delivery work?',
      answer:
        'Delivery information depends on the delivery options and participants available through the marketplace. Actual delivery status and order information should be retrieved from the backend when those services are connected.',
    },
    {
      question: 'Can I register as a business?',
      answer:
        'Yes, the platform supports business accounts. Business registration and the features available after registration will depend on the account and backend implementation.',
    },
    {
      question: 'What does EN / SW mean?',
      answer:
        'EN / SW represents English and Swahili. The language control will allow the interface to switch between the supported languages once the language functionality is implemented.',
    },
  ]

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="help"
      className="scroll-mt-20 bg-[#FCF9F8] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2E0C3] text-[#A03F28]">
            <HelpCircle size={24} />
          </div>

          <span className="mt-5 block text-sm font-semibold uppercase tracking-[0.15em] text-[#326460]">
            Help & Support
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#56423D] sm:text-lg sm:leading-8">
            Find answers to common questions about using the JamiiMarket
            platform.
          </p>
        </div>

        {/* FAQ list */}
        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-[#DDC0BA] bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-[#F6F3F2] sm:px-6"
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
                  <div className="border-t border-[#DDC0BA] px-5 pb-5 pt-4 sm:px-6">
                    <p className="text-sm leading-6 text-[#56423D]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HelpSection