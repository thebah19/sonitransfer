'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
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
      <section className="relative overflow-hidden bg-soni-hero">
        <div className="container-custom relative grid gap-8 py-10 md:py-12 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:py-14">
          <motion.div {...fadeUp} className="max-w-3xl">
            <p className="mb-3 text-sm font-bold text-gold">Transfers to The Gambia</p>
            <h1 className="max-w-xl text-4xl font-black leading-[1.04] tracking-normal text-navy sm:text-5xl lg:text-[3.5rem]">
              {home.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              {home.heroCopy}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 34, rotate: 1 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
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

      <section className="overflow-hidden bg-navy py-12 text-white md:py-16">
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

  const fromCurrencies = fromCurrenciesQuery.data ?? [];
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

  const toCurrencies = toCurrenciesQuery.data ?? [];
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

  const deliveryMethods = deliveryMethodsQuery.data ?? [];
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
    <Card className="relative mx-auto w-full max-w-[620px] overflow-hidden rounded-2xl border-slate-200 bg-white p-4 shadow-lg shadow-navy/10 sm:p-5">
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            {labels.eyebrow ? <p className="text-sm font-bold text-gold">{labels.eyebrow}</p> : null}
            <h2 className="text-xl font-black text-navy sm:text-2xl">{labels.title}</h2>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-50 text-navy">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <CreditCard className="h-5 w-5" aria-hidden="true" />}
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-500">{labels.sendingFrom}</span>
              <select
                aria-label="Sending country"
                value={fromKey}
                disabled={!fromCurrencies.length}
                onChange={(event) => {
                  setFromKey(event.target.value);
                  setToKey('');
                  setDeliveryId('');
                }}
                className="min-h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-navy outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
              >
                {fromCurrencies.length ? (
                  fromCurrencies.map((currencyItem) => (
                    <option key={currencyFromKey(currencyItem)} value={currencyFromKey(currencyItem)}>
                      {currencyItem.CountryName} ({currencyItem.CurrencyInitial})
                    </option>
                  ))
                ) : (
                  <option>{fromCurrenciesQuery.isError ? labels.countriesUnavailable : labels.loadingCountries}</option>
                )}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-500">{labels.deliveryMethod}</span>
              <select
                aria-label="Delivery method"
                value={deliveryId}
                disabled={!deliveryMethods.length}
                onChange={(event) => setDeliveryId(event.target.value)}
                className="min-h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-navy outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
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
          </div>

          <div className="grid items-center gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <label className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 transition focus-within:border-navy/35 focus-within:ring-4 focus-within:ring-navy/10">
              <span className="text-sm font-semibold text-slate-500">{labels.youSend}</span>
              <div className="mt-1 flex items-center justify-between gap-3">
                <input
                  type="number"
                  min={0}
                  inputMode="decimal"
                  aria-label="Amount you send"
                  value={sendAmount}
                  onChange={(event) => setSendAmount(event.target.value)}
                  className="min-w-0 flex-1 border-0 bg-transparent text-2xl font-black text-ink outline-none"
                />
                <span className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-black text-navy">
                  {selectedFrom?.CurrencyInitial ?? '---'}
                </span>
              </div>
            </label>
            <div className="mx-auto -my-1 grid h-8 w-8 place-items-center rounded-full bg-orange-50 text-gold md:my-0">
              <ArrowRight className="h-4 w-4 rotate-90 md:rotate-0" aria-hidden="true" />
            </div>
            <div className="min-w-0 rounded-2xl border border-gold/30 bg-orange-50/60 p-3">
              <p className="text-sm font-semibold text-slate-500">{labels.theyReceive}</p>
              <div className="mt-1 flex items-center justify-between gap-3">
                <p className="min-w-0 truncate text-2xl font-black text-ink">{hasLiveRate ? amountFormatter.format(receiveValue) : labels.loading}</p>
                <span className="rounded-xl bg-white px-3 py-2 text-sm font-black text-navy shadow-sm ring-1 ring-slate-200">
                  {selectedTo?.CurrencyInitial ?? 'GMD'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <dl className="mt-4 grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate-500">{labels.fee}</dt>
            <dd className="font-black text-navy">
              {amountFormatter.format(fee)} {selectedFrom?.CurrencyInitial ?? ''}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate-500">{labels.rate}</dt>
            <dd className="font-black text-navy">
              {hasLiveRate
                ? `1 ${selectedFrom?.CurrencyInitial} = ${rateFormatter.format(rate)} ${selectedTo?.CurrencyInitial ?? 'GMD'}`
                : quotationQuery.isLoading
                  ? labels.loadingRate
                  : labels.rateUnavailable}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate-500">{labels.delivery}</dt>
            <dd className="font-black text-navy">{labels.minutes}</dd>
          </div>
        </dl>

        {isError ? (
          <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">
            {labels.error}
          </p>
        ) : null}

        <Button asChild className="mt-4 w-full rounded-2xl">
          <a href={LOGIN_URL} target="_blank" rel="noreferrer">
            {dictionary.actions.sendMoney} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </Card>
  );
}
