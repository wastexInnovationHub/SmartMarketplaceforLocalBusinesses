import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  FileText,
} from 'lucide-react'
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
          'Masharti haya yanaweka kanuni na wajibu unaotumika unapotumia JamiiMarket, kufungua akaunti, kuorodhesha biashara au bidhaa, kuweka oda, au kushiriki katika shughuli za marketplace.',
        policyLabel: 'Kanuni za matumizi ya JamiiMarket',
        version:
          'Masharti haya yanaweza kusasishwa kadiri huduma, teknolojia au mahitaji ya kisheria yanavyobadilika.',
        sections: [
          {
            title: '1. Kuhusu JamiiMarket',
            text: [
              'JamiiMarket ni jukwaa la kidijitali linalolenga kusaidia biashara za ndani, wateja, wauzaji wa bidhaa au huduma, na washiriki wengine kuwasiliana na kushiriki katika biashara za ndani.',
              'JamiiMarket inaweza kutoa vipengele kama akaunti za watumiaji, maelezo ya biashara, bidhaa na huduma, oda, delivery, na vipengele vingine vya marketplace kulingana na huduma zinazopatikana wakati husika.',
            ],
          },
          {
            title: '2. Kukubali Masharti',
            text: [
              'Kwa kutumia JamiiMarket au kuunda akaunti, unakubali kufuata Masharti haya, Sera ya Faragha, na sheria na kanuni zinazotumika.',
              'Ikiwa hukubaliani na Masharti haya, hupaswi kutumia huduma zinazohitaji kukubali masharti haya.',
            ],
          },
          {
            title: '3. Kustahili Kutumia Huduma',
            text: [
              'Unapaswa kuwa na uwezo wa kisheria wa kuingia katika makubaliano haya na kutumia huduma za JamiiMarket kwa mujibu wa sheria zinazotumika.',
              'Ikiwa unatumia JamiiMarket kwa niaba ya biashara au shirika, unathibitisha kuwa una mamlaka ya kuwakilisha biashara au shirika hilo.',
            ],
          },
          {
            title: '4. Kuunda na Kulinda Akaunti',
            text: [
              'Unapaswa kutoa taarifa sahihi, kamili na za kweli unapounda akaunti na kuzisasisha inapobidi.',
              'Unawajibika kulinda nywila na taarifa zako za kuingia na kwa shughuli zinazofanyika kupitia akaunti yako. Usimruhusu mtu mwingine kutumia akaunti yako kwa njia isiyoidhinishwa.',
              'Ukigundua matumizi yasiyoidhinishwa ya akaunti yako, unapaswa kuwasiliana na JamiiMarket kupitia njia rasmi za msaada haraka iwezekanavyo.',
            ],
          },
          {
            title: '5. Aina za Watumiaji na Majukumu',
            text: [
              'JamiiMarket inaweza kuwa na aina tofauti za watumiaji, ikiwa ni pamoja na wateja, biashara, wauzaji wa bidhaa au huduma, na waendesha delivery.',
              'Baadhi ya aina za akaunti zinaweza kuhitaji taarifa za ziada, uthibitishaji au idhini ya msimamizi kabla ya vipengele fulani kutumika.',
              'Kila mtumiaji anawajibika kutumia akaunti yake kwa madhumuni halali na kwa mujibu wa jukumu alilopewa kwenye jukwaa.',
            ],
          },
          {
            title: '6. Biashara na Taarifa za Biashara',
            text: [
              'Biashara zinazotumia JamiiMarket zinawajibika kuhakikisha kuwa taarifa zao ni sahihi, za sasa, na hazipotoshi watumiaji.',
              'Hii inaweza kujumuisha jina la biashara, maelezo, eneo, mawasiliano, bidhaa, huduma, bei, upatikanaji, picha, na taarifa nyingine zinazochapishwa na biashara.',
              'Biashara hazipaswi kujifanya kuwa biashara nyingine au kutumia taarifa zinazokiuka haki za mtu au biashara nyingine.',
            ],
          },
          {
            title: '7. Bidhaa na Huduma Zinazoorodheshwa',
            text: [
              'Biashara zinawajibika kuhakikisha kuwa bidhaa na huduma wanazoorodhesha zinaruhusiwa kisheria kuuzwa au kutolewa na zinakidhi mahitaji yanayotumika.',
              'Bidhaa au huduma zinazoweza kuwa hatari, haramu, za udanganyifu, au zilizozuiwa na sheria au sera za JamiiMarket hazipaswi kuorodheshwa.',
              'JamiiMarket inaweza kuondoa au kuzuia listing ambayo inaonekana kukiuka Masharti haya au sheria zinazotumika.',
            ],
          },
          {
            title: '8. Bei, Upatikanaji na Maelezo ya Bidhaa',
            text: [
              'Biashara zinawajibika kuweka taarifa sahihi kuhusu bei, upatikanaji, maelezo, picha na masharti ya bidhaa au huduma wanazotoa.',
              'Bei au upatikanaji unaweza kubadilika. Taarifa ya mwisho inayoonyeshwa wakati wa kuwasilisha oda ndiyo inapaswa kutumiwa na mtumiaji kabla ya kuthibitisha oda.',
            ],
          },
          {
            title: '9. Oda',
            text: [
              'Mtumiaji anapaswa kupitia kwa makini bidhaa au huduma, kiasi, bei, eneo, taarifa za delivery, na maelezo mengine kabla ya kuthibitisha oda.',
              'Kuwasilisha oda hakumaanishi moja kwa moja kuwa oda imekubaliwa katika kila hali. Oda inaweza kutegemea upatikanaji wa bidhaa, uthibitisho wa biashara, huduma ya delivery, au masharti mengine yanayoonyeshwa wakati wa muamala.',
              'JamiiMarket inaweza kuweka taarifa za hali ya oda kupitia mfumo pale ambapo kipengele hicho kinapatikana.',
            ],
          },
          {
            title: '10. Malipo',
            text: [
              'Ikiwa JamiiMarket inatoa au inaunganisha huduma za malipo, malipo yanaweza kuwa chini ya masharti ya ziada yanayoonyeshwa wakati wa muamala pamoja na masharti ya mtoa huduma wa malipo husika.',
              'Mtumiaji anawajibika kuhakikisha kuwa taarifa zinazotumika katika muamala wa malipo ni sahihi na kwamba ana ruhusa ya kutumia njia hiyo ya malipo.',
              'JamiiMarket haitadai kuhifadhi taarifa kamili za kadi au taarifa nyingine nyeti za malipo isipokuwa mfumo halisi wa huduma umeundwa kwa ajili hiyo na taarifa hizo zinashughulikiwa kwa mujibu wa mahitaji yanayotumika.',
            ],
          },
          {
            title: '11. Kughairi Oda na Marejesho',
            text: [
              'Sheria za kughairi oda, kubadilisha oda, kurejesha bidhaa, au kurejesha fedha zinaweza kutofautiana kulingana na biashara, bidhaa, huduma, na njia ya malipo iliyotumika.',
              'Masharti maalum yanayohusu cancellation au refund yanaweza kuonyeshwa wakati wa oda au kupitia taarifa za biashara.',
              'Pale ambapo sheria za lazima zinampa mtumiaji haki fulani, Masharti haya hayakusudii kuondoa haki hizo.',
            ],
          },
          {
            title: '12. Delivery na Waendesha Usafirishaji',
            text: [
              'Ikiwa huduma za delivery zinapatikana kupitia JamiiMarket, utekelezaji wake unaweza kutegemea biashara, rider, eneo, upatikanaji, hali ya oda, na masharti yanayoonyeshwa wakati wa huduma.',
              'Waendesha delivery wanapaswa kutoa taarifa sahihi, kufuata sheria zinazotumika, na kutumia akaunti zao kwa madhumuni yaliyoidhinishwa.',
              'JamiiMarket haiwezi kuhakikisha kuwa kila oda itawasilishwa ndani ya muda fulani isipokuwa muda huo umeelezwa wazi kuwa ni sehemu ya huduma husika.',
            ],
          },
          {
            title: '13. Mawasiliano Kati ya Watumiaji na Biashara',
            text: [
              'JamiiMarket inaweza kuwezesha mawasiliano kati ya wateja, biashara na washiriki wengine wa marketplace.',
              'Watumiaji hawapaswi kutumia njia hizo kwa vitisho, unyanyasaji, spam, ulaghai, ujumbe wa chuki, au madhumuni mengine yasiyo halali.',
              'Taarifa zinazotolewa na mtumiaji wakati wa mawasiliano zinapaswa kuwa sahihi na zisikiuke haki za watu wengine.',
            ],
          },
          {
            title: '14. Maudhui ya Watumiaji',
            text: [
              'Watumiaji wanaweza kuwa na uwezo wa kuwasilisha picha, maelezo, maoni, taarifa za biashara, bidhaa, au maudhui mengine kwenye jukwaa.',
              'Unawajibika kuhakikisha kuwa una haki au ruhusa inayohitajika kutumia na kuchapisha maudhui hayo na kwamba hayakiuki sheria au haki za mtu mwingine.',
              'Kwa kuwasilisha maudhui kwenye JamiiMarket, unaruhusu jukwaa kuyatumia kwa kiwango kinachohitajika kuendesha, kuonyesha, kuhifadhi na kuboresha huduma, kwa mujibu wa Sera ya Faragha na sheria zinazotumika.',
            ],
          },
          {
            title: '15. Haki Miliki',
            text: [
              'Muundo, programu, alama, maandishi, michoro, vipengele na maudhui yanayomilikiwa na JamiiMarket yanaweza kulindwa na sheria za haki miliki.',
              'Huruhusiwi kunakili, kuuza, kusambaza, kubadilisha, kujaribu kuunda upya, au kutumia sehemu za JamiiMarket bila ruhusa inayofaa, isipokuwa pale sheria inaporuhusu.',
              'Maudhui yanayowasilishwa na biashara au watumiaji yanaweza kubaki chini ya haki za mmiliki wake.',
            ],
          },
          {
            title: '16. Shughuli Zilizokatazwa',
            text: [
              'Huruhusiwi kutumia JamiiMarket kwa shughuli zisizo halali, ulaghai, wizi wa utambulisho, taarifa za uongo, matangazo yanayopotosha, kuuza bidhaa zilizokatazwa, au kukwepa hatua za usalama za jukwaa.',
              'Pia hupaswi kujaribu kupata akaunti, data, mifumo au sehemu za JamiiMarket bila idhini, kuingilia utendaji wa mfumo, kusambaza programu hasidi, au kufanya shughuli zinazoweza kuhatarisha watumiaji wengine.',
            ],
          },
          {
            title: '17. Ulinzi wa Akaunti na Mfumo',
            text: [
              'Watumiaji hawapaswi kujaribu kukwepa uthibitishaji, udhibiti wa ruhusa, hatua za usalama, au vikwazo vilivyowekwa na JamiiMarket.',
              'Ikiwa unaona tatizo la usalama, udhaifu wa mfumo, au matumizi mabaya, unapaswa kuripoti suala hilo kupitia njia rasmi za msaada badala ya kulitumia vibaya.',
            ],
          },
          {
            title: '18. Uthibitishaji na Idhini ya Biashara',
            text: [
              'JamiiMarket inaweza kuomba taarifa au nyaraka zinazofaa kuthibitisha biashara, rider, au aina nyingine ya akaunti pale inapohitajika kwa usalama na uendeshaji wa marketplace.',
              'Kupokea au kuonyesha biashara kwenye jukwaa hakumaanishi kwamba JamiiMarket inathibitisha kila dai, bidhaa, ubora, au utendaji wa biashara hiyo isipokuwa pale ambapo uthibitishaji maalum umeelezwa wazi.',
            ],
          },
          {
            title: '19. Kusimamisha au Kufunga Akaunti',
            text: [
              'JamiiMarket inaweza kuzuia, kusimamisha, kupunguza vipengele, au kufunga akaunti ikiwa kuna sababu ya msingi ya kuamini kuwa mtumiaji amekiuka Masharti haya, sheria zinazotumika, au mahitaji ya usalama wa jukwaa.',
              'Hatua zinaweza pia kuchukuliwa ikiwa akaunti inatumika kwa ulaghai, inahatarisha watumiaji wengine, au inatumika kwa njia inayoweza kuathiri usalama na uadilifu wa JamiiMarket.',
              'Pale inapofaa, JamiiMarket inaweza kutoa taarifa au maelezo kuhusu hatua iliyochukuliwa kwa mujibu wa sheria na taratibu zinazotumika.',
            ],
          },
          {
            title: '20. Upatikanaji wa Huduma',
            text: [
              'Tunajitahidi kufanya JamiiMarket ipatikane na ifanye kazi kwa uaminifu, lakini hatuwezi kuhakikisha kuwa huduma itapatikana bila kukatika, bila hitilafu, au bila kuchelewa kila wakati.',
              'Huduma inaweza kusitishwa kwa muda kwa sababu za matengenezo, usalama, matatizo ya kiufundi, huduma za watoa huduma wengine, au sababu zilizo nje ya udhibiti wetu.',
            ],
          },
          {
            title: '21. Huduma za Watu Wengine',
            text: [
              'Baadhi ya vipengele vinaweza kutegemea huduma zinazotolewa na watu au kampuni wengine, kama huduma za malipo, ramani, mawasiliano, hosting, analytics, au delivery.',
              'Huduma hizo zinaweza kuwa chini ya masharti na sera zao wenyewe. Matumizi ya huduma ya mtu mwingine yanaweza pia kukuweka chini ya masharti yake.',
            ],
          },
          {
            title: '22. Faragha',
            text: [
              'Matumizi ya taarifa binafsi kupitia JamiiMarket yanaelezwa katika Sera yetu ya Faragha.',
              'Kwa kutumia huduma, unapaswa kusoma Sera ya Faragha ili kuelewa aina za taarifa zinazoweza kukusanywa, madhumuni ya uchakataji, kushirikisha taarifa, uhifadhi, usalama, na haki zako.',
            ],
          },
          {
            title: '23. Wajibu wa Mtumiaji',
            text: [
              'Unawajibika kwa matumizi yako ya JamiiMarket, taarifa unazowasilisha, oda unazoweka, na shughuli zinazofanyika kupitia akaunti yako.',
              'Unapaswa kutumia huduma kwa uaminifu, kwa heshima kwa watumiaji wengine, na kwa mujibu wa sheria zinazotumika.',
            ],
          },
          {
            title: '24. Wajibu wa Biashara',
            text: [
              'Biashara zinawajibika kwa bidhaa, huduma, maelezo, bei, upatikanaji, ubora, uhalali, na utimilifu wa oda zinazohusiana na biashara zao, isipokuwa pale ambapo JamiiMarket yenyewe imekubali wajibu maalum.',
              'Biashara zinapaswa kushughulikia wateja kwa haki na kutimiza wajibu unaotokana na sheria za biashara na ulinzi wa mlaji zinazotumika.',
            ],
          },
          {
            title: '25. Hakuna Dhamana ya Biashara ya Mtu Mwingine',
            text: [
              'JamiiMarket inaweza kuwezesha ugunduzi na mawasiliano kati ya watumiaji na biashara, lakini uwepo wa biashara, bidhaa au huduma kwenye jukwaa haupaswi kuchukuliwa kuwa dhamana kamili ya ubora, usalama, uhalali, au utendaji wake isipokuwa imeelezwa wazi.',
              'Watumiaji wanapaswa kufanya maamuzi yao kwa kuzingatia taarifa zinazopatikana na masharti yanayotumika kwa muamala husika.',
            ],
          },
          {
            title: '26. Mipaka ya Wajibu',
            text: [
              'Kwa kiwango kinachoruhusiwa na sheria, JamiiMarket haitawajibika kwa hasara inayotokana na matumizi yasiyo sahihi ya akaunti, taarifa zisizo sahihi zilizowasilishwa na mtumiaji au biashara, matatizo ya huduma za watu wengine, au matukio yaliyo nje ya udhibiti unaofaa wa JamiiMarket.',
              'Hakuna sehemu ya Masharti haya inayokusudiwa kuondoa au kupunguza wajibu ambao hauwezi kuondolewa au kupunguzwa kisheria.',
            ],
          },
          {
            title: '27. Malalamiko na Migogoro',
            text: [
              'Ikiwa una tatizo na oda, biashara, delivery, akaunti, au huduma nyingine, tunakuhimiza kuwasiliana na msaada wa JamiiMarket kupitia njia rasmi zinazopatikana.',
              'Pale ambapo suala haliwezi kutatuliwa kupitia msaada wa kawaida, haki na taratibu zinazotolewa na sheria zinazotumika zitaendelea kutumika.',
            ],
          },
          {
            title: '28. Sheria Zinazotumika',
            text: [
              'Matumizi ya JamiiMarket na Masharti haya yanapaswa kuzingatia sheria zinazotumika katika mamlaka ambayo huduma inatolewa na mtumiaji anapatikana.',
              'Hakuna kifungu cha Masharti haya kinachokusudiwa kuondoa haki au ulinzi unaotolewa kwa lazima na sheria husika.',
            ],
          },
          {
            title: '29. Mabadiliko ya Masharti',
            text: [
              'JamiiMarket inaweza kubadilisha Masharti haya ili kuakisi mabadiliko katika huduma, teknolojia, usalama, biashara, au mahitaji ya kisheria.',
              'Toleo lililosasishwa litachapishwa kupitia jukwaa. Ikiwa mabadiliko ni muhimu, JamiiMarket inaweza kutoa taarifa kupitia njia zinazofaa.',
              'Kuendelea kutumia huduma baada ya Masharti yaliyosasishwa kuanza kutumika kunaweza kumaanisha kuwa unakubali Masharti yaliyosasishwa, kwa kiwango kinachoruhusiwa na sheria.',
            ],
          },
          {
            title: '30. Mawasiliano',
            text: [
              'Kwa maswali kuhusu Masharti haya, akaunti yako, oda, biashara, delivery, au huduma nyingine za JamiiMarket, tafadhali tumia njia rasmi za mawasiliano na msaada zinazopatikana kwenye jukwaa.',
            ],
          },
        ],
        principlesTitle: 'Kanuni muhimu za matumizi',
        principles: [
          'Tumia taarifa sahihi unapofungua akaunti',
          'Linda taarifa zako za kuingia',
          'Biashara ziweke taarifa sahihi za bidhaa na huduma',
          'Usitumie jukwaa kwa ulaghai au shughuli zisizo halali',
          'Heshimu watumiaji, biashara na washiriki wengine',
          'Kagua oda na masharti yake kabla ya kuthibitisha',
          'Ripoti matatizo ya usalama au matumizi mabaya',
        ],
        privacyButton: 'Soma Sera ya Faragha',
        homeButton: 'Rudi Mwanzo',
      }
    : {
        legal: 'Legal',
        title: 'Terms of Service',
        intro:
          'These Terms set out the rules and responsibilities that apply when you use JamiiMarket, create an account, list a business or product, place an order, or participate in the marketplace.',
        policyLabel: 'Rules for using JamiiMarket',
        version:
          'These Terms may be updated as the service, technology, or legal requirements change.',
        sections: [
          {
            title: '1. About JamiiMarket',
            text: [
              'JamiiMarket is a digital platform intended to help local businesses, customers, product and service providers, and other participants discover and interact within local commerce.',
              'JamiiMarket may provide features such as user accounts, business profiles, product and service listings, orders, delivery, and other marketplace features depending on the services available at the time.',
            ],
          },
          {
            title: '2. Accepting These Terms',
            text: [
              'By using JamiiMarket or creating an account, you agree to comply with these Terms, the Privacy Policy, and applicable laws and regulations.',
              'If you do not agree with these Terms, you should not use services that require acceptance of these Terms.',
            ],
          },
          {
            title: '3. Eligibility',
            text: [
              'You must have the legal capacity required to enter into these Terms and use JamiiMarket in accordance with applicable law.',
              'If you use JamiiMarket on behalf of a business or organization, you represent that you have authority to act on behalf of that business or organization.',
            ],
          },
          {
            title: '4. Creating and Protecting an Account',
            text: [
              'You must provide accurate, complete, and truthful information when creating an account and keep that information reasonably up to date.',
              'You are responsible for protecting your password and login credentials and for activity performed through your account. Do not allow another person to use your account without authorization.',
              'If you become aware of unauthorized access to your account, you should contact JamiiMarket through the official support channels as soon as possible.',
            ],
          },
          {
            title: '5. User Types and Responsibilities',
            text: [
              'JamiiMarket may support different user types, including customers, businesses, product or service providers, and delivery riders.',
              'Certain account types may require additional information, verification, or administrative approval before particular features can be used.',
              'Each user is responsible for using their account lawfully and consistently with the role assigned to them on the platform.',
            ],
          },
          {
            title: '6. Businesses and Business Information',
            text: [
              'Businesses using JamiiMarket are responsible for ensuring that their information is accurate, current, and not misleading.',
              'This may include business name, description, location, contact details, products, services, prices, availability, images, and other information published by the business.',
              'Businesses must not impersonate another business or use information that infringes another person’s or business’s rights.',
            ],
          },
          {
            title: '7. Products and Services Listed',
            text: [
              'Businesses are responsible for ensuring that the products and services they list are legally permitted to be sold or provided and comply with applicable requirements.',
              'Illegal, fraudulent, unsafe, prohibited, or otherwise restricted products or services must not be listed.',
              'JamiiMarket may remove or restrict a listing where it reasonably appears to violate these Terms or applicable law.',
            ],
          },
          {
            title: '8. Prices, Availability and Product Information',
            text: [
              'Businesses are responsible for providing accurate information about prices, availability, descriptions, images, and terms relating to their products or services.',
              'Prices and availability may change. The information shown at the time an order is submitted should be reviewed by the user before confirming the order.',
            ],
          },
          {
            title: '9. Orders',
            text: [
              'Users should carefully review the product or service, quantity, price, location, delivery information, and other relevant details before confirming an order.',
              'Submitting an order does not necessarily mean that the order is accepted in every circumstance. Acceptance may depend on product availability, business confirmation, delivery availability, or other terms shown during the transaction.',
              'JamiiMarket may provide order-status information through the platform where that feature is available.',
            ],
          },
          {
            title: '10. Payments',
            text: [
              'If JamiiMarket provides or integrates payment services, payments may be subject to additional terms shown during the transaction and the terms of the relevant payment provider.',
              'Users are responsible for ensuring that payment information used in a transaction is accurate and that they are authorized to use the selected payment method.',
              'JamiiMarket will not claim to store full card details or other sensitive payment credentials unless the actual service is designed to do so and such information is handled in accordance with applicable requirements.',
            ],
          },
          {
            title: '11. Order Cancellation and Refunds',
            text: [
              'Rules concerning order cancellation, changes, returns, or refunds may vary depending on the business, product, service, and payment method involved.',
              'Specific cancellation or refund conditions may be shown during an order or in the relevant business information.',
              'Where mandatory law gives a user a particular right or protection, these Terms are not intended to remove that right.',
            ],
          },
          {
            title: '12. Delivery and Delivery Riders',
            text: [
              'Where delivery services are available through JamiiMarket, fulfilment may depend on the business, rider, location, availability, order status, and terms shown for the service.',
              'Delivery riders must provide accurate information, comply with applicable law, and use their accounts only for authorized purposes.',
              'JamiiMarket does not guarantee that every order will be delivered within a particular period unless that period is expressly stated as part of the relevant service.',
            ],
          },
          {
            title: '13. Communication Between Users and Businesses',
            text: [
              'JamiiMarket may provide ways for customers, businesses, and other marketplace participants to communicate.',
              'Users must not use these communication features for threats, harassment, spam, fraud, hate-based abuse, or other unlawful purposes.',
              'Information shared during communication should be accurate and must not violate the rights of others.',
            ],
          },
          {
            title: '14. User Content',
            text: [
              'Users may be able to submit images, descriptions, reviews, business information, product information, or other content to the platform.',
              'You are responsible for ensuring that you have the necessary rights or permission to use and publish that content and that it does not violate applicable law or another person’s rights.',
              'By submitting content to JamiiMarket, you allow the platform to use it to the extent reasonably necessary to operate, display, store, and improve the service, subject to the Privacy Policy and applicable law.',
            ],
          },
          {
            title: '15. Intellectual Property',
            text: [
              'The JamiiMarket software, design, branding, text, graphics, features, and other content owned by JamiiMarket may be protected by intellectual-property laws.',
              'You may not copy, sell, distribute, modify, reverse engineer, or otherwise exploit JamiiMarket or its protected components without appropriate permission, except where permitted by law.',
              'Content submitted by businesses or users may remain subject to the rights of its respective owner.',
            ],
          },
          {
            title: '16. Prohibited Activities',
            text: [
              'You must not use JamiiMarket for unlawful activities, fraud, identity theft, false information, misleading advertising, prohibited products, or attempts to bypass platform safeguards.',
              'You must also not attempt to access accounts, data, systems, or areas of JamiiMarket without authorization, interfere with platform operation, distribute malicious software, or conduct activities that could compromise other users or the platform.',
            ],
          },
          {
            title: '17. Account and Platform Security',
            text: [
              'Users must not attempt to bypass authentication, permission controls, security measures, or restrictions implemented by JamiiMarket.',
              'If you identify a security problem, vulnerability, or misuse, you should report it through the official support channels rather than exploiting it.',
            ],
          },
          {
            title: '18. Business Verification and Approval',
            text: [
              'JamiiMarket may request appropriate information or verification from businesses, riders, or other account types where reasonably necessary for marketplace safety and operation.',
              'The presence or display of a business on the platform does not by itself mean that JamiiMarket guarantees every claim, product, quality, or performance of that business unless a specific verification is expressly stated.',
            ],
          },
          {
            title: '19. Account Suspension or Termination',
            text: [
              'JamiiMarket may restrict, suspend, limit features, or terminate an account where there is a reasonable basis to believe that the user has violated these Terms, applicable law, or platform security requirements.',
              'Action may also be taken where an account is involved in fraud, creates a risk to other users, or is used in a way that may compromise the security or integrity of JamiiMarket.',
              'Where appropriate, JamiiMarket may provide information about the action taken in accordance with applicable law and procedures.',
            ],
          },
          {
            title: '20. Service Availability',
            text: [
              'We aim to keep JamiiMarket reliable and available, but we do not guarantee that the service will always be uninterrupted, error-free, or available without delay.',
              'The service may be temporarily unavailable because of maintenance, security issues, technical problems, third-party services, or circumstances outside our reasonable control.',
            ],
          },
          {
            title: '21. Third-Party Services',
            text: [
              'Some features may depend on services operated by third parties, such as payment providers, maps, communications, hosting, analytics, or delivery providers.',
              'Those services may be governed by their own terms and privacy policies. Your use of a third-party service may also be subject to its separate terms.',
            ],
          },
          {
            title: '22. Privacy',
            text: [
              'The handling of personal information through JamiiMarket is described in our Privacy Policy.',
              'By using the service, you should review the Privacy Policy to understand what information may be collected, the purposes of processing, sharing, retention, security, and your privacy rights.',
            ],
          },
          {
            title: '23. User Responsibilities',
            text: [
              'You are responsible for your use of JamiiMarket, the information you submit, the orders you place, and activity performed through your account.',
              'You must use the service honestly, respectfully, and in accordance with applicable law.',
            ],
          },
          {
            title: '24. Business Responsibilities',
            text: [
              'Businesses are responsible for their products, services, descriptions, prices, availability, quality, legality, and fulfilment of orders relating to their business, except where JamiiMarket has expressly accepted a specific responsibility.',
              'Businesses must treat customers fairly and comply with applicable consumer-protection and business requirements.',
            ],
          },
          {
            title: '25. No General Guarantee of Third-Party Businesses',
            text: [
              'JamiiMarket may facilitate discovery and communication between users and businesses, but the presence of a business, product, or service on the platform should not be treated as a complete guarantee of its quality, safety, legality, or performance unless expressly stated.',
              'Users should make their own decisions based on available information and the terms applicable to the relevant transaction.',
            ],
          },
          {
            title: '26. Limitation of Responsibility',
            text: [
              'To the extent permitted by applicable law, JamiiMarket is not responsible for losses arising from improper use of an account, inaccurate information submitted by a user or business, problems with third-party services, or circumstances outside JamiiMarket’s reasonable control.',
              'Nothing in these Terms is intended to exclude or limit responsibility that cannot lawfully be excluded or limited.',
            ],
          },
          {
            title: '27. Complaints and Disputes',
            text: [
              'If you have an issue involving an order, business, delivery, account, or other JamiiMarket service, we encourage you to contact support through the official channels available on the platform.',
              'Where an issue cannot be resolved through ordinary support, the rights and procedures available under applicable law will continue to apply.',
            ],
          },
          {
            title: '28. Applicable Law',
            text: [
              'Your use of JamiiMarket and these Terms are subject to the laws applicable to the service and the jurisdiction in which the relevant user or service is located.',
              'Nothing in these Terms is intended to remove rights or protections that are mandatory under applicable law.',
            ],
          },
          {
            title: '29. Changes to These Terms',
            text: [
              'JamiiMarket may update these Terms to reflect changes in services, technology, security, business operations, or legal requirements.',
              'The updated version will be published through the platform. Where changes are material, JamiiMarket may provide notice through appropriate channels.',
              'Continuing to use the service after updated Terms take effect may constitute acceptance of the updated Terms to the extent permitted by applicable law.',
            ],
          },
          {
            title: '30. Contact',
            text: [
              'For questions about these Terms, your account, orders, businesses, delivery, or other JamiiMarket services, please use the official contact and support channels available through the platform.',
            ],
          },
        ],
        principlesTitle: 'Key usage principles',
        principles: [
          'Provide accurate information when creating an account',
          'Keep your login credentials secure',
          'Businesses must provide accurate product and service information',
          'Do not use the platform for fraud or unlawful activity',
          'Respect customers, businesses, riders, and other participants',
          'Review order details before confirming',
          'Report security problems or misuse',
        ],
        privacyButton: 'Read Privacy Policy',
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
              <FileText size={17} />
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
            {/* Principles summary */}
            <aside className="rounded-3xl border border-[#DDC0BA] bg-[#FCF9F8] p-5 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-[#1B1C1C]">
                {content.principlesTitle}
              </h2>

              <div className="mt-5 space-y-3">
                {content.principles.map((principle) => (
                  <div
                    key={principle}
                    className="flex gap-2.5 text-sm leading-5 text-[#56423D]"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-[#326460]"
                    />
                    <span>{principle}</span>
                  </div>
                ))}
              </div>
            </aside>

            {/* Terms */}
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
                      to="/privacy"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A03F28] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#812914]"
                    >
                      {content.privacyButton}
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

export default TermsOfServicePage