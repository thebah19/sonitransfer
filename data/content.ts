import {
  BadgeCheck,
  Banknote,
  Bell,
  Building2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  FileCheck2,
  Headphones,
  Landmark,
  LockKeyhole,
  MapPin,
  MonitorCheck,
  PlugZap,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  UserCheck,
  WalletCards,
  Zap
} from 'lucide-react';
import type { BlogPost, FAQ, FeatureCard, PageContent, PayoutMethod, Rate, Testimonial } from '@/types';

export const rates: Rate[] = [
  {
    corridor: 'UK',
    country: 'United Kingdom',
    flag: 'GB',
    sendCurrency: 'GBP',
    receiveCurrency: 'GMD',
    rate: 89.5,
    fee: 1.99,
    minimum: 10,
    maximum: 5000,
    arrival: 'Usually within minutes'
  },
  {
    corridor: 'EU',
    country: 'European Union',
    flag: 'EU',
    sendCurrency: 'EUR',
    receiveCurrency: 'GMD',
    rate: 95.2,
    fee: 2.49,
    minimum: 10,
    maximum: 5000,
    arrival: 'Usually within minutes'
  },
  {
    corridor: 'USA',
    country: 'United States',
    flag: 'US',
    sendCurrency: 'USD',
    receiveCurrency: 'GMD',
    rate: 86.1,
    fee: 2.99,
    minimum: 10,
    maximum: 5000,
    arrival: 'Usually within minutes'
  }
];

export const trustBadges = [
  { label: 'FCA-registered SPI · FRN 798474', icon: FileCheck2 },
  { label: 'Secure transfers', icon: ShieldCheck },
  { label: 'Fee shown before payment', icon: ReceiptText },
  { label: 'Fast payout', icon: Zap }
];

export const whyChoose: FeatureCard[] = [
  {
    title: 'Fee shown upfront',
    description: 'Review the transfer fee before you pay, with the receive amount shown clearly in dalasi.',
    icon: CircleDollarSign
  },
  {
    title: 'Clear exchange rates',
    description: 'Check the GBP, EUR, or USD rate against GMD before deciding how much to send.',
    icon: TrendingUp
  },
  {
    title: 'Fast family support',
    description: 'Transfers are designed for everyday support, urgent needs, and regular commitments back home.',
    icon: Clock3
  },
  {
    title: 'Secure and accountable',
    description: 'Identity checks, monitoring, data protection, and compliance controls support a safer transfer experience.',
    icon: ShieldCheck
  }
];

export const steps: FeatureCard[] = [
  {
    title: 'Create your account',
    description: 'Sign up, verify your details, and choose where you are sending from.',
    icon: UserCheck
  },
  {
    title: 'Enter family and amount',
    description: 'Add your recipient and choose cash pickup, bank deposit, wallet, airtime, or Cash Power.',
    icon: Banknote
  },
  {
    title: 'Pay securely and track it',
    description: 'Confirm the fee, rate, and dalasi receive amount, then follow the transfer in the app.',
    icon: MonitorCheck
  }
];

export const payoutMethods: PayoutMethod[] = [
  {
    title: 'Cash pickup',
    description: 'Send for quick collection at trusted payout locations.',
    detail: 'Useful for urgent family support and recipients without a bank account.',
    icon: MapPin
  },
  {
    title: 'Bank deposit',
    description: 'Deposit directly into supported bank accounts.',
    detail: 'A practical option for school fees, regular commitments, and savings.',
    icon: Landmark
  },
  {
    title: 'Mobile wallet',
    description: 'Send to supported mobile wallet accounts when available.',
    detail: 'Designed for recipients who prefer digital access on their phone.',
    icon: WalletCards
  },
  {
    title: 'Airtime top-up',
    description: 'Top up a loved one’s phone from abroad.',
    detail: 'A small transfer that helps people stay connected.',
    icon: Smartphone
  },
  {
    title: 'Cash Power',
    description: 'Help with electricity top-ups directly from the Soni app.',
    detail: 'Built for everyday household support back home.',
    icon: PlugZap
  }
];

