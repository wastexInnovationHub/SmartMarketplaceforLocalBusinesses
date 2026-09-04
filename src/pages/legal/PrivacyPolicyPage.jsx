import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
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
          'Sera hii inaeleza jinsi JamiiMarket inavyokusanya, kutumia, kuhifadhi, kulinda na kushirikisha taarifa binafsi unapofungua akaunti au kutumia huduma zetu.',
        policyLabel: 'Ulinzi wa taarifa zako ni muhimu kwetu',
        version:
          'Sera hii inatumika kwa huduma za JamiiMarket na inaweza kusasishwa inapobidi.',
        sections: [
          {
            title: '1. Kuhusu Sera Hii',
            text: [
              'JamiiMarket inaheshimu faragha ya watumiaji na inalenga kushughulikia taarifa binafsi kwa njia halali, ya haki, yenye uwazi na kwa madhumuni yaliyoelezwa.',
              'Sera hii inatumika kwa taarifa zinazokusanywa kupitia tovuti, akaunti, huduma za marketplace, na vipengele vingine vya JamiiMarket vinavyohusiana na huduma hii.',
            ],
          },
          {
            title: '2. Taarifa Tunazoweza Kukusanya',
            text: [
              'Kulingana na jinsi unavyotumia JamiiMarket, tunaweza kukusanya taarifa kama jina, namba ya simu, barua pepe, taarifa za kuingia kwenye akaunti, taarifa za biashara, anwani au eneo, taarifa za bidhaa na huduma, pamoja na taarifa nyingine unazochagua kutupatia.',
              'Tunapaswa kukusanya taarifa zinazohitajika kwa madhumuni halali ya kutoa na kuboresha huduma, badala ya kukusanya taarifa zisizo za lazima.',
            ],
          },
          {
            title: '3. Taarifa za Akaunti',
            text: [
              'Unapofungua akaunti, tunaweza kutumia taarifa ulizotoa ili kuunda na kusimamia akaunti yako, kuthibitisha utambulisho wa akaunti inapohitajika, kuwezesha kuingia kwenye mfumo, na kukusaidia unapohitaji msaada.',
              'Unawajibika kuhakikisha taarifa za akaunti unazotoa ni sahihi na kutunza kwa usalama taarifa zako za kuingia.',
            ],
          },
          {
            title: '4. Taarifa za Biashara',
            text: [
              'Ikiwa unasajili biashara, unaweza kutupatia taarifa kama jina la biashara, aina ya biashara, maelezo ya biashara, eneo, mawasiliano, bidhaa, huduma na taarifa nyingine zinazohitajika kuonyesha biashara kwenye marketplace.',
              'Baadhi ya taarifa za biashara zinaweza kuonyeshwa kwa watumiaji wengine ili kuwawezesha kugundua biashara, bidhaa au huduma. Usichapishe taarifa binafsi ambazo hutaki ziweze kuonekana na wengine.',
            ],
          },
          {
            title: '5. Oda, Ununuzi na Miamala',
            text: [
              'Unapotumia vipengele vya oda au ununuzi, tunaweza kuchakata taarifa zinazohitajika ili kuunda oda, kuwasiliana kuhusu oda, kuthibitisha hali ya oda, kusaidia utekelezaji wa huduma, kushughulikia migogoro, na kuweka kumbukumbu zinazohitajika.',
              'Ikiwa huduma za malipo zitatolewa na mtoa huduma wa malipo wa nje, taarifa zinazohitajika kwa malipo zinaweza kuchakatwa na mtoa huduma huyo kwa mujibu wa masharti na sera zake mwenyewe. JamiiMarket haitadai kuhifadhi taarifa kamili za kadi au taarifa nyingine za malipo ikiwa mfumo halisi hautumii uhifadhi huo.',
            ],
          },
          {
            title: '6. Taarifa za Mahali Ulipo',
            text: [
              'Baadhi ya vipengele vinaweza kuhitaji taarifa ya eneo lako ili kusaidia kugundua biashara zilizo karibu, kuboresha huduma zinazotegemea eneo, au kusaidia uratibu wa huduma za delivery.',
              'Ufikiaji wa eneo unaweza kutegemea ruhusa ya kifaa au kivinjari chako. Unaweza kukataa au kuzima ruhusa hiyo kupitia mipangilio ya kifaa au kivinjari.',
              'Ikiwa kipengele fulani hakihitaji eneo lako, JamiiMarket haitakiwi kutumia taarifa ya eneo kwa madhumuni yasiyohusiana na huduma hiyo bila msingi unaofaa wa kisheria.',
            ],
          },
          {
            title: '7. Taarifa za Kiufundi',
            text: [
              'Tunapotumia mfumo wa JamiiMarket, taarifa za kiufundi zinaweza kuzalishwa kama anwani ya IP, aina ya kifaa, kivinjari, mfumo wa uendeshaji, muda wa matumizi, kurasa au vipengele vilivyotumiwa, kumbukumbu za hitilafu, na taarifa zinazohitajika kwa usalama na uendeshaji wa mfumo.',
              'Taarifa hizi zinaweza kusaidia kugundua matatizo, kuzuia matumizi mabaya, kuboresha utendaji na kulinda usalama wa huduma.',
            ],
          },
          {
            title: '8. Cookies na Local Storage',
            text: [
              'JamiiMarket inaweza kutumia cookies, local storage na teknolojia zinazofanana ili kuwezesha vipengele vya tovuti, kudumisha vipindi vya kuingia, kuhifadhi mipangilio, kuboresha utendaji na kusaidia usalama.',
              'Mipangilio ya kivinjari chako inaweza kukuwezesha kudhibiti au kuzuia baadhi ya cookies. Hata hivyo, kuzizuia kunaweza kufanya baadhi ya vipengele visifanye kazi ipasavyo.',
            ],
          },
          {
            title: '9. Madhumuni ya Kutumia Taarifa',
            text: [
              'Taarifa binafsi zinaweza kutumika kwa madhumuni kama kuunda na kusimamia akaunti, kutoa marketplace services, kuonyesha biashara na bidhaa, kushughulikia oda, kusaidia delivery, kutoa msaada kwa watumiaji, kuwasiliana kuhusu huduma, kuzuia udanganyifu au matumizi mabaya, kuboresha mfumo, na kutimiza wajibu wa kisheria.',
              'Hatutaki kutumia taarifa binafsi kwa madhumuni yasiyohusiana na yale yaliyokusudiwa bila kuwa na msingi unaofaa wa kisheria au kutoa taarifa inapohitajika.',
            ],
          },
          {
            title: '10. Msingi wa Kisheria wa Kuchakata Taarifa',
            text: [
              'Tunapochakata taarifa binafsi, msingi unaotumika unaweza kutegemea aina ya taarifa na shughuli inayofanyika. Msingi huo unaweza kujumuisha ridhaa yako, utekelezaji wa huduma uliyoomba, kutimiza wajibu wa kisheria, au msingi mwingine unaoruhusiwa na sheria husika.',
              'Pale ambapo uchakataji unategemea ridhaa, unaweza kuwa na haki ya kuondoa ridhaa hiyo kwa mujibu wa sheria. Kuondoa ridhaa hakutaathiri uhalali wa uchakataji uliofanyika kabla ya ridhaa kuondolewa.',
            ],
          },
          {
            title: '11. Kushirikisha Taarifa',
            text: [
              'JamiiMarket inaweza kushirikisha taarifa binafsi inapohitajika ili kutoa huduma ulizoomba, kwa mfano kuwezesha oda, delivery, msaada wa kiufundi, huduma za malipo, hosting, usalama au huduma nyingine zinazosaidia uendeshaji wa jukwaa.',
              'Taarifa zinaweza pia kushirikishwa pale inapohitajika kutimiza wajibu wa kisheria, kujibu mchakato halali wa kisheria, kulinda usalama wa watumiaji au mfumo, kuchunguza udanganyifu, au kulinda haki na mali za JamiiMarket na watumiaji wake.',
              'Watoa huduma wanaochakata taarifa kwa niaba ya JamiiMarket wanapaswa kushughulikia taarifa kwa madhumuni yaliyoidhinishwa na kwa mujibu wa masharti yanayowahusu.',
            ],
          },
          {
            title: '12. Uhamishaji wa Taarifa Nje ya Nchi',
            text: [
              'Baadhi ya huduma za kiteknolojia tunazotumia zinaweza kuhifadhi au kuchakata taarifa katika nchi nyingine. Pale ambapo taarifa binafsi zinahamishwa nje ya Tanzania, JamiiMarket italenga kuhakikisha uhamishaji huo unafanyika kwa mujibu wa mahitaji yanayotumika ya ulinzi wa taarifa binafsi na masharti ya kisheria.',
            ],
          },
          {
            title: '13. Usalama wa Taarifa',
            text: [
              'Tunachukua hatua zinazofaa za kiufundi na kiutawala kulinda taarifa binafsi dhidi ya upotevu, uharibifu, matumizi yasiyoidhinishwa, ufichuaji usioidhinishwa, au uchakataji usio halali.',
              'Hakuna mfumo wa mtandao unaoweza kuhakikishwa kuwa salama kwa asilimia mia moja. Kwa hiyo, watumiaji wanapaswa pia kutumia nywila imara, kutolishirikisha nenosiri lao, na kuripoti shughuli zisizo za kawaida kwenye akaunti zao.',
            ],
          },
          {
            title: '14. Ukiukaji wa Usalama wa Taarifa',
            text: [
              'Iwapo kutatokea tukio la usalama linalohusisha taarifa binafsi, JamiiMarket itachukua hatua zinazofaa za kuchunguza, kudhibiti na kupunguza madhara ya tukio hilo na kutoa taarifa au kuchukua hatua nyingine pale inapohitajika chini ya sheria na taratibu zinazotumika.',
            ],
          },
          {
            title: '15. Kuhifadhi Taarifa',
            text: [
              'Hatuhifadhi taarifa binafsi kwa muda mrefu kuliko inavyohitajika kwa madhumuni yaliyokusudiwa, isipokuwa pale ambapo muda mrefu wa kuhifadhi unahitajika au unaruhusiwa na sheria, kwa mfano kwa kumbukumbu za kisheria, usalama, utatuzi wa migogoro au mahitaji ya kiutendaji.',
              'Muda wa kuhifadhi unaweza kutofautiana kulingana na aina ya taarifa na sababu ya kuzihifadhi.',
            ],
          },
          {
            title: '16. Haki Zako Kuhusu Taarifa Binafsi',
            text: [
              'Kwa mujibu wa sheria zinazotumika, unaweza kuwa na haki ya kupewa taarifa kuhusu uchakataji wa taarifa zako, kupata taarifa zako binafsi, kuomba zisahihishwe, kuomba zifutwe au ziharibiwe pale inapofaa, kuomba uchakataji uzuiwe au upunguzwe, kupinga uchakataji katika mazingira yanayoruhusiwa, kuomba data yako ihamishwe pale inapohusika, na kuondoa ridhaa pale uchakataji unategemea ridhaa.',
              'Unaweza pia kuwa na haki zinazohusiana na maamuzi yanayofanywa kwa njia za kiotomatiki na haki ya kuwasilisha malalamiko kuhusu matumizi ya taarifa zako.',
            ],
          },
          {
            title: '17. Jinsi ya Kutumia Haki Zako',
            text: [
              'Ikiwa ungependa kuuliza kuhusu taarifa zako, kuomba marekebisho, kufuta taarifa, kuzuia uchakataji, kuondoa ridhaa, au kuwasilisha ombi lingine linalohusiana na faragha, tumia njia rasmi za msaada zinazopatikana kupitia JamiiMarket.',
              'Tunaweza kuhitaji kuthibitisha ombi lako kabla ya kulitekeleza ili kulinda taarifa zako dhidi ya mtu asiyeidhinishwa.',
            ],
          },
          {
            title: '18. Watoto',
            text: [
              'JamiiMarket haikusudii kukusanya taarifa binafsi za watoto kinyume na mahitaji ya sheria. Ikiwa unaamini mtoto ametupatia taarifa binafsi bila msingi unaofaa, tafadhali wasiliana nasi ili suala hilo lichunguzwe na hatua zinazofaa zichukuliwe.',
            ],
          },
          {
            title: '19. Viungo na Huduma za Watu Wengine',
            text: [
              'JamiiMarket inaweza kuwa na viungo au kuunganishwa na huduma zinazotolewa na watu au kampuni wengine. Huduma hizo zinaweza kuwa na sera zao za faragha na masharti yao. Unapotumia huduma ya mtu mwingine, unapaswa kusoma sera yake ya faragha ili kuelewa jinsi taarifa zako zinavyoshughulikiwa.',
            ],
          },
          {
            title: '20. Mawasiliano ya Kielektroniki',
            text: [
              'Tunaweza kutumia barua pepe, ujumbe wa simu, taarifa ndani ya mfumo, au njia nyingine zinazofaa kuwasiliana nawe kuhusu akaunti, oda, usalama, mabadiliko ya huduma, au masuala muhimu yanayohusiana na matumizi yako ya JamiiMarket.',
              'Mawasiliano ya huduma yanaweza kuwa muhimu kwa uendeshaji wa akaunti yako. Mawasiliano ya matangazo au masoko, pale yanapotumika, yatashughulikiwa kwa mujibu wa sheria na chaguo zinazopatikana.',
            ],
          },
          {
            title: '21. Mabadiliko ya Sera Hii',
            text: [
              'Tunaweza kusasisha Sera hii ya Faragha ili kuakisi mabadiliko katika huduma, teknolojia, sheria, au namna tunavyoshughulikia taarifa.',
              'Toleo jipya litachapishwa kupitia JamiiMarket. Tunakuhimiza kuangalia ukurasa huu mara kwa mara ili kufahamu mabadiliko yoyote muhimu.',
            ],
          },
          {
            title: '22. Mawasiliano Kuhusu Faragha',
            text: [
              'Kwa maswali, maombi au malalamiko kuhusu faragha na taarifa zako binafsi, tafadhali tumia njia rasmi za mawasiliano au msaada zinazopatikana kupitia JamiiMarket.',
              'Ikiwa hujaridhika na namna ombi au suala lako la ulinzi wa taarifa binafsi lilivyoshughulikiwa, unaweza pia kutumia taratibu zinazopatikana chini ya sheria za ulinzi wa taarifa binafsi.',
            ],
          },
        ],
        rightsTitle: 'Haki zako kwa ufupi',
        rights: [
          'Kujulishwa jinsi taarifa zako zinavyotumika',
          'Kupata taarifa zako binafsi',
          'Kurekebisha taarifa zisizo sahihi',
          'Kuomba kufutwa kwa taarifa pale inapofaa',
          'Kuomba kupunguza au kuzuia uchakataji katika mazingira yanayoruhusiwa',
          'Kupinga uchakataji katika mazingira yanayoruhusiwa',
          'Kuomba portability ya taarifa pale inapohusika',
          'Kuondoa ridhaa pale uchakataji unategemea ridhaa',
          'Kuwasilisha malalamiko kuhusu matumizi ya taarifa zako',
        ],
        termsButton: 'Soma Masharti ya Huduma',
        homeButton: 'Rudi Mwanzo',
      }
    : {
        legal: 'Legal',
        title: 'Privacy Policy',
        intro:
          'This Privacy Policy explains how JamiiMarket may collect, use, store, protect, and share personal information when you create an account or use our services.',
        policyLabel: 'Protecting your information matters to us',
        version:
          'This policy applies to JamiiMarket services and may be updated when necessary.',
        sections: [
          {
            title: '1. About This Policy',
            text: [
              'JamiiMarket respects user privacy and aims to handle personal information lawfully, fairly, transparently, and for clearly defined purposes.',
              'This Privacy Policy applies to information collected through the website, user accounts, marketplace services, and other JamiiMarket features connected to these services.',
            ],
          },
          {
            title: '2. Information We May Collect',
            text: [
              'Depending on how you use JamiiMarket, we may collect information such as your name, phone number, email address, account credentials, business information, address or location, product and service information, and other information you choose to provide.',
              'We aim to collect information that is relevant and necessary for legitimate service purposes rather than collecting information that is unrelated or unnecessary.',
            ],
          },
          {
            title: '3. Account Information',
            text: [
              'When you create an account, we may use the information you provide to create and manage your account, support account authentication where required, enable sign-in, and provide customer support.',
              'You are responsible for ensuring that the account information you provide is accurate and for keeping your login credentials secure.',
            ],
          },
          {
            title: '4. Business Information',
            text: [
              'If you register a business, you may provide information such as the business name, category, description, location, contact details, products, services, and other information needed to present the business on the marketplace.',
              'Some business information may be displayed to other users so they can discover businesses, products, or services. Do not publish personal information that you do not want other users to see.',
            ],
          },
          {
            title: '5. Orders, Purchases and Transactions',
            text: [
              'When you use ordering or purchasing features, we may process information needed to create an order, communicate about the order, confirm order status, support fulfilment, resolve disputes, and maintain required records.',
              'If payment services are provided by a third-party payment provider, information required to complete a payment may be processed by that provider under its own terms and privacy practices. JamiiMarket will not claim to store full card or other payment credentials unless the actual system is designed to do so.',
            ],
          },
          {
            title: '6. Location Information',
            text: [
              'Some features may require your location to help you discover nearby businesses, provide location-based services, or support delivery coordination.',
              'Location access may depend on permission from your device or browser. You can deny or disable location access through your device or browser settings.',
              'Where a feature does not require location information, JamiiMarket aims not to use location information for unrelated purposes without an appropriate legal basis.',
            ],
          },
          {
            title: '7. Technical Information',
            text: [
              'When you use JamiiMarket, technical information may be generated or collected, such as IP address, device type, browser, operating system, session information, pages or features used, error logs, and information needed for security and system operation.',
              'This information may help us troubleshoot problems, prevent misuse, improve performance, and protect the service.',
            ],
          },
          {
            title: '8. Cookies and Local Storage',
            text: [
              'JamiiMarket may use cookies, local storage, and similar technologies to enable website features, maintain login sessions, remember settings, improve performance, and support security.',
              'Your browser settings may allow you to control or block certain cookies. However, blocking them may affect the operation of some features.',
            ],
          },
          {
            title: '9. How We Use Information',
            text: [
              'Personal information may be used to create and manage accounts, provide marketplace services, display businesses and products, process orders, support delivery, provide customer support, communicate about services, prevent fraud or misuse, improve the platform, and meet legal obligations.',
              'We aim not to use personal information for unrelated purposes without an appropriate legal basis or notice where required.',
            ],
          },
          {
            title: '10. Legal Basis for Processing',
            text: [
              'The legal basis for processing personal information may depend on the type of information and activity involved. This may include your consent, providing a service you requested, complying with a legal obligation, or another lawful basis available under applicable law.',
              'Where processing is based on consent, you may have the right to withdraw that consent as permitted by law. Withdrawal does not affect the lawfulness of processing carried out before consent was withdrawn.',
            ],
          },
          {
            title: '11. Sharing Information',
            text: [
              'JamiiMarket may share personal information where necessary to provide requested services, such as enabling orders, delivery, technical support, payment services, hosting, security, or other services that support operation of the platform.',
              'Information may also be disclosed where required to comply with applicable law, respond to lawful legal processes, protect users or system security, investigate fraud or abuse, or protect the rights and property of JamiiMarket and its users.',
              'Service providers processing information on behalf of JamiiMarket should handle information only for authorized purposes and under applicable contractual or legal requirements.',
            ],
          },
          {
            title: '12. International Data Transfers',
            text: [
              'Some technology services we use may store or process information in other countries. Where personal information is transferred outside Tanzania, JamiiMarket aims to ensure that the transfer is handled in accordance with applicable personal data protection requirements and legal safeguards.',
            ],
          },
          {
            title: '13. Information Security',
            text: [
              'We take reasonable technical and organizational measures to protect personal information against loss, destruction, unauthorized access, unauthorized disclosure, or unlawful processing.',
              'No internet-based system can be guaranteed to be completely secure. Users should also use strong passwords, keep credentials confidential, and report suspicious account activity.',
            ],
          },
          {
            title: '14. Personal Data Breaches',
            text: [
              'If a security incident involving personal information occurs, JamiiMarket will take appropriate steps to investigate, contain, and mitigate the incident and provide notifications or take other actions where required by applicable law and regulatory requirements.',
            ],
          },
          {
            title: '15. Data Retention',
            text: [
              'We aim not to retain personal information for longer than reasonably necessary for the purposes for which it was collected, unless a longer retention period is required or permitted by law, such as for legal records, security, dispute resolution, or operational requirements.',
              'Retention periods may differ depending on the type of information and the reason for retaining it.',
            ],
          },
          {
            title: '16. Your Privacy Rights',
            text: [
              'Subject to applicable law, you may have rights to be informed about how your personal information is processed, access your personal information, request correction, request erasure or destruction where appropriate, request restriction of processing, object to processing in applicable circumstances, request data portability where applicable, and withdraw consent where processing relies on consent.',
              'You may also have rights relating to automated decision-making and the right to raise complaints concerning the processing of your personal information.',
            ],
          },
          {
            title: '17. Exercising Your Rights',
            text: [
              'If you want to ask about your information, request correction or deletion, restrict processing, withdraw consent, or make another privacy-related request, use the official support channels made available through JamiiMarket.',
              'We may need to verify your request before acting on it in order to protect your information from unauthorized requests.',
            ],
          },
          {
            title: '18. Children',
            text: [
              'JamiiMarket does not intend to collect children’s personal information in a manner that conflicts with applicable legal requirements. If you believe that a child has provided personal information to us without an appropriate basis, please contact us so the matter can be reviewed and appropriate action taken.',
            ],
          },
          {
            title: '19. Third-Party Links and Services',
            text: [
              'JamiiMarket may contain links to or integrations with services operated by third parties. Those services may have their own privacy policies and terms. When you use a third-party service, you should review its privacy policy to understand how your information is handled.',
            ],
          },
          {
            title: '20. Electronic Communications',
            text: [
              'We may use email, SMS, in-platform notifications, or other appropriate communication channels to contact you about your account, orders, security, service changes, or other important matters related to your use of JamiiMarket.',
              'Service-related communications may be necessary for operating your account. Marketing communications, where used, will be handled in accordance with applicable law and available choices.',
            ],
          },
          {
            title: '21. Changes to This Policy',
            text: [
              'We may update this Privacy Policy to reflect changes in our services, technology, legal requirements, or how we handle personal information.',
              'The updated version will be published through JamiiMarket. We encourage you to review this page periodically for important changes.',
            ],
          },
          {
            title: '22. Privacy Contact',
            text: [
              'For questions, requests, or complaints concerning privacy and your personal information, please use the official contact or support channels made available through JamiiMarket.',
              'If you are not satisfied with how a personal data protection request or concern has been handled, you may also use the complaint mechanisms available under applicable personal data protection law.',
            ],
          },
        ],
        rightsTitle: 'Your rights at a glance',
        rights: [
          'Be informed about how your information is used',
          'Access your personal information',
          'Request correction of inaccurate information',
          'Request erasure where applicable',
          'Request restriction of processing where applicable',
          'Object to processing in applicable circumstances',
          'Request data portability where applicable',
          'Withdraw consent where processing relies on consent',
          'Raise a complaint about the processing of your information',
        ],
        termsButton: 'Read Terms of Service',
        homeButton: 'Back to Home',
      }

  return (
    <div className="min-h-screen bg-[#FCF9F8] text-[#1B1C1C]">
      <LandingHeader />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#F2E0C3] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#326460]/10" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#A03F28]/10" />

          <div className="relative mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#326460]/20 bg-white/50 px-4 py-2 text-sm font-semibold text-[#326460]">
              <ShieldCheck size={17} />
              {content.policyLabel}
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[#326460]">
              {content.legal}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#56423D] sm:text-lg">
              {content.intro}
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-6 text-[#695D46]">
              {content.version}
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[240px_1fr] lg:items-start">
            {/* Rights summary */}
            <aside className="rounded-3xl border border-[#DDC0BA] bg-[#FCF9F8] p-5 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-[#1B1C1C]">
                {content.rightsTitle}
              </h2>

              <div className="mt-5 space-y-3">
                {content.rights.map((right) => (
                  <div
                    key={right}
                    className="flex gap-2.5 text-sm leading-5 text-[#56423D]"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-[#326460]"
                    />
                    <span>{right}</span>
                  </div>
                ))}
              </div>
            </aside>

            {/* Policy */}
            <div className="min-w-0">
              <div className="rounded-3xl border border-[#DDC0BA] bg-white p-6 shadow-[0_15px_45px_-30px_rgba(27,28,28,0.3)] sm:p-8 lg:p-10">
                <div className="space-y-10">
                  {content.sections.map((section) => (
                    <article
                      key={section.title}
                      className="scroll-mt-28"
                    >
                      <div className="flex gap-3">
                        <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#A03F28]" />

                        <div>
                          <h2 className="text-xl font-bold tracking-tight text-[#1B1C1C] sm:text-2xl">
                            {section.title}
                          </h2>

                          <div className="mt-4 space-y-4">
                            {section.text.map((paragraph) => (
                              <p
                                key={paragraph}
                                className="text-[15px] leading-7 text-[#56423D]"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Navigation */}
                <div className="mt-12 border-t border-[#DDC0BA] pt-8">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      to="/terms"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A03F28] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#812914]"
                    >
                      {content.termsButton}
                      <ChevronRight size={17} />
                    </Link>

                    <Link
                      to="/"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#A03F28] px-6 py-3 text-sm font-semibold text-[#A03F28] transition hover:bg-[#F5E5DF]"
                    >
                      <ArrowLeft size={17} />
                      {content.homeButton}
                    </Link>
                  </div>
                </div>
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