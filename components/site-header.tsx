'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, LogIn, Menu, ShieldCheck, UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDictionary, localeFromPathname, locales, stripLocale, withLocale, type Locale } from '@/data/i18n';

const LOGIN_URL = 'https://app.sonitransfer.com/#/ext/login/en-GB';
const SIGNUP_URL = 'https://app.sonitransfer.com/#/ext/signup/en-GB';

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const dictionary = getDictionary(locale);
  const currentPath = stripLocale(pathname);
  const navItems = [
    { href: '/', label: dictionary.nav.home },
    { href: '/blog', label: dictionary.nav.blog },
    { href: '/contact', label: dictionary.nav.contact }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="container-custom grid min-h-[68px] grid-cols-[auto_1fr_auto] items-center gap-3 md:min-h-[72px]">
        <Link href={withLocale(locale, '/')} className="flex w-[142px] items-center text-navy sm:w-[168px] lg:w-[180px]" aria-label="Soni Transfer home">
          <Image
            src="/brand/logo.svg"
            alt="Soni Transfer"
            width={417}
            height={116}
            priority
            className="h-auto w-full"
          />
        </Link>

        <nav className="hidden justify-self-center xl:block" aria-label="Primary navigation">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={withLocale(locale, item.href)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-navy 2xl:px-4"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
            <LanguageSwitcher locale={locale} currentPath={currentPath} />
            <Button asChild variant="outline" className="min-h-10 rounded-xl px-4 py-2">
              <a href={LOGIN_URL} target="_blank" rel="noreferrer">
                <LogIn className="h-4 w-4" aria-hidden="true" />
                {dictionary.nav.login}
              </a>
            </Button>
            <Button asChild className="min-h-10 rounded-xl px-4 py-2">
              <a href={SIGNUP_URL} target="_blank" rel="noreferrer">
                <UserPlus className="h-4 w-4" aria-hidden="true" />
                {dictionary.nav.signup}
              </a>
            </Button>
        </div>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-navy/15 bg-blue-50/70 text-navy shadow-sm shadow-navy/5 xl:hidden"
              aria-label={dictionary.nav.menu}
            >
              <Menu className="h-5 w-5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/55 backdrop-blur-sm" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-[88vw] max-w-sm overflow-y-auto bg-white p-5 shadow-premium">
              <div className="flex items-center justify-between">
                <Dialog.Title className="sr-only">Soni Transfer menu</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Primary navigation, language options, and account links.
                </Dialog.Description>
                <Image src="/brand/logo.svg" alt="Soni Transfer" width={240} height={67} className="h-auto w-48" />
                <Dialog.Close className="rounded-lg p-2 text-ink hover:bg-slate-100" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </Dialog.Close>
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <ShieldCheck className="h-6 w-6 text-forest" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-ink">
                  {locale === 'en'
                    ? 'Check the rate, choose payout, and track your transfer in the app.'
                    : locale === 'es'
                      ? 'Revisa la tarifa, elige pago y sigue tu transferencia en la app.'
                      : "Vérifiez le taux, choisissez la réception et suivez le transfert dans l'appli."}
                </p>
              </div>
              <nav className="mt-6 grid gap-2" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <Dialog.Close asChild key={item.href}>
                    <Link href={withLocale(locale, item.href)} className="rounded-lg px-4 py-3 font-semibold text-ink hover:bg-slate-50">
                      {item.label}
                    </Link>
                  </Dialog.Close>
                ))}
              </nav>
              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Language</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {locales.map((item) => (
                    <Dialog.Close asChild key={item}>
                      <Link
                        href={withLocale(item, currentPath)}
                        className={`rounded-xl border px-3 py-2 text-center text-sm font-black transition ${
                          item === locale ? 'border-navy bg-navy text-white' : 'border-slate-200 text-navy hover:bg-slate-50'
                        }`}
                      >
                        {getDictionary(item).languageShort}
                      </Link>
                    </Dialog.Close>
                  ))}
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                <Button asChild variant="outline">
                  <a href={LOGIN_URL} target="_blank" rel="noreferrer">
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    {dictionary.nav.login}
                  </a>
                </Button>
                <Button asChild>
                  <a href={SIGNUP_URL} target="_blank" rel="noreferrer">
                    <UserPlus className="h-4 w-4" aria-hidden="true" />
                    {dictionary.nav.signup}
                  </a>
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}

function LanguageSwitcher({ locale, currentPath }: { locale: Locale; currentPath: string }) {
  return (
    <div className="group relative">
      <button className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-black text-navy transition hover:bg-slate-50">
        {getDictionary(locale).languageShort}
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="invisible absolute right-0 top-full z-50 mt-2 min-w-36 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
        {locales.map((item) => (
          <Link
            key={item}
            href={withLocale(item, currentPath)}
            className={`block rounded-xl px-3 py-2 text-sm font-bold transition ${
              item === locale ? 'bg-blue-50 text-navy' : 'text-slate-600 hover:bg-slate-50 hover:text-navy'
            }`}
          >
            {getDictionary(item).languageName}
          </Link>
        ))}
      </div>
    </div>
  );
}
