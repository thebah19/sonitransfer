import { useEffect, useState } from "react";
import {
  Bank,
  Check,
  CurrencyGbp,
  DeviceMobile,
  Lightning,
  LockKey,
  Money,
  Phone,
  ShieldCheck,
} from "@phosphor-icons/react";
import { LiveTransferCalculator } from "./LiveTransferCalculator";
import { LegalContentPage } from "./LegalPage";
import { getLegalPage } from "./legalContent";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const reviewMode = import.meta.env.DEV || import.meta.env.VITE_REVIEW_MODE === "true";
const APP_STORE_URL = "https://apps.apple.com/app/id1464484976";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.UnityRemit.UnityRemit&gl=GB";

const options = [
  { id: "1", label: "Bold blue" },
  { id: "2", label: "White editorial" },
  { id: "3", label: "Selected split" },
];

function useHashRoute() {
  const read = () => {
    const pathSlug = window.location.pathname.split("/").filter(Boolean).at(-1) ?? "";
    if (pathSlug && getLegalPage(pathSlug)) return `legal/${pathSlug}`;

    const value = window.location.hash.replace("#/", "");
    const legalSlug = value.startsWith("legal/") ? value.slice("legal/".length) : "";
    if (legalSlug && getLegalPage(legalSlug)) return value;
    return reviewMode && ["1", "2", "3"].includes(value) ? value : "2";
  };
  const [route, setRoute] = useState(read);

  useEffect(() => {
    const onHash = () => setRoute(read());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return route;
}

function DraftSwitcher({ route }) {
  return (
    <nav className="draft-switcher" aria-label="Compare design drafts">
      <span>Compare</span>
      {options.map((item) => (
        <a
          key={item.id}
          href={`#/${item.id}`}
          className={route === item.id ? "active" : ""}
          aria-current={route === item.id ? "page" : undefined}
        >
          {item.id}
          <span className="switcher-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

function Logo({ light = false, href = "#top" }) {
  return (
    <a className={`logo-wrap ${light ? "logo-wrap-light" : ""}`} href={href} aria-label="Soni Transfer home">
      <img src={assetUrl("/assets/soni-logo-crop.png")} alt="Soni Transfer" />
    </a>
  );
}

function Header({ variant = "white", showCta = true, homeOnly = false }) {
  const sectionHref = (section) => homeOnly ? `/#${section}` : `#${section}`;

  return (
    <header className={`site-header header-${variant}`}>
      <Logo light={variant === "blue"} href={homeOnly ? "/" : "#top"} />
      <nav className="main-nav" aria-label="Primary navigation">
        <a href={sectionHref("how")}>How it works</a>
        <a href={sectionHref("receive")}>Ways to receive</a>
        <a href={sectionHref("support")}>Help</a>
      </nav>
      <div className="header-actions">
        <button className="text-button">Log in</button>
        {showCta && (
          <a className={`button ${variant === "cream" ? "button-blue" : "button-orange"} button-small`} href={homeOnly ? "/#calculator" : "#calculator"}>
            Send money
          </a>
        )}
      </div>
    </header>
  );
}

const steps = [
  ["1", "Enter transfer details", "Choose how much you want to send and select the receiving country."],
  ["2", "Payout method", "Choose how your recipient will receive the money."],
  ["3", "Pay securely", "Review the details, pay securely, and track the transfer from your account."],
];

function Steps() {
  return (
    <section id="how" className="section steps-section">
      <div className="section-heading">
        <p className="eyebrow">How it works</p>
        <h2>Send money in three simple steps.</h2>
      </div>
      <div className="steps">
        {steps.map(([number, title, body]) => (
          <article key={number}>
            <span className="step-number">{number}</span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const receivingMethods = [
  [Money, "Cash pickup", "Collect cash from an available payout partner."],
  [Bank, "Bank deposit", "Send money directly to a supported bank account."],
  [Phone, "Wave - Mobile Wallet", "Send money straight to a supported Wave mobile wallet."],
  [DeviceMobile, "Mobile credit", "Top up airtime credit on a supported mobile number."],
  [Lightning, "Cash Power", "Buy prepaid electricity credit for a supported meter."],
];

function ReceiveMethods({ portrait = false, minimal = false }) {
  return (
    <section id="receive" className={`section receive-section ${portrait ? "receive-with-portrait" : ""}`}>
      <div className="section-heading">
        <p className="eyebrow">Flexible payout options</p>
        <h2>Ways to receive money</h2>
        <p className="section-intro">Choose the payout method that works best for your recipient. Available methods vary by receiving country.</p>
      </div>
      <div className="receive-layout">
        <div className={`receive-list ${minimal ? "receive-list-minimal" : ""}`}>
          {receivingMethods.map(([Icon, title, body]) => (
            <article key={title}>
              <span className="icon-disc"><Icon size={29} weight="regular" /></span>
              <div>
                <h3>{title}</h3>
                {!minimal && <p>{body}</p>}
              </div>
            </article>
          ))}
        </div>
        {portrait && <img className="portrait-image" src={assetUrl("/assets/woman-portrait.png")} alt="A smiling Soni Transfer customer" />}
      </div>
    </section>
  );
}

function TrustRow() {
  return (
    <section className="trust-row" aria-label="Why people trust Soni Transfer">
      <span><LockKey size={28} /> <b>Secure transfers</b><small>Protected processing</small></span>
      <span><CurrencyGbp size={28} /> <b>Competitive rates</b><small>Shown before you continue</small></span>
      <span><ShieldCheck size={28} /> <b>FCA registered</b><small>Small Payment Institution</small></span>
    </section>
  );
}

function SupportBand() {
  return (
    <section id="support" className="section support-band">
      <div>
        <p className="eyebrow">Support</p>
        <h2>Help when you need it</h2>
        <p>Have a question before, during, or after a transfer? The Soni Transfer support team is ready to help.</p>
        <a href="mailto:support@sonitransfer.com">support@sonitransfer.com</a>
      </div>
      <div className="security-list">
        <h3><ShieldCheck size={25} /> Safe and secure</h3>
        <span><Check size={17} /> Secure card payments</span>
        <span><Check size={17} /> Clear fees before you pay</span>
        <span><Check size={17} /> Transfer confirmation provided</span>
      </div>
    </section>
  );
}

function DownloadAndFaq() {
  const [open, setOpen] = useState(0);
  const faqs = [
    ["How long does a transfer take?", "Transfer times depend on the receiving country, payout method, verification checks, and payout-partner operating hours."],
    ["How much does it cost to send money?", "The calculator shows the current transfer fee, exchange rate, and exact recipient amount before you continue."],
    ["What do I need to send money?", "You will need your account details, the recipient’s payout information, and a supported payment method."],
  ];

  return (
    <section className="section download-faq">
      <div>
        <p className="eyebrow">Available wherever you are</p>
        <h2>Send money on the go</h2>
        <p>Use Soni Transfer online or download the app to send money and manage your transfers.</p>
        <div className="store-buttons">
          <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
            <img src={assetUrl("/assets/appstore-badge.png")} alt="Download Soni Transfer on the App Store" width="510" height="167" loading="lazy" />
          </a>
          <a href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">
            <img src={assetUrl("/assets/googleplay-badge.png")} alt="Get Soni Transfer on Google Play" width="510" height="168" loading="lazy" />
          </a>
        </div>
      </div>
      <div className="faq-list">
        <h2>Common questions</h2>
        {faqs.map(([question, answer], index) => (
          <article key={question}>
            <button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
              {question}<span>{open === index ? "−" : "+"}</span>
            </button>
            {open === index && <p>{answer}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

const legalLinks = [
  ["Compliance & Security", "compliance-security"],
  ["Privacy Policy", "privacy-policy"],
  ["Cookie Policy", "cookie-policy"],
  ["Terms & Conditions", "terms-conditions"],
  ["Complaints Policy", "complaints-policy"],
  ["Refunds & Cancellations", "refunds-cancellations"],
  ["Belmoney Terms", "belmoney-terms"],
];

function Footer({ homeOnly = false }) {
  const sectionHref = (section) => homeOnly ? `/#${section}` : `#${section}`;

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Logo href="/" />
          <p>Fast, secure and reliable money transfers.</p>
          <small>Registered in England and Wales · Company 10832378</small>
        </div>
        <div>
          <h3>Send money</h3>
          <a href={sectionHref("calculator")}>Start a transfer</a>
          <a href={sectionHref("how")}>How it works</a>
          <a href={sectionHref("receive")}>Ways to receive</a>
        </div>
        <div>
          <h3>Support</h3>
          <a href={sectionHref("support")}>Help centre</a>
          <a href={sectionHref("support")}>Track a transfer</a>
          <a href="mailto:support@sonitransfer.com">Contact us</a>
        </div>
        <div>
          <h3>Company</h3>
          <a href={sectionHref("top")}>About us</a>
          <a href="/compliance-security">Compliance & Security</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
      </div>

      <nav className="footer-legal-links" aria-label="Legal information">
        {legalLinks.map(([label, slug]) => <a key={slug} href={`/${slug}`}>{label}</a>)}
      </nav>

      <div className="footer-disclosures">
        <p>Soni Transfer Ltd is registered with the Financial Conduct Authority as a Small Payment Institution under firm reference number 798474. Customer funds are segregated in line with applicable payment-service requirements but are not covered by the Financial Services Compensation Scheme. <a href="https://register.fca.org.uk/s/firm?id=0010X000046GBgPQAW" target="_blank" rel="noreferrer">View our FCA register entry.</a></p>
        <p>European Economic Area payment services are provided through Belmoney S.A., a payment institution licensed and supervised by the National Bank of Belgium under registration number 0540.745.997, with passport rights under PSD2.</p>
        <p>Registered office: 9 Waterloo Road, Smethwick, Birmingham, B66 4JX, United Kingdom.</p>
      </div>
    </footer>
  );
}

function OptionOne() {
  return (
    <main id="top" className="draft draft-one">
      <div className="white-nav-band">
        <Header />
      </div>
      <div className="blue-hero">
        <div className="draft-one-hero-layout">
          <div className="hero-copy">
            <h1>Send money across Africa with confidence.</h1>
            <p>Fast, secure and reliable transfers.</p>
          </div>
          <div className="draft-one-panel">
            <LiveTransferCalculator variant="panel" initialAmount="250" />
          </div>
        </div>
      </div>
      <TrustRow />
      <Steps />
      <section className="family-banner">
        <img src={assetUrl("/assets/family-banner.png")} alt="A smiling family together in their courtyard" />
        <div>
          <h2>Built around the people you send for.</h2>
          <p>Simple support for the people who matter most.</p>
        </div>
      </section>
      <ReceiveMethods minimal />
      <DownloadAndFaq />
      <Footer />
    </main>
  );
}

function OptionTwo() {
  return (
    <main id="top" className="draft draft-two">
      <Header />
      <section className="white-hero">
        <div className="hero-copy">
          <h1>Send money across Africa with confidence.</h1>
          <p>Fast, secure and reliable transfers.</p>
          <div className="proof-grid">
            <span><b>Secure</b>transfers</span>
            <span><b>Competitive</b>exchange rates</span>
            <span><b>FCA registered</b>Small Payment Institution</span>
            <span><b>Multiple</b>payout options</span>
          </div>
        </div>
        <LiveTransferCalculator variant="editorial" />
      </section>
      <Steps />
      <ReceiveMethods portrait />
      <SupportBand />
      <DownloadAndFaq />
      <Footer />
    </main>
  );
}

function OptionThree() {
  return (
    <main id="top" className="draft draft-three">
      <div className="white-nav-band">
        <Header showCta={false} />
      </div>
      <section className="split-hero">
        <div className="split-hero-content">
          <div className="split-hero-copy">
            <h1>Send money across Africa with confidence.</h1>
            <p>Fast, secure and reliable transfers with flexible payout options.</p>

            <div className="final-benefits" aria-label="Soni Transfer benefits">
              <span><LockKey size={29} /> <b>Secure transfers</b></span>
              <span><CurrencyGbp size={29} /> <b>Competitive exchange rates</b></span>
              <span><Money size={29} /> <b>Multiple payout options</b></span>
            </div>
          </div>

          <LiveTransferCalculator variant="panel" />
        </div>
      </section>
      <Steps />
      <section className="family-wide">
        <img src={assetUrl("/assets/family-wide.png")} alt="A family sharing a warm moment together" />
        <h2>Built around the people you send for</h2>
      </section>
      <ReceiveMethods minimal />
      <div className="service-links"><a href="#calculator">Mobile credit</a><span /> <a href="#calculator">Cash Power</a></div>
      <TrustRow />
      <DownloadAndFaq />
      <Footer />
    </main>
  );
}

export function App() {
  const route = useHashRoute();
  const legalSlug = route.startsWith("legal/") ? route.slice("legal/".length) : null;

  if (legalSlug) {
    return (
      <main id="top" className="draft draft-two legal-page">
        <Header homeOnly />
        <LegalContentPage slug={legalSlug} />
        <Footer homeOnly />
      </main>
    );
  }

  return (
    <>
      {route === "1" && <OptionOne />}
      {route === "2" && <OptionTwo />}
      {route === "3" && <OptionThree />}
      {reviewMode ? <DraftSwitcher route={route} /> : null}
    </>
  );
}
