import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bank,
  CaretLeft,
  CaretRight,
  Check,
  CheckCircle,
  CurrencyGbp,
  DeviceMobile,
  EnvelopeSimple,
  GraduationCap,
  Handshake,
  Heart,
  Lightning,
  MapPin,
  Money,
  Phone,
  PhoneCall,
  ShieldCheck,
  Star,
  UsersThree,
  Wallet,
  X,
} from "@phosphor-icons/react";
import { LiveTransferCalculator } from "./LiveTransferCalculator";
import { LegalContentPage } from "./LegalPage";
import { getLegalPage } from "./legalContent";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { customerReviews, GOOGLE_REVIEWS_URL } from "./reviews";
import { catalogueFor, I18nProvider, parsePath, useCopy, useDocumentHead, useI18n } from "./i18n";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

function flagEmoji(countryCode) {
  const code = String(countryCode ?? "").toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return "";
  return String.fromCodePoint(...[...code].map((letter) => 127397 + letter.charCodeAt(0)));
}
const APP_LOGIN_URL = "https://app.sonitransfer.com/#/ext/login/en-GB";
const OFFICE_ADDRESS = "9 Waterloo Road, Smethwick, Birmingham, B66 4JX, UK";
const OFFICE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=9+Waterloo+Road%2C+Smethwick%2C+Birmingham%2C+B66+4JX%2C+UK";

const isLegalSlug = (slug) => Boolean(getLegalPage(slug));

function useLocation() {
  const read = () => parsePath(window.location.pathname, isLegalSlug);
  const [location, setLocation] = useState(read);

  useEffect(() => {
    const onRouteChange = () => setLocation(read());
    window.addEventListener("hashchange", onRouteChange);
    window.addEventListener("popstate", onRouteChange);
    return () => {
      window.removeEventListener("hashchange", onRouteChange);
      window.removeEventListener("popstate", onRouteChange);
    };
  }, []);

  return location;
}

function Logo({ light = false, href = "#top" }) {
  const copy = useCopy();
  return (
    <a className={`logo-wrap ${light ? "logo-wrap-light" : ""}`} href={href} aria-label={copy.nav.home}>
      <img src={assetUrl("/assets/soni-logo-crop.png")} alt="Soni Transfer" />
    </a>
  );
}

function Header({ variant = "white", showCta = true, homeOnly = false, activePage = "" }) {
  const { copy, href } = useI18n();
  const homeHref = href("home");

  return (
    <header className={`site-header header-${variant}`}>
      <Logo light={variant === "blue"} href={homeOnly ? homeHref : "#top"} />
      <nav className="main-nav" aria-label={copy.nav.primary}>
        <a href={href("community")} aria-current={activePage === "community" ? "page" : undefined}>
          {copy.nav.community}
        </a>
        <a href={href("contact")} aria-current={activePage === "contact" ? "page" : undefined}>
          {copy.nav.contact}
        </a>
      </nav>
      <div className="header-actions">
        <LanguageSwitcher />
        <a className="text-button" href={APP_LOGIN_URL} target="_blank" rel="noreferrer">
          {copy.nav.login}
        </a>
        {showCta && (
          <a
            className={`button ${variant === "cream" ? "button-blue" : "button-orange"} button-small`}
            href={homeOnly ? href("home", "calculator") : "#calculator"}
          >
            <span className="cta-label-full">{copy.nav.sendMoney}</span>
            <span className="cta-label-short">{copy.nav.sendMoneyShort}</span>
          </a>
        )}
      </div>
    </header>
  );
}

const stepImages = [
  "/assets/app-mockups/send-money-screen.png",
  "/assets/app-mockups/payout-methods-screen.png",
  "/assets/app-mockups/payment-method-screen.png",
];

