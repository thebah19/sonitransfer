import { useEffect, useMemo, useState } from "react";
import {
  AppleLogo,
  ArrowRight,
  Bank,
  CaretDown,
  Check,
  CurrencyGbp,
  GooglePlayLogo,
  Headset,
  LockKey,
  MapPin,
  Money,
  Phone,
  ShieldCheck,
} from "@phosphor-icons/react";

const RATE = 89.5;
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const options = [
  { id: "1", label: "Bold blue" },
  { id: "2", label: "White editorial" },
  { id: "3", label: "Selected split" },
];

function useHashRoute() {
  const read = () => {
    const value = window.location.hash.replace("#/", "");
    return ["1", "2", "3"].includes(value) ? value : "1";
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

function Logo({ light = false }) {
  return (
    <a className={`logo-wrap ${light ? "logo-wrap-light" : ""}`} href="#top" aria-label="Soni Transfer home">
      <img src={assetUrl("/assets/soni-logo-crop.png")} alt="Soni Transfer" />
    </a>
  );
}

function Header({ variant = "white", showCta = true }) {
  return (
    <header className={`site-header header-${variant}`}>
      <Logo light={variant === "blue"} />
      <nav className="main-nav" aria-label="Primary navigation">
        <a href="#how">How it works</a>
        <a href="#receive">Ways to receive</a>
        <a href="#support">Help</a>
      </nav>
      <div className="header-actions">
        <button className="text-button">Log in</button>
        {showCta && (
          <a className={`button ${variant === "cream" ? "button-blue" : "button-orange"} button-small`} href="#calculator">
            Send money
          </a>
        )}
      </div>
    </header>
  );
}

function TransferCalculator({ compact = false }) {
  const [amount, setAmount] = useState("250");
  const [method, setMethod] = useState("Cash pickup");
  const [submitted, setSubmitted] = useState(false);
  const receive = useMemo(() => {
    const parsed = Number(amount);
    return Number.isFinite(parsed) ? (parsed * RATE).toLocaleString("en-GB", { maximumFractionDigits: 2 }) : "0.00";
  }, [amount]);

  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form id="calculator" className={`calculator ${compact ? "calculator-compact" : ""}`} onSubmit={submit}>
      <div className="calculator-fields">
        <label>
          <span>You send exactly</span>
          <span className="money-field">
            <input
              inputMode="decimal"
              aria-label="Amount to send in British pounds"
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value.replace(/[^\d.]/g, ""));
                setSubmitted(false);
              }}
            />
            <b>GBP</b>
            <CaretDown size={15} weight="bold" />
          </span>
        </label>
        <ArrowRight className="transfer-arrow" size={22} weight="bold" aria-hidden="true" />
        <label>
          <span>Recipient gets exactly</span>
          <span className="money-field">
            <output aria-live="polite">{receive}</output>
            <b>GMD</b>
            <CaretDown size={15} weight="bold" />
          </span>
        </label>
        {compact && (
          <label className="method-select">
            <span>Receive method</span>
            <select value={method} onChange={(event) => setMethod(event.target.value)}>
              <option>Cash pickup</option>
              <option>Bank deposit</option>
              <option>Mobile money</option>
            </select>
          </label>
        )}
        {compact && (
          <button className="button button-orange calculator-submit" type="submit">
            Continue <ArrowRight size={18} weight="bold" />
          </button>
        )}
      </div>

      <div className="calculator-facts">
        <span><CurrencyGbp size={19} /> Transfer fee <strong>£1 included</strong></span>
        <span><ShieldCheck size={19} /> Exact rate <strong>1 GBP = {RATE.toFixed(2)} GMD</strong></span>
      </div>

      {!compact && (
        <>
          <fieldset className="receive-choice">
            <legend>How would you like them to receive it?</legend>
            {[
              [Money, "Cash pickup"],
              [Bank, "Bank deposit"],
              [Phone, "Mobile money"],
            ].map(([Icon, label]) => (
              <button
                type="button"
                key={label}
                className={method === label ? "selected" : ""}
                onClick={() => {
                  setMethod(label);
                  setSubmitted(false);
                }}
              >
                <Icon size={26} weight="regular" />
                {label}
              </button>
            ))}
          </fieldset>
          <button className="button button-orange calculator-submit" type="submit">
            Continue <ArrowRight size={19} weight="bold" />
          </button>
        </>
      )}

      <p className={`calculator-status ${submitted ? "show" : ""}`} role="status">
        <Check size={18} weight="bold" /> Transfer ready for {method.toLowerCase()}. Sign in to continue securely.
      </p>
      <small className="rate-note"><LockKey size={14} weight="bold" /> This is the exact amount they’ll receive.</small>
    </form>
  );
}

