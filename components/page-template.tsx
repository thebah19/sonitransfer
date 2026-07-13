import Link from 'next/link';
import { ArrowRight, CheckCircle2, Mail, Phone } from 'lucide-react';
import { securityItems } from '@/data/content';
import { getDictionary, withLocale, type Locale } from '@/data/i18n';
import { TransferCalculator } from '@/components/calculator/transfer-calculator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';

const APP_DOWNLOAD_URL = 'https://sonitransfer.app.link/sonitransfer';

const pageActions: Record<string, { primary?: string; secondary: string; secondaryLabel: string }> = {
  'how-it-works': { secondary: '/rates-fees', secondaryLabel: 'Check rates and fees' },
  'rates-fees': { secondary: '/contact', secondaryLabel: 'Questions about a charge?' },
  'cash-pickup': { secondary: '/help-faqs', secondaryLabel: 'View cash pickup help' },
  'bank-deposit': { secondary: '/help-faqs', secondaryLabel: 'Get help with bank details' },
  'mobile-wallet': { secondary: '/help-faqs', secondaryLabel: 'View wallet help' },
  'airtime-cash-power': { secondary: '/help-faqs', secondaryLabel: 'Get top-up help' },
  'about-us': { primary: '/compliance-security', secondary: '/contact', secondaryLabel: 'Contact Soni Transfer' },
  'help-faqs': { primary: '/contact', secondary: '/compliance-security', secondaryLabel: 'Security and compliance' },
  contact: { primary: '#contact-form', secondary: '/complaints-policy', secondaryLabel: 'Make a formal complaint' },
  'compliance-security': { primary: '/terms-conditions', secondary: '/contact', secondaryLabel: 'Report a security concern' }
};

export function MarketingPage({ slug, locale = 'en' }: { slug: string; locale?: Locale }) {
  const dictionary = getDictionary(locale);
  const page = dictionary.pages.find((item) => item.slug === slug);

  if (!page) {
    return null;
  }

  const isSend = slug === 'send-money' || slug === 'rates-fees';
  const isContact = slug === 'contact';
  const isSecurity = slug === 'compliance-security';
  const actions = pageActions[slug];
  const primaryHref = actions?.primary;

  return (
    <main>
      <section className="border-b border-slate-200 bg-[#fbfaf7] py-14 md:py-20">
        <div className="container-custom grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="font-semibold text-gold">{page.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-ink md:text-6xl">{page.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">{page.description}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                {primaryHref ? (
                  <Link href={primaryHref.startsWith('#') ? primaryHref : withLocale(locale, primaryHref)}>
                    {page.cta ?? dictionary.actions.sendMoney} <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <a href={APP_DOWNLOAD_URL} target="_blank" rel="noreferrer">
                    {page.cta ?? dictionary.actions.downloadApp} <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </Button>
              {actions ? (
                <Button asChild variant="outline">
                  <Link href={withLocale(locale, actions.secondary)}>{actions.secondaryLabel}</Link>
                </Button>
              ) : null}
            </div>
          </div>
          <aside className="border-l-4 border-gold pl-6 lg:pl-8">
            <h2 className="text-sm font-black uppercase text-ink">At a glance</h2>
            <ul className="mt-5 grid gap-4">
              {page.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {isSend ? (
        <section className="section bg-white">
          <div className="container-custom grid gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:items-start">
            <div>
              <p className="font-semibold text-gold">{locale === 'en' ? 'Clear transfer details' : locale === 'es' ? 'Detalles claros' : 'Détails clairs'}</p>
              <h2 className="mt-2 text-3xl font-black leading-tight text-ink md:text-4xl">
                {locale === 'en' ? 'Fees and rates before you continue.' : locale === 'es' ? 'Comisiones y tipos antes de continuar.' : 'Frais et taux avant de continuer.'}
              </h2>
              <p className="mt-4 text-slate-700">
                {locale === 'en'
                  ? 'See exactly what your recipient receives, together with the exchange rate and transfer fee, before you continue.'
                  : locale === 'es'
                    ? 'Calcula lo que reciben tus seres queridos antes de continuar. La tarifa final se confirma antes del pago.'
                    : 'Estimez ce que vos proches reçoivent avant de continuer. Le taux final est confirmé avant paiement.'}
              </p>
            </div>
            <TransferCalculator />
          </div>
        </section>
      ) : null}

      {page.detailTitle && locale === 'en' ? (
        <section className="section bg-white">
          <div className="container-custom grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <p className="font-semibold text-gold">What to know</p>
            <div>
              <h2 className="text-3xl font-black leading-tight text-ink md:text-5xl">{page.detailTitle}</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{page.detailCopy}</p>
            </div>
          </div>
        </section>
      ) : null}

      {isSecurity ? (
        <section className="section bg-white">
          <div className="container-custom grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {securityItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-6">
                  <Icon className="h-7 w-7 text-forest" aria-hidden="true" />
                  <h2 className="mt-4 font-bold text-ink">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </section>
      ) : null}

      {isContact ? (
        <section id="contact-form" className="section bg-white">
          <div className="container-custom grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-semibold text-gold">Support channels</p>
              <h2 className="mt-2 text-3xl font-black text-ink">Send a support request</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Have your transfer reference ready so our team can locate the payment more quickly.</p>
              <div className="mt-6 grid gap-3 text-sm text-slate-700">
                <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-forest" /> support@sonitransfer.com</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-forest" /> +44 121 532 0769</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-forest" /> +44 7438 473456 WhatsApp</p>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      ) : null}

    </main>
  );
}