function Steps() {
  const copy = useCopy();
  const [activeStep, setActiveStep] = useState(0);
  const stepCount = copy.steps.items.length;
  const selectedStep = copy.steps.items[activeStep];

  const moveToStep = (index) => {
    const nextIndex = (index + stepCount) % stepCount;
    setActiveStep(nextIndex);
    requestAnimationFrame(() => document.getElementById(`transfer-step-${nextIndex + 1}`)?.focus());
  };

  const handleStepKeyDown = (event, index) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveToStep(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveToStep(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveToStep(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveToStep(stepCount - 1);
    }
  };

  return (
    <section id="how" className="section steps-section app-journey-section">
      <div className="app-journey-layout">
        <div className="app-journey-copy">
          <div className="section-heading">
            <p className="eyebrow">{copy.steps.eyebrow}</p>
            <h2>{copy.steps.title}</h2>
            <p className="section-intro">{copy.steps.intro}</p>
          </div>
          <div className="app-journey-tabs" role="tablist" aria-label={copy.steps.tablist}>
            {copy.steps.items.map((step, index) => (
              <button
                key={step.title}
                id={`transfer-step-${index + 1}`}
                className={`app-journey-tab ${activeStep === index ? "is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={activeStep === index}
                aria-controls="transfer-step-panel"
                tabIndex={activeStep === index ? 0 : -1}
                onClick={() => setActiveStep(index)}
                onKeyDown={(event) => handleStepKeyDown(event, index)}
              >
                <span className="step-number">{index + 1}</span>
                <span><b>{step.title}</b><small>{step.body}</small></span>
              </button>
            ))}
          </div>
        </div>
        <div
          id="transfer-step-panel"
          className="app-journey-stage"
          role="tabpanel"
          aria-labelledby={`transfer-step-${activeStep + 1}`}
        >
          <img key={stepImages[activeStep]} src={assetUrl(stepImages[activeStep])} alt={selectedStep.alt} />
          <p><b>{copy.steps.stepWord} {activeStep + 1}</b>{selectedStep.title}</p>
        </div>
      </div>
    </section>
  );
}

function ConnectionStory() {
  const copy = useCopy();
  return (
    <section className="connection-story" aria-labelledby="connection-story-title">
      <img src={assetUrl("/assets/family-banner.jpg")} alt={copy.connection.imageAlt} />
      <div className="connection-story-shade" aria-hidden="true" />
      <div className="connection-story-copy">
        <p className="eyebrow">{copy.connection.eyebrow}</p>
        <h2 id="connection-story-title">{copy.connection.title}</h2>
        <p>{copy.connection.body}</p>
        <a className="button button-orange" href="#calculator">
          {copy.connection.cta} <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </a>
      </div>
      <div className="connection-story-note">
        <ShieldCheck size={20} weight="fill" aria-hidden="true" />
        <span><b>{copy.connection.noteTitle}</b>{copy.connection.noteBody}</span>
      </div>
    </section>
  );
}

const receivingMethodIcons = [Money, Bank, Wallet, Lightning, DeviceMobile];

function ReceiveMethods({ portrait = false, minimal = false }) {
  const copy = useCopy();

  return (
    <section id="receive" className={`section receive-section ${portrait ? "receive-with-portrait" : ""}`}>
      <div className="section-heading">
        <p className="eyebrow">{copy.receive.eyebrow}</p>
        <h2>{copy.receive.title}</h2>
        <p className="section-intro">{copy.receive.intro}</p>
      </div>
      <div className="receive-layout">
        <div className={`receive-list ${minimal ? "receive-list-minimal" : ""}`}>
          {copy.receive.methods.map((method, index) => {
            const Icon = receivingMethodIcons[index] ?? Money;
            return (
              <article key={method.title}>
                <span className="icon-disc"><Icon size={29} weight="regular" /></span>
                <div>
                  <h3>{method.title}</h3>
                  {!minimal && <p>{method.body}</p>}
                </div>
              </article>
            );
          })}
        </div>
        {portrait && (
          <figure className="corridor-showcase">
            <span className="corridor-showcase-label">{copy.receive.corridorsLabel}</span>
            <span className="corridor-showcase-route" aria-hidden="true">{copy.receive.corridorsRoute}</span>
            <ul className="corridor-list">
              {copy.receive.corridors.map((corridor) => (
                <li key={corridor.country} className={`corridor-${corridor.status}`}>
                  <span className="corridor-flag" aria-hidden="true">{flagEmoji(corridor.flag)}</span>
                  <span className="corridor-name">{corridor.country}</span>
                  {corridor.status === "live" ? (
                    <span className="corridor-status corridor-status-live">
                      <CheckCircle size={13} weight="fill" aria-hidden="true" /> {copy.receive.live}
                    </span>
                  ) : (
                    <span className="corridor-status corridor-status-soon">{copy.receive.comingSoon}</span>
                  )}
                  {corridor.currency ? <span className="corridor-currency">{corridor.currency}</span> : null}
                </li>
              ))}
            </ul>
            <p className="corridor-showcase-footer">{copy.receive.corridorsFooter}</p>
          </figure>
        )}
      </div>
    </section>
  );
}

const communityMomentImages = [
  "/assets/community/fun-day-race.jpg",
  "/assets/community/fun-day-football.jpg",
  "/assets/community/fun-day-food.jpg",
];

// Slugs and image paths are structural; every word of these stories lives in
// the locale catalogues under `stories`.
export const storyAssets = [
  {
    slug: "agera-football-championship-2023",
    image: "/assets/community/csr/agera-football-2023.jpg",
    gallery: ["/assets/community/csr/agera-gallery-1.jpg", "/assets/community/csr/agera-gallery-2.jpg"],
  },
  {
    slug: "soninkara-family-fun-day-2024",
    image: "/assets/community/csr/soninkara-family-fun-day-2024.jpg",
    gallery: [
      "/assets/community/csr/soninkara-gallery-1.jpg",
      "/assets/community/csr/soninkara-gallery-2.jpg",
      "/assets/community/csr/soninkara-gallery-3.jpg",
    ],
  },
  {
    slug: "celebrating-with-our-community",
    image: "/assets/community/csr/celebrating-community.jpg",
    gallery: ["/assets/community/csr/community-gallery-1.jpg"],
  },
  {
    slug: "wakefield-community-meeting-2025",
    image: "/assets/community/csr/wakefield-community-meeting-2025.jpg",
    gallery: ["/assets/community/csr/wakefield-gallery-1.jpg"],
  },
  {
    slug: "bristol-community-meeting-2026",
    image: "/assets/community/csr/bristol-community-meeting-2026.jpg",
    gallery: ["/assets/community/csr/bristol-gallery-1.jpg"],
  },
];

function CommunityPreview({ onCommunityPage = false }) {
  const { copy, href } = useI18n();

  return (
    <section
      id={onCommunityPage ? "csr-stories" : "community"}
      className={`section community-preview ${onCommunityPage ? "community-preview-on-page" : ""}`}
    >
      <div className="section-heading">
        <p className="eyebrow">{copy.csr.eyebrow}</p>
        <h2>{onCommunityPage ? copy.csr.pageTitle : copy.csr.homeTitle}</h2>
        <p className="section-intro">{onCommunityPage ? copy.csr.pageIntro : copy.csr.homeIntro}</p>
      </div>
      <div className="csr-story-grid">
        {storyAssets.map((asset) => {
          const story = copy.stories[asset.slug];
          const storyHref = href(`community-story/${asset.slug}`);
          return (
            <article className="csr-story-card" key={asset.slug}>
              <a className="csr-story-image" href={storyHref} aria-label={`${copy.csr.readAria} ${story.title}`}>
                <img src={assetUrl(asset.image)} alt={story.alt} />
              </a>
              <div className="csr-story-content">
                <time>{story.date}</time>
                <h3><a href={storyHref}>{story.title}</a></h3>
                <p>{story.summary}</p>
                <a className="csr-story-link" href={storyHref}>
                  {copy.csr.readStory} <ArrowRight size={17} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
      {!onCommunityPage ? (
        <div className="community-preview-action">
          <span><UsersThree size={26} weight="fill" aria-hidden="true" /> <b>{copy.csr.actionNote}</b></span>
          <a className="button button-orange" href={href("community")}>
            {copy.csr.actionCta} <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </section>
  );
}

function SupportBand() {
  const copy = useCopy();
  return (
    <section id="support" className="section support-band">
      <div>
        <p className="eyebrow">{copy.support.eyebrow}</p>
        <h2>{copy.support.title}</h2>
        <p>{copy.support.body}</p>
        <a href="mailto:support@sonitransfer.com">support@sonitransfer.com</a>
      </div>
      <div className="security-list">
        <h3><ShieldCheck size={25} /> {copy.support.safeTitle}</h3>
        {copy.support.points.map((point) => (
          <span key={point}><Check size={17} /> {point}</span>
        ))}
      </div>
    </section>
  );
}

function ReviewStars({ label, size = 16 }) {
  return (
    <span className="review-stars" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((point) => (
        <Star key={point} size={size} weight="fill" />
      ))}
    </span>
  );
}

function DownloadAndReviews() {
  const { copy, relativeTime } = useI18n();

  return (
    <>
      <section className="section app-download">
        <div className="app-download-copy">
          <p className="eyebrow">{copy.download.eyebrow}</p>
          <h2>{copy.download.title}</h2>
          <p>{copy.download.body}</p>
          <div className="store-buttons">
            <button type="button" aria-label={copy.download.appStoreAria}>
              <img className="app-store-badge" src={assetUrl("/assets/brand/app-store-badge.svg")} alt={copy.download.appStoreAlt} />
            </button>
            <button type="button" aria-label={copy.download.playAria}>
              <img className="google-play-badge" src={assetUrl("/assets/brand/google-play-badge.svg")} alt={copy.download.playAlt} />
            </button>
          </div>
        </div>
        <img
          className="download-ambassador-image"
          src={assetUrl("/assets/brand/soni-ambassador.png")}
          alt={copy.download.ambassadorAlt}
        />
      </section>

      <section className="section review-section">
        <div className="section-heading">
          <p className="eyebrow">{copy.reviews.eyebrow}</p>
          <h2>{copy.reviews.title}</h2>
        </div>
        <div className="review-layout">
          <aside className="review-score">
            <b>5.0</b>
            <ReviewStars label={copy.reviews.ratingLabel} size={22} />
            <span className="review-count">{copy.reviews.count}</span>
            <a className="review-source" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">
              {copy.reviews.readAll} <ArrowRight size={15} weight="bold" />
            </a>
          </aside>
          <div className="review-grid">
            {customerReviews.map((review) => (
              <article key={review.name}>
                <p lang="en">{review.quote}</p>
                <p className="review-by">
                  <b>{review.name}</b>
                  <span>{relativeTime(review.ago.value, review.ago.unit)}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
        <p className="review-verbatim-note">{copy.reviews.verbatim}</p>
      </section>
    </>
  );
}

const legalSlugs = [
  "compliance-security",
  "privacy-policy",
  "cookie-policy",
  "terms-conditions",
  "complaints-policy",
  "refunds-cancellations",
  "belmoney-terms",
];

function Footer() {
  const { copy, href } = useI18n();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Logo href={href("home")} />
          <p>{copy.footer.tagline}</p>
          <small lang="en">Registered in England and Wales · Company 10832378</small>
        </div>
        <div>
          <h3>{copy.footer.sendMoney}</h3>
          <a href={href("home", "calculator")}>{copy.footer.startTransfer}</a>
          <a href={APP_LOGIN_URL} target="_blank" rel="noreferrer">{copy.footer.login}</a>
          <a href={href("home", "calculator")}>{copy.footer.checkRate}</a>
        </div>
        <div>
          <h3>{copy.footer.support}</h3>
          <a href={href("contact")}>{copy.footer.contactUs}</a>
          <a href="mailto:support@sonitransfer.com">{copy.footer.emailSupport}</a>
          <a href="https://wa.me/447438473456" target="_blank" rel="noreferrer">{copy.footer.whatsapp}</a>
        </div>
        <div>
          <h3>{copy.footer.company}</h3>
          <a href={href("community")}>{copy.footer.community}</a>
          <a href={href("community", "our-story")}>{copy.footer.ourStory}</a>
          <a href={href("legal/compliance-security")}>{copy.footer.compliance}</a>
        </div>
      </div>

      <nav className="footer-legal-links" aria-label={copy.footer.legalNav}>
        {legalSlugs.map((slug) => (
          <a key={slug} href={href(`legal/${slug}`)} lang="en">{copy.legalLinks[slug]}</a>
        ))}
      </nav>

      {/* Regulatory disclosures are published in English, the governing version. */}
      <div className="footer-disclosures" lang="en">
        <p>Soni Transfer Ltd is registered with the Financial Conduct Authority as a Small Payment Institution under firm reference number 798474. Customer funds are segregated in line with applicable payment-service requirements but are not covered by the Financial Services Compensation Scheme. <a href="https://register.fca.org.uk/s/firm?id=0010X000046GBgPQAW" target="_blank" rel="noreferrer">View our FCA register entry.</a></p>
        <p>European Economic Area payment services are provided through Belmoney S.A., a payment institution licensed and supervised by the National Bank of Belgium under registration number 0540.745.997, with passport rights under PSD2.</p>
        <p>Registered office: 9 Waterloo Road, Smethwick, Birmingham, B66 4JX, United Kingdom.</p>
      </div>
    </footer>
  );
}

function OurStorySection() {
  const copy = useCopy();
  return (
    <section id="our-story" className="our-story-section">
      <div className="our-story-copy">
        <p className="story-pill"><Heart size={16} weight="fill" aria-hidden="true" /> {copy.ourStory.pill}</p>
        <h2>{copy.ourStory.title}</h2>
        {copy.ourStory.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <figure className="office-story-card">
        <img src={assetUrl("/assets/community/birmingham-office.jpg")} alt={copy.ourStory.imageAlt} />
        <figcaption>
          <MapPin size={26} weight="fill" aria-hidden="true" />
          <span>
            <b>{copy.ourStory.homeTitle}</b>
            <a href={OFFICE_MAP_URL} target="_blank" rel="noreferrer">{OFFICE_ADDRESS}</a>
            <small>{copy.ourStory.homeNote}</small>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}

const initiativeIcons = [GraduationCap, Handshake, Heart];

function CommunityPage() {
  const { copy, href } = useI18n();

  return (
    <main id="top" className="draft draft-two community-page">
      <Header homeOnly activePage="community" />
      <section className="community-page-hero">
        <img src={assetUrl("/assets/community/fun-day-wide.jpg")} alt={copy.communityPage.heroAlt} />
        <div className="community-page-hero-shade" aria-hidden="true" />
        <div className="community-page-hero-copy">
          <p className="eyebrow">{copy.communityPage.heroEyebrow}</p>
          <h1>{copy.communityPage.heroTitle}</h1>
          <p>{copy.communityPage.heroBody}</p>
        </div>
      </section>

      <OurStorySection />

      <section id="family-fun-day" className="section family-day-section">
        <div className="section-heading">
          <p className="eyebrow">{copy.communityPage.funDayEyebrow}</p>
          <h2>{copy.communityPage.funDayTitle}</h2>
          <p className="section-intro">{copy.communityPage.funDayIntro}</p>
        </div>
        <div className="family-day-gallery">
          {copy.communityPage.moments.map((moment, index) => (
            <figure key={moment.caption}>
              <img src={assetUrl(communityMomentImages[index])} alt={moment.alt} />
              <figcaption>{moment.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="community-initiatives">
          {copy.communityPage.initiatives.map((initiative, index) => {
            const Icon = initiativeIcons[index] ?? Heart;
            return (
              <article key={initiative.title}>
                <Icon size={25} weight="duotone" aria-hidden="true" />
                <h3>{initiative.title}</h3>
                <p>{initiative.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <CommunityPreview onCommunityPage />

      <section className="community-contact-cta">
        <div>
          <p className="eyebrow">{copy.communityPage.ctaEyebrow}</p>
          <h2>{copy.communityPage.ctaTitle}</h2>
        </div>
        <a className="button button-orange" href={href("contact")}>
          {copy.communityPage.ctaButton} <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </a>
      </section>
      <Footer />
    </main>
  );
}

function CsrStoryPage({ asset }) {
  const { copy, href } = useI18n();
  const story = copy.stories[asset.slug];
  const [activeImage, setActiveImage] = useState(null);
  const storyImages = [[asset.image, story.alt], ...asset.gallery.map((src, index) => [src, story.gallery[index]])];
  const imageCount = storyImages.length;

  useEffect(() => {
    if (activeImage === null) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowLeft") setActiveImage((current) => (current - 1 + imageCount) % imageCount);
      if (event.key === "ArrowRight") setActiveImage((current) => (current + 1) % imageCount);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage, imageCount]);

  const showPreviousImage = () => setActiveImage((current) => (current - 1 + imageCount) % imageCount);
  const showNextImage = () => setActiveImage((current) => (current + 1) % imageCount);

  return (
    <main id="top" className="draft draft-two csr-article-page">
      <Header homeOnly activePage="community" />
      <article className="csr-article">
        <a className="csr-article-back" href={href("community", "csr-stories")}>
          <ArrowLeft size={17} weight="bold" aria-hidden="true" /> {copy.storyPage.back}
        </a>
        <header className="csr-article-hero">
          <div className="csr-article-heading">
            <p className="csr-article-meta"><span>{copy.storyPage.metaLabel}</span><time>{story.date}</time></p>
            <h1>{story.title}</h1>
            <p>{story.summary}</p>
          </div>
          <figure className="csr-article-featured">
            <button type="button" onClick={() => setActiveImage(0)} aria-label={`${copy.storyPage.viewAria} ${story.alt}`}>
              <img src={assetUrl(asset.image)} alt={story.alt} />
              <span>{copy.storyPage.viewImage}</span>
            </button>
          </figure>
        </header>

        <section className="csr-article-body">
          <div className="csr-article-prose">
            {story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <aside className="csr-article-note">
          <Heart size={23} weight="fill" aria-hidden="true" />
          <p><b>{copy.storyPage.noteTitle}</b> {copy.storyPage.noteBody}</p>
        </aside>

        <section className="csr-gallery-section" aria-labelledby={`gallery-${asset.slug}`}>
          <div className="csr-gallery-heading">
            <p className="eyebrow">{copy.storyPage.galleryEyebrow}</p>
            <h2 id={`gallery-${asset.slug}`}>{copy.storyPage.galleryTitle}</h2>
            <p>{copy.storyPage.galleryBody}</p>
          </div>
          <div className={`csr-article-gallery csr-article-gallery-${asset.gallery.length}`}>
            {asset.gallery.map((src, index) => (
              <figure key={src}>
                <button
                  type="button"
                  onClick={() => setActiveImage(index + 1)}
                  aria-label={`${copy.storyPage.viewAria} ${story.gallery[index]}`}
                >
                  <img src={assetUrl(src)} alt={story.gallery[index]} />
                  <span>{copy.storyPage.viewImage}</span>
                </button>
              </figure>
            ))}
          </div>
        </section>
      </article>

      {activeImage !== null ? (
        <div
          className="csr-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={copy.storyPage.lightboxLabel}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveImage(null);
          }}
        >
          <button className="csr-lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label={copy.storyPage.close}>
            <X size={23} weight="bold" aria-hidden="true" />
          </button>
          {imageCount > 1 ? (
            <button className="csr-lightbox-previous" type="button" onClick={showPreviousImage} aria-label={copy.storyPage.previous}>
              <CaretLeft size={28} weight="bold" aria-hidden="true" />
            </button>
          ) : null}
          <figure>
            <img src={assetUrl(storyImages[activeImage][0])} alt={storyImages[activeImage][1]} />
            <figcaption><span>{storyImages[activeImage][1]}</span><small>{activeImage + 1} / {imageCount}</small></figcaption>
          </figure>
          {imageCount > 1 ? (
            <button className="csr-lightbox-next" type="button" onClick={showNextImage} aria-label={copy.storyPage.next}>
              <CaretRight size={28} weight="bold" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      ) : null}

      <section className="csr-article-footer">
        <div>
          <p className="eyebrow">{copy.storyPage.footerEyebrow}</p>
          <h2>{copy.storyPage.footerTitle}</h2>
        </div>
        <a className="button button-orange" href={href("community")}>
          {copy.storyPage.footerCta} <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </a>
      </section>
      <Footer />
    </main>
  );
}

const contactMethodDetails = [
  [PhoneCall, "+44 121 532 0769", "tel:+441215320769"],
  [Phone, "+44 7438 473456", "https://wa.me/447438473456"],
  [EnvelopeSimple, "support@sonitransfer.com", "mailto:support@sonitransfer.com"],
  [MapPin, OFFICE_ADDRESS, OFFICE_MAP_URL],
];

function ContactPage() {
  const copy = useCopy();

  return (
    <main id="top" className="draft draft-two contact-page">
      <Header homeOnly activePage="contact" />
      <section className="contact-page-hero">
        <p className="eyebrow">{copy.contactPage.eyebrow}</p>
        <h1>{copy.contactPage.title}</h1>
        <p>{copy.contactPage.body}</p>
      </section>
      <section className="section contact-methods" aria-label={copy.contactPage.methodsAria}>
        {copy.contactPage.methods.map((method, index) => {
          const [Icon, value, href] = contactMethodDetails[index];
          const isExternal = href.startsWith("http");
          return (
            <a key={method.title} href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined}>
              <span className="contact-method-icon"><Icon size={26} weight="duotone" aria-hidden="true" /></span>
              <span><small>{method.title}</small><b>{value}</b><em>{method.detail}</em></span>
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          );
        })}
      </section>
      <section className="contact-office-band">
        <img src={assetUrl("/assets/community/birmingham-office.jpg")} alt={copy.contactPage.officeAlt} />
        <div>
          <p className="eyebrow">{copy.contactPage.officeEyebrow}</p>
          <h2>{copy.contactPage.officeTitle}</h2>
          <p>{OFFICE_ADDRESS}</p>
          <a className="button button-orange" href={OFFICE_MAP_URL} target="_blank" rel="noreferrer">
            {copy.contactPage.directions} <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function NotFoundPage() {
  const { copy, href } = useI18n();
  return (
    <main id="top" className="draft draft-two">
      <Header homeOnly />
      <section className="section not-found">
        <p className="eyebrow">{copy.notFound.eyebrow}</p>
        <h1>{copy.notFound.title}</h1>
        <p>{copy.notFound.body}</p>
        <a className="button button-orange" href={href("home")}>
          {copy.notFound.cta} <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </a>
      </section>
      <Footer />
    </main>
  );
}

const proofIcons = [ShieldCheck, CurrencyGbp, CheckCircle, Money];

function HomePage() {
  const copy = useCopy();

  return (
    <main id="top" className="draft draft-two">
      <Header />
      <section className="white-hero">
        <div className="hero-copy">
          <p className="hero-kicker"><span aria-hidden="true" /> {copy.hero.kicker}</p>
          <h1>{copy.hero.title}</h1>
          <div className="proof-grid" aria-label={copy.hero.proofLabel}>
            {copy.hero.proof.map((title, index) => {
              const Icon = proofIcons[index] ?? ShieldCheck;
              return (
                <span key={title}>
                  <Icon size={20} weight="bold" aria-hidden="true" />
                  <b>{title}</b>
                </span>
              );
            })}
          </div>
        </div>
        <div className="hero-calculator-shell">
          <LiveTransferCalculator variant="editorial" />
        </div>
      </section>
      <Steps />
      <ConnectionStory />
      <ReceiveMethods portrait />
      <OurStorySection />
      <CommunityPreview />
      <SupportBand />
      <DownloadAndReviews />
      <Footer />
    </main>
  );
}

/** Title and description for the active route, used for <head> and SEO. */
function headFor(copy, route) {
  if (route.startsWith("legal/")) {
    const page = getLegalPage(route.slice("legal/".length));
    return { title: `${page.title} | Soni Transfer`, description: page.description };
  }
  if (route.startsWith("community-story/")) {
    const story = copy.stories[route.slice("community-story/".length)];
    if (story) return { title: `${story.title} | Soni Transfer`, description: story.summary };
    return copy.meta.community;
  }
  if (route === "community") return copy.meta.community;
  if (route === "contact") return copy.meta.contact;
  if (route === "notfound") return copy.meta.notFound;
  return copy.meta.home;
}

function Routes({ route }) {
  if (route.startsWith("legal/")) {
    return (
      <main id="top" className="draft draft-two legal-page">
        <Header homeOnly />
        <LegalContentPage slug={route.slice("legal/".length)} />
        <Footer />
      </main>
    );
  }

  if (route.startsWith("community-story/")) {
    const slug = route.slice("community-story/".length);
    const asset = storyAssets.find((item) => item.slug === slug);
    return asset ? <CsrStoryPage asset={asset} /> : <CommunityPage />;
  }

  if (route === "community") return <CommunityPage />;
  if (route === "contact") return <ContactPage />;
  if (route === "notfound") return <NotFoundPage />;
  return <HomePage />;
}

export function App() {
  const { locale, route } = useLocation();
  const head = headFor(catalogueFor(locale), route);

  useDocumentHead({ locale, route, title: head.title, description: head.description });

  return (
    <I18nProvider locale={locale} route={route}>
      <Routes route={route} />
    </I18nProvider>
  );
}
