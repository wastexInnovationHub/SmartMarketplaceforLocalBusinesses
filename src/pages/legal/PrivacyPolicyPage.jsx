import { Link } from 'react-router-dom'
import LandingHeader from '../../components/landing/LandingHeader'
import LandingFooter from '../../components/landing/LandingFooter'
import { useLanguage } from '../../i18n/LanguageContext'

function PrivacyPolicyPage() {
  const { language } = useLanguage()

  const isSwahili = language === 'sw'

  const content = isSwahili
    ? {
        legal: 'Kisheria',
        title: 'Sera ya Faragha',
        intro:
          'Sera hii inaeleza jinsi taarifa zinavyoweza kukusanywa na kutumika unapotumia JamiiMarket.',
        updated: 'Ilisasishwa mwisho: Agosti 31, 2026',

        sections: [
          {
            title: '1. Taarifa Tunazoweza Kukusanya',
            text: [
              'Kulingana na jinsi unavyotumia JamiiMarket, jukwaa linaweza kukusanya taarifa kama jina lako, namba ya simu, barua pepe, taarifa za akaunti, taarifa za biashara, na taarifa zinazohitajika ili kutoa huduma za soko.',
            ],
          },
          {
            title: '2. Taarifa za Mahali Ulipo',
            text: [
              'JamiiMarket inaweza kuomba ruhusa ya kufikia mahali kifaa chako kilipo ili kusaidia huduma zinazotegemea eneo, kama vile kupata biashara zilizo karibu, kuboresha uratibu wa usafirishaji, au kutoa huduma zinazofaa eneo lako.',
              'Ufikiaji wa eneo unahitaji ruhusa yako kupitia kifaa au kivinjari chako. Unaweza kukataa au kuzima ruhusa ya eneo kupitia mipangilio ya kifaa au kivinjari chako.',
            ],
          },
          {
            title: '3. Jinsi Taarifa Zinavyotumika',
            text: [
              'Taarifa zinaweza kutumika kuunda na kusimamia akaunti, kuthibitisha watumiaji, kutoa huduma za soko, kushughulikia oda, kusaidia shughuli za usafirishaji, kuwasiliana na watumiaji, kuboresha jukwaa, na kudumisha usalama wa mfumo.',
            ],
          },
          {
            title: '4. Taarifa za Biashara',
            text: [
              'Biashara zinaweza kutoa taarifa kama jina la biashara, aina ya biashara, eneo, mawasiliano, bidhaa, na huduma. Baadhi ya taarifa hizi zinaweza kuonyeshwa kwa umma ili kuwasaidia wateja kugundua na kuwasiliana na biashara za karibu.',
            ],
          },
          {
            title: '5. Kushirikisha Taarifa',
            text: [
              'Taarifa zinaweza kushirikishwa pale inapohitajika ili kutoa huduma zilizoombwa, kushughulikia miamala, kuratibu usafirishaji, kudumisha usalama, kutimiza matakwa ya kisheria, au kuendesha huduma za kiufundi zinazosaidia mfumo.',
            ],
          },
          {
            title: '6. Usalama wa Akaunti',
            text: [
              'Watumiaji wanapaswa kulinda nywila na taarifa zao za kuingia. Usishiriki nywila yako na watu wengine. Ikiwa unaamini akaunti yako imefikiwa bila ruhusa, wasiliana na timu ya msaada wa JamiiMarket haraka iwezekanavyo.',
            ],
          },
          {
            title: '7. Vidakuzi na Taarifa za Kiufundi',
            text: [
              'Jukwaa linaweza kutumia vidakuzi, local storage, kumbukumbu za mfumo, na teknolojia zinazofanana inapohitajika ili kudumisha vipindi vya watumiaji, kuhifadhi mipangilio, kuboresha utendaji, na kuelewa jinsi jukwaa linavyofanya kazi.',
            ],
          },
          {
            title: '8. Kuhifadhi Taarifa',
            text: [
              'Taarifa zinaweza kuhifadhiwa kwa muda unaohitajika kwa kiwango kinachofaa ili kutoa huduma, kuhifadhi kumbukumbu, kutatua migogoro, kuboresha usalama, au kutimiza mahitaji ya kisheria na kiutendaji.',
            ],
          },
          {
            title: '9. Chaguo Zako',
            text: [
              'Unaweza kudhibiti baadhi ya taarifa kupitia mipangilio ya akaunti yako na ruhusa za kifaa. Unaweza pia kuwasiliana na msaada wa JamiiMarket ikiwa una maswali kuhusu taarifa zako binafsi.',
            ],
          },
          {
            title: '10. Mabadiliko ya Sera',
            text: [
              'Sera hii ya Faragha inaweza kusasishwa kadiri JamiiMarket inavyoendelea kukua. Toleo jipya litapatikana kupitia jukwaa.',
            ],
          },
          {
            title: '11. Mawasiliano',
            text: [
              'Kwa maswali kuhusu faragha au akaunti yako, tafadhali wasiliana na msaada wa JamiiMarket kupitia njia za msaada zinazopatikana.',
            ],
          },
        ],

        termsButton: 'Soma Masharti ya Huduma',
        homeButton: 'Rudi Mwanzo',
      }
    : {
        legal: 'Legal',
        title: 'Privacy Policy',
        intro:
          'This policy explains how information may be collected and used when you use JamiiMarket.',
        updated: 'Last updated: August 31, 2026',

        sections: [
          {
            title: '1. Information We May Collect',
            text: [
              'Depending on how you use JamiiMarket, the platform may collect information such as your name, phone number, email address, account information, business information, and information needed to provide marketplace services.',
            ],
          },
          {
            title: '2. Location Information',
            text: [
              'JamiiMarket may request access to your device location to support location-based marketplace features, such as finding nearby businesses, improving delivery coordination, or providing relevant local services.',
              'Location access requires your permission through your device or browser. You can deny or disable location access through your device or browser settings.',
            ],
          },
          {
            title: '3. How Information Is Used',
            text: [
              'Information may be used to create and manage accounts, authenticate users, provide marketplace services, process orders, support delivery activities, communicate with users, improve the platform, and maintain platform security.',
            ],
          },
          {
            title: '4. Business Information',
            text: [
              'Businesses may provide information such as business name, category, location, contact details, products, and services. Some of this information may be displayed publicly to help customers discover and interact with local businesses.',
            ],
          },
          {
            title: '5. Sharing Information',
            text: [
              'Information may be shared when necessary to provide requested marketplace services, process transactions, coordinate deliveries, maintain security, comply with legal requirements, or operate supporting technical services.',
            ],
          },
          {
            title: '6. Account Security',
            text: [
              'Users should protect their passwords and account credentials. Do not share your password with other people. If you believe that your account has been accessed without authorization, contact the support team as soon as possible.',
            ],
          },
          {
            title: '7. Cookies and Technical Data',
            text: [
              'The platform may use cookies, local storage, logs, and similar technical mechanisms where necessary to maintain sessions, remember settings, improve functionality, and understand platform performance.',
            ],
          },
          {
            title: '8. Data Retention',
            text: [
              'Information may be retained for as long as reasonably necessary to provide services, maintain records, resolve disputes, improve security, or meet applicable legal and operational requirements.',
            ],
          },
          {
            title: '9. Your Choices',
            text: [
              'You may control certain information through your account settings and device permissions. You may also contact JamiiMarket support regarding questions about your personal information.',
            ],
          },
          {
            title: '10. Policy Updates',
            text: [
              'This Privacy Policy may be updated as JamiiMarket develops. The updated version will be made available through the platform.',
            ],
          },
          {
            title: '11. Contact',
            text: [
              'For privacy or account questions, please contact JamiiMarket support through the available support channels.',
            ],
          },
        ],

        termsButton: 'Read Terms of Service',
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
                  to="/terms"
                  className="rounded-full bg-[#A03F28] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#812914]"
                >
                  {content.termsButton}
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

export default PrivacyPolicyPage