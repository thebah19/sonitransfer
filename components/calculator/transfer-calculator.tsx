'use client';

import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRightLeft, Banknote, Clock3, Info, Loader2, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type {
  RemitecCurrencyFrom,
  RemitecCurrencyTo,
  RemitecDeliveryMethod,
  RemitecHomeSettings,
  RemitecQuotation
} from '@/types';

const APP_LOGIN_URL = 'https://app.sonitransfer.com/#/ext/login/en-GB';

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Calculator data is currently unavailable.');
  }

  return response.json() as Promise<T>;
}

const moneyFormatter = new Intl.NumberFormat('en-GB', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
});

const rateFormatter = new Intl.NumberFormat('en-GB', {
  maximumFractionDigits: 7,
  minimumFractionDigits: 2
});

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

function formatInputAmount(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return '';
  }

  return value.toFixed(2);
}

function countryCodeLabel(countryISO?: string) {
  return countryISO ? countryISO.toUpperCase() : 'SONI';
}

export function TransferCalculator() {
  const [fromKey, setFromKey] = useState('');
  const [toKey, setToKey] = useState('');
  const [deliveryId, setDeliveryId] = useState('');
  const [sendAmount, setSendAmount] = useState('100');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [lastEdited, setLastEdited] = useState<'send' | 'receive'>('send');

  const settingsQuery = useQuery({
    queryKey: ['remitec-home-settings'],
    queryFn: () => getJson<RemitecHomeSettings>('/api/remitec/home-settings'),
    retry: 1
  });

  const fromCurrenciesQuery = useQuery({
    queryKey: ['remitec-currencies-from'],
    queryFn: () => getJson<RemitecCurrencyFrom[]>('/api/remitec/currencies-from'),
    retry: 1
  });

  const fromCurrencies = fromCurrenciesQuery.data ?? [];
  const selectedFrom = useMemo(
    () => fromCurrencies.find((currency) => currencyFromKey(currency) === fromKey) ?? fromCurrencies[0],
    [fromCurrencies, fromKey]
  );

  const toCurrenciesQuery = useQuery({
    queryKey: ['remitec-currencies-to', selectedFrom?.CountryId, selectedFrom?.CurrencyInitial],
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
    queryKey: ['remitec-delivery-types', selectedTo?.CurrencyBranchId],
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
    [deliveryMethods, deliveryId, preferredDelivery]
  );

  const quotationQuery = useQuery({
    queryKey: ['remitec-quotation', selectedTo?.CurrencyBranchId, selectedDelivery?.DeliveryTypeId],
    queryFn: () =>
      getJson<RemitecQuotation>(`/api/remitec/quotation/${selectedTo?.CurrencyBranchId}/${selectedDelivery?.DeliveryTypeId}`),
    enabled: Boolean(selectedTo?.CurrencyBranchId && selectedDelivery?.DeliveryTypeId),
    retry: 1
  });

  useEffect(() => {
    if (!settingsQuery.data?.CalculatorDefaultValue) {
      return;
    }

    const defaultAmount = Number(settingsQuery.data.CalculatorDefaultValue);
    if (Number.isFinite(defaultAmount) && defaultAmount > 0) {
      setSendAmount(String(defaultAmount));
      setLastEdited('send');
    }
  }, [settingsQuery.data?.CalculatorDefaultValue]);

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

  const rate = Number(quotationQuery.data?.SellRates ?? 0);
  const hasLiveRate = rate > 0;
  const sendNumber = parseAmount(sendAmount);
  const receiveNumber = parseAmount(receiveAmount);
  const showDeliveryMethod = settingsQuery.data?.CalculatorAllowDeliveryMethod !== 'N';

  useEffect(() => {
    if (!hasLiveRate) {
      return;
    }

    if (lastEdited === 'send') {
      const nextValue = formatInputAmount(sendNumber * rate);
      setReceiveAmount((current) => (current === nextValue ? current : nextValue));
      return;
    }

    const nextValue = formatInputAmount(receiveNumber / rate);
    setSendAmount((current) => (current === nextValue ? current : nextValue));
  }, [hasLiveRate, lastEdited, rate, receiveNumber, sendNumber]);

  const fee = useMemo(() => {
    const fees = quotationQuery.data?.Fees ?? [];
    const feeBand = fees.find((item) => sendNumber >= Number(item.InitValue) && sendNumber <= Number(item.EndValue));

    if (!feeBand || !sendNumber) {
      return 0;
    }

    return Number(feeBand.Value) + sendNumber * (Number(feeBand.Percentage) / 100);
  }, [quotationQuery.data?.Fees, sendNumber]);

  const isLoading =
    fromCurrenciesQuery.isLoading || toCurrenciesQuery.isLoading || deliveryMethodsQuery.isLoading || quotationQuery.isLoading;
  const isError =
    fromCurrenciesQuery.isError || toCurrenciesQuery.isError || deliveryMethodsQuery.isError || quotationQuery.isError;
  const sendingPlaceholder = fromCurrenciesQuery.isError ? 'Sending countries unavailable' : 'Loading sending countries...';
  const receivingPlaceholder = toCurrenciesQuery.isError ? 'Receiving options unavailable' : 'Loading receiving options...';
  const deliveryPlaceholder = deliveryMethodsQuery.isError ? 'Delivery methods unavailable' : 'Loading delivery methods...';

  return (
    <Card className="relative overflow-hidden border-slate-300 bg-white/95 shadow-premium">
      <div className="kente-strip h-1.5" aria-hidden="true" />
      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gold">Your transfer details</p>
            <h2 className="text-2xl font-black text-ink">Check your transfer</h2>
          </div>
          <div className="rounded-lg bg-mint p-3 text-forest">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRightLeft className="h-5 w-5" />}
          </div>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Sending from</span>
            <select
              className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base font-semibold text-ink outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
              value={fromKey}
              disabled={!fromCurrencies.length}
              onChange={(event) => {
                setFromKey(event.target.value);
                setToKey('');
                setDeliveryId('');
                setLastEdited('send');
              }}
            >
              {fromCurrencies.length ? (
                fromCurrencies.map((currency) => (
                  <option key={currencyFromKey(currency)} value={currencyFromKey(currency)}>
                    {currency.CountryName} ({currency.CurrencyInitial})
                  </option>
                ))
              ) : (
                <option>{sendingPlaceholder}</option>
              )}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">You send</span>
            <div className="flex min-h-14 items-center overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:border-gold focus-within:ring-4 focus-within:ring-gold/20">
              <input
                type="number"
                min={0}
                inputMode="decimal"
                className="min-w-0 flex-1 border-0 px-4 text-xl font-bold text-ink outline-none"
                value={sendAmount}
                onChange={(event) => {
                  setSendAmount(event.target.value);
                  setLastEdited('send');
                }}
                aria-label="Sending amount"
              />
              <span className="border-l border-slate-200 bg-slate-50 px-4 py-4 text-sm font-bold text-slate-700">
                {selectedFrom?.CurrencyInitial ?? '---'}
              </span>
            </div>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Family receives</span>
            <div className="flex min-h-14 items-center overflow-hidden rounded-lg border border-slate-300 bg-cream focus-within:border-gold focus-within:ring-4 focus-within:ring-gold/20">
              <input
                type="number"
                min={0}
                inputMode="decimal"
                className="min-w-0 flex-1 border-0 bg-transparent px-4 text-2xl font-black text-ink outline-none"
                value={receiveAmount}
                onChange={(event) => {
                  setReceiveAmount(event.target.value);
                  setLastEdited('receive');
                }}
                aria-label="Receiving amount"
              />
              <span className="border-l border-gold/20 bg-white/70 px-4 py-4 text-sm font-bold text-forest">
                {selectedTo?.CurrencyInitial ?? 'GMD'}
              </span>
            </div>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Receiving in</span>
            <select
              className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base font-semibold text-ink outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
              value={toKey}
              disabled={!toCurrencies.length}
              onChange={(event) => {
                setToKey(event.target.value);
                setDeliveryId('');
                setLastEdited('send');
              }}
            >
              {toCurrencies.length ? (
                toCurrencies.map((currency) => (
                  <option key={currencyToKey(currency)} value={currencyToKey(currency)}>
                    {currency.CountryName} ({currency.CurrencyInitial})
                  </option>
                ))
              ) : (
                <option>{receivingPlaceholder}</option>
              )}
            </select>
          </label>

          {showDeliveryMethod ? (
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">Delivery method</span>
              <select
                className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 text-base font-semibold text-ink outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
                value={deliveryId}
                disabled={!deliveryMethods.length}
                onChange={(event) => {
                  setDeliveryId(event.target.value);
                  setLastEdited('send');
                }}
              >
                {deliveryMethods.length ? (
                  deliveryMethods.map((method) => (
                    <option key={method.DeliveryTypeId} value={String(method.DeliveryTypeId)}>
                      {method.Name}
                    </option>
                  ))
                ) : (
                  <option>{deliveryPlaceholder}</option>
                )}
              </select>
            </label>
          ) : null}
        </div>

        <dl className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="flex items-center gap-2 text-slate-600">
              <Info className="h-4 w-4" aria-hidden="true" />
              Fee
            </dt>
            <dd className="font-bold text-ink">
              {moneyFormatter.format(fee)} {selectedFrom?.CurrencyInitial ?? ''}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="flex items-center gap-2 text-slate-600">
              <Banknote className="h-4 w-4" aria-hidden="true" />
              Exchange rate
            </dt>
            <dd className="text-right font-bold text-ink">
              {hasLiveRate
                ? `1 ${selectedFrom?.CurrencyInitial} = ${rateFormatter.format(rate)} ${selectedTo?.CurrencyInitial}`
                : quotationQuery.isLoading
                  ? 'Loading...'
                  : 'Rate unavailable'}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="flex items-center gap-2 text-slate-600">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              Delivery time
            </dt>
            <dd className="font-bold text-ink">Usually within minutes</dd>
          </div>
        </dl>

        <div className="flex items-center justify-between gap-3 rounded-lg bg-mint px-4 py-3 text-sm">
          <div>
            <p className="font-semibold text-slate-600">Sending from</p>
            <p className="font-bold text-ink">{selectedFrom?.CountryName ?? 'Loading...'}</p>
          </div>
          <div className="rounded-md bg-white px-3 py-2 text-xs font-black text-forest">{countryCodeLabel(selectedTo?.CountryISO)}</div>
        </div>

        {isError ? (
          <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
            The calculator could not refresh right now. Please try again before confirming your transfer.
          </p>
        ) : null}

        <a
          href={APP_LOGIN_URL}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-12 w-full items-center justify-center rounded-lg bg-ink px-5 py-3 text-sm font-bold text-white shadow-lg shadow-ink/15 transition hover:bg-navy"
        >
          Send Money
        </a>

        <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-forest" aria-hidden="true" />
          The receive amount shown is what your recipient gets. The transfer fee is displayed separately.
        </p>
      </div>
    </Card>
  );
}
