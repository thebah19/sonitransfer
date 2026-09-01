// Spanish copy. Mirrors the shape of en.js exactly.
//
// Deliberately left in English: "FCA" and "Small Payment Institution" are the
// name of a UK regulator and of a UK regulatory category, and the legal
// document titles in `legalLinks`, because those documents are published in
// English and the link label should match the page it opens.

export const es = {
  meta: {
    home: {
      title: "Soni Transfer | Envía dinero a toda África",
      description:
        "Envía dinero de forma segura con Soni Transfer. Consulta tipos de cambio competitivos, elige entre los métodos de pago disponibles y comprueba exactamente cuánto recibirá tu destinatario.",
    },
    community: {
      title: "Comunidad | Soni Transfer",
      description:
        "Soni Transfer tiene sus raíces en la comunidad a la que sirve. Conoce nuestro Family Fun Day, nuestras alianzas locales y las personas detrás del servicio.",
    },
    notFound: {
      title: "Página no encontrada | Soni Transfer",
      description: "La página que buscabas se ha movido o ya no existe.",
    },
    contact: {
      title: "Contacto | Soni Transfer",
      description:
        "Llama, escribe o envía un correo al equipo de atención de Soni Transfer, o visita nuestra oficina de Birmingham.",
    },
  },

  notFound: {
    eyebrow: "Página no encontrada",
    title: "No hemos encontrado esa página.",
    body: "Puede que la página se haya movido o que ya no exista. Puedes empezar una transferencia o consultar nuestras políticas desde la página de inicio.",
    cta: "Ir a la página de inicio",
  },

  nav: {
    home: "Inicio de Soni Transfer",
    primary: "Navegación principal",
    community: "Comunidad",
    contact: "Contacto",
    login: "Iniciar sesión",
    sendMoney: "Enviar dinero",
    // Shown instead of `sendMoney` on narrow screens, where the full label wraps.
    sendMoneyShort: "Enviar",
  },

  language: {
    label: "Idioma",
    change: "Cambiar de idioma",
  },

  hero: {
    kicker: "Enviar dinero a África",
    title: "Envía dinero a casa con confianza.",
    proofLabel: "Por qué enviar con Soni Transfer",
    proof: ["Transferencias seguras", "Tipos competitivos", "Registrado en la FCA", "Varios métodos de pago"],
  },

  steps: {
    eyebrow: "Cómo funciona",
    title: "Envía dinero en tres pasos sencillos.",
    intro:
      "Sigue el recorrido en la aplicación Soni Transfer: desde introducir el importe hasta elegir cómo pagar.",
    tablist: "Pasos de la transferencia",
    stepWord: "Paso",
    items: [
      {
        title: "Introduce los datos de la transferencia",
        body: "Elige cuánto quieres enviar.",
        alt: "La aplicación Soni Transfer mostrando los importes enviado y recibido, el tipo de cambio y la comisión",
      },
      {
        title: "Elige el método de pago",
        body: "Selecciona cómo recibirá el dinero tu destinatario.",
        alt: "La aplicación Soni Transfer mostrando recogida en efectivo, depósito bancario y monedero móvil",
      },
      {
        title: "Paga de forma segura",
        body: "Elige tu método de pago y completa tu transferencia.",
        alt: "La aplicación Soni Transfer mostrando el pago con aplicación bancaria y con tarjeta de débito",
      },
    ],
  },

  connection: {
    eyebrow: "Más que una transferencia",
    title: "Cada transferencia lleva algo más.",
    body: "Envía tu apoyo de forma segura a quienes cuentan contigo.",
    cta: "Envía con confianza",
    imageAlt: "Una familia compartiendo un momento feliz",
    noteTitle: "Claridad desde el principio",
    noteBody: "Revisa el tipo de cambio, la comisión y el importe exacto que recibirán antes de enviar.",
  },

  receive: {
    eyebrow: "Métodos de pago flexibles",
    title: "Formas de recibir dinero",
    intro:
      "Elige el método de pago que mejor le venga a tu destinatario. Las opciones disponibles varían según el país de destino.",
    methods: [
      { title: "Recogida en efectivo", body: "Retira efectivo en un socio de pago disponible." },
      { title: "Depósito bancario", body: "Envía dinero directamente a una cuenta bancaria admitida." },
      { title: "Wave - Monedero móvil", body: "Envía dinero directamente a un monedero móvil Wave." },
      { title: "Cash Power", body: "Recarga un contador de electricidad de prepago en casa." },
      { title: "Crédito móvil", body: "Recarga el saldo de un número de móvil admitido." },
    ],
    corridorsLabel: "A dónde enviamos",
    corridorsRoute: "Desde el Reino Unido a",
    corridorsFooter: "Muy pronto, más países disponibles.",
    live: "Activo",
    comingSoon: "Próximamente",
    corridors: [
      { country: "Gambia", flag: "GM", status: "live", currency: "GMD" },
      { country: "Senegal", flag: "SN", status: "soon" },
      { country: "Ghana", flag: "GH", status: "soon" },
      { country: "Nigeria", flag: "NG", status: "soon" },
    ],
  },

  ourStory: {
    pill: "Nuestra historia",
    title: "Creado por la diáspora, para la diáspora.",
    paragraphs: [
      "Soni Transfer nació en Birmingham, fundado por personas que crecieron enviando dinero a casa y sabían exactamente lo que se siente: las colas, la incertidumbre y la espera.",
      "Construimos el servicio que siempre quisimos tener. Cada transferencia es mucho más que dinero. Son gastos escolares cubiertos a tiempo, comida en la mesa y tranquilidad para las personas que quieres. Por eso la familia es lo primero en todo lo que construimos.",
    ],
    imageAlt: "La oficina de Soni Transfer en Waterloo Road, Birmingham",
    homeTitle: "Nuestra casa en Birmingham",
    homeNote: "Donde empezó todo, y donde nuestra puerta siempre está abierta.",
  },

  csr: {
    eyebrow: "Acción comunitaria",
    homeTitle: "Más que transferencias. Parte de la familia.",
    homeIntro:
      "Soni Transfer tiene sus raíces en la comunidad a la que sirve. Desde nuestro Family Fun Day anual hasta las iniciativas locales durante todo el año, invertimos nuestro tiempo y nuestros recursos en las personas y los lugares que nuestros clientes llaman hogar.",
    pageTitle: "Historias de nuestra comunidad.",
    pageIntro:
      "Descubre los eventos, las alianzas y los momentos compartidos que acercan Soni Transfer a las comunidades a las que sirve.",
    readStory: "Leer la historia",
    readAria: "Leer:",
    actionNote: "La comunidad está en el centro de todo lo que hacemos.",
    actionCta: "Descubre nuestra comunidad",
  },

  stories: {
    "agera-football-championship-2023": {
      title: "Soni Transfer patrocina con orgullo el Campeonato de Fútbol AGERA del 4 de julio de 2023 en Atlanta",
      date: "10 de julio de 2023",
      alt: "Actividades comunitarias del campeonato de fútbol AGERA del 4 de julio",
      summary:
        "Soni Transfer tuvo el honor de patrocinar el campeonato anual de fútbol AGERA del 4 de julio, celebrando la cultura y la comunidad gambianas en Atlanta.",
      paragraphs: [
        "Soni Transfer, una aplicación líder para enviar dinero a Gambia, se enorgulleció de patrocinar el campeonato gambiano de fútbol AGERA del 4 de julio de 2023 en Atlanta, Georgia. El campeonato fue una forma emocionante de celebrar el Día de la Independencia estadounidense y de apoyar a la comunidad gambiana de Atlanta.",
        "El campeonato AGERA del 4 de julio es un evento deportivo y familiar que se celebra cada verano en Atlanta para conmemorar el Día de la Independencia estadounidense. Equipos de distintos estados del país participan en un campeonato de fútbol que comienza el sábado y culmina el domingo con la final entre los dos últimos equipos, ante familias y amigos llegados de varios estados.",
        "La final de 2023 fue un partido de infarto entre Washington DC y la anfitriona Georgia, con victoria de DC en la tanda de penaltis tras acabar empatados al final de la prórroga. El campeonato fue una fiesta para los sentidos, con negocios gambianos mostrando sus productos, puestos de comida sirviendo platos gambianos y estadounidenses, y juegos y animación para niños de todas las edades.",
        "El campeonato fue todo un éxito y Soni Transfer se enorgulleció de formar parte de él. Seguiremos apoyando eventos que celebren a la comunidad en Atlanta.",
      ],
      gallery: [
        "Miembros de la comunidad compitiendo en una prueba de sogatira",
        "Soni Transfer entregando un premio en el evento comunitario",
      ],
    },
    "soninkara-family-fun-day-2024": {
      title: "Soni Transfer apoya el Soninkara Family Fun Day 2024",
      date: "1 de septiembre de 2024",
      alt: "Familias y organizadores en el Soninkara Family Fun Day 2024",
      summary:
        "Celebrando la comunidad y los valores compartidos en el Soninkara Family Fun Day, reafirmando nuestro compromiso con la diáspora.",
      paragraphs: [
        "Soni Transfer participó encantado en el Soninkara Family Fun Day 2024. Como empresa dedicada a facilitar transacciones financieras fluidas entre el Reino Unido y Gambia, nos enorgullece formar parte de eventos que refuerzan los lazos comunitarios y celebran la diversidad cultural.",
        "El Soninkara Family Fun Day nos permitió reunirnos con nuestros clientes y socios, y reafirmar nuestro compromiso de apoyar las iniciativas comunitarias. Soni Transfer se compromete a apoyar a la comunidad soninké y a contribuir a preservar su cultura y su patrimonio.",
        "Seguiremos participando en eventos con sentido y contribuyendo al bienestar y al crecimiento de la comunidad. Gracias a todas las personas que participaron y que hicieron del Soninkara Family Fun Day 2024 una ocasión memorable. ¡Por muchos más eventos y un compromiso comunitario cada vez mayor!",
      ],
      gallery: [
        "Familias participando en una sogatira durante el Soninkara Family Fun Day",
        "Una entrega de premios durante el Soninkara Family Fun Day",
        "Niños y familias disfrutando de las actividades del Soninkara Family Fun Day",
      ],
    },
    "celebrating-with-our-community": {
      title: "Soni Transfer: celebrando con nuestra comunidad",
      date: "15 de septiembre de 2023",
      alt: "Un equipo de fútbol comunitario sosteniendo una pancarta de Soni Transfer",
      summary:
        "De las jornadas familiares a los festivales comunitarios, Soni Transfer siempre está presente para apoyar y celebrar junto a la diáspora gambiana.",
      paragraphs: [
        "Nuestra misión en Soni Transfer siempre ha ido más allá de las transferencias de dinero: se trata de construir y mantener los puentes que conectan a nuestra comunidad. Ya sea mediante el patrocinio deportivo o las fiestas familiares, creemos en participar activamente en la vida de los miembros de nuestra diáspora.",
        "Seguimos mejorando nuestra plataforma para ofrecer tipos competitivos y entregas rápidas, pero nuestro corazón sigue con la comunidad a la que servimos. Nos enorgullece ser tu socio de confianza para enviar dinero a casa.",
      ],
      gallery: ["Soni Transfer entregando un premio en un campeonato de fútbol comunitario"],
    },
    "wakefield-community-meeting-2025": {
      title: "Soni Transfer se reúne con la comunidad de Wakefield",
      date: "9 de noviembre de 2025",
      alt: "Soni Transfer hablando con clientes y la comunidad en Wakefield",
      summary:
        "Soni Transfer celebró su primera reunión de encuentro con clientes en Wakefield, reuniendo a clientes y miembros de la comunidad local para una conversación abierta.",
      paragraphs: [
        "Soni Transfer celebró recientemente su primera reunión de encuentro con clientes en Wakefield, reuniendo a clientes y miembros de la comunidad local para una conversación abierta y sincera.",
        "El encuentro puso de relieve el papel fundamental que desempeñan las remesas en Gambia, apoyando a las familias, la educación, los negocios y el desarrollo comunitario en general.",
        "También hablamos de la importancia de fortalecer nuestras comunidades aquí, en la diáspora, creando mejores redes de apoyo, oportunidades y vínculos más sólidos.",
        "Queremos dar las gracias a todas las personas que asistieron, participaron y compartieron su punto de vista. En Soni Transfer creemos que el progreso es más sólido cuando avanzamos juntos, en casa y en el extranjero.",
      ],
      gallery: ["Clientes y miembros de la comunidad en la reunión de encuentro de Wakefield"],
    },
    "bristol-community-meeting-2026": {
      title: "Soni Transfer se reúne con la comunidad de Bristol",
      date: "18 de abril de 2026",
      alt: "Soni Transfer con clientes y la comunidad en Bristol",
      summary:
        "Soni Transfer pasó tiempo en Bristol junto a sus clientes y la comunidad en general, escuchando sus experiencias y fortaleciendo las relaciones.",
      paragraphs: [
        "Soni Transfer pasó recientemente tiempo en Bristol junto a nuestros clientes y la comunidad en general, escuchando sus experiencias, entendiendo sus necesidades y fortaleciendo nuestras relaciones.",
        "El encuentro con la comunidad es una parte fundamental de nuestro crecimiento. Al escuchar directamente a las personas a las que servimos, podemos seguir mejorando nuestros servicios y, al mismo tiempo, fortalecer los vínculos entre las comunidades de la diáspora y sus seres queridos en casa.",
        "Un gran agradecimiento a todas las personas que se unieron a nosotros, compartieron su punto de vista y contribuyeron a la conversación.",
        "Juntos, estamos construyendo un Soni Transfer más fuerte, dado forma por las comunidades a las que servimos.",
      ],
      gallery: ["Soni Transfer presentándose ante clientes y la comunidad en Bristol"],
    },
  },

  storyPage: {
    back: "Todas las historias",
    metaLabel: "Acción comunitaria",
    viewImage: "Ver imagen",
    viewAria: "Ver la imagen a tamaño completo:",
    noteTitle: "Más que transferencias de dinero.",
    noteBody:
      "Apoyamos a las personas, los eventos y las organizaciones que mantienen conectadas a las comunidades.",
    galleryEyebrow: "Galería de fotos",
    galleryTitle: "Momentos de la historia.",
    galleryBody: "Selecciona cualquier fotografía para verla a tamaño completo.",
    lightboxLabel: "Visor de imágenes",
    close: "Cerrar el visor de imágenes",
    previous: "Imagen anterior",
    next: "Imagen siguiente",
    footerEyebrow: "Sigue explorando",
    footerTitle: "Descubre más de nuestro trabajo comunitario.",
    footerCta: "Ir a la página Comunidad",
  },

  support: {
    eyebrow: "Atención al cliente",
    title: "Ayuda cuando la necesitas",
    body:
      "¿Tienes una duda antes, durante o después de una transferencia? El equipo de atención de Soni Transfer está listo para ayudarte.",
    safeTitle: "Seguro y protegido",
    points: [
      "Pagos con tarjeta seguros",
      "Comisiones claras antes de pagar",
      "Confirmación de transferencia incluida",
    ],
  },

  download: {
    eyebrow: "Disponible estés donde estés",
    title: "Envía dinero desde donde quieras",
    body:
      "Usa Soni Transfer en línea o descarga la aplicación para enviar dinero y gestionar tus transferencias.",
    appStoreAria: "Descargar Soni Transfer en el App Store",
    appStoreAlt: "Consíguelo en el App Store",
    playAria: "Consigue Soni Transfer en Google Play",
    playAlt: "Disponible en Google Play",
    ambassadorAlt: "La embajadora de Soni Transfer con billetes en la mano y una camiseta de Soni Transfer",
  },

  reviews: {
    eyebrow: "Opiniones de clientes",
    title: "Lo que dicen nuestros clientes",
    ratingLabel: "Valorado con 5,0 sobre 5",
    count: "8 opiniones en Google",
    readAll: "Leer todas las opiniones en Google",
    verbatim: "Las opiniones se muestran tal como se publicaron en Google.",
  },

  footer: {
    tagline: "Transferencias de dinero rápidas, seguras y fiables.",
    sendMoney: "Enviar dinero",
    startTransfer: "Empezar una transferencia",
    login: "Iniciar sesión",
    checkRate: "Ver el tipo de cambio de hoy",
    support: "Atención al cliente",
    contactUs: "Contáctanos",
    emailSupport: "Atención por correo",
    whatsapp: "WhatsApp",
    company: "Empresa",
    community: "Comunidad",
    ourStory: "Nuestra historia",
    compliance: "Compliance & Security",
    legalNav: "Información legal",
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
    governing: "Este documento se publica en inglés, que es la versión que prevalece.",
    docInfo: "Información del documento",
    lastUpdated: "Última actualización",
    version: "Versión",
    onThisPage: "En esta página",
    sectionsAria: "secciones",
    notice:
      "Este documento forma parte de la información que rige tu uso de los servicios de Soni Transfer. Léelo con atención.",
    helpEyebrow: "¿Dudas sobre esta política?",
    helpTitle: "Estamos aquí para ayudarte.",
    helpBody:
      "Contacta con nuestro equipo de atención si necesitas esta información en otro formato o si quieres ayuda para entenderla.",
    helpCta: "Contactar con atención al cliente",
  },

  communityPage: {
    heroAlt: "Familias participando en una carrera del Soni Family Fun Day",
    heroEyebrow: "Comunidad",
    heroTitle: "Más que transferencias. Parte de la familia.",
    heroBody:
      "Soni Transfer tiene sus raíces en la comunidad a la que sirve. Invertimos nuestro tiempo y nuestros recursos en las personas y los lugares que nuestros clientes llaman hogar.",
    funDayEyebrow: "Soni Family Fun Day",
    funDayTitle: "Un día creado para toda la comunidad.",
    funDayIntro:
      "Nuestra gran celebración comunitaria reúne a las familias en torno a la comida, la música, los juegos y las actividades. Es nuestra manera de dar las gracias y de celebrar a la comunidad que nos hizo ser quienes somos.",
    moments: [
      { alt: "Carreras del Family Fun Day", caption: "Juegos para todas las generaciones" },
      { alt: "Partido de fútbol comunitario", caption: "Fútbol, trabajo en equipo y competición amistosa" },
      { alt: "Puestos de comida en el Family Fun Day", caption: "Comida, conversación y comunidad" },
    ],
    initiatives: [
      {
        title: "Juventud y educación",
        body:
          "Apoyamos iniciativas escolares, material didáctico y programas que ayudan a prosperar a los jóvenes de nuestra comunidad.",
      },
      {
        title: "Alianzas locales",
        body:
          "Trabajamos con asociaciones, eventos culturales y colectivos que importan a la diáspora.",
      },
      {
        title: "Devolver en casa",
        body:
          "Apoyamos proyectos de base en las comunidades que importan a nuestros clientes, en todos los destinos a los que servimos.",
      },
    ],
    ctaEyebrow: "Sigamos en contacto",
    ctaTitle: "La comunidad empieza con una conversación.",
    ctaButton: "Contactar con Soni Transfer",
  },

  contactPage: {
    eyebrow: "Contacto",
    title: "Habla con una persona de verdad, cuando lo necesites.",
    body:
      "Nuestro equipo de atención está a una llamada o un mensaje de distancia. Ten a mano tu referencia de transferencia para que podamos ayudarte aún más rápido.",
    methodsAria: "Formas de contactar con Soni Transfer",
    methods: [
      { title: "Llámanos", detail: "De lunes a viernes, de 9:00 a 17:00 (GMT)" },
      { title: "WhatsApp", detail: "Escríbenos cuando quieras: respondemos en horario de atención." },
      { title: "Correo electrónico", detail: "Incluye tu referencia de transferencia para una respuesta más rápida." },
      { title: "Domicilio social", detail: "Visita nuestra oficina de Birmingham u obtén indicaciones en línea." },
    ],
    officeEyebrow: "Nuestra casa en Birmingham",
    officeTitle: "Visítanos en Waterloo Road.",
    officeAlt: "La oficina de Soni Transfer en Birmingham",
    directions: "Cómo llegar",
  },

  calculator: {
    heading: "Empieza tu transferencia",
    subheading: "Tipos actuales y métodos de pago",
    updating: "Actualizando",
    live: "Tipos en directo",
    unavailable: "No disponible",
    sendingFrom: "Envías desde",
    receivingIn: "Reciben en",
    youSend: "Tú envías",
    theyReceive: "El destinatario recibe exactamente",
    amountAria: "Importe que envías",
    payoutMethod: "Método de pago",
    loading: "Cargando…",
    loadingPayout: "Cargando métodos de pago…",
    transferFee: "Comisión de transferencia",
    exchangeRate: "Tipo de cambio",
    errorFallback: "No podemos cargar el tipo de cambio actual en este momento.",
    errors: {
      "data-unavailable": "Los datos de la calculadora no están disponibles en este momento.",
      "sending-unavailable": "Las divisas de envío no están disponibles en este momento.",
      "receiving-unavailable": "Los países de destino no están disponibles en este momento.",
      "payout-unavailable": "Los métodos de pago no están disponibles en este momento.",
      "rate-unavailable": "El tipo de cambio actual no está disponible.",
    },
    tryAgain: "Reintentar",
    rateExpired: "Tipo caducado",
    expiredMessage: "Este tipo tiene más de cinco minutos. Actualízalo antes de continuar.",
    refreshRate: "Actualizar el tipo",
    amountOutOfRange: "No podemos calcular la comisión de transferencia para este importe. Prueba con otro importe o contacta con atención al cliente.",
    enterAmount: "Introduce un importe para ver el tipo de cambio y la cantidad que recibirán.",
    submit: "Continuar",
    exactNote: "El importe mostrado es exactamente lo que tu destinatario recibirá mediante {method}.",
    exactNoteGeneric: "El importe mostrado es la cantidad exacta que recibirá tu destinatario.",
  },

  payoutMethods: {
    "cash pickup": "Recogida en efectivo",
    "bank deposit": "Depósito bancario",
    "wave - mobile wallet": "Wave - Monedero móvil",
    "cash power": "Cash Power",
    "mobile credit": "Crédito móvil",
  },
};
