import { blogPosts, faqs, pages } from '@/data/content';
import { getLegalPage } from '@/data/legal-content';

export const locales = ['en', 'es', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizeLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function withLocale(locale: Locale, href: string) {
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return href;
  }

  const [path, hash] = href.split('#');
  const cleanPath = path === '/' ? '' : path;
  return `/${locale}${cleanPath}${hash ? `#${hash}` : ''}`;
}

export function stripLocale(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (isLocale(parts[0])) {
    return `/${parts.slice(1).join('/')}` || '/';
  }
  return pathname || '/';
}

export function localeFromPathname(pathname: string): Locale {
  return normalizeLocale(pathname.split('/').filter(Boolean)[0]);
}

const common = {
  en: {
    languageName: 'English',
    languageShort: 'EN',
    nav: { home: 'Home', about: 'About Us', services: 'Services', app: 'App', faqs: 'FAQs', blog: 'Blog', contact: 'Contact', login: 'LOGIN', signup: 'Sign Up', menu: 'Open menu' },
    actions: { downloadApp: 'Download App', sendMoney: 'Send Money', checkRates: 'Check Rates', contactSupport: 'Contact support', security: 'Security & compliance' },
    appStores: { appleSmall: 'Download on the', apple: 'App Store', googleSmall: 'Get it on', google: 'Google Play' }
  },
  es: {
    languageName: 'Español',
    languageShort: 'ES',
    nav: { home: 'Inicio', about: 'Sobre nosotros', services: 'Servicios', app: 'App', faqs: 'Preguntas', blog: 'Blog', contact: 'Contacto', login: 'ENTRAR', signup: 'Registrarse', menu: 'Abrir menú' },
    actions: { downloadApp: 'Descargar app', sendMoney: 'Enviar dinero', checkRates: 'Ver tarifas', contactSupport: 'Contactar soporte', security: 'Seguridad y cumplimiento' },
    appStores: { appleSmall: 'Descargar en', apple: 'App Store', googleSmall: 'Disponible en', google: 'Google Play' }
  },
  fr: {
    languageName: 'Français',
    languageShort: 'FR',
    nav: { home: 'Accueil', about: 'À propos', services: 'Services', app: 'Appli', faqs: 'FAQ', blog: 'Blog', contact: 'Contact', login: 'CONNEXION', signup: "S'inscrire", menu: 'Ouvrir le menu' },
    actions: { downloadApp: "Télécharger l'appli", sendMoney: "Envoyer de l'argent", checkRates: 'Voir les tarifs', contactSupport: 'Contacter le support', security: 'Sécurité et conformité' },
    appStores: { appleSmall: 'Télécharger dans', apple: 'App Store', googleSmall: 'Disponible sur', google: 'Google Play' }
  }
} as const;