export const appBenefits: FeatureCard[] = [
  { title: 'Send anytime', description: 'Start a transfer from your phone whenever family needs support.', icon: Clock3 },
  { title: 'Save beneficiaries', description: 'Keep trusted recipients ready for repeat transfers.', icon: BadgeCheck },
  { title: 'Track your transfer', description: 'See each stage from payment to payout confirmation.', icon: MonitorCheck },
  { title: 'Get rate updates', description: 'Check exchange rates before you send.', icon: TrendingUp },
  { title: 'Receive notifications', description: 'Get clear updates when money is on the move.', icon: Bell }
];

export const securityItems: FeatureCard[] = [
  { title: 'Secure payment processing', description: 'Payment flows are designed around protected checkout and clear confirmation screens.', icon: CreditCard },
  { title: 'Identity verification', description: 'Customer checks help protect accounts and meet compliance responsibilities.', icon: UserCheck },
  { title: 'Transaction monitoring', description: 'Transfers can be reviewed to detect unusual activity and protect customers.', icon: MonitorCheck },
  { title: 'Regulatory compliance', description: 'Soni Transfer is registered as a Small Payment Institution with the FCA, FRN 798474, and supervised by HMRC for AML compliance.', icon: FileCheck2 },
  { title: 'Data protection', description: 'Personal information is handled with privacy, access control, and security in mind.', icon: LockKeyhole },
  { title: 'Vulnerable customer support', description: 'Support paths are designed to help customers who need extra care.', icon: Headphones }
];

export const faqs: FAQ[] = [
  { q: 'What services does Soni Transfer offer?', a: 'Soni Transfer offers app-based money transfers with cash pickup, bank deposit, mobile wallet, mobile credit, and Cash Power services where available.' },
  { q: 'How do I send money?', a: 'Create an account, choose where you are sending from, add your recipient, enter the amount, review the fee and exchange rate, then pay securely.' },
  { q: 'How much does Soni Transfer charge?', a: 'The calculator shows the transfer fee, exchange rate, and exact GMD amount your recipient receives before you continue.' },
  { q: 'How long does a transfer take?', a: 'Many supported transfers are designed for quick payout, although timing can depend on checks, payout partners, and the receiving method.' },
  { q: 'How can my recipient collect the money?', a: 'Recipients can use supported options such as cash pickup, bank deposit, mobile wallet, airtime, and Cash Power top-up.' },
  { q: 'Can I send Cash Power or airtime?', a: 'Yes. Soni Transfer is designed to support everyday needs like phone credit and electricity top-ups as well as money transfers.' },
  { q: 'Is Soni Transfer regulated?', a: 'Yes. Soni Transfer Ltd is registered as a Small Payment Institution with the FCA, FRN 798474, and supervised by HMRC for AML compliance.' },
  { q: 'What documents do I need?', a: 'You may need a valid photo ID and basic address information. Additional checks can apply depending on your activity and local rules.' },
  { q: 'Can I cancel a transfer?', a: 'Pending transfers may be cancellable through support or the app. Completed payouts normally cannot be reversed.' }
];

export const testimonials: Testimonial[] = [
  { name: 'Awa Jallow', city: 'Birmingham', quote: 'I use Soni for monthly family support. The fee is clear, the rate is easy to understand, and my mum knows when to collect.' },
  { name: 'Musa Ceesay', city: 'London', quote: 'It feels built for how we actually send money home. Cash pickup and Cash Power in one place makes a difference.' },
  { name: 'Fatou Sowe', city: 'Germany', quote: 'I like seeing exactly what my family receives in dalasi before I confirm. That transparency matters.' },
  { name: 'Lamin Bah', city: 'New York', quote: 'For emergencies and school fees, I need speed and a proper record. The app flow gives me both.' }
];