function FinalTransferPanel({ initialAmount = "100" }) {
  const [amount, setAmount] = useState(initialAmount);
  const [method, setMethod] = useState("Cash pickup");
  const [submitted, setSubmitted] = useState(false);

  const receive = useMemo(() => {
    const parsed = Number(amount);
    return Number.isFinite(parsed)
      ? (parsed * RATE).toLocaleString("en-GB", { maximumFractionDigits: 2 })
      : "0.00";
  }, [amount]);

  return (
    <form
      id="calculator"
      className="final-transfer-panel"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="rate-pill"><LockKey size={16} weight="bold" /> 1 GBP = {RATE.toFixed(2)} GMD</div>

      <label className="final-amount-row">
        <span className="final-field-label">You send exactly</span>
        <span className="final-currency">
          <img className="currency-flag" src={assetUrl("/assets/flag-gb.png")} alt="" />
          <b>GBP</b>
          <CaretDown size={17} weight="bold" aria-hidden="true" />
        </span>
        <span className="final-value final-input-value">
          <span aria-hidden="true">£</span>
          <input
            inputMode="decimal"
            aria-label="Amount to send exactly in British pounds"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value.replace(/[^\d.]/g, ""));
              setSubmitted(false);
            }}
          />
        </span>
      </label>

      <div className="final-amount-row">
        <span className="final-field-label">Recipient gets exactly</span>
        <span className="final-currency">
          <img className="currency-flag" src={assetUrl("/assets/flag-gm.png")} alt="" />
          <b>GMD</b>
        </span>
        <output className="final-value" aria-live="polite">{receive}</output>
      </div>

      <div className="final-panel-details">
        <label className="final-receive-method">
          <span>Receive by</span>
          <span className="final-select-wrap">
            <Money size={23} weight="regular" aria-hidden="true" />
            <select
              value={method}
              onChange={(event) => {
                setMethod(event.target.value);
                setSubmitted(false);
              }}
              aria-label="How the recipient will receive the money"
            >
              <option>Cash pickup</option>
              <option>Bank deposit</option>
              <option>Mobile money</option>
            </select>
            <CaretDown size={17} weight="bold" aria-hidden="true" />
          </span>
        </label>

        <div className="final-fee-row">
          <span><CurrencyGbp size={23} aria-hidden="true" /> Transfer fee</span>
          <strong>£1 included</strong>
        </div>

        <p className="exact-amount-note">
          <LockKey size={16} weight="bold" aria-hidden="true" />
          This is the exact amount they’ll receive.
        </p>
      </div>

      <button className="button button-orange final-send-button" type="submit">
        Send money
      </button>

      <p className={`final-submit-status ${submitted ? "show" : ""}`} role="status">
        <Check size={18} weight="bold" />
        Ready for {method.toLowerCase()}. Sign in to continue.
      </p>
    </form>
  );
}

const steps = [
  ["1", "Enter details", "Tell us how much you want to send and where."],
  ["2", "Choose payout", "Pick how your loved one will receive the money."],
  ["3", "Pay securely", "Pay by card and we’ll do the rest."],
];

