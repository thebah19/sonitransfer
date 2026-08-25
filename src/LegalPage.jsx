import { ArrowRight, CalendarBlank, FileText, ShieldCheck, Translate } from "@phosphor-icons/react";
import { getLegalPage } from "./legalContent";
import { useCopy } from "./i18n";

const linkedReferences = {
  "support@sonitransfer.com": "mailto:support@sonitransfer.com",
  "financial-ombudsman.org.uk": "https://www.financial-ombudsman.org.uk/",
  "register.fca.org.uk": "https://register.fca.org.uk/s/firm?id=0010X000046GBgPQAW",
  "ico.org.uk": "https://ico.org.uk/",
};

function LinkedText({ children }) {
  const pattern = /(support@sonitransfer\.com|financial-ombudsman\.org\.uk|register\.fca\.org\.uk|ico\.org\.uk)/gi;

  return String(children).split(pattern).map((part, index) => {
    const href = linkedReferences[part.toLowerCase()];
    if (!href) return part;

    return (
      <a key={`${part}-${index}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
        {part}
      </a>
    );
  });
}

function sectionId(title, suffix = "") {
  const slug = title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return suffix ? `${slug}-${suffix}` : slug;
}

function LegalSectionBlock({ section, index, depth = 0 }) {
  const id = sectionId(section.title, index);
  const Heading = depth === 0 ? "h2" : "h3";

  return (
    <section className={`legal-section legal-section-depth-${depth}`} id={id}>
      <Heading>{section.title}</Heading>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}><LinkedText>{paragraph}</LinkedText></p>
      ))}
      {section.bullets?.length > 0 && (
        <ul>
          {section.bullets.map((bullet) => (
            <li key={bullet}><LinkedText>{bullet}</LinkedText></li>
          ))}
        </ul>
      )}
      {section.subsections?.map((subsection, subsectionIndex) => (
        <LegalSectionBlock
          key={subsection.title}
          section={subsection}
          index={`${index}-${subsectionIndex + 1}`}
          depth={depth + 1}
        />
      ))}
    </section>
  );
}

export function LegalContentPage({ slug }) {
  const copy = useCopy();
  const page = getLegalPage(slug);

  if (!page) return null;

  return (
    <>
      <section className="legal-hero">
        <div className="legal-hero-inner">
          <div className="legal-hero-copy" lang="en">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
          </div>
          <aside className="legal-meta" aria-label={copy.legal.docInfo}>
            <span><CalendarBlank size={20} aria-hidden="true" /> {copy.legal.lastUpdated} <strong>{page.lastUpdated}</strong></span>
            <span><FileText size={20} aria-hidden="true" /> {copy.legal.version} <strong>{page.version}</strong></span>
          </aside>
        </div>
      </section>

      {copy.legal.governing ? (
        <p className="legal-governing">
          <Translate size={19} weight="regular" aria-hidden="true" />
          {copy.legal.governing}
        </p>
      ) : null}

      <div className="legal-content-shell">
        <aside className="legal-toc">
          <div>
            <span>{copy.legal.onThisPage}</span>
            <nav aria-label={`${page.title} ${copy.legal.sectionsAria}`} lang="en">
              {page.sections.map((section, index) => {
                const targetId = sectionId(section.title, index + 1);
                return (
                <button key={section.title} type="button" onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                  {section.title.replace(/^\d+\.\s*/, "")}
                </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <article className="legal-article" lang="en">
          <div className="legal-notice">
            <ShieldCheck size={24} weight="regular" aria-hidden="true" />
            <p lang={undefined}>{copy.legal.notice}</p>
          </div>
          {page.sections.map((section, index) => (
            <LegalSectionBlock key={section.title} section={section} index={index + 1} />
          ))}
        </article>
      </div>

      <section className="legal-help">
        <div>
          <p className="eyebrow">{copy.legal.helpEyebrow}</p>
          <h2>{copy.legal.helpTitle}</h2>
          <p>{copy.legal.helpBody}</p>
        </div>
        <a className="button button-orange" href="mailto:support@sonitransfer.com">
          {copy.legal.helpCta} <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </a>
      </section>
    </>
  );
}
