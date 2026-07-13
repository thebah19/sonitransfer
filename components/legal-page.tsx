import Link from 'next/link';
import { ArrowRight, CalendarDays, FileCheck2, ShieldCheck } from 'lucide-react';
import { type LegalSection } from '@/data/legal-content';
import { getDictionary, getLocalizedLegalPage, withLocale, type Locale } from '@/data/i18n';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function LegalPage({ slug, locale = 'en' }: { slug: string; locale?: Locale }) {
  const page = getLocalizedLegalPage(slug, locale);
  const dictionary = getDictionary(locale);
  const legalUi = dictionary.legal.ui;

  if (!page) {
    return null;
  }

  return (
    <main>
      <section className="relative overflow-hidden bg-soni-hero py-16 md:py-24">
        <div className="container-custom relative grid gap-8 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-bold text-navy shadow-sm">
              <FileCheck2 className="h-4 w-4 text-gold" aria-hidden="true" />
              {page.eyebrow}
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-navy md:text-6xl">{page.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{page.description}</p>
          </div>
          <Card className="rounded-3xl border-slate-200 bg-white/95 p-6 shadow-xl shadow-navy/10">
            <div className="flex gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-orange-50 text-gold">
                <CalendarDays className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">{legalUi.lastUpdated}</p>
                <p className="text-xl font-black text-navy">{page.lastUpdated}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">{legalUi.version} {page.version}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom grid gap-8 lg:grid-cols-[0.35fr_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            {dictionary.legal.disclaimer ? (
              <Card className="mb-4 rounded-3xl border-gold/30 bg-orange-50 p-5 text-sm font-semibold leading-6 text-slate-700">
                {dictionary.legal.disclaimer}
              </Card>
            ) : null}
            <Card className="rounded-3xl border-slate-200 p-5">
              <p className="flex items-center gap-2 text-sm font-black text-navy">
                <ShieldCheck className="h-4 w-4 text-gold" aria-hidden="true" />
                {legalUi.contents}
              </p>
              <nav className="mt-4 grid gap-2 text-sm">
                {page.sections.map((section) => (
                  <a key={section.title} href={`#${sectionId(section.title)}`} className="rounded-2xl px-3 py-2 font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-navy">
                    {section.title}
                  </a>
                ))}
              </nav>
            </Card>
          </aside>

          <div className="grid gap-5">
            {page.sections.map((section) => (
              <LegalSectionCard key={section.title} section={section} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-custom">
          <div className="rounded-3xl bg-navy p-7 text-white md:p-10">
            <h2 className="text-3xl font-black">{legalUi.needHelp}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              {legalUi.helpCopy}
            </p>
            <Button asChild className="mt-6">
              <Link href={withLocale(locale, '/contact')}>
                {legalUi.contact} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function LegalSectionCard({ section }: { section: LegalSection }) {
  return (
    <Card id={sectionId(section.title)} className="scroll-mt-32 rounded-3xl border-slate-200 p-6 md:p-8">
      <h2 className="text-2xl font-black text-navy">{section.title}</h2>
      <div className="mt-4 grid gap-4">
        {section.paragraphs?.map((paragraph) => (
          <p key={paragraph} className="leading-7 text-slate-700">
            {paragraph}
          </p>
        ))}
        {section.bullets ? (
          <ul className="grid gap-3">
            {section.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 leading-7 text-slate-700">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {section.subsections?.map((subsection) => (
          <div key={subsection.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-black text-navy">{subsection.title}</h3>
            <div className="mt-3 grid gap-3">
              {subsection.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-6 text-slate-700">
                  {paragraph}
                </p>
              ))}
              {subsection.bullets ? (
                <ul className="grid gap-2">
                  {subsection.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm leading-6 text-slate-700">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function sectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