function Steps({ numberedHeading = false }) {
  return (
    <section id="how" className="section steps-section">
      <div className="section-heading">
        <p className="eyebrow">How it works</p>
        <h2>{numberedHeading ? "1. Three steps to send money" : "Three simple steps"}</h2>
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
  [Money, "Cash pickup", "Collect cash from local payout partners across The Gambia."],
  [Bank, "Bank deposit", "Send directly to a supported Gambian bank account."],
  [Phone, "Mobile money", "Send to a supported mobile wallet quickly and securely."],
];

function ReceiveMethods({ portrait = false, minimal = false }) {
  return (
    <section id="receive" className={`section receive-section ${portrait ? "receive-with-portrait" : ""}`}>
      <div className="section-heading">
        <p className="eyebrow">Your choice, their convenience</p>
        <h2>{portrait ? "2. Ways to receive in The Gambia" : "Ways to receive in The Gambia"}</h2>
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
        {portrait && <img className="portrait-image" src={assetUrl("/assets/woman-portrait.png")} alt="A smiling Gambian woman in a blue and orange headwrap" />}
      </div>
    </section>
  );
}

function TrustRow() {
  return (
    <section className="trust-row" aria-label="Why people trust Soni Transfer">
      <span><CurrencyGbp size={28} /> <b>Clear £1 fee</b><small>Shown upfront</small></span>
      <span><LockKey size={28} /> <b>Secure payments</b><small>Protected checkout</small></span>
      <span><Headset size={28} /> <b>Real support</b><small>Help when you need it</small></span>
    </section>
  );
}

function SupportBand({ numbered = false }) {
  return (
    <section id="support" className="section support-band">
      <div>
        <p className="eyebrow">Support</p>
        <h2>{numbered ? "3. Real help, when you need it" : "Real help, when you need it"}</h2>
        <p>Questions before or after a transfer? Our team is here to help.</p>
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

function DownloadAndFaq({ numbered = false }) {
  const [open, setOpen] = useState(0);
  const faqs = [
    ["How long does a transfer take?", "Most transfers are ready in about five minutes, although checks and payout opening hours can affect timing."],
    ["How much does it cost?", "The transfer fee shown in this draft is £1, and the exact recipient amount is shown immediately."],
    ["What do I need to send money?", "You’ll need your details, your loved one’s payout information, and a supported payment method."],
  ];

  return (
    <section className="section download-faq">
      <div>
        <p className="eyebrow">Available wherever you are</p>
        <h2>{numbered ? "4. Send on the go" : "Send on the go"}</h2>
        <p>Use Soni Transfer on the web or download the app.</p>
        <div className="store-buttons">
          <button><AppleLogo size={28} weight="fill" /><span><small>Download on the</small>App Store</span></button>
          <button><GooglePlayLogo size={27} weight="fill" /><span><small>Get it on</small>Google Play</span></button>
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

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Logo />
        <p>Connecting families. Building futures.</p>
        <small>UK company 10832378</small>
      </div>
      <div>
        <h3>Send money</h3>
        <a href="#calculator">Start a transfer</a>
        <a href="#how">How it works</a>
        <a href="#receive">Ways to receive</a>
      </div>
      <div>
        <h3>Support</h3>
        <a href="#support">Help centre</a>
        <a href="#support">Track a transfer</a>
        <a href="#support">Contact us</a>
      </div>
      <div>
        <h3>Company</h3>
        <a href="#top">About us</a>
        <a href="#top">Compliance</a>
        <a href="#top">Privacy</a>
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
            <h1>Send money home. Simply.</h1>
            <p>A clear £1 fee. Your recipient gets exactly what you see.</p>
          </div>
          <div className="draft-one-panel">
            <FinalTransferPanel initialAmount="250" />
          </div>
        </div>
      </div>
      <TrustRow />
      <Steps />
      <section className="family-banner">
        <img src={assetUrl("/assets/family-banner.png")} alt="A smiling Gambian family in their courtyard" />
        <div>
          <h2>Built for Gambians, by people who understand.</h2>
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
          <h1>Money home, without the guesswork.</h1>
          <p>See the fee and exact recipient amount before you send.</p>
          <div className="proof-grid">
            <span><b>£1</b>fixed fee</span>
            <span><b>Exact</b>recipient amount</span>
            <span><b>Cash, bank</b>or wallet</span>
            <span><b>Real help</b>when needed</span>
          </div>
        </div>
        <TransferCalculator compact />
      </section>
      <Steps numberedHeading />
      <ReceiveMethods portrait />
      <SupportBand numbered />
      <DownloadAndFaq numbered />
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
            <h1>A simple way to send money to The Gambia</h1>
            <p>Send from the UK with confidence. Your loved ones receive in cash, to a bank, or on mobile.</p>

            <div className="final-benefits" aria-label="Soni Transfer benefits">
              <span><CurrencyGbp size={29} /> <b>£1 transfer fee</b></span>
              <span><ShieldCheck size={29} /> <b>Clear amount before you send</b></span>
              <span><Money size={29} /> <b>Cash pickup, bank or mobile money</b></span>
            </div>
          </div>

          <FinalTransferPanel />
        </div>
      </section>
      <Steps />
      <section className="family-wide">
        <img src={assetUrl("/assets/family-wide.png")} alt="A Gambian family sharing a warm moment together" />
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

  return (
    <>
      {route === "1" && <OptionOne />}
      {route === "2" && <OptionTwo />}
      {route === "3" && <OptionThree />}
      <DraftSwitcher route={route} />
    </>
  );
}
