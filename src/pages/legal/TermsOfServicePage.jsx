import { Link } from 'react-router-dom'
import LandingHeader from '../../components/landing/LandingHeader'
import LandingFooter from '../../components/landing/LandingFooter'
import { useLanguage } from '../../i18n/LanguageContext'

function TermsOfServicePage() {
  const { language } = useLanguage()

  const isSwahili = language === 'sw'

  const content = isSwahili
    ? {
        legal: 'Kisheria',
        title: 'Masharti ya Huduma',
        intro:
          'Masharti haya yanaeleza kanuni za msingi za kutumia JamiiMarket na kushiriki katika soko lake la biashara za ndani.',
        updated: 'Ilisasishwa mwisho: Agosti 31, 2026',

        sections: [
          {
            title: '1. Kuhusu JamiiMarket',
            text: [
              'JamiiMarket ni jukwaa la soko la ndani lililoundwa kuwaunganisha wateja, biashara, wauzaji wa chakula, waendesha usafirishaji, na washiriki wengine katika biashara za ndani.',
            ],
          },
          {
            title: '2. Kuunda Akaunti',
            text: [
              'Unapaswa kutoa taarifa sahihi unapounda akaunti. Unawajibika kulinda taarifa zako za kuingia na kwa shughuli zinazofanyika kupitia akaunti yako.',
            ],
          },
          {
            title: '3. Majukumu ya Watumiaji',
            text: [
              'JamiiMarket inaweza kusaidia aina tofauti za akaunti, ikiwa ni pamoja na wateja, biashara, na waendesha usafirishaji. Aina ya akaunti yako itaamuliwa na jukwaa kulingana na taarifa za akaunti yako na maelezo ya usajili.',
              'Akaunti za biashara na waendesha usafirishaji zinaweza kuhitaji idhini ya msimamizi kabla ya kupata baadhi ya vipengele vya jukwaa.',
            ],
          },
          {
            title: '4. Biashara na Bidhaa',
            text: [
              'Biashara zinawajibika kuhakikisha usahihi wa taarifa wanazotoa kuhusu biashara yao, bidhaa, bei, upatikanaji, na huduma.',
              'Biashara zinapaswa kuorodhesha tu bidhaa na huduma ambazo zinaruhusiwa kisheria kuuza au kutoa.',
            ],
          },
          {
            title: '5. Waendesha Usafirishaji',
            text: [
              'Waendesha usafirishaji wanapaswa kutoa taarifa sahihi wakati wa usajili. Akaunti za waendesha usafirishaji zinaweza kuhitaji idhini ya msimamizi kabla ya huduma za usafirishaji kufanyika kupitia jukwaa.',
            ],
          },
          {
            title: '6. Oda na Miamala',
            text: [
              'Oda, malipo, kughairi oda, marejesho ya fedha, na mipango ya usafirishaji inaweza kuwa chini ya kanuni za ziada zinazoonyeshwa wakati wa muamala husika.',
              'Watumiaji wanapaswa kupitia kwa makini taarifa za oda kabla ya kuthibitisha muamala.',
            ],
          },
          {
            title: '7. Shughuli Zilizokatazwa',
            text: [
              'Watumiaji hawapaswi kutumia JamiiMarket kwa shughuli zisizo halali, miamala ya ulaghai, matangazo yanayopotosha, ufikiaji usioidhinishwa, unyanyasaji, au shughuli zinazoweza kuwadhuru watumiaji wengine au jukwaa.',
            ],
          },
          {
            title: '8. Kusimamishwa kwa Akaunti',
            text: [
              'JamiiMarket inaweza kuzuia, kusimamisha, au kufuta akaunti pale ambapo kuna sababu ya msingi ya kuamini kuwa akaunti imekiuka masharti haya, kanuni zinazotumika, au mahitaji ya jukwaa.',
            ],
          },
          {
            title: '9. Mabadiliko ya Jukwaa',
            text: [
              'JamiiMarket inaweza kuongeza, kubadilisha, au kuondoa vipengele kadiri jukwaa linavyoendelea kukua. Mabadiliko muhimu ya masharti haya yanaweza kutangazwa kupitia jukwaa.',
            ],
          },
          {
            title: '10. Mawasiliano',
            text: [
              'Ikiwa unahitaji msaada kuhusu JamiiMarket, tafadhali wasiliana na timu ya msaada kupitia njia za msaada zinazopatikana kwenye jukwaa.',
            ],
          },
        ],

        privacyButton: 'Soma Sera ya Faragha',
        homeButton: 'Rudi Mwanzo',
      }
    : {
        legal: 'Legal',
        title: 'Terms of Service',
        intro:
          'These terms explain the basic rules for using JamiiMarket and participating in its local marketplace.',
        updated: 'Last updated: August 31, 2026',

        sections: [
          {
            title: '1. About JamiiMarket',
            text: [
              'JamiiMarket is a local marketplace platform designed to connect customers, businesses, food vendors, delivery riders, and other participants in local commerce.',
            ],
          },
          {
            title: '2. Creating an Account',
            text: [
              'You must provide accurate information when creating an account. You are responsible for keeping your login credentials secure and for activities performed through your account.',
            ],
          },
          {
            title: '3. User Roles',
            text: [
              'JamiiMarket may support different account types, including customers, businesses, and delivery riders. Your account role is determined by the platform based on your account information and registration details.',
              'Business and delivery-rider accounts may require administrative approval before they can access certain platform features.',
            ],
          },
          {
            title: '4. Businesses and Products',
            text: [
              'Businesses are responsible for the accuracy of information they provide about their business, products, prices, availability, and services.',
              'Businesses must only list products and services that they are legally permitted to sell or provide.',
            ],
          },
          {
            title: '5. Delivery Riders',
            text: [
              'Delivery riders must provide accurate information during registration. Rider accounts may require approval by an administrator before delivery services can be performed through the platform.',
            ],
          },
          {
            title: '6. Orders and Transactions',
            text: [
              'Orders, payments, cancellations, refunds, and delivery arrangements may be subject to additional rules displayed during the relevant transaction.',
              'Users should review order information carefully before confirming a transaction.',
            ],
          },
          {
            title: '7. Prohibited Activities',
            text: [
              'Users must not use JamiiMarket for unlawful activities, fraudulent transactions, misleading listings, unauthorized access, harassment, or activities that could harm other users or the platform.',
            ],
          },
          {
            title: '8. Account Suspension',
            text: [
              'JamiiMarket may restrict, suspend, or terminate an account where there is a reasonable basis to believe that the account has violated these terms, applicable rules, or platform requirements.',
            ],
          },
          {
            title: '9. Platform Changes',
            text: [
              'JamiiMarket may add, modify, or remove features as the platform develops. Important changes to these terms may be communicated through the platform.',
            ],
          },
          {
            title: '10. Contact',
            text: [
              'If you need assistance with JamiiMarket, please contact the support team using the available support channels on the platform.',
            ],
          },
        ],

        privacyButton: 'Read Privacy Policy',
        homeButton: 'Back to Home',
      }

  return (
    <div className="min-h-screen bg-[#FCF9F8] text-[#1B1C1C]">
      <LandingHeader />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-[#F2E0C3] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#326460]">
              {content.legal}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {content.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#56423D]">
              {content.intro}
            </p>

            <p className="mt-4 text-sm text-[#7A706C]">
              {content.updated}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-4xl space-y-10">
            {content.sections.map((section) => (
              <article key={section.title}>
                <h2 className="text-2xl font-bold">
                  {section.title}
                </h2>

                {section.text.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 leading-7 text-[#56423D]"
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}

            {/* Navigation */}
            <div className="border-t border-[#DDC0BA] pt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/privacy"
                  className="rounded-full bg-[#A03F28] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#812914]"
                >
                  {content.privacyButton}
                </Link>

                <Link
                  to="/"
                  className="rounded-full border border-[#A03F28] px-6 py-3 text-center text-sm font-semibold text-[#A03F28] transition hover:bg-[#F5E5DF]"
                >
                  {content.homeButton}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}

export default TermsOfServicePage