'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Landmark,
  Loader2,
  LockKeyhole,
  MapPin,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  WalletCards,
  Zap
} from 'lucide-react';
import { getDictionary, type Locale } from '@/data/i18n';
import { AppStoreButtons } from '@/components/ui/app-store-buttons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { RemitecCurrencyFrom, RemitecCurrencyTo, RemitecDeliveryMethod, RemitecQuotation } from '@/types';

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-90px' },
  transition: { duration: 0.58, ease: 'easeOut' }
};

const transferMethods = [
  { title: 'Cash Pickup', icon: MapPin },
  { title: 'Bank Deposit', icon: Landmark },
  { title: 'Mobile Wallet', icon: WalletCards },
  { title: 'Mobile Credit', icon: Smartphone },
  { title: 'Cash Power', icon: Zap }
];

const trustIcons = [ShieldCheck, ReceiptText, LockKeyhole];
const stepIcons = [Globe2, TrendingUp, CheckCircle2];
const LOGIN_URL = 'https://app.sonitransfer.com/#/ext/login/en-GB';

const amountFormatter = new Intl.NumberFormat('en-GB', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
});

const rateFormatter = new Intl.NumberFormat('en-GB', {
  maximumFractionDigits: 7,
  minimumFractionDigits: 2
});

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Calculator data is currently unavailable.');
  }

  return response.json() as Promise<T>;
}

function currencyFromKey(currency: RemitecCurrencyFrom) {
  return `${currency.CountryId}:${currency.CurrencyInitial}:${currency.CurrencyIso ?? ''}`;
}

function currencyToKey(currency: RemitecCurrencyTo) {
  return `${currency.CurrencyBranchId}:${currency.CurrencyInitial}`;
}

function parseAmount(value: string) {
  const amount = Number(value.replace(/,/g, ''));
  return Number.isFinite(amount) ? amount : 0;
}