const home = {
  en: {
    heroTitle: 'Send money home',
    heroCopy: 'See exactly what your recipient receives, with practical ways to support the people and everyday needs that matter back home.',
    trust: ['FCA-registered SPI · FRN 798474', 'Fee shown before payment', 'Secure payment processing'],
    howTitle: 'From transfer details to payout.',
    howCopy: '',
    steps: [
      ['Choose a receiving method', 'Select cash pickup, bank deposit, mobile wallet, airtime, or Cash Power where available.'],
      ['Review the total', 'Check the rate, fee, and receive amount before you authorise payment.'],
      ['Confirm and follow', 'Pay in the app and view transfer updates until completion.']
    ],
    appTitle: 'Your recipients and transfers in one place.',
    appCopy: 'Save recipient details, start repeat transfers, review previous activity, and check the status of money already sent.',
    payoutTitle: 'Send for the way they need it.',
    payoutCopy: 'Availability depends on the destination, recipient details, and local payout partner. The app shows the options available for each transfer.',
    faqsTitle: 'Useful answers before your first transfer.',
    faqsCopy: '',
    calculator: {
      eyebrow: '',
      title: 'Check a transfer',
      sendingFrom: 'Sending from',
      youSend: 'You send',
      theyReceive: 'They receive',
      deliveryMethod: 'Delivery method',
      fee: 'Fee',
      rate: 'Exchange rate',
      delivery: 'Delivery time',
      minutes: 'Minutes',
      countriesUnavailable: 'Countries unavailable',
      loadingCountries: 'Loading countries...',
      methodsUnavailable: 'Methods unavailable',
      loadingMethods: 'Loading methods...',
      loading: 'Loading',
      loadingRate: 'Loading...',
      rateUnavailable: 'Rate unavailable',
      error: 'The live transfer details could not refresh. Please try again before sending.'
    },
    downloadModal: {
      title: 'Download the Soni Transfer app',
      copy: 'Choose your app store to download Soni Transfer.'
    }
  },
  es: {
    heroTitle: 'Envía dinero a casa',
    heroCopy: 'Soni Transfer hace que enviar dinero sea más simple, fácil, fiable y accesible.',
    trust: ['SPI registrada por la FCA · FRN 798474', 'Comisión visible antes del pago', 'Procesamiento de pago seguro'],
    howTitle: 'Envía en tres pasos.',
    howCopy: '',
    steps: [
      ['Elige pago', 'Selecciona cómo se recibirá el dinero.'],
      ['Revisa importe', 'Ve la comisión, el tipo de cambio y el importe recibido.'],
      ['Envía y sigue', 'Paga con seguridad y sigue la transferencia.']
    ],
    appTitle: 'La app hace el trabajo.',
    appCopy: 'Tarifas, destinatarios, opciones de pago y seguimiento en un solo lugar.',
    payoutTitle: 'Elige cómo se recibe el dinero.',
    payoutCopy: 'Cobro en efectivo, depósito bancario, billetera móvil, crédito móvil y Cash Power.',
    faqsTitle: 'Antes de enviar.',
    faqsCopy: '',
    calculator: {
      eyebrow: '',
      title: 'Mira lo que llega',
      sendingFrom: 'Enviando desde',
      youSend: 'Tú envías',
      theyReceive: 'Reciben',
      deliveryMethod: 'Método de entrega',
      fee: 'Comisión',
      rate: 'Tipo de cambio',
      delivery: 'Entrega estimada',
      minutes: 'Minutos',
      countriesUnavailable: 'Países no disponibles',
      loadingCountries: 'Cargando países...',
      methodsUnavailable: 'Métodos no disponibles',
      loadingMethods: 'Cargando métodos...',
      loading: 'Cargando',
      loadingRate: 'Cargando...',
      rateUnavailable: 'Tipo no disponible',
      error: 'La estimación en vivo no se pudo actualizar. Revisa la calculadora completa antes de enviar.'
    },
    downloadModal: {
      title: 'Descarga la app Soni Transfer',
      copy: 'Elige tu tienda de aplicaciones para descargar Soni Transfer.'
    }
  },
  fr: {
    heroTitle: "Envoyez de l'argent à la maison",
    heroCopy: "Soni Transfer rend l'envoi d'argent plus simple, plus facile, plus fiable et accessible.",
    trust: ['SPI enregistrée auprès de la FCA · FRN 798474', 'Frais affichés avant paiement', 'Traitement sécurisé des paiements'],
    howTitle: 'Envoyez en trois étapes.',
    howCopy: '',
    steps: [
      ['Choisir réception', "Sélectionnez comment l'argent sera reçu."],
      ['Vérifier montant', 'Voyez les frais, le taux et le montant reçu.'],
      ['Envoyer et suivre', 'Payez en sécurité et suivez le transfert.']
    ],
    appTitle: "L'appli fait le travail.",
    appCopy: "Taux, bénéficiaires, options de réception et suivi au même endroit.",
    payoutTitle: "Choisissez comment l'argent est reçu.",
    payoutCopy: 'Retrait en espèces, dépôt bancaire, wallet mobile, crédit mobile et Cash Power.',
    faqsTitle: "Avant d'envoyer.",
    faqsCopy: '',
    calculator: {
      eyebrow: '',
      title: 'Voyez ce qui arrive',
      sendingFrom: 'Envoi depuis',
      youSend: 'Vous envoyez',
      theyReceive: 'Ils reçoivent',
      deliveryMethod: 'Mode de réception',
      fee: 'Frais',
      rate: 'Taux de change',
      delivery: 'Délai estimé',
      minutes: 'Minutes',
      countriesUnavailable: 'Pays indisponibles',
      loadingCountries: 'Chargement des pays...',
      methodsUnavailable: 'Méthodes indisponibles',
      loadingMethods: 'Chargement...',
      loading: 'Chargement',
      loadingRate: 'Chargement...',
      rateUnavailable: 'Taux indisponible',
      error: "L'estimation en direct n'a pas pu être actualisée. Vérifiez la calculatrice complète avant d'envoyer."
    },
    downloadModal: {
      title: "Téléchargez l'appli Soni Transfer",
      copy: "Choisissez votre boutique d'applications pour télécharger Soni Transfer."
    }
  }
} as const;

export function getDictionary(locale: Locale) {
  return {
    ...common[locale],
    home: home[locale],
    pages: getLocalizedPages(locale),
    faqs: getLocalizedFaqs(locale),
    blogs: getLocalizedBlogs(locale),
    legal: getLocalizedLegal(locale)
  };
}

