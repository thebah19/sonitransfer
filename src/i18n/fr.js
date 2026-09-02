// French copy. Mirrors the shape of en.js exactly.
//
// Deliberately left in English: "FCA" and "Small Payment Institution" are the
// name of a UK regulator and of a UK regulatory category, and the legal
// document titles in `legalLinks`, because those documents are published in
// English and the link label should match the page it opens.

export const fr = {
  meta: {
    home: {
      title: "Soni Transfer | Envoyez de l’argent partout en Afrique",
      description:
        "Envoyez de l’argent en toute sécurité avec Soni Transfer. Consultez des taux de change compétitifs, choisissez parmi les modes de réception disponibles et voyez exactement ce que votre bénéficiaire recevra.",
    },
    community: {
      title: "Communauté | Soni Transfer",
      description:
        "Soni Transfer est enraciné dans la communauté qu’il sert. Découvrez notre Family Fun Day, nos partenariats locaux et les personnes derrière le service.",
    },
    notFound: {
      title: "Page introuvable | Soni Transfer",
      description: "La page que vous cherchez a été déplacée ou n’existe plus.",
    },
    contact: {
      title: "Contact | Soni Transfer",
      description:
        "Appelez, écrivez ou envoyez un e-mail à l’équipe d’assistance Soni Transfer, ou rendez-vous à notre bureau de Birmingham.",
    },
  },

  notFound: {
    eyebrow: "Page introuvable",
    title: "Nous n’avons pas trouvé cette page.",
    body: "Cette page a peut-être été déplacée ou n’existe plus. Vous pouvez commencer un transfert ou consulter nos politiques depuis la page d’accueil.",
    cta: "Aller à la page d’accueil",
  },

  nav: {
    home: "Accueil Soni Transfer",
    primary: "Navigation principale",
    community: "Communauté",
    contact: "Contact",
    login: "Se connecter",
    sendMoney: "Envoyer de l’argent",
    // Shown instead of `sendMoney` on narrow screens, where the full label wraps.
    sendMoneyShort: "Envoyer",
  },

  language: {
    label: "Langue",
    change: "Changer de langue",
  },

  hero: {
    kicker: "Envoyer de l’argent en Afrique",
    title: "Envoyez de l’argent au pays en toute confiance.",
    proofLabel: "Pourquoi envoyer avec Soni Transfer",
    proof: ["Transferts sécurisés", "Taux compétitifs", "Enregistré auprès de la FCA", "Plusieurs modes de paiement"],
  },

  steps: {
    eyebrow: "Comment ça marche",
    title: "Envoyez de l’argent en trois étapes simples.",
    intro:
      "Suivez le parcours dans l’application Soni Transfer : du montant à saisir jusqu’au choix du mode de paiement.",
    tablist: "Étapes du transfert",
    stepWord: "Étape",
    items: [
      {
        title: "Saisissez les détails du transfert",
        body: "Choisissez le montant à envoyer.",
        alt: "L’application Soni Transfer affichant les montants envoyé et reçu, le taux de change et les frais",
      },
      {
        title: "Choisissez le mode de réception",
        body: "Sélectionnez comment votre bénéficiaire recevra l’argent.",
        alt: "L’application Soni Transfer affichant le retrait en espèces, le dépôt bancaire et le portefeuille mobile",
      },
      {
        title: "Payez en toute sécurité",
        body: "Choisissez votre moyen de paiement et finalisez votre transfert.",
        alt: "L’application Soni Transfer affichant le paiement par application bancaire et par carte de débit",
      },
    ],
  },

  connection: {
    eyebrow: "Plus qu’un transfert",
    title: "Chaque transfert porte bien plus que de l’argent.",
    body: "Envoyez votre soutien en toute sécurité à ceux qui comptent sur vous.",
    cta: "Envoyer en toute confiance",
    imageAlt: "Une famille partageant un moment de bonheur",
    noteTitle: "La clarté dès le départ",
    noteBody: "Vérifiez le taux, les frais et le montant exact qu’ils recevront avant d’envoyer.",
  },

  receive: {
    eyebrow: "Modes de réception flexibles",
    title: "Comment recevoir l’argent",
    intro:
      "Choisissez le mode de réception qui convient le mieux à votre bénéficiaire. Les options disponibles varient selon le pays de destination.",
    methods: [
      { title: "Retrait en espèces", body: "Retirez des espèces chez un partenaire de paiement disponible." },
      { title: "Dépôt bancaire", body: "Envoyez de l’argent directement sur un compte bancaire pris en charge." },
      { title: "Wave - Portefeuille mobile", body: "Envoyez de l’argent directement sur un portefeuille mobile Wave." },
      { title: "Cash Power", body: "Rechargez un compteur d’électricité prépayé à la maison." },
      { title: "Crédit mobile", body: "Rechargez le crédit d’un numéro de mobile pris en charge." },
    ],
    corridorsLabel: "Où nous envoyons",
    corridorsRoute: "Depuis le Royaume-Uni vers",
    corridorsFooter: "D’autres pays seront bientôt disponibles.",
    live: "En service",
    comingSoon: "Bientôt disponible",
    corridors: [
      { country: "Gambie", flag: "GM", status: "live" },
      { country: "Sénégal", flag: "SN", status: "soon" },
      { country: "Ghana", flag: "GH", status: "soon" },
      { country: "Nigeria", flag: "NG", status: "soon" },
    ],
  },

  ourStory: {
    pill: "Notre histoire",
    title: "Créé par la diaspora, pour la diaspora.",
    paragraphs: [
      "Soni Transfer est né à Birmingham, fondé par des personnes qui ont grandi en envoyant de l’argent au pays et qui savaient exactement ce que cela représente : les files d’attente, l’incertitude et l’attente.",
      "Nous avons construit le service que nous avions toujours souhaité. Chaque transfert représente bien plus que de l’argent. Ce sont des frais de scolarité réglés à temps, des repas sur la table et la tranquillité d’esprit pour ceux que vous aimez. C’est pourquoi la famille passe avant tout dans ce que nous construisons.",
    ],
    imageAlt: "Le bureau Soni Transfer sur Waterloo Road à Birmingham",
    homeTitle: "Notre maison à Birmingham",
    homeNote: "Là où tout a commencé, et où notre porte est toujours ouverte.",
  },

  csr: {
    eyebrow: "Nos actions solidaires",
    homeTitle: "Plus que des transferts. Nous faisons partie de la famille.",
    homeIntro:
      "Soni Transfer est enraciné dans la communauté qu’il sert. De notre Family Fun Day annuelle aux initiatives locales tout au long de l’année, nous investissons notre temps et nos ressources dans les personnes et les lieux que nos clients appellent leur foyer.",
    pageTitle: "Les histoires de notre communauté.",
    pageIntro:
      "Découvrez les événements, les partenariats et les moments partagés qui rapprochent Soni Transfer des communautés qu’il sert.",
    readStory: "Lire l’histoire",
    readAria: "Lire :",
    actionNote: "La communauté est au cœur de tout ce que nous faisons.",
    actionCta: "Découvrir notre communauté",
  },

  stories: {
    "agera-football-championship-2023": {
      title: "Soni Transfer sponsorise fièrement le championnat de football AGERA du 4 juillet 2023 à Atlanta",
      date: "10 juillet 2023",
      alt: "Remise des trophées à l’équipe gagnante du championnat de football AGERA du 4 juillet",
      summary:
        "Soni Transfer a eu l’honneur de sponsoriser le championnat de football annuel AGERA du 4 juillet, célébrant la culture et la communauté gambiennes à Atlanta.",
      paragraphs: [
        "Soni Transfer, application de référence pour les transferts d’argent vers la Gambie, était fier de sponsoriser le championnat de football gambien AGERA du 4 juillet 2023 à Atlanta, en Géorgie. Ce championnat était une façon passionnante de célébrer la fête de l’Indépendance américaine et de soutenir la communauté gambienne d’Atlanta.",
        "Le championnat AGERA du 4 juillet est un événement sportif et familial annuel organisé à Atlanta chaque été pour commémorer la fête de l’Indépendance américaine. Des équipes venues de différents États américains participent à un championnat de football qui débute le samedi et se conclut le dimanche par la finale entre les deux dernières équipes, devant les familles et les amis venus de plusieurs États.",
        "La finale 2023 fut un match haletant entre Washington DC et la Géorgie, pays hôte, DC l’emportant aux tirs au but après un score à égalité à l’issue des prolongations. Le championnat fut une fête des sens, avec des entreprises gambiennes présentant leurs produits, des stands proposant des plats gambiens et américains, ainsi que des jeux et des animations pour les enfants de tous âges.",
        "Le championnat a rencontré un immense succès et Soni Transfer était fier d’y participer. Nous continuerons à soutenir les événements qui célèbrent la communauté à Atlanta.",
      ],
      gallery: ["La banderole Soni Transfer portée sur le terrain lors du championnat de football AGERA du 4 juillet"],
    },
    "soninkara-family-fun-day-2024": {
      title: "Soni Transfer soutient la Soninkara Family Fun Day 2024",
      date: "1er septembre 2024",
      alt: "Familles et organisateurs à la Soninkara Family Fun Day 2024",
      summary:
        "Célébrer la communauté et les valeurs partagées lors de la Soninkara Family Fun Day, en réaffirmant notre engagement envers la diaspora.",
      paragraphs: [
        "Soni Transfer était ravi de participer à la Soninkara Family Fun Day 2024. En tant qu’entreprise dédiée à des transactions financières fluides entre le Royaume-Uni et la Gambie, nous sommes fiers de prendre part aux événements qui renforcent les liens communautaires et célèbrent la diversité culturelle.",
        "La Soninkara Family Fun Day nous a permis d’échanger avec nos clients et partenaires tout en réaffirmant notre engagement à soutenir les initiatives communautaires. Soni Transfer s’engage à soutenir la communauté soninké et à contribuer à la préservation de sa culture et de son patrimoine.",
        "Nous continuerons à participer à des événements qui ont du sens et à contribuer au bien-être et au développement de la communauté. Merci à toutes celles et ceux qui ont participé et qui ont fait de la Soninkara Family Fun Day 2024 un moment mémorable. À bientôt pour de nouveaux événements et un engagement communautaire toujours plus fort !",
      ],
      gallery: [
        "Des familles participant à un tir à la corde lors de la Soninkara Family Fun Day",
        "Une remise de prix pendant la Soninkara Family Fun Day",
        "Des enfants et des familles profitant des activités de la Soninkara Family Fun Day",
      ],
    },
    "celebrating-with-our-community": {
      title: "Soni Transfer — Célébrer avec notre communauté",
      date: "15 septembre 2023",
      alt: "Une équipe de football communautaire tenant une banderole Soni Transfer",
      summary:
        "Des journées familiales aux festivals communautaires, Soni Transfer est toujours présent pour soutenir la diaspora gambienne et célébrer à ses côtés.",
      paragraphs: [
        "Notre mission chez Soni Transfer a toujours dépassé le simple transfert d’argent : il s’agit de construire et d’entretenir les ponts qui relient notre communauté. Que ce soit par le parrainage sportif ou les fêtes familiales, nous croyons en une participation active à la vie des membres de notre diaspora.",
        "Nous continuons à faire évoluer notre plateforme pour proposer des taux compétitifs et des délais rapides, mais notre cœur reste auprès de la communauté que nous servons. Nous sommes fiers d’être votre partenaire de confiance pour envoyer de l’argent au pays.",
      ],
      gallery: ["Soni Transfer remettant un trophée lors d’un championnat de football communautaire"],
    },
    "wakefield-community-meeting-2025": {
      title: "Soni Transfer à la rencontre de la communauté de Wakefield",
      date: "9 novembre 2025",
      alt: "Soni Transfer s’adressant aux clients et à la communauté à Wakefield",
      summary:
        "Soni Transfer a organisé sa première réunion d’échange avec les clients à Wakefield, réunissant clients et membres de la communauté locale pour un échange ouvert.",
      paragraphs: [
        "Soni Transfer a récemment organisé sa première réunion d’échange avec les clients à Wakefield, réunissant clients et membres de la communauté locale pour un échange ouvert et sincère.",
        "Cet événement a mis en lumière le rôle essentiel des transferts d’argent en Gambie, au service des familles, de l’éducation, des entreprises et du développement de la communauté au sens large.",
        "Nous avons également évoqué l’importance de renforcer nos communautés ici, dans la diaspora — en créant de meilleurs réseaux de soutien, davantage d’opportunités et des liens plus forts.",
        "Nous remercions toutes les personnes présentes, qui ont contribué et partagé leur point de vue. Chez Soni Transfer, nous croyons que le progrès est plus fort lorsque nous avançons ensemble — au pays comme dans la diaspora.",
      ],
      gallery: ["Clients et membres de la communauté lors de la réunion d’échange à Wakefield"],
    },
    "bristol-community-meeting-2026": {
      title: "Soni Transfer à la rencontre de la communauté de Bristol",
      date: "18 avril 2026",
      alt: "Soni Transfer à la rencontre des clients et de la communauté à Bristol",
      summary:
        "Soni Transfer a passé du temps à Bristol à la rencontre de ses clients et de la communauté au sens large, à l’écoute de leurs expériences et pour renforcer les liens.",
      paragraphs: [
        "Soni Transfer a récemment passé du temps à Bristol à la rencontre de nos clients et de la communauté au sens large, à l’écoute de leurs expériences, pour mieux comprendre leurs besoins et renforcer nos liens.",
        "L’échange avec la communauté est un élément essentiel de notre développement. En écoutant directement les personnes que nous servons, nous continuons d’améliorer nos services tout en renforçant les liens entre les communautés de la diaspora et leurs proches restés au pays.",
        "Un grand merci à toutes les personnes qui nous ont rejoints, qui ont partagé leur point de vue et contribué à l’échange.",
        "Ensemble, nous construisons un Soni Transfer plus fort — façonné par les communautés que nous servons.",
      ],
      gallery: ["Soni Transfer s’adressant aux clients et à la communauté à Bristol"],
    },
  },

  storyPage: {
    back: "Toutes nos actions solidaires",
    metaLabel: "Action solidaire",
    viewImage: "Voir l’image",
    viewAria: "Voir l’image en grand :",
    noteTitle: "Plus que des transferts d’argent.",
    noteBody:
      "Nous soutenons les personnes, les événements et les organisations qui maintiennent les liens entre les communautés.",
    galleryEyebrow: "Galerie photo",
    galleryTitle: "Les moments forts.",
    galleryBody: "Sélectionnez une photo pour la voir en grand.",
    lightboxLabel: "Visionneuse d’images",
    close: "Fermer la visionneuse",
    previous: "Image précédente",
    next: "Image suivante",
    footerEyebrow: "Continuez la visite",
    footerTitle: "Découvrez nos autres actions communautaires.",
    footerCta: "Voir la page Communauté",
  },

  support: {
    eyebrow: "Assistance",
    title: "De l’aide quand vous en avez besoin",
    body:
      "Une question avant, pendant ou après un transfert ? L’équipe d’assistance Soni Transfer est là pour vous aider.",
    safeTitle: "Sûr et sécurisé",
    points: [
      "Paiements par carte sécurisés",
      "Frais affichés clairement avant paiement",
      "Confirmation de transfert fournie",
    ],
  },

  download: {
    eyebrow: "Disponible partout",
    title: "Envoyez de l’argent où que vous soyez",
    body:
      "Utilisez Soni Transfer en ligne ou téléchargez l’application pour envoyer de l’argent et suivre vos transferts.",
    appStoreAria: "Télécharger Soni Transfer dans l’App Store",
    appStoreAlt: "Télécharger dans l’App Store",
    playAria: "Obtenir Soni Transfer sur Google Play",
    playAlt: "Disponible sur Google Play",
    ambassadorAlt: "L’ambassadrice Soni Transfer tenant des billets et portant un t-shirt Soni Transfer",
  },

  reviews: {
    eyebrow: "Avis clients",
    title: "Ce que disent nos clients",
    ratingLabel: "Note de 5,0 sur 5",
    count: "8 avis Google",
    readAll: "Lire tous les avis sur Google",
    verbatim: "Les avis sont affichés tels qu’ils ont été publiés sur Google.",
  },

  footer: {
    tagline: "Des transferts d’argent rapides, sûrs et fiables.",
    sendMoney: "Envoyer de l’argent",
    startTransfer: "Commencer un transfert",
    login: "Se connecter",
    checkRate: "Voir le taux du jour",
    support: "Assistance",
    contactUs: "Nous contacter",
    emailSupport: "Assistance par e-mail",
    whatsapp: "WhatsApp",
    company: "Entreprise",
    community: "Communauté",
    ourStory: "Notre histoire",
    compliance: "Compliance & Security",
    legalNav: "Informations légales",
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
    governing: "Ce document est publié en anglais, qui en est la version faisant foi.",
    docInfo: "Informations sur le document",
    lastUpdated: "Dernière mise à jour",
    version: "Version",
    onThisPage: "Sur cette page",
    sectionsAria: "sections",
    notice:
      "Ce document fait partie des informations qui régissent votre utilisation des services Soni Transfer. Veuillez le lire attentivement.",
    helpEyebrow: "Des questions sur cette politique ?",
    helpTitle: "Nous sommes là pour vous aider.",
    helpBody:
      "Contactez notre équipe d’assistance si vous avez besoin de ces informations dans un autre format ou d’aide pour les comprendre.",
    helpCta: "Contacter l’assistance",
  },

  communityPage: {
    heroAlt: "Des familles participant à une course lors d’une Soni Family Fun Day",
    heroEyebrow: "Communauté",
    heroTitle: "Plus que des transferts. Nous faisons partie de la famille.",
    heroBody:
      "Soni Transfer est enraciné dans la communauté qu’il sert. Nous investissons notre temps et nos ressources dans les personnes et les lieux que nos clients appellent leur foyer.",
    funDayEyebrow: "Soni Family Fun Day",
    funDayTitle: "Une journée créée pour toute la communauté.",
    funDayIntro:
      "Notre grande fête communautaire réunit les familles autour de la nourriture, de la musique, des jeux et des animations. C’est notre façon de dire merci et de célébrer la communauté qui a fait de nous ce que nous sommes.",
    moments: [
      { alt: "Courses de la Family Fun Day", caption: "Des jeux pour toutes les générations" },
      { alt: "Match de football communautaire", caption: "Football, esprit d’équipe et compétition amicale" },
      { alt: "Stands de restauration à la Family Fun Day", caption: "Cuisine, échanges et convivialité" },
    ],
    initiatives: [
      {
        title: "Une journée pour tous",
        body:
          "Des enfants aux adultes, la Family Fun Day réunit toutes les générations au même endroit.",
      },
      {
        title: "Bien plus que des jeux",
        body:
          "Football, repas et animations donnent à chacun une raison de se retrouver, de rire et de profiter de la journée ensemble.",
      },
      {
        title: "Pensée pour notre communauté",
        body:
          "Une journée pour célébrer les personnes, les familles et les communautés qui font partie de l’histoire de Soni Transfer.",
      },
    ],
    ctaEyebrow: "Restons en contact",
    ctaTitle: "La communauté commence par une conversation.",
    ctaButton: "Contacter Soni Transfer",
  },

  contactPage: {
    eyebrow: "Contact",
    title: "Parlez à une vraie personne, quand vous en avez besoin.",
    body:
      "Notre équipe d’assistance est à un appel ou un message de vous. Munissez-vous de votre référence de transfert pour être aidé encore plus vite.",
    methodsAria: "Comment contacter Soni Transfer",
    methods: [
      { title: "Appelez-nous", detail: "Du lundi au vendredi, de 9h00 à 17h00 (GMT)" },
      { title: "WhatsApp", detail: "Écrivez-nous à tout moment : nous répondons pendant les heures d’ouverture." },
      { title: "E-mail", detail: "Indiquez votre référence de transfert pour une réponse plus rapide." },
      { title: "Siège social", detail: "Rendez-vous à notre bureau de Birmingham ou obtenez l’itinéraire en ligne." },
    ],
    officeEyebrow: "Notre maison à Birmingham",
    officeTitle: "Venez nous voir sur Waterloo Road.",
    officeAlt: "Le bureau Soni Transfer à Birmingham",
    directions: "Obtenir l’itinéraire",
  },

  calculator: {
    heading: "Commencez votre transfert",
    subheading: "Taux actuels et modes de réception",
    updating: "Mise à jour",
    live: "Taux en direct",
    unavailable: "Indisponible",
    sendingFrom: "Vous envoyez depuis",
    receivingIn: "Ils reçoivent en",
    youSend: "Vous envoyez",
    theyReceive: "Le bénéficiaire reçoit exactement",
    amountAria: "Montant que vous envoyez",
    payoutMethod: "Mode de réception",
    loading: "Chargement…",
    loadingPayout: "Chargement des modes de réception…",
    transferFee: "Frais de transfert",
    exchangeRate: "Taux de change",
    errorFallback: "Nous ne pouvons pas charger le taux de change actuel pour le moment.",
    errors: {
      "data-unavailable": "Les données du calculateur sont actuellement indisponibles.",
      "sending-unavailable": "Les devises d’envoi sont actuellement indisponibles.",
      "receiving-unavailable": "Les pays de destination sont actuellement indisponibles.",
      "payout-unavailable": "Les modes de réception sont actuellement indisponibles.",
      "rate-unavailable": "Le taux de change actuel est indisponible.",
    },
    tryAgain: "Réessayer",
    rateExpired: "Taux expiré",
    expiredMessage: "Ce taux date de plus de cinq minutes. Actualisez-le avant de continuer.",
    refreshRate: "Actualiser le taux",
    amountOutOfRange: "Nous ne pouvons pas calculer de frais de transfert pour ce montant. Essayez un autre montant ou contactez l’assistance.",
    enterAmount: "Saisissez un montant pour voir le taux de change et le montant reçu.",
    submit: "Continuer",
    exactNote: "Le montant affiché est exactement ce que votre bénéficiaire recevra par {method}.",
    exactNoteGeneric: "Le montant affiché est le montant exact que votre bénéficiaire recevra.",
  },

  payoutMethods: {
    "cash pickup": "Retrait en espèces",
    "bank deposit": "Dépôt bancaire",
    "wave - mobile wallet": "Wave - Portefeuille mobile",
    "cash power": "Cash Power",
    "mobile credit": "Crédit mobile",
  },
};
