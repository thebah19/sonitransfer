'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Clock3, Mail, Phone } from 'lucide-react';
import { AppStoreButtons } from '@/components/ui/app-store-buttons';
import { getDictionary, localeFromPathname, withLocale } from '@/data/i18n';

const quickLinks = [
  ['App', '/#download'],
  ['How it Works', '/how-it-works'],
  ['Rates & Fees', '/rates-fees'],
  ['Blog', '/blog'],
  ['Help / FAQs', '/help-faqs']
];

const services = [
  ['Cash Pickup', '/cash-pickup'],
  ['Bank Deposit', '/bank-deposit'],
  ['Mobile Wallet', '/mobile-wallet'],
  ['Airtime & Cash Power', '/airtime-cash-power']
];

const legal = [
  ['Compliance / Security', '/compliance-security'],
  ['Privacy Policy', '/privacy-policy'],
  ['Cookie Policy', '/cookie-policy'],
  ['Terms & Conditions', '/terms-conditions'],
  ['Complaints Policy', '/complaints-policy'],
  ['Refunds & Cancellations', '/refunds-cancellations'],
  ['Belmoney T&C', '/belmoney-terms']
];

const supportItems = [
  { label: 'support@sonitransfer.com', icon: Mail },
  { label: '+44 121 532 0769', icon: Phone },
  { label: '+44 7438 473456 WhatsApp', icon: Phone }
];

const regulatoryContacts = [
  { label: 'support@sonitransfer.com', icon: Mail },
  { label: '+44 121 532 0769', icon: Phone },
  { label: 'Mon - Fri, 9:00 AM - 5:00 PM (GMT)', icon: Clock3 }
];

export function SiteFooter() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const dictionary = getDictionary(locale);

  return (
    <footer className="relative overflow-hidden border-t-4 border-gold bg-navy pb-24 text-white md:pb-0">
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" aria-hidden="true" />
      <div className="container-custom relative py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.9fr]">
          <div>
            <Link href={withLocale(locale, '/')} className="inline-flex w-[230px] items-center sm:w-[270px]" aria-label="Soni Transfer home">
              <Image
                src="/brand/logo-white.svg"
                alt="Soni Transfer"
                width={417}
                height={116}
                className="h-auto w-full"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
              {locale === 'en'
                ? 'Transfer and top-up services for sending to The Gambia. Available methods and pricing are confirmed in the Soni Transfer app.'
                : locale === 'es'
                  ? 'Servicios de transferencia en la app Soni Transfer: cobro en efectivo, depósito bancario, billetera móvil, crédito móvil y Cash Power.'
                  : "Services de transfert dans l'appli Soni Transfer : retrait en espèces, dépôt bancaire, wallet mobile, crédit mobile et Cash Power."}
            </p>
            <AppStoreButtons light className="mt-6" locale={locale} />
          </div>

          <FooterList title={locale === 'en' ? 'Company' : locale === 'es' ? 'Empresa' : 'Entreprise'} items={quickLinks} locale={locale} />
          <FooterList title={dictionary.nav.services} items={services} locale={locale} />

          <div>
            <h2 className="font-black text-white">{locale === 'es' ? 'Soporte' : locale === 'fr' ? 'Support' : 'Support'}</h2>
            {locale === 'en' ? <p className="mt-3 text-sm leading-6 text-white/70">Have your transfer reference ready so our team can locate the payment more quickly.</p> : null}
            <div className="mt-4 grid gap-3">
              {supportItems.map((item) => {
                const Icon = item.icon;
                return (
                    <div key={item.label} className="flex gap-3 text-sm leading-6 text-white/75">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-8 text-white">
          <div className="relative">
            <div className="relative max-w-6xl">
              <p className="text-sm font-semibold leading-7 text-white md:text-base">
                Soni Transfer Ltd is registered in England and Wales (Company No. <strong>10832378</strong>) and registered with the Financial Conduct Authority as a Small Payment Institution under <strong>FRN 798474</strong>. Our registered office is at <strong>9 Waterloo Road, Smethwick, Birmingham, B66 4JX, UK</strong>.
              </p>

              <div className="my-5 h-px max-w-5xl bg-white/30" aria-hidden="true" />

              <p className="text-sm font-semibold leading-7 text-white/95 md:text-base">
                Soni Transfer's payment services in the European Economic Area (EEA) territory are provided through a white-label partnership with Belmoney S.A., a payment institution licensed and under supervision of the National Bank of Belgium, registration no. 0540.745.997, with passport rights to operate in all EEA countries in accordance with PSD2 (Directive (EU) 2015/2366). All payments in the EEA are powered and processed by Belmoney in accordance with Belgian and European law.
              </p>

              <p className="mt-4 text-sm italic leading-6 text-white/90">
                If you need extra support or a different way to communicate with us, tell our support team. We will work with you to make the process easier to use.
              </p>

              <div className="mt-6 grid gap-3 text-sm font-semibold text-white sm:max-w-md">
                {regulatoryContacts.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <Icon className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <a
                href="https://register.fca.org.uk/s/firm?id=0010X000046GBgPQAW"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex min-h-11 items-center rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
              >
                Soni Transfer Limited - FCA Registration
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 border-t border-white/20 pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="text-xs leading-5 text-white/60">
            <p>© {new Date().getFullYear()} Soni Transfer Ltd. All rights reserved.</p>
            <p className="mt-1">Apple and the Apple logo are trademarks of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</p>
          </div>
          <FooterLegalLinks items={legal} locale={locale} />
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, items, locale }: { title: string; items: string[][]; locale: ReturnType<typeof localeFromPathname> }) {
  return (
    <div>
      <h2 className="font-black text-white">{title}</h2>
      <ul className="mt-4 grid gap-3 text-sm text-white/75">
        {items.map(([label, href]) => (
          <li key={href}>
            <Link href={withLocale(locale, href)} className="transition-all duration-300 hover:text-gold">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLegalLinks({ items, locale }: { items: string[][]; locale: ReturnType<typeof localeFromPathname> }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-white/70 lg:justify-end">
      {items.map(([label, href]) => (
        <Link key={href} href={withLocale(locale, href)} className="transition-all duration-300 hover:text-gold">
          {label}
        </Link>
      ))}
    </div>
  );
}