export function HomeSections({ locale = 'en' }: { locale?: Locale }) {
  const dictionary = getDictionary(locale);
  const home = dictionary.home;

  return (
    <>
      <section className="relative overflow-hidden bg-navy">
        <div className="container-custom relative grid gap-10 py-12 sm:py-16 lg:min-h-[660px] lg:grid-cols-[minmax(0,1fr)_minmax(420px,500px)] lg:items-center lg:gap-16 lg:py-14 xl:gap-24">
          <motion.div {...fadeUp} className="max-w-[590px]">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.16em] text-orange-200">Soni Transfer</p>
            <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.6rem]">
              {home.heroTitle}
            </h1>
            <p className="mt-7 max-w-lg text-lg font-semibold leading-relaxed text-white/85 sm:text-xl">
              {home.heroCopy}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative min-w-0"
          >
            <TransactionCard locale={locale} />
          </motion.div>
        </div>
      </section>

      <section aria-label="Why customers trust Soni Transfer" className="border-y border-slate-200 bg-white">
        <div className="container-custom grid divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {home.trust.map((label, index) => {
            const TrustIcon = trustIcons[index] ?? ShieldCheck;
            return (
              <div key={label} className="flex min-h-20 items-center gap-3 py-4 sm:px-5 sm:first:pl-0 sm:last:pr-0">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-navy">
                  <TrustIcon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold leading-5 text-slate-700">{label}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-slate-200 bg-slate-50 py-12 md:py-16">
        <div className="container-custom grid gap-7 lg:grid-cols-[0.68fr_1.32fr] lg:items-center">
          <motion.div {...fadeUp}>
            <p className="font-bold text-gold">How it works</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-navy md:text-4xl">{home.howTitle}</h2>
            {home.howCopy ? <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">{home.howCopy}</p> : null}
          </motion.div>
          <div className="grid gap-3 md:grid-cols-3">
            {home.steps.map(([title, copy], index) => {
              const StepIcon = stepIcons[index] ?? CheckCircle2;
              return (
                <motion.div key={title} {...fadeUp} transition={{ duration: 0.5, delay: index * 0.08 }}>
                  <div className="h-full rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-200 hover:border-navy/25">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-navy/10">0{index + 1}</span>
                      <StepIcon className="h-5 w-5 text-gold" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-lg font-black text-navy">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AppShowcase locale={locale} />

      <section id="ways-to-receive" className="scroll-mt-20 overflow-hidden bg-navy py-12 text-white md:py-16">
        <div className="container-custom grid gap-7 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
          <motion.div {...fadeUp}>
            <p className="font-bold text-gold">Payout methods</p>
            <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">{home.payoutTitle}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">{home.payoutCopy}</p>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2">
            {transferMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.title} className="flex items-center gap-3 border-b border-white/15 py-4 last:border-b-0 sm:last:border-b sm:[&:nth-last-child(2)]:border-b-0">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-black">{method.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="faqs" className="bg-slate-50 py-12 md:py-16">
        <div className="container-custom grid gap-7 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="font-bold text-gold">FAQs</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-navy md:text-4xl">{home.faqsTitle}</h2>
            {home.faqsCopy ? <p className="mt-3 text-slate-600">{home.faqsCopy}</p> : null}
          </div>
          <div className="grid gap-3">
            {dictionary.faqs.slice(0, 3).map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-slate-200 bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
                  <span>{faq.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function AppShowcase({ locale }: { locale: Locale }) {
  const home = getDictionary(locale).home;

  return (
    <section id="download" className="relative overflow-hidden bg-white py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" aria-hidden="true" />
      <div className="container-custom relative grid gap-5 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:gap-6">
        <motion.div {...fadeUp}>
          <p className="font-bold text-gold">Soni Transfer app</p>
          <h2 className="mt-2 max-w-xl text-3xl font-black leading-tight text-navy md:text-4xl">
            {home.appTitle}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            {home.appCopy}
          </p>
          <AppStoreButtons className="mt-5" locale={locale} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto h-[300px] w-full max-w-[430px] md:h-[360px]"
        >
          <PhoneMockup
            src="/app-screens/home.png"
            alt="Soni Transfer app home screen"
            muted
            className="absolute bottom-3 left-[8%] z-0 w-[118px] -rotate-6 md:left-[5%] md:w-[142px]"
          />
          <PhoneMockup
            src="/app-screens/great-rates.png"
            alt="Soni Transfer app rates screen"
            priority
            className="absolute bottom-0 left-1/2 z-20 w-[158px] -translate-x-1/2 md:w-[188px]"
          />
          <PhoneMockup
            src="/app-screens/register.png"
            alt="Soni Transfer app registration screen"
            muted
            className="absolute bottom-3 right-[8%] z-10 w-[118px] rotate-6 md:right-[5%] md:w-[142px]"
          />
        </motion.div>
      </div>
    </section>
  );
}

function PhoneMockup({ src, alt, muted = false, priority = false, className = '' }: { src: string; alt: string; muted?: boolean; priority?: boolean; className?: string }) {
  return (
    <div className={`rounded-[2.25rem] bg-slate-950 p-2 shadow-2xl shadow-navy/20 ring-1 ring-slate-950/10 ${muted ? 'opacity-85' : ''} ${className}`}>
      <div className="overflow-hidden rounded-[1.85rem] bg-white">
        <Image
          src={src}
          alt={alt}
          width={947}
          height={2048}
          priority={priority}
          className="h-auto w-full"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
}

function TransactionCard({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const labels = dictionary.home.calculator;
  const [fromKey, setFromKey] = useState('');
  const [toKey, setToKey] = useState('');
  const [deliveryId, setDeliveryId] = useState('');
  const [sendAmount, setSendAmount] = useState('100');

  const fromCurrenciesQuery = useQuery({
    queryKey: ['home-remitec-currencies-from'],
    queryFn: () => getJson<RemitecCurrencyFrom[]>('/api/remitec/currencies-from'),
    retry: 1
  });

  const fromCurrencies = useMemo(() => fromCurrenciesQuery.data ?? [], [fromCurrenciesQuery.data]);
  const selectedFrom = useMemo(
    () => fromCurrencies.find((currency) => currencyFromKey(currency) === fromKey) ?? fromCurrencies[0],
    [fromCurrencies, fromKey]
  );

  const toCurrenciesQuery = useQuery({
    queryKey: ['home-remitec-currencies-to', selectedFrom?.CountryId, selectedFrom?.CurrencyInitial],
    queryFn: () =>
      getJson<RemitecCurrencyTo[]>(
        `/api/remitec/currencies-to?countryFrom=${encodeURIComponent(String(selectedFrom?.CountryId))}&currencyFrom=${encodeURIComponent(
          String(selectedFrom?.CurrencyInitial)
        )}`
      ),
    enabled: Boolean(selectedFrom),
    retry: 1
  });

  const toCurrencies = useMemo(() => toCurrenciesQuery.data ?? [], [toCurrenciesQuery.data]);
  const selectedTo = useMemo(
    () => toCurrencies.find((currency) => currencyToKey(currency) === toKey) ?? toCurrencies[0],
    [toCurrencies, toKey]
  );

  const deliveryMethodsQuery = useQuery({
    queryKey: ['home-remitec-delivery-types', selectedTo?.CurrencyBranchId],
    queryFn: () => getJson<RemitecDeliveryMethod[]>(`/api/remitec/delivery-types/${selectedTo?.CurrencyBranchId}`),
    enabled: Boolean(selectedTo?.CurrencyBranchId),
    retry: 1
  });

  const deliveryMethods = useMemo(() => deliveryMethodsQuery.data ?? [], [deliveryMethodsQuery.data]);
  const preferredDelivery = useMemo(
    () =>
      deliveryMethods.find((method) => /cash\s*pick/i.test(method.Name)) ??
      deliveryMethods.find((method) => String(method.DeliveryTypeId) === '11') ??
      deliveryMethods[0],
    [deliveryMethods]
  );
  const selectedDelivery = useMemo(
    () => deliveryMethods.find((method) => String(method.DeliveryTypeId) === deliveryId) ?? preferredDelivery,
    [deliveryId, deliveryMethods, preferredDelivery]
  );

  const quotationQuery = useQuery({
    queryKey: ['home-remitec-quotation', selectedTo?.CurrencyBranchId, selectedDelivery?.DeliveryTypeId],
    queryFn: () =>
      getJson<RemitecQuotation>(`/api/remitec/quotation/${selectedTo?.CurrencyBranchId}/${selectedDelivery?.DeliveryTypeId}`),
    enabled: Boolean(selectedTo?.CurrencyBranchId && selectedDelivery?.DeliveryTypeId),
    retry: 1
  });

  useEffect(() => {
    if (selectedFrom) {
      setFromKey((current) => current || currencyFromKey(selectedFrom));
    }
  }, [selectedFrom]);

  useEffect(() => {
    if (selectedTo) {
      setToKey((current) => current || currencyToKey(selectedTo));
    }
  }, [selectedTo]);

  useEffect(() => {
    if (selectedDelivery) {
      setDeliveryId((current) => current || String(selectedDelivery.DeliveryTypeId));
    }
  }, [selectedDelivery]);

  const sendValue = parseAmount(sendAmount);
  const rate = Number(quotationQuery.data?.SellRates ?? 0);
  const hasLiveRate = rate > 0;
  const receiveValue = hasLiveRate ? sendValue * rate : 0;
  const fee = useMemo(() => {
    const fees = quotationQuery.data?.Fees ?? [];
    const feeBand = fees.find((item) => sendValue >= Number(item.InitValue) && sendValue <= Number(item.EndValue));

    if (!feeBand || !sendValue) {
      return 0;
    }

    return Number(feeBand.Value) + sendValue * (Number(feeBand.Percentage) / 100);
  }, [quotationQuery.data?.Fees, sendValue]);

  const isLoading =
    fromCurrenciesQuery.isLoading || toCurrenciesQuery.isLoading || deliveryMethodsQuery.isLoading || quotationQuery.isLoading;
  const isError =
    fromCurrenciesQuery.isError || toCurrenciesQuery.isError || deliveryMethodsQuery.isError || quotationQuery.isError;

  return (
    <Card className="relative mx-auto w-full max-w-[500px] overflow-hidden rounded-[1.75rem] border-white/50 bg-white shadow-[0_28px_80px_rgba(8,26,71,0.28)]">
      <div className="p-5 sm:p-7">
        <div className="flex justify-end">
          <div className="inline-flex min-h-9 items-center gap-2 rounded-full bg-slate-100 px-3.5 text-xs font-black text-navy">
            {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />}
            {hasLiveRate
              ? `1 ${selectedFrom?.CurrencyInitial} = ${rateFormatter.format(rate)} ${selectedTo?.CurrencyInitial ?? 'GMD'}`
              : quotationQuery.isLoading
                ? labels.loadingRate
                : labels.rateUnavailable}
          </div>
        </div>

        <div className="mt-5 border-b border-slate-200 pb-5">
          <label htmlFor="home-send-amount" className="text-sm font-black text-navy">{labels.youSend}</label>
          <div className="mt-2 flex items-center gap-3">
            <select
              aria-label={labels.sendingFrom}
              value={fromKey}
              disabled={!fromCurrencies.length}
              onChange={(event) => {
                setFromKey(event.target.value);
                setToKey('');
                setDeliveryId('');
              }}
              className="min-h-11 max-w-[145px] rounded-full border border-slate-200 bg-slate-50 py-2 pl-3 pr-10 text-sm font-black text-navy outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20 sm:max-w-[185px]"
            >
              {fromCurrencies.length ? (
                fromCurrencies.map((currencyItem) => (
                  <option key={currencyFromKey(currencyItem)} value={currencyFromKey(currencyItem)}>
                    {currencyItem.CountryName} · {currencyItem.CurrencyInitial}
                  </option>
                ))
              ) : (
                <option>{fromCurrenciesQuery.isError ? labels.countriesUnavailable : labels.loadingCountries}</option>
              )}
            </select>
            <input
              id="home-send-amount"
              type="number"
              min={0}
              inputMode="decimal"
              value={sendAmount}
              onChange={(event) => setSendAmount(event.target.value)}
              className="min-w-0 flex-1 border-0 bg-transparent text-right text-[2rem] font-black tracking-[-0.04em] text-navy outline-none sm:text-5xl"
            />
          </div>
        </div>

        <div className="border-b border-slate-200 py-5">
          <p className="text-sm font-black text-navy">{labels.theyReceive}</p>
          <div className="mt-2 flex items-center gap-3">
            <select
              aria-label="Receiving currency"
              value={toKey}
              disabled={!toCurrencies.length}
              onChange={(event) => {
                setToKey(event.target.value);
                setDeliveryId('');
              }}
              className="min-h-11 max-w-[145px] rounded-full border border-slate-200 bg-slate-50 py-2 pl-3 pr-10 text-sm font-black text-navy outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20 sm:max-w-[185px]"
            >
              {toCurrencies.length ? (
                toCurrencies.map((currencyItem) => (
                  <option key={currencyToKey(currencyItem)} value={currencyToKey(currencyItem)}>
                    {currencyItem.CountryName} · {currencyItem.CurrencyInitial}
                  </option>
                ))
              ) : (
                <option>{labels.loading}</option>
              )}
            </select>
            <p className="min-w-0 flex-1 truncate text-right text-[2rem] font-black tracking-[-0.04em] text-navy sm:text-5xl">
              {hasLiveRate ? amountFormatter.format(receiveValue) : '—'}
            </p>
          </div>
        </div>

        <label className="block border-b border-slate-200 py-5">
          <span className="text-sm font-black text-navy">{labels.deliveryMethod}</span>
          <select
            aria-label={labels.deliveryMethod}
            value={deliveryId}
            disabled={!deliveryMethods.length}
            onChange={(event) => setDeliveryId(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-navy outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
          >
            {deliveryMethods.length ? (
              deliveryMethods.map((method) => (
                <option key={method.DeliveryTypeId} value={String(method.DeliveryTypeId)}>
                  {method.Name}
                </option>
              ))
            ) : (
              <option>{deliveryMethodsQuery.isError ? labels.methodsUnavailable : labels.loadingMethods}</option>
            )}
          </select>
        </label>

        <dl className="grid gap-3 py-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="font-semibold text-slate-500">{labels.fee}</dt>
            <dd className="font-black text-navy">
              {amountFormatter.format(fee)} {selectedFrom?.CurrencyInitial ?? ''} {labels.included}
            </dd>
          </div>
        </dl>

        <p className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-center text-xs font-bold text-navy">
          <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          {labels.exactAmount}
        </p>

        {isError ? (
          <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
            {labels.error}
          </p>
        ) : null}

        <Button asChild className="mt-4 w-full rounded-xl">
          <a href={LOGIN_URL} target="_blank" rel="noreferrer">
            {dictionary.actions.sendMoney}
          </a>
        </Button>
      </div>
    </Card>
  );
}