function getLocalizedPages(locale: Locale) {
  if (locale === 'en') return pages;
  const overrides: Record<string, Partial<(typeof pages)[number]>> = {
    'about-us': locale === 'es'
      ? { title: 'Creado para enviar apoyo a casa', eyebrow: 'Sobre Soni Transfer', description: 'Soni Transfer está pensado para personas que apoyan a sus seres queridos y comunidades desde el extranjero.' }
      : { title: 'Conçu pour envoyer du soutien à la maison', eyebrow: 'À propos de Soni Transfer', description: "Soni Transfer est pensé pour les personnes qui soutiennent leurs proches et leurs communautés depuis l'étranger." },
    'help-faqs': locale === 'es'
      ? { title: 'Ayuda y preguntas frecuentes', eyebrow: 'Soporte', description: 'Encuentra respuestas claras sobre envíos, recepción, comisiones, documentos y opciones de pago.' }
      : { title: 'Aide et FAQ', eyebrow: 'Support client', description: "Trouvez des réponses claires sur l'envoi, la réception, les frais, les documents et les options." },
    contact: locale === 'es'
      ? { title: 'Contacta con Soni Transfer', eyebrow: 'Estamos para ayudar', description: 'Contacta con soporte para ayuda con tu cuenta, transferencias, quejas o accesibilidad.' }
      : { title: 'Contacter Soni Transfer', eyebrow: 'Nous sommes là pour aider', description: "Contactez le support pour votre compte, vos transferts, réclamations ou besoins d'accessibilité." }
  };
  return pages.map((page) => ({ ...page, ...overrides[page.slug] }));
}

function getLocalizedFaqs(locale: Locale) {
  if (locale === 'en') {
    return faqs.map((faq) =>
      faq.q === 'Who is Soni Transfer for?'
        ? { q: 'What services does Soni Transfer offer?', a: 'Soni Transfer offers app-based money transfers with cash pickup, bank deposit, mobile wallet, mobile credit, and Cash Power services where available.' }
        : faq
    );
  }

  return locale === 'es'
    ? [
        { q: '¿Qué servicios ofrece Soni Transfer?', a: 'Soni Transfer ofrece transferencias desde la app con cobro en efectivo, depósito bancario, billetera móvil, crédito móvil y Cash Power donde estén disponibles.' },
        { q: '¿Cómo envío dinero?', a: 'Crea una cuenta, elige desde dónde envías, añade un beneficiario, revisa comisión y tipo de cambio, y paga de forma segura.' },
        { q: '¿Cuánto cobra Soni Transfer?', a: 'La calculadora muestra la comisión, el tipo de cambio y el importe estimado antes de continuar.' },
        { q: '¿Cuánto tarda?', a: 'Muchos envíos están pensados para pago rápido, aunque los tiempos dependen de controles y método de recepción.' },
        { q: '¿Cómo puede recibir mi familiar?', a: 'Las opciones admitidas pueden incluir efectivo, depósito bancario, wallet móvil, airtime y Cash Power.' },
        { q: '¿Soni Transfer está regulado?', a: 'Sí. Soni Transfer Ltd está registrado como Small Payment Institution con la FCA, FRN 798474.' }
      ]
    : [
        { q: 'Quels services propose Soni Transfer ?', a: "Soni Transfer propose des transferts dans l'appli avec retrait en espèces, dépôt bancaire, wallet mobile, crédit mobile et Cash Power selon disponibilité." },
        { q: "Comment envoyer de l'argent ?", a: 'Créez un compte, choisissez le pays d’envoi, ajoutez un bénéficiaire, vérifiez les frais et le taux, puis payez en sécurité.' },
        { q: 'Combien coûte Soni Transfer ?', a: 'La calculatrice affiche les frais, le taux de change et le montant estimé avant de continuer.' },
        { q: 'Combien de temps prend un transfert ?', a: 'De nombreux transferts sont conçus pour un paiement rapide, selon les contrôles et le mode de réception.' },
        { q: 'Comment mes proches reçoivent-ils ?', a: 'Les options peuvent inclure retrait en espèces, dépôt bancaire, wallet mobile, airtime et Cash Power.' },
        { q: 'Soni Transfer est-il réglementé ?', a: 'Oui. Soni Transfer Ltd est enregistré comme Small Payment Institution auprès de la FCA, FRN 798474.' }
      ];
}

function getLocalizedBlogs(locale: Locale) {
  if (locale === 'en') return blogPosts;
  return blogPosts.map((post) => ({
    ...post,
    title: locale === 'es' ? translateBlogTitleEs(post.title) : translateBlogTitleFr(post.title),
    excerpt: locale === 'es' ? translateBlogExcerptEs(post.excerpt) : translateBlogExcerptFr(post.excerpt),
    body: post.body.map((paragraph) => (locale === 'es' ? translateBlogParagraphEs(paragraph) : translateBlogParagraphFr(paragraph)))
  }));
}