export const pages: PageContent[] = [
  {
    slug: 'how-it-works',
    title: 'What happens when you send with Soni',
    eyebrow: 'The transfer journey',
    description: 'From account checks to payout confirmation, here is what to expect at each stage of a transfer.',
    bullets: ['Verify your identity before sending', 'Add accurate recipient information', 'Review the final price before payment'],
    cta: 'Create an account',
    detailTitle: 'From account setup to payout',
    detailCopy: 'Create and verify your account, add the recipient exactly as shown on their identification or account, choose an available receiving method, review the transfer details, and follow status updates in the app.'
  },
  {
    slug: 'rates-fees',
    title: 'See the full transfer cost before you pay',
    eyebrow: 'Pricing explained',
    description: 'Your transfer details separate the amount you send, the transfer fee, the exchange rate, and the exact amount your recipient receives.',
    bullets: ['Transfer details use the current available rate', 'The fee, rate, and receive amount appear before payment', 'Your bank or card provider may apply separate charges'],
    cta: 'Check a transfer',
    detailTitle: 'How to read your transfer details',
    detailCopy: 'The receive amount is calculated from the send amount and the exchange rate shown. This is the amount your recipient gets; the transfer fee is displayed separately.'
  },
  {
    slug: 'cash-pickup',
    title: 'Send money for cash collection',
    eyebrow: 'Collect in person',
    description: 'Choose cash pickup when your recipient needs to collect funds from a supported payout location.',
    bullets: ['Select an available pickup option in the app', "Enter the recipient's name exactly as shown on their ID", 'Share collection details only with the intended recipient'],
    cta: 'Start a cash pickup transfer',
    detailTitle: 'What your recipient may need',
    detailCopy: 'The recipient may be asked for valid identification, the transfer reference, and other information required by the payout partner. Requirements can vary by location.'
  },
  {
    slug: 'bank-deposit',
    title: 'Deposit directly into a supported bank account',
    eyebrow: 'Send to an account',
    description: 'Bank deposit is suited to recipients who want funds delivered to an eligible account without visiting a pickup location.',
    bullets: ["Confirm the account holder's name", 'Check the bank and account details carefully', 'Review the expected receive amount before payment'],
    cta: 'Start a bank deposit',
    detailTitle: 'Accurate details prevent delays',
    detailCopy: 'Use the account information supplied by the recipient. Incorrect names, account numbers, or bank details can delay or prevent a deposit.'
  },
  {
    slug: 'mobile-wallet',
    title: 'Transfer to a supported mobile wallet',
    eyebrow: 'Send to a phone-based account',
    description: "Send directly to an eligible wallet using the recipient's registered mobile number and provider.",
    bullets: ['The wallet must be active and able to receive funds', 'Confirm the registered name and mobile number', 'Available providers appear in the app'],
    cta: 'Start a wallet transfer',
    detailTitle: 'Check the wallet before sending',
    detailCopy: 'Ask the recipient to confirm their wallet provider, registered number, and account status. A phone number alone does not guarantee that the wallet can receive a transfer.'
  },
  {
    slug: 'airtime-cash-power',
    title: 'Help with phone credit or electricity',
    eyebrow: 'Everyday top-ups',
    description: 'Use Airtime or Cash Power when the need is a top-up rather than a cash transfer.',
    bullets: ['Enter the mobile number or meter details carefully', 'Review the top-up value before confirmation', 'Availability is shown in the app'],
    cta: 'Start a top-up',
    detailTitle: 'Send the right type of support',
    detailCopy: 'Airtime adds credit to an eligible mobile number. Cash Power supports an eligible prepaid electricity meter. These services are separate from cash payout and bank deposit.'
  },
  {
    slug: 'about-us',
    title: 'Built around the way our communities send home',
    eyebrow: 'About Soni Transfer',
    description: 'Soni Transfer connects people abroad with recipients in The Gambia through practical digital transfer and top-up services.',
    bullets: ['Services for household costs, school fees, and urgent needs', 'Transfer details and records in the app', 'Verification, monitoring, and customer support'],
    cta: 'Read about compliance and security',
    detailTitle: 'Designed for recurring, real-world needs',
    detailCopy: 'Customers can review the full transfer details, select an available receiving method, and keep a record of each transfer. We verify customers, monitor transactions, and provide support when a payment needs attention.'
  },
  {
    slug: 'help-faqs',
    title: 'Help with accounts, transfers, and payouts',
    eyebrow: 'Find an answer',
    description: 'Start with the topic that matches your issue. If a transfer is already in progress, include its reference when contacting support.',
    bullets: ['Account access and identity verification', 'Transfers in progress and recipient collection', 'Changes, refunds, complaints, and accessibility'],
    cta: 'Contact support',
    detailTitle: 'Choose the closest help topic',
    detailCopy: 'Use Help for account checks, pricing questions, transfer status, payout issues, cancellation requests, refunds, complaints, or additional accessibility support.'
  },
  {
    slug: 'contact',
    title: 'Tell us what you need help with',
    eyebrow: 'Soni Transfer support',
    description: 'Choose the right contact route and include the details needed to investigate your issue.',
    bullets: ['Include your transfer reference if you have one', 'Describe what happened and when', 'Never send passwords, full card details, or security codes'],
    cta: 'Send a support request'
  },
  {
    slug: 'blog',
    title: 'Community & CSR',
    eyebrow: 'Soni stories',
    description: 'Read how Soni Transfer supports Soninkara and Gambian diaspora communities through family events, sport, culture, and connection.',
    bullets: ['Real CSR stories from Birmingham and Atlanta', 'Community photography from Soni-sponsored events', 'A warm editorial space for diaspora updates'],
    cta: 'Read the Blog'
  },
  {
    slug: 'compliance-security',
    title: 'Checks that protect customers and the payment system',
    eyebrow: 'How transfers are protected',
    description: 'Verification and transaction review are part of providing a regulated money-transfer service. Some checks may add time, but they help prevent fraud and financial crime.',
    bullets: ['Identity and source-of-funds checks where required', 'Transaction, sanctions, and fraud monitoring', 'Account security and customer responsibility'],
    cta: 'View regulatory information',
    detailTitle: 'Security is a shared responsibility',
    detailCopy: 'Keep account credentials private, check recipient details carefully, and send only to people you know and trust. Contact support immediately if you suspect unauthorised activity.'
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    eyebrow: 'Data protection',
    description: 'Understand how customer information should be collected, used, protected, retained, and shared with service partners.',
    bullets: ['Identity and account data', 'Payment and transaction information', 'Customer rights and support contact paths'],
    cta: 'Contact Privacy Team'
  },
  {
    slug: 'terms-conditions',
    title: 'Terms & Conditions',
    eyebrow: 'Service terms',
    description: 'Review the customer responsibilities, transfer rules, service limits, payout conditions, and account terms.',
    bullets: ['Transfer acceptance and review', 'Payout partner responsibilities', 'Service changes and customer obligations'],
    cta: 'Start Transfer'
  },
  {
    slug: 'complaints-policy',
    title: 'Complaints Policy',
    eyebrow: 'Fair support',
    description: 'Soni Transfer should provide a clear route for raising, tracking, and resolving complaints with care and transparency.',
    bullets: ['How to submit a complaint', '15 business day response target', '35 business day final response deadline where Payment Services Regulations require it'],
    cta: 'Raise a Complaint'
  },
  {
    slug: 'refunds-cancellations',
    title: 'Refunds & Cancellations',
    eyebrow: 'Transfer changes',
    description: 'Understand when a transfer may be cancelled, when refunds may be possible, and what happens after payout completion.',
    bullets: ['Pending transfer cancellation guidance', 'Completed payout limitations', 'Support route for failed or delayed transfers'],
    cta: 'Get Help'
  }
];

