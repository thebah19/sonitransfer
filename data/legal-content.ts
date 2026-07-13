export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: LegalSection[];
};

export type LegalPageContent = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  lastUpdated: string;
  version: string;
  sections: LegalSection[];
};

export const legalPages: LegalPageContent[] = [
  {
    slug: 'terms-conditions',
    title: 'Terms & Conditions',
    eyebrow: 'Service terms',
    description:
      'The customer rules, regulatory disclosures, transfer responsibilities, pricing, delivery, refund, and complaint terms for using Soni Transfer.',
    lastUpdated: '25/11/2025',
    version: '2.1',
    sections: [
      {
        title: '1. Legal Compliance',
        paragraphs: [
          'Soni Transfer Ltd is registered as a Small Payment Institution with the UK Financial Conduct Authority under the Payment Services Regulations 2017. FCA firm reference number: 798474.',
          'Soni Transfer is supervised by HMRC for anti-money laundering compliance. HMRC registration number: XWML00000122633.',
          'Customer funds are segregated in line with applicable payment service requirements, but they are not covered by the Financial Services Compensation Scheme.'
        ],
        bullets: [
          'We must verify customer identity and address where required.',
          'We must record and retain transaction details.',
          'We monitor transfers for unusual or suspicious activity.',
          'We comply with UK and international sanctions requirements.',
          'We may request valid ID, proof of address, and source of funds.'
        ]
      },
      {
        title: '2. Pricing, Exchange Rates & Central Bank Guidance',
        bullets: [
          'Soni Transfer charges a flat £1 fee per transfer where the UK fee model applies.',
          'Fees are disclosed upfront before transfer confirmation.',
          'Exchange rates are displayed before confirmation and may be based on guidance for The Gambia.',
          'The rate shown may differ from Google, Reuters, or other mid-market reference rates.',
          'Bank, card issuer, or other third-party charges may apply outside Soni Transfer’s control.'
        ]
      },
      {
        title: '3. Delivery Times',
        paragraphs: [
          'Transfers are processed as quickly as possible, but payout timing depends on payment checks, compliance review, payout partner availability, banking hours, and the receiving method selected.',
          'Additional checks may delay a transfer. We may ask for more information before releasing or completing a payment.'
        ]
      },
      {
        title: '4. Security of Funds',
        paragraphs: [
          'Soni Transfer uses security, payment, and compliance controls to help protect customers and transfers.',
          'Customers are responsible for protecting their account credentials and only sending money to people they know and trust.'
        ]
      },
      {
        title: '5. Contact Us',
        bullets: [
          'Email: support@sonitransfer.com',
          'Telephone: +44 121 532 0769',
          'WhatsApp: +44 7438 473456',
          'Address: Soni Transfer Ltd, 9 Waterloo Road, Birmingham, B66 4JX, United Kingdom'
        ]
      },
      {
        title: '6. Payment Transactions',
        paragraphs: [
          'A transfer is treated as submitted when the customer has entered the required details, reviewed the fee and exchange rate, accepted the terms, and authorised payment.',
          'We may reject, suspend, delay, or cancel a transaction where required for compliance, fraud prevention, sanctions screening, incorrect information, or operational reasons.'
        ]
      },
      {
        title: '7. Liability and Refunds',
        bullets: [
          'Customer liability may be limited to £35 unless fraud, intentional conduct, or gross negligence applies.',
          'Unauthorised or incorrectly executed payments should be reported as soon as possible.',
          'Refunds are normally returned to the original payment method.',
          'Where applicable, refunds may be issued within 10 business days.'
        ]
      },
      {
        title: '8. Changes and Termination',
        bullets: [
          'Terms may be amended from time to time.',
          'Material changes may be notified two months in advance where required.',
          'Soni Transfer may suspend or terminate access where there is misuse, fraud risk, legal requirement, or breach of terms.'
        ]
      },
      {
        title: '9. General Provisions',
        paragraphs: [
          'These terms should be read with the Privacy Policy, Cookie Policy, Refunds & Cancellations Policy, Complaints Policy, and any applicable partner terms.',
          'If any term is found invalid, the remaining terms continue to apply.'
        ]
      },
      {
        title: '10. Governing Law and Jurisdiction',
        paragraphs: [
          'These terms are governed by the laws of England and Wales. The courts of England and Wales have jurisdiction.',
          'Eligible complaints may be referred to the Financial Ombudsman Service at financial-ombudsman.org.uk.'
        ]
      },
      {
        title: '11. Acceptance of Terms and Related Policies',
        paragraphs: [
          'By using Soni Transfer services, you accept these terms and the related policies referenced on this website.'
        ]
      }
    ]
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    eyebrow: 'Data protection',
    description:
      'How Soni Transfer collects, uses, protects, shares, and retains customer, recipient, transaction, device, support, and marketing data.',
    lastUpdated: '25/11/2025',
    version: '2.1',
    sections: [
      {
        title: '1. Who we are',
        paragraphs: [
          'Soni Transfer Ltd is a UK company registered under company number 10832378, with registered office at 9 Waterloo Road, Birmingham, B66 4JX, United Kingdom.',
          'ICO registration: ZA499115. FCA registration: Small Payment Institution, reference 798474.',
          'Soni Transfer acts as a data controller under UK and EU data protection law. Services are intended for customers aged 18 and over.'
        ]
      },
      {
        title: '2. What data we collect',
        bullets: [
          'Identity data: full name, date of birth, nationality, ID documents, and proof of address.',
          'Contact data: residential address, email address, and telephone number.',
          'Financial data: payment card details, bank account information, and source of funds information.',
          'Recipient data: beneficiary name, address, and phone number where required.',
          'Technical data: IP address, browser version, device type, and login timestamps.',
          'Behavioural data: website/app pages visited, clicks, and sign-up drop-off information.',
          'Support data: enquiries, complaints, and correspondence.',
          'Marketing data: preferences and opt-in or opt-out status.'
        ],
        paragraphs: [
          'We may receive data from banks, KYC and AML providers, credit or fraud prevention agencies, public sources, and other third parties where lawful.'
        ]
      },
      {
        title: '3. Why we use your data and lawful bases',
        bullets: [
          'Contract: to create accounts, process transfers, provide support, and communicate service updates.',
          'Legal obligation: to comply with AML, counter-terrorist financing, tax, sanctions, and record-keeping laws.',
          'Legitimate interests: fraud prevention, service improvement, security, and business administration.',
          'Consent: optional marketing cookies, marketing communications, and optional analytics where required.'
        ]
      },
      {
        title: '4. Automated decisions and manual review',
        paragraphs: [
          'Some checks may use automated tools to support identity, fraud, sanctions, or transaction screening. Where needed, staff may manually review activity before a transaction is accepted or completed.'
        ]
      },
      {
        title: '5. How we share your data',
        bullets: [
          'Payment providers, banks, card processors, and payout partners.',
          'KYC, AML, sanctions, and fraud-prevention providers.',
          'Technology, cloud, analytics, support, and communication providers.',
          'Regulators, law enforcement, courts, tax authorities, and other bodies where legally required.',
          'Professional advisers and business partners where needed for lawful business operations.'
        ]
      },
      {
        title: '6. International transfers',
        paragraphs: [
          'Some personal data may be transferred outside the UK or EU. Where required, Soni Transfer uses appropriate safeguards such as UK IDTA, EU Standard Contractual Clauses, or other lawful transfer mechanisms.'
        ]
      },
      {
        title: '7. Vulnerable customers',
        paragraphs: [
          'Where a customer needs additional support, we may record limited information to tailor service and support. This information is handled carefully and only used for support purposes.'
        ]
      },
      {
        title: '8. How we protect your data',
        bullets: [
          'Access control and staff permissions.',
          'Security monitoring and protected payment flows.',
          'Encryption and secure hosting where appropriate.',
          'Staff training on data protection, AML, and customer handling.',
          'Controls for suppliers that process personal data on our behalf.'
        ]
      },
      {
        title: '9. How long we keep your data',
        bullets: [
          'KYC and transaction data: normally 5 years after the last transaction where required by law.',
          'Complaints: normally 6 years after resolution.',
          'Cookie and analytics data: retained according to the Cookie Policy and consent settings.',
          'Marketing data: retained until opt-out or until no longer required.'
        ]
      },
      {
        title: '10. Your rights',
        bullets: [
          'Access your personal data.',
          'Correct inaccurate data.',
          'Request erasure where legally available.',
          'Restrict or object to processing where applicable.',
          'Request portability where applicable.',
          'Withdraw consent for optional processing.',
          'Complain to the ICO or an applicable data protection authority.'
        ]
      },
      {
        title: '11. Cookies and tracking',
        paragraphs: [
          'Soni Transfer uses strictly necessary cookies and may use analytics or marketing cookies where permitted by consent. See the Cookie Policy for full details.'
        ]
      },
      {
        title: '12. Changes to this policy',
        paragraphs: [
          'This policy may be updated from time to time. Significant changes will be communicated where required.'
        ]
      },
      {
        title: '13. Contact us',
        bullets: [
          'Email: support@sonitransfer.com',
          'Address: Soni Transfer Ltd, 9 Waterloo Road, Birmingham, B66 4JX, United Kingdom',
          'ICO: ico.org.uk'
        ]
      }
    ]
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    eyebrow: 'Cookie consent',
    description:
      'How Soni Transfer uses strictly necessary, analytics, marketing, and similar technologies on the website.',
    lastUpdated: '25/11/2025',
    version: '2.1',
    sections: [
      {
        title: '1. What are cookies?',
        paragraphs: [
          'Cookies are small text files stored on your device when you visit a website. They help remember choices, improve experience, keep the site secure, and support login or payment sessions.'
        ]
      },
      {
        title: '2. Types of cookies we use',
        subsections: [
          {
            title: 'a) Strictly necessary cookies',
            paragraphs: ['These are always on because the site and services need them to work.'],
            bullets: ['Keep the site secure.', 'Remember cookie preferences.', 'Enable payments and login sessions.']
          },
          {
            title: 'b) Analytics cookies',
            paragraphs: ['These optional cookies help us understand how visitors use the site so we can improve it.'],
            bullets: ['Count visitors and popular pages.', 'Understand where users drop off during sign-up.', 'Measure service performance.']
          },
          {
            title: 'c) Marketing cookies',
            paragraphs: ['These optional cookies help deliver relevant adverts and measure marketing effectiveness.'],
            bullets: ['Show Soni Transfer adverts on other websites after a visit.', 'Limit how often the same advert is shown.', 'Measure campaign performance.']
          }
        ]
      },
      {
        title: '3. How you can control cookies',
        paragraphs: [
          'You can accept, reject, or manage optional cookies through the cookie banner. You can also change browser settings to block or delete cookies.'
        ]
      },
      {
        title: '4. Similar technologies',
        paragraphs: [
          'Soni Transfer may use similar technologies such as pixels, tags, local storage, or SDK tools to support security, analytics, and marketing where lawful.'
        ]
      },
      {
        title: '5. Updates to this policy',
        paragraphs: ['This Cookie Policy may be updated from time to time. Significant updates will be highlighted where required.']
      },
      {
        title: '6. Contact us',
        bullets: ['Email: support@sonitransfer.com']
      },
      {
        title: 'Cookies and Similar Technologies Used by Soni Transfer',
        bullets: [
          'sessionID: strictly necessary session and security cookie.',
          'cookie consent preference: strictly necessary cookie used to remember consent choices.',
          'analytics identifiers: optional analytics cookies used only where consent applies.',
          'marketing identifiers: optional advertising cookies used only where consent applies.'
        ]
      }
    ]
  },
  {
    slug: 'refunds-cancellations',
    title: 'Refunds and Cancellations Policy',
    eyebrow: 'Transfer changes',
    description:
      'When a transfer can be cancelled, how refunds are returned, what happens after payout, and how fees are handled.',
    lastUpdated: '25/11/2025',
    version: '2.1',
    sections: [
      {
        title: '1. Right to Cancel',
        paragraphs: ['You may cancel a money transfer request at any time before funds have been paid to the beneficiary.'],
        bullets: ['Cancellation can be requested by calling customer support.', 'Cancellation can be requested through the website or app where the function is available.']
      },
      {
        title: '2. Refund Process',
        paragraphs: [
          'If the transfer has not yet been paid to the beneficiary, Soni Transfer will refund the full amount back to the original payment method.',
          'The time taken for funds to appear may depend on the customer’s bank, card provider, or payment service.'
        ]
      },
      {
        title: '3. Transfers Already Paid Out',
        paragraphs: [
          'Once funds have been paid to the beneficiary, the transaction is final. Soni Transfer will not normally be able to cancel or refund the transfer.'
        ]
      },
      {
        title: '4. Refunds of Fees',
        bullets: [
          'If Soni Transfer cancels a transaction due to its own error, the transfer amount and fees paid will be refunded.',
          'If the customer cancels a transaction for other reasons, fees may not be refundable.'
        ]
      },
      {
        title: '5. Refunds to Original Method of Payment',
        paragraphs: [
          'All refunds are made to the original payment method used for the transfer, such as the debit card or bank account used to pay.'
        ]
      },
      {
        title: '6. Consumer Rights',
        paragraphs: [
          'Nothing in this policy affects statutory rights under UK consumer law or the Payment Services Regulations 2017.'
        ]
      }
    ]
  },
  {
    slug: 'complaints-policy',
    title: 'Complaints Policy',
    eyebrow: 'Fair support',
    description:
      'How to complain, what happens after a complaint, complaint response timelines, and how to escalate to the Financial Ombudsman Service.',
    lastUpdated: '25/11/2025',
    version: '2.1',
    sections: [
      {
        title: 'How to make a complaint',
        paragraphs: [
          'Soni Transfer aims to provide a reliable, transparent, and fair service. If something goes wrong, customers have the right to complain and we will try to resolve the issue quickly and fairly.'
        ],
        bullets: [
          'Email: support@sonitransfer.com',
          'Telephone: +44 121 532 0769',
          'WhatsApp: +44 7438 473456',
          'Post: Soni Transfer Ltd, 9 Waterloo Road, Birmingham, B66 4JX, United Kingdom',
          'Complaints can also be made verbally or in writing to any member of staff.'
        ]
      },
      {
        title: 'What happens after you complain',
        bullets: [
          'Acknowledgement: we will confirm receipt of the complaint promptly.',
          'Investigation: the Compliance Officer will review the case fairly and thoroughly.',
          'Final response: we aim to resolve complaints within 15 business days.',
          'If more time is needed, we will explain why and send a final response within 35 business days at the latest where required by the Payment Services Regulations.',
          'The response will explain the findings, remedial action where applicable, and escalation rights.'
        ]
      },
      {
        title: 'If you are not satisfied',
        paragraphs: [
          'If you are unhappy with the final response, or if we do not respond within the required timeframe, eligible complaints may be referred to the Financial Ombudsman Service.'
        ],
        bullets: [
          'Website: financial-ombudsman.org.uk',
          'Post: Financial Ombudsman Service, Exchange Tower, London, E14 9SR',
          'Online form: available from the Financial Ombudsman Service website'
        ]
      }
    ]
  },
  {
    slug: 'belmoney-terms',
    title: 'Belmoney Terms & Conditions',
    eyebrow: 'Partner terms',
    description:
      'Belmoney S.A. regulatory, payment service, customer, data protection, cancellation, refund, liability, and dispute resolution terms.',
    lastUpdated: '25/11/2025',
    version: '2.1',
    sections: [
      {
        title: 'Regulatory Information',
        paragraphs: [
          'Belmoney S.A., with registered office at Avenue Louise 54, 1050 Ixelles, Belgium, and company number 0540.745.997 RPM Brussels, is an authorised payment institution supervised by the National Bank of Belgium under PSD2.',
          'Belmoney is subject to Belgian and EU anti-money laundering, counter-terrorist financing, GDPR, and consumer protection law.'
        ]
      },
      {
        title: 'Definitions',
        bullets: [
          'Agreement means the Belmoney Terms & Conditions together with the related Privacy Policy and Cookie Policy.',
          'Belmoney means Belmoney S.A.',
          'Customer means the individual using Belmoney services.',
          'Services include money transfer, foreign exchange, Remittance as a Service, correspondent activities, and online remittance services.',
          'Transaction means a payment order executed by Belmoney for a customer.',
          'Sender means the person instructing Belmoney to send money.',
          'Beneficiary means the person designated to receive funds.',
          'Funding Instrument means a debit card, credit card, bank account, or other approved payment method.'
        ]
      },
      {
        title: '1. Our Agreement With You',
        paragraphs: [
          'These terms govern the use of Belmoney online payment services and should be read with Belmoney privacy and cookie terms. By using the service, the customer accepts the agreement.'
        ]
      },
      {
        title: '2. Our Services',
        bullets: [
          'Services enable customers in supported locations to send funds to beneficiaries through supported payout methods.',
          'The receive amount is the amount made available to the beneficiary after applicable fees and foreign exchange.',
          'Services are intended for personal support and permitted remittance use, not illegal activity or prohibited commercial use.'
        ]
      },
      {
        title: '3. Getting Started and Using Our Services',
        bullets: [
          'Customers must be at least 18 years old and resident in a supported country.',
          'Customers must provide accurate information and complete KYC checks when required.',
          'Belmoney may apply enhanced due diligence or refuse activity involving high-risk jurisdictions.',
          'Customers may hold one profile and may be limited in the number of linked emails, cards, or payment instruments.'
        ]
      },
      {
        title: '4. Sending Money',
        bullets: [
          'Before submitting a transfer, customers must review the beneficiary, amount, fees, exchange rate, and payout details.',
          'Payment must be funded by a lawful and valid funding instrument owned or authorised by the customer.',
          'A transaction may be delayed, refused, or cancelled for identity, limit, AML, sanctions, fraud, or operational checks.',
          'Refunds and cancellations are handled under the error, cancellations, and refunds section.'
        ]
      },
      {
        title: '5. Paying for Our Services and Currency Exchange',
        bullets: [
          'Customers agree to pay the service fee displayed before confirmation.',
          'Fees may vary by amount, country, channel, or payout method.',
          'Customers must pay only through disclosed supported payment methods.',
          'The exchange rate applied is shown before confirmation.',
          'Banks, card issuers, telecom providers, or internet providers may charge separate third-party fees.'
        ]
      },
      {
        title: '6. Receiving Money',
        paragraphs: [
          'Funds are made available through Belmoney’s network of local service providers and payout partners. Beneficiaries may need identification, transaction reference, or other collection information.'
        ]
      },
      {
        title: '7. Important Service Restrictions',
        bullets: [
          'Belmoney may refuse, suspend, or delay a transaction to protect customers or comply with legal duties.',
          'Services must not be used for illegal purposes, gambling, fraud, prohibited goods, or transactions involving people the sender does not know or trust.',
          'Enhanced due diligence may be applied where required.'
        ]
      },
      {
        title: '8. Data Protection and Privacy',
        bullets: [
          'Personal data processing is governed by Belmoney privacy and cookie policies.',
          'Belmoney collects and verifies personal data to comply with AML and legal obligations.',
          'Data may be disclosed to regulators, law enforcement, judicial authorities, service providers, and payout partners where legally required or operationally necessary.'
        ]
      },
      {
        title: '9. Error, Cancellations, and Refunds',
        bullets: [
          'Customers must notify Belmoney promptly of errors or unauthorised activity.',
          'Transactions may be cancelled before completion where possible.',
          'Refunds are credited to the original funding instrument.',
          'Customers may request payment traces within applicable time limits.'
        ]
      },
      {
        title: '10. Agreement Duration and Termination',
        bullets: [
          'The agreement continues while the customer uses the service.',
          'Belmoney may terminate or suspend access for breach, legal requirement, fraud risk, misuse, or operational reasons.',
          'Belmoney may retain customer data after termination where required by law.'
        ]
      },
      {
        title: '11. Intellectual Property',
        paragraphs: [
          'Belmoney owns intellectual property rights related to its services, trademarks, and software. Customers receive a limited, revocable, non-exclusive licence to use the app or website for personal service use.'
        ]
      },
      {
        title: '12. Disclaimers',
        bullets: [
          'Belmoney is not responsible for disputes between customers and third parties unrelated to the payment service.',
          'Security measures are used, but no system can be guaranteed absolutely secure.',
          'Service availability can be affected by external, technical, banking, compliance, or payout partner factors.'
        ]
      },
      {
        title: '13. Customer Responsibility for Losses',
        bullets: [
          'Customers may be responsible for losses caused by fraudulent, intentional, or negligent activity.',
          'Customers must keep credentials safe and notify Belmoney promptly of suspected misuse.'
        ]
      },
      {
        title: '14. Belmoney’s Liability',
        paragraphs: [
          'Belmoney’s liability is limited under the agreement except where liability cannot lawfully be excluded, including death or personal injury caused by negligence, fraud, or other non-excludable liability.'
        ]
      },
      {
        title: '15. Dispute Resolution and Governing Law',
        bullets: [
          'Customers should first report concerns directly to Belmoney customer support.',
          'Unresolved disputes may be escalated through Belmoney’s dispute process.',
          'The terms are governed by Belgian law unless mandatory consumer protections provide otherwise.'
        ]
      },
      {
        title: '16. Customer Security Obligations',
        bullets: [
          'Use secure devices and protect login credentials.',
          'Do not share passwords, OTPs, or security credentials.',
          'Keep devices protected from viruses and unauthorised access.',
          'Report suspected phishing, unauthorised access, or misuse promptly.',
          'Follow Belmoney security instructions and device requirements.'
        ]
      },
      {
        title: '17. Changes to Services and Agreement',
        paragraphs: [
          'Belmoney may introduce, change, suspend, or withdraw services, features, and terms where required by law, business need, security, or operational reasons. Updated terms may be published on the website or app.'
        ]
      },
      {
        title: '18. Other Terms',
        bullets: [
          'The agreement is between the customer and Belmoney.',
          'No third party has rights under the agreement except where stated.',
          'Belmoney is not part of a deposit compensation scheme for customer funds unless explicitly stated by applicable law.',
          'If one term is invalid, the remaining terms continue to apply.'
        ]
      }
    ]
  }
];

export const getLegalPage = (slug: string) => legalPages.find((page) => page.slug === slug);
