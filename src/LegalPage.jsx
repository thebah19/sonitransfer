import { useEffect } from "react";
import { ArrowRight, CalendarBlank, FileText, ShieldCheck } from "@phosphor-icons/react";
import { getLegalPage } from "./legalContent";

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
  const page = getLegalPage(slug);

  useEffect(() => {
    if (!page) return undefined;
    const previousTitle = document.title;
    document.title = `${page.title} | Soni Transfer`;
    return () => {
      document.title = previousTitle;
    };
  }, [page]);

  if (!page) return null;

  return (
    <>
      <section className="legal-hero">
        <div className="legal-hero-inner">
          <div className="legal-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
          </div>
          <aside className="legal-meta" aria-label="Document information">
            <span><CalendarBlank size={20} aria-hidden="true" /> Last updated <strong>{page.lastUpdated}</strong></span>
            <span><FileText size={20} aria-hidden="true" /> Version <strong>{page.version}</strong></span>
          </aside>
        </div>
      </section>

      <div className="legal-content-shell">
        <aside className="legal-toc">
          <div>
            <span>On this page</span>
            <nav aria-label={`${page.title} sections`}>
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

        <article className="legal-article">
          <div className="legal-notice">
            <ShieldCheck size={24} weight="regular" aria-hidden="true" />
            <p>This document forms part of the information governing your use of Soni Transfer services. Please read it carefully.</p>
          </div>
          {page.sections.map((section, index) => (
            <LegalSectionBlock key={section.title} section={section} index={index + 1} />
          ))}
        </article>
      </div>

      <section className="legal-help">
        <div>
          <p className="eyebrow">Questions about this policy?</p>
          <h2>We’re here to help.</h2>
          <p>Contact our support team if you need this information in another format or would like help understanding it.</p>
        </div>
        <a className="button button-orange" href="mailto:support@sonitransfer.com">
          Contact support <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </a>
      </section>
    </>
  );
}