export const getPage = (slug: string) => pages.find((page) => page.slug === slug);

export const blogPosts: BlogPost[] = [
  {
    slug: 'agera-july-4th-football-championship-2023',
    title: 'Soni Transfer Sponsors 2023 Gambian AGERA July 4th Football Championship',
    date: '2023-07-10',
    location: 'Atlanta, Georgia',
    category: 'CSR',
    excerpt:
      'Soni Transfer was honoured to sponsor the annual AGERA July 4th football championship, celebrating Gambian culture and community in Atlanta.',
    featuredImage: '/csr/agera-2023/featured.jpg',
    gallery: ['/csr/agera-2023/picture-1.jpg', '/csr/agera-2023/picture-2.jpg'],
    body: [
      'Soni Transfer, a leading money transfer app to The Gambia, was proud to sponsor the 2023 Gambian AGERA July 4th football championship in Atlanta, Georgia. The championship was a thrilling way to celebrate American Independence Day and to support the Gambian community in Atlanta.',
      'The AGERA July 4th championship is an annual sports and family event held in Atlanta every summer to commemorate American Independence Day. Teams from different US states participate in a football championship starting on a Saturday, culminating in the two finalists playing for the trophy on Sunday in front of families and friends from different states.',
      'The 2023 final was an edge-of-your-seat match between Washington DC and the host Georgia, with DC prevailing in a penalty shootout after the match was tied at the end of extra time.',
      'The championship was a feast for the senses, with Gambian businesses showcasing their wares, food stalls serving Gambian and American dishes, and games and entertainment for children of all ages. Soni Transfer was proud to be part of it.'
    ]
  },
  {
    slug: 'soninkara-family-fun-day-2024',
    title: 'Soni Transfer Supports Soninkara Family Fun Day 2024',
    date: '2024-09-01',
    location: 'Birmingham, United Kingdom',
    category: 'CSR',
    excerpt:
      'Celebrating community and shared values at the Soninkara Family Fun Day, reinforcing Soni Transfer’s commitment to the diaspora.',
    featuredImage: '/csr/family-fun-day-2024/featured.jpg',
    gallery: ['/csr/family-fun-day-2024/picture-1.jpg', '/csr/family-fun-day-2024/picture-2.jpg'],
    body: [
      'Soni Transfer was delighted to participate in the Soninkara Family Fun Day 2024. As a business dedicated to facilitating seamless financial transactions between the UK and The Gambia, we take pride in being part of events that strengthen community bonds and celebrate cultural diversity.',
      'The Soninkara Family Fun Day allowed us to connect with valued customers and partners, while reinforcing our commitment to supporting community initiatives.',
      'Soni Transfer is committed to supporting the Soninke community and helping to preserve its culture and heritage.',
      'We look forward to continuing our involvement in meaningful events and contributing to the community’s wellbeing and growth. Thank you to everyone who made the Soninkara Family Fun Day 2024 a memorable occasion.'
    ]
  },
  {
    slug: 'celebrating-with-our-community',
    title: 'Soni Transfer Celebrating with our Community',
    date: '2023-09-15',
    location: 'Gambian diaspora communities',
    category: 'Community',
    excerpt:
      'From family fun days to community festivals, Soni Transfer continues to support and celebrate with the Gambian diaspora.',
    featuredImage: '/csr/family-fun-day-2023/featured.jpg',
    gallery: ['/csr/family-fun-day-2023/picture-1.jpg', '/csr/family-fun-day-2023/picture-2.jpg'],
    body: [
      'Our mission at Soni Transfer has always been about more than just money transfers. It is about building and sustaining the bridges that connect our community.',
      'Whether through sports sponsorship or family festivals, we believe in being an active participant in the lives of diaspora members.',
      'We continue to innovate our platform to offer strong rates and fast delivery, but our heart remains with the community we serve.',
      'We are proud to be a trusted partner for sending money home to The Gambia.'
    ]
  }
];

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