function getLocalizedLegal(locale: Locale) {
  return {
    disclaimer: locale === 'en' ? '' : locale === 'es'
      ? 'Esta traducción se proporciona para facilitar la comprensión. La versión en inglés prevalece hasta que sea revisada legalmente.'
      : "Cette traduction est fournie pour faciliter la compréhension. La version anglaise prévaut jusqu'à validation juridique.",
    ui: locale === 'es'
      ? { lastUpdated: 'Última actualización', version: 'Versión', contents: 'Contenido de la página', needHelp: '¿Necesitas ayuda con esta política?', helpCopy: 'Contacta con Soni Transfer si necesitas ayuda con tu cuenta, transferencia, accesibilidad o una aclaración.', contact: 'Contactar soporte' }
      : locale === 'fr'
        ? { lastUpdated: 'Dernière mise à jour', version: 'Version', contents: 'Contenu de la page', needHelp: 'Besoin d’aide avec cette politique ?', helpCopy: 'Contactez Soni Transfer pour votre compte, un transfert, l’accessibilité ou une clarification.', contact: 'Contacter le support' }
        : { lastUpdated: 'Last updated', version: 'Version', contents: 'Page contents', needHelp: 'Need help with this policy?', helpCopy: 'Contact Soni Transfer support if you need account help, transfer support, accessibility help, or a policy clarification.', contact: 'Contact support' }
  };
}

export function getLocalizedLegalPage(slug: string, locale: Locale) {
  const page = getLegalPage(slug);
  if (!page || locale === 'en') return page;
  const titles: Record<Locale, Record<string, string>> = {
    en: {},
    es: {
      'terms-conditions': 'Términos y condiciones',
      'privacy-policy': 'Política de privacidad',
      'cookie-policy': 'Política de cookies',
      'refunds-cancellations': 'Política de reembolsos y cancelaciones',
      'complaints-policy': 'Política de reclamaciones',
      'belmoney-terms': 'Términos y condiciones de Belmoney'
    },
    fr: {
      'terms-conditions': 'Conditions générales',
      'privacy-policy': 'Politique de confidentialité',
      'cookie-policy': 'Politique relative aux cookies',
      'refunds-cancellations': 'Politique de remboursements et d’annulations',
      'complaints-policy': 'Politique de réclamations',
      'belmoney-terms': 'Conditions générales Belmoney'
    }
  };
  return {
    ...page,
    title: titles[locale][slug] ?? page.title,
    eyebrow: locale === 'es' ? 'Información legal' : 'Informations juridiques',
    description: locale === 'es'
      ? 'Información importante sobre el servicio, la regulación, la privacidad, las reclamaciones y las condiciones aplicables.'
      : 'Informations importantes sur le service, la réglementation, la confidentialité, les réclamations et les conditions applicables.'
  };
}

function translateBlogTitleEs(title: string) {
  return title.replace('Soni Transfer Sponsors', 'Soni Transfer patrocina').replace('Supports', 'apoya').replace('Celebrating with our Community', 'Celebrando con nuestra comunidad');
}
function translateBlogTitleFr(title: string) {
  return title.replace('Soni Transfer Sponsors', 'Soni Transfer soutient').replace('Supports', 'soutient').replace('Celebrating with our Community', 'Célébrer avec notre communauté');
}
function translateBlogExcerptEs(excerpt: string) {
  return excerpt.replace('Soni Transfer was honoured to sponsor', 'Soni Transfer tuvo el honor de patrocinar').replace('Celebrating community', 'Celebrando la comunidad').replace('From family fun days', 'Desde jornadas familiares');
}
function translateBlogExcerptFr(excerpt: string) {
  return excerpt.replace('Soni Transfer was honoured to sponsor', 'Soni Transfer a eu l’honneur de soutenir').replace('Celebrating community', 'Célébrer la communauté').replace('From family fun days', 'Des journées familiales');
}
function translateBlogParagraphEs(paragraph: string) {
  return paragraph
    .replace(/Soni Transfer/g, 'Soni Transfer')
    .replace('was proud to sponsor', 'se enorgulleció de patrocinar')
    .replace('Our mission', 'Nuestra misión')
    .replace('We are proud', 'Estamos orgullosos');
}
function translateBlogParagraphFr(paragraph: string) {
  return paragraph
    .replace(/Soni Transfer/g, 'Soni Transfer')
    .replace('was proud to sponsor', 'était fier de soutenir')
    .replace('Our mission', 'Notre mission')
    .replace('We are proud', 'Nous sommes fiers');
}
