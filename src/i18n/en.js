// English copy — the source catalogue. Every other locale mirrors this shape;
// `npm run test:i18n` fails if a key here is missing or empty elsewhere.
//
// Not in here on purpose: the seven legal documents and the footer's
// regulatory disclosures (published in English, which is the governing
// version), and the Google reviews (quoted verbatim as their authors wrote
// them).

export const en = {
  meta: {
    home: {
      title: "Soni Transfer | Send Money Across Africa",
      description:
        "Send money securely with Soni Transfer. Check competitive exchange rates, choose from available payout options, and see exactly what your recipient will receive.",
    },
    community: {
      title: "Community | Soni Transfer",
      description:
        "Soni Transfer is rooted in the community it serves. Read about our Family Fun Day, local partnerships and the people behind the service.",
    },
    notFound: {
      title: "Page not found | Soni Transfer",
      description: "The page you were looking for has moved or no longer exists.",
    },
    contact: {
      title: "Contact | Soni Transfer",
      description: "Call, message or email the Soni Transfer support team, or visit our Birmingham office.",
    },
  },

  notFound: {
    eyebrow: "Page not found",
    title: "We could not find that page.",
    body: "The page may have moved or no longer exists. You can start a transfer or read our policies from the homepage.",
    cta: "Go to the homepage",
  },

  nav: {
    home: "Soni Transfer home",
    primary: "Primary navigation",
    community: "Community",
    contact: "Contact",
    login: "Log in",
    sendMoney: "Send money",
    // Shown instead of `sendMoney` on narrow screens, where the full label wraps.
    sendMoneyShort: "Send",
  },

  language: {
    label: "Language",
    change: "Change language",
  },

  hero: {
    kicker: "Send money to Africa",
    title: "Send money home with confidence.",
    proofLabel: "Why send with Soni Transfer",
    proof: ["Secure", "Competitive", "FCA registered", "Multiple Payouts"],
  },

  steps: {
    eyebrow: "How it works",
    title: "Send money in three simple steps.",
    intro: "Follow the journey in the Soni Transfer app—from entering the amount to choosing how to pay.",
    tablist: "Transfer steps",
    stepWord: "Step",
    items: [
      {
        title: "Enter transfer details",
        body: "Choose how much you want to send.",
        alt: "Soni Transfer app showing send and receive amounts, exchange rate and fee",
      },
      {
        title: "Choose payout method",
        body: "Select how your recipient will receive the money.",
        alt: "Soni Transfer app showing cash pickup, bank deposit and mobile wallet payout choices",
      },
      {
        title: "Pay securely",
        body: "Choose your payment method and complete your transfer.",
        alt: "Soni Transfer app showing Bank App and debit card payment methods",
      },
    ],
  },

  connection: {
    eyebrow: "More than a transfer",
    title: "Every transfer carries something more.",
    body: "Send support securely to anyone who counts on you.",
    cta: "Send with confidence",
    imageAlt: "A family sharing a happy moment together",
    noteTitle: "Clarity from the start",
    noteBody: "Review the rate, fee and exact amount they’ll receive before you send.",
  },

  receive: {
    eyebrow: "Flexible payout options",
    title: "Ways to receive money",
    intro: "Choose the payout method that works best for your recipient. Available methods vary by receiving country.",
    methods: [
      { title: "Cash pickup", body: "Collect cash from an available payout partner." },
      { title: "Bank deposit", body: "Send money directly to a supported bank account." },
      { title: "Wave - Mobile Wallet", body: "Send money straight to a Wave mobile wallet." },
      { title: "Cash Power", body: "Top up a prepaid electricity meter at home." },
      { title: "Mobile Credit", body: "Top up airtime on a supported mobile number." },
    ],
    corridorsLabel: "Where we send to",
    corridorsRoute: "From the United Kingdom to",
    corridorsFooter: "More corridors launching soon.",
    live: "Live",
    comingSoon: "Coming soon",
    corridors: [
      { country: "Gambia", flag: "GM", status: "live" },
      { country: "Senegal", flag: "SN", status: "soon" },
      { country: "Ghana", flag: "GH", status: "soon" },
      { country: "Nigeria", flag: "NG", status: "soon" },
    ],
  },

  ourStory: {
    pill: "Our story",
    title: "Built by the diaspora, for the diaspora.",
    paragraphs: [
      "Soni Transfer was born in Birmingham, started by people who grew up sending money home and knew exactly how it felt: the queues, the uncertainty and the waiting.",
      "We built the service we always wished existed. Every transfer is more than money. It is school costs covered on time, food on the table and peace of mind for the people you love. That is why family comes first in everything we build.",
    ],
    imageAlt: "The Soni Transfer office on Waterloo Road in Birmingham",
    homeTitle: "Our Birmingham home",
    homeNote: "Where it all started, and where our door is always open.",
  },

  csr: {
    eyebrow: "CSR stories",
    homeTitle: "More than transfers. Part of the family.",
    homeIntro:
      "Soni Transfer is rooted in the community it serves. From our annual Family Fun Day to year-round local initiatives, we invest our time and resources in the people and places our customers call home.",
    pageTitle: "Stories from our community.",
    pageIntro:
      "Read about the events, partnerships and shared moments that bring Soni Transfer closer to the communities we serve.",
    readStory: "Read the story",
    readAria: "Read:",
    actionNote: "Community is at the heart of everything we do.",
    actionCta: "Explore our community",
  },

  stories: {
    "agera-football-championship-2023": {
      title: "Soni Transfer Proudly Sponsors 2023 Gambian AGERA July 4th Football Championship in Atlanta",
      date: "10 July 2023",
      alt: "Trophies presented to the winning team at the AGERA July 4th football championship",
      summary:
        "Soni Transfer was honoured to sponsor the annual AGERA July 4th football championship, celebrating Gambian culture and community in Atlanta.",
      paragraphs: [
        "Soni Transfer, a leading money transfer app to The Gambia, was proud to sponsor the 2023 Gambian AGERA July 4th football championship in Atlanta, Georgia. The championship was a thrilling way to celebrate American Independence Day and to support the Gambian community in Atlanta.",
        "The AGERA July 4th championship is an annual sports and family event held in Atlanta every summer to commemorate American Independence Day. Teams from different US states participate in a football championship starting on a Saturday, culminating in the two finalists playing for the trophy on Sunday in front of families and friends from different states.",
        "The 2023 final was an edge-of-your-seat match between Washington DC and the host Georgia, with DC prevailing in a penalty shootout after the match was tied at the end of extra time. The championship was a feast for the senses, with Gambian businesses showcasing their wares, food stalls serving Gambian and American dishes, and games and entertainment for children of all ages.",
        "The championship was a huge success, and Soni Transfer was proud to be a part of it. We look forward to continuing to support events that celebrate the community in Atlanta.",
      ],
      gallery: ["Soni Transfer banner carried onto the pitch at the AGERA July 4th football championship"],
    },
    "soninkara-family-fun-day-2024": {
      title: "Soni Transfer supports Soninkara Family Fun Day 2024",
      date: "1 September 2024",
      alt: "Families and organisers at Soninkara Family Fun Day 2024",
      summary:
        "Celebrating community and shared values at the Soninkara Family Fun Day, reinforcing our commitment to the diaspora.",
      paragraphs: [
        "Soni Transfer was delighted to participate in the Soninkara Family Fun Day 2024. As a business dedicated to facilitating seamless financial transactions between the UK and The Gambia, we take pride in being part of events that strengthen community bonds and celebrate cultural diversity.",
        "The Soninkara Family Fun Day allowed us to connect with our valued customers and partners while reinforcing our commitment to supporting community initiatives. Soni Transfer is committed to supporting the Soninke community and helping to preserve its culture and heritage.",
        "We look forward to continuing our involvement in meaningful events and contributing to the community’s well-being and growth. Thank you to everyone who participated and made the Soninkara Family Fun Day 2024 a memorable occasion. Here’s to more successful events and continued community engagement!",
      ],
      gallery: [
        "Families taking part in a tug-of-war at Soninkara Family Fun Day",
        "An award presentation during Soninkara Family Fun Day",
        "Children and families enjoying activities at Soninkara Family Fun Day",
      ],
    },
    "celebrating-with-our-community": {
      title: "Soni Transfer—Celebrating with Our Community",
      date: "15 September 2023",
      alt: "A community football team holding a Soni Transfer banner",
      summary:
        "From family fun days to community festivals, Soni Transfer is always there to support and celebrate with the Gambian diaspora.",
      paragraphs: [
        "Our mission at Soni Transfer has always been about more than money transfers; it is about building and sustaining the bridges that connect our community. Whether through sports sponsorship or family festivals, we believe in being an active participant in the lives of our diaspora members.",
        "We continue to innovate our platform to offer competitive rates and fast delivery, but our heart remains with the community we serve. We are proud to be your trusted partner for sending money home.",
      ],
      gallery: ["Soni Transfer presenting an award at a community football championship"],
    },
    "wakefield-community-meeting-2025": {
      title: "Soni Transfer Connects with the Wakefield Community",
      date: "9 November 2025",
      alt: "Soni Transfer speaking to customers and community members in Wakefield",
      summary:
        "Soni Transfer held its first Customer Community Engagement Meeting in Wakefield, bringing together customers and the local community for an open conversation.",
      paragraphs: [
        "Soni Transfer recently held its first Customer Community Engagement Meeting in Wakefield, bringing together customers and members of the local community for an open and meaningful conversation.",
        "The event highlighted the important role remittances play in The Gambia, supporting families, education, businesses and wider community development.",
        "We also discussed the importance of strengthening our communities here in the diaspora—creating better support networks, opportunities and stronger connections.",
        "We would like to thank everyone who attended, contributed and shared their views. At Soni Transfer, we believe progress is strongest when we move forward together—at home and abroad.",
      ],
      gallery: ["Customers and community members at the Wakefield engagement meeting"],
    },
    "bristol-community-meeting-2026": {
      title: "Soni Transfer Connects with the Bristol Community",
      date: "18 April 2026",
      alt: "Soni Transfer meeting customers and the community in Bristol",
      summary:
        "Soni Transfer spent time in Bristol connecting with customers and the wider community, listening to their experiences and strengthening relationships.",
      paragraphs: [
        "Soni Transfer recently spent time in Bristol connecting with our customers and the wider community, listening to their experiences, understanding their needs and strengthening relationships.",
        "Community engagement is an important part of how we grow. By listening directly to the people we serve, we can continue improving our services while strengthening the connections between diaspora communities and their loved ones back home.",
        "A big thank you to everyone who joined us, shared their views and contributed to the conversation.",
        "Together, we're building a stronger Soni Transfer—shaped by the communities we serve.",
      ],
      gallery: ["Soni Transfer presenting to customers and the community in Bristol"],
    },
  },

  storyPage: {
    back: "All CSR stories",
    metaLabel: "CSR story",
    viewImage: "View image",
    viewAria: "View full-size image:",
    noteTitle: "More than money transfers.",
    noteBody: "We support the people, events and organisations that keep communities connected.",
    galleryEyebrow: "Photo gallery",
    galleryTitle: "Moments from the story.",
    galleryBody: "Select any photograph to view it full size.",
    lightboxLabel: "Story image viewer",
    close: "Close image viewer",
    previous: "Previous image",
    next: "Next image",
    footerEyebrow: "Keep exploring",
    footerTitle: "Discover more of our community work.",
    footerCta: "Visit the Community page",
  },

  support: {
    eyebrow: "Support",
    title: "Help when you need it",
    body: "Have a question before, during, or after a transfer? The Soni Transfer support team is ready to help.",
    safeTitle: "Safe and secure",
    points: ["Secure card payments", "Clear fees before you pay", "Transfer confirmation provided"],
  },

  download: {
    eyebrow: "Available wherever you are",
    title: "Send money on the go",
    body: "Use Soni Transfer online or download the app to send money and manage your transfers.",
    appStoreAria: "Download Soni Transfer on the App Store",
    appStoreAlt: "Download on the App Store",
    playAria: "Get Soni Transfer on Google Play",
    playAlt: "Get it on Google Play",
    ambassadorAlt: "Soni Transfer ambassador holding cash and wearing a Soni Transfer shirt",
  },

  reviews: {
    eyebrow: "Customer reviews",
    title: "What our customers say",
    ratingLabel: "Rated 5.0 out of 5",
    count: "8 Google reviews",
    readAll: "Read every review on Google",
    verbatim: "Reviews are shown as they were written on Google.",
  },

  footer: {
    tagline: "Fast, secure and reliable money transfers.",
    sendMoney: "Send money",
    startTransfer: "Start a transfer",
    login: "Log in",
    checkRate: "Check today’s rate",
    support: "Support",
    contactUs: "Contact us",
    emailSupport: "Email support",
    whatsapp: "WhatsApp",
    company: "Company",
    community: "Community",
    ourStory: "Our story",
    compliance: "Compliance & Security",
    legalNav: "Legal information",
  },

  legalLinks: {
    "compliance-security": "Compliance & Security",
    "privacy-policy": "Privacy Policy",
    "cookie-policy": "Cookie Policy",
    "terms-conditions": "Terms & Conditions",
    "complaints-policy": "Complaints Policy",
    "refunds-cancellations": "Refunds & Cancellations",
    "belmoney-terms": "Belmoney Terms",
  },

  legal: {
    governing: "",
    docInfo: "Document information",
    lastUpdated: "Last updated",
    version: "Version",
    onThisPage: "On this page",
    sectionsAria: "sections",
    notice: "This document forms part of the information governing your use of Soni Transfer services. Please read it carefully.",
    helpEyebrow: "Questions about this policy?",
    helpTitle: "We’re here to help.",
    helpBody: "Contact our support team if you need this information in another format or would like help understanding it.",
    helpCta: "Contact support",
  },

  communityPage: {
    heroAlt: "Families taking part in a Soni Family Fun Day race",
    heroEyebrow: "Community",
    heroTitle: "More than transfers. Part of the family.",
    heroBody:
      "Soni Transfer is rooted in the community it serves. We invest our time and resources in the people and places our customers call home.",
    funDayEyebrow: "Soni Family Fun Day",
    funDayTitle: "A day created for the whole community.",
    funDayIntro:
      "Our flagship community celebration brings families together for food, music, games and activities. It is our way of saying thank you and celebrating the community that made us who we are.",
    moments: [
      { alt: "Family Fun Day races", caption: "Games for every generation" },
      { alt: "Community football match", caption: "Football, teamwork and friendly competition" },
      { alt: "Food vendors at Family Fun Day", caption: "Food, conversation and community" },
    ],
    initiatives: [
      {
        title: "Youth & education",
        body: "We support school initiatives, learning materials and programmes that help young people in our community thrive.",
      },
      {
        title: "Local partnerships",
        body: "We work with community organisations, cultural events and groups that matter to the diaspora.",
      },
      {
        title: "Giving back at home",
        body: "We support grassroots projects in the communities our customers care about across every destination we serve.",
      },
    ],
    ctaEyebrow: "Stay connected",
    ctaTitle: "Community begins with a conversation.",
    ctaButton: "Contact Soni Transfer",
  },

  contactPage: {
    eyebrow: "Contact",
    title: "Talk to a real person, whenever you need us.",
    body: "Our support team is one call or message away. Have your transfer reference ready so we can help you even faster.",
    methodsAria: "Ways to contact Soni Transfer",
    methods: [
      { title: "Call us", detail: "Monday to Friday, 9:00 AM–5:00 PM (GMT)" },
      { title: "WhatsApp", detail: "Message us anytime—we reply during opening hours." },
      { title: "Email", detail: "Include your transfer reference for the fastest help." },
      { title: "Registered office", detail: "Visit our Birmingham office or get directions online." },
    ],
    officeEyebrow: "Our Birmingham home",
    officeTitle: "Visit us on Waterloo Road.",
    officeAlt: "The Soni Transfer office in Birmingham",
    directions: "Get directions",
  },

  calculator: {
    heading: "Start your transfer",
    subheading: "Current rates and payout options",
    updating: "Updating",
    live: "Live rates",
    unavailable: "Unavailable",
    sendingFrom: "Sending from",
    receivingIn: "They receive in",
    youSend: "You send",
    theyReceive: "Recipient receives exactly",
    amountAria: "Amount you send",
    payoutMethod: "Payout method",
    loading: "Loading…",
    loadingPayout: "Loading payout options…",
    transferFee: "Transfer fee",
    exchangeRate: "Exchange rate",
    errorFallback: "We cannot load the current exchange rate right now.",
    errors: {
      "data-unavailable": "Calculator data is currently unavailable.",
      "sending-unavailable": "Sending currencies are currently unavailable.",
      "receiving-unavailable": "Receiving countries are currently unavailable.",
      "payout-unavailable": "Payout methods are currently unavailable.",
      "rate-unavailable": "The current exchange rate is unavailable.",
    },
    tryAgain: "Try again",
    rateExpired: "Rate expired",
    expiredMessage: "This rate is more than five minutes old. Refresh it before you continue.",
    refreshRate: "Refresh rate",
    amountOutOfRange: "We cannot quote a transfer fee for this amount. Please try a different amount or contact support.",
    enterAmount: "Enter an amount to see the exchange rate and recipient amount.",
    submit: "Continue",
    exactNote: "The amount shown is exactly what your recipient receives by {method}.",
    exactNoteGeneric: "The amount shown is the exact amount your recipient will receive.",
  },

  // Keyed on the payout name the Remitec API returns, lowercased. Anything the
  // API adds that is not listed here falls back to the API's own wording.
  payoutMethods: {
    "cash pickup": "Cash pickup",
    "bank deposit": "Bank Deposit",
    "wave - mobile wallet": "Wave - Mobile Wallet",
    "cash power": "Cash Power",
    "mobile credit": "Mobile Credit",
  },
};
