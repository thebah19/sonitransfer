import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowsLeftRight,
  CaretDown,
  CurrencyGbp,
  LockKey,
  Money,
  ShieldCheck,
  SpinnerGap,
  WarningCircle,
} from "@phosphor-icons/react";
import {
  getHomeSettings,
  getPayoutMethods,
  getQuotation,
  getReceivingCurrencies,
  getSendingCurrencies,
  receivingCurrencyKey,
  sendingCurrencyKey,
} from "./remitec";
import { useI18n } from "./i18n";

const APP_LOGIN_URL = "https://app.sonitransfer.com/#/ext/login/en-GB";
const QUOTE_TTL_MS = 5 * 60 * 1000;

const initialCalculatorState = {
  status: "loading",
  error: "",
  errorCode: "",
  sendingCurrencies: [],
  receivingCurrencies: [],
  payoutMethods: [],
  sendingKey: "",
  receivingKey: "",
  payoutId: "",
  quotation: null,
};

function preferredSendingCurrency(currencies) {
  return currencies.find((currency) => currency.CurrencyInitial === "GBP") ?? currencies[0];
}

function preferredPayoutMethod(methods) {
  return methods.find((method) => /cash\s*pick/i.test(method.Name)) ?? methods.find((method) => String(method.DeliveryTypeId) === "11") ?? methods[0];
}

function flagEmoji(countryCode) {
  const code = String(countryCode ?? "").toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return "";
  return String.fromCodePoint(...[...code].map((letter) => 127397 + letter.charCodeAt(0)));
}

function calculateFee(fees, sendAmount) {
  if (sendAmount <= 0) return null;
  const feeBand = fees.find((item) => sendAmount >= Number(item.InitValue) && sendAmount <= Number(item.EndValue));
  // No band covers this amount, so the fee is genuinely unknown. Returning 0
  // here would advertise a free transfer.
  if (!feeBand) return null;
  const fee = Number(feeBand.Value) + sendAmount * (Number(feeBand.Percentage) / 100);
  return Number.isFinite(fee) ? fee : null;
}

export function LiveTransferCalculator({ variant = "editorial", initialAmount = "100" }) {
  const { copy, payoutLabel, numberFormat, regionName } = useI18n();
  const moneyFormatter = useMemo(
    () => numberFormat({ minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [numberFormat],
  );
  const rateFormatter = useMemo(
    () => numberFormat({ minimumFractionDigits: 2, maximumFractionDigits: 7 }),
    [numberFormat],
  );
  const [calculator, setCalculator] = useState(initialCalculatorState);
  const [sendAmount, setSendAmount] = useState(initialAmount);
  const [quoteExpired, setQuoteExpired] = useState(false);
  const requestId = useRef(0);
  const abortRef = useRef(null);

  const beginRequest = () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    requestId.current += 1;
    return { id: requestId.current, signal: abortRef.current.signal };
  };

  const commitIfCurrent = (id, updater) => {
    if (id === requestId.current) setCalculator(updater);
  };

  const loadCalculator = useCallback(async () => {
    const { id, signal } = beginRequest();
    setCalculator(initialCalculatorState);

    try {
      const [settings, sendingCurrencies] = await Promise.all([getHomeSettings(signal), getSendingCurrencies(signal)]);
      const sending = preferredSendingCurrency(sendingCurrencies);
      const receivingCurrencies = await getReceivingCurrencies(sending, signal);
      const receiving = receivingCurrencies[0];
      const payoutMethods = await getPayoutMethods(receiving, signal);
      const payout = preferredPayoutMethod(payoutMethods);
      const quotation = await getQuotation(receiving, payout, signal);
      const apiDefault = Number(settings?.CalculatorDefaultValue);

      if (Number.isFinite(apiDefault) && apiDefault > 0) setSendAmount(String(apiDefault));
      commitIfCurrent(id, {
        status: "ready",
        error: "",
        sendingCurrencies,
        receivingCurrencies,
        payoutMethods,
        sendingKey: sendingCurrencyKey(sending),
        receivingKey: receivingCurrencyKey(receiving),
        payoutId: String(payout.DeliveryTypeId),
        quotation,
      });
    } catch (error) {
      if (error.name !== "AbortError") {
        commitIfCurrent(id, (current) => ({ ...current, status: "error", error: error.message, errorCode: error.code ?? "" }));
      }
    }
  }, []);

  useEffect(() => {
    loadCalculator();
    return () => abortRef.current?.abort();
  }, [loadCalculator]);

  useEffect(() => {
    if (!calculator.quotation) return undefined;
    setQuoteExpired(false);
    const timer = setTimeout(() => setQuoteExpired(true), QUOTE_TTL_MS);
    return () => clearTimeout(timer);
  }, [calculator.quotation]);

  const selectSendingCurrency = async (nextKey) => {
    const sending = calculator.sendingCurrencies.find((currency) => sendingCurrencyKey(currency) === nextKey);
    if (!sending) return;

    const { id, signal } = beginRequest();
    setCalculator((current) => ({ ...current, status: "loading", error: "", errorCode: "", sendingKey: nextKey, receivingCurrencies: [], payoutMethods: [], quotation: null }));

    try {
      const receivingCurrencies = await getReceivingCurrencies(sending, signal);
      const receiving = receivingCurrencies[0];
      const payoutMethods = await getPayoutMethods(receiving, signal);
      const payout = preferredPayoutMethod(payoutMethods);
      const quotation = await getQuotation(receiving, payout, signal);
      commitIfCurrent(id, (current) => ({
        ...current,
        status: "ready",
        receivingCurrencies,
        payoutMethods,
        receivingKey: receivingCurrencyKey(receiving),
        payoutId: String(payout.DeliveryTypeId),
        quotation,
      }));
    } catch (error) {
      if (error.name !== "AbortError") commitIfCurrent(id, (current) => ({ ...current, status: "error", error: error.message, errorCode: error.code ?? "" }));
    }
  };

  const selectReceivingCurrency = async (nextKey) => {
    const receiving = calculator.receivingCurrencies.find((currency) => receivingCurrencyKey(currency) === nextKey);
    if (!receiving) return;

    const { id, signal } = beginRequest();
    setCalculator((current) => ({ ...current, status: "loading", error: "", errorCode: "", receivingKey: nextKey, payoutMethods: [], quotation: null }));

    try {
      const payoutMethods = await getPayoutMethods(receiving, signal);
      const payout = preferredPayoutMethod(payoutMethods);
      const quotation = await getQuotation(receiving, payout, signal);
      commitIfCurrent(id, (current) => ({
        ...current,
        status: "ready",
        payoutMethods,
        payoutId: String(payout.DeliveryTypeId),
        quotation,
      }));
    } catch (error) {
      if (error.name !== "AbortError") commitIfCurrent(id, (current) => ({ ...current, status: "error", error: error.message, errorCode: error.code ?? "" }));
    }
  };

  const selectPayoutMethod = async (nextId) => {
    const receiving = calculator.receivingCurrencies.find((currency) => receivingCurrencyKey(currency) === calculator.receivingKey);
    const payout = calculator.payoutMethods.find((method) => String(method.DeliveryTypeId) === nextId);
    if (!receiving || !payout) return;

    const request = beginRequest();
    setCalculator((current) => ({ ...current, status: "loading", error: "", errorCode: "", payoutId: nextId, quotation: null }));

    try {
      const quotation = await getQuotation(receiving, payout, request.signal);
      commitIfCurrent(request.id, (current) => ({ ...current, status: "ready", quotation }));
    } catch (error) {
      if (error.name !== "AbortError") commitIfCurrent(request.id, (current) => ({ ...current, status: "error", error: error.message, errorCode: error.code ?? "" }));
    }
  };

  const selectedSending = calculator.sendingCurrencies.find((currency) => sendingCurrencyKey(currency) === calculator.sendingKey);
  const selectedReceiving = calculator.receivingCurrencies.find((currency) => receivingCurrencyKey(currency) === calculator.receivingKey);
  const selectedPayout = calculator.payoutMethods.find((method) => String(method.DeliveryTypeId) === calculator.payoutId);
  const parsedAmount = Number(sendAmount);
  const validAmount = Number.isFinite(parsedAmount) && parsedAmount > 0;
  const rate = Number(calculator.quotation?.SellRates ?? 0);
  const quotedFee = calculator.status === "ready" && rate > 0 && validAmount
    ? calculateFee(calculator.quotation.Fees, parsedAmount)
    : null;
  // Without a fee we cannot show the true cost, so the quote is not complete.
  const isReady = calculator.status === "ready" && rate > 0 && validAmount && quotedFee !== null && !quoteExpired;
  const receiveAmount = isReady ? parsedAmount * rate : 0;
  const fee = quotedFee;
  const amountOutOfRange = calculator.status === "ready" && rate > 0 && validAmount && quotedFee === null;
  const isLoading = calculator.status === "loading";

  return (
    <form
      id="calculator"
      className={`live-calculator live-calculator-${variant}`}
      onSubmit={(event) => {
        event.preventDefault();
        if (isReady) window.open(APP_LOGIN_URL, "_blank", "noopener,noreferrer");
      }}
    >
      <div className="live-calculator-heading">
        <div>
          <h2>{copy.calculator.heading}</h2>
          <p>{copy.calculator.subheading}</p>
        </div>
        <span className={`live-status live-status-${calculator.status}`} aria-live="polite">
          {isLoading ? <SpinnerGap size={17} className="spin" aria-hidden="true" /> : <ShieldCheck size={17} weight="bold" aria-hidden="true" />}
          {isLoading
            ? copy.calculator.updating
            : quoteExpired
              ? copy.calculator.rateExpired
              : calculator.status === "ready"
                ? copy.calculator.live
                : copy.calculator.unavailable}
        </span>
      </div>

      <div className="live-corridor-fields">
        <label>
          <span>{copy.calculator.sendingFrom}</span>
          <span className="live-select-wrap">
            <select value={calculator.sendingKey} disabled={isLoading || !calculator.sendingCurrencies.length} onChange={(event) => selectSendingCurrency(event.target.value)}>
              {!calculator.sendingCurrencies.length && <option>{copy.calculator.loading}</option>}
              {calculator.sendingCurrencies.map((currency) => (
                <option key={sendingCurrencyKey(currency)} value={sendingCurrencyKey(currency)}>{flagEmoji(currency.CountryISO)} {regionName(currency.CountryISO, currency.CountryName)} ({currency.CurrencyInitial})</option>
              ))}
            </select>
            <CaretDown size={15} weight="bold" aria-hidden="true" />
          </span>
        </label>
        <label>
          <span>{copy.calculator.receivingIn}</span>
          <span className="live-select-wrap">
            <select value={calculator.receivingKey} disabled={isLoading || !calculator.receivingCurrencies.length} onChange={(event) => selectReceivingCurrency(event.target.value)}>
              {!calculator.receivingCurrencies.length && <option>{copy.calculator.loading}</option>}
              {calculator.receivingCurrencies.map((currency) => (
                <option key={receivingCurrencyKey(currency)} value={receivingCurrencyKey(currency)}>{flagEmoji(currency.CountryISO)} {regionName(currency.CountryISO, currency.CountryName)} ({currency.CurrencyInitial})</option>
              ))}
            </select>
            <CaretDown size={15} weight="bold" aria-hidden="true" />
          </span>
        </label>
      </div>

      <div className="live-amount-fields">
        <label>
          <span>{copy.calculator.youSend}</span>
          <span className="live-money-field">
            <input
              value={sendAmount}
              inputMode="decimal"
              aria-label={copy.calculator.amountAria}
              onChange={(event) => setSendAmount(event.target.value.replace(/[^\d.]/g, ""))}
            />
            <b>{selectedSending?.CurrencyInitial ?? "---"}</b>
          </span>
        </label>
        <ArrowsLeftRight className="live-transfer-arrow" size={20} weight="bold" aria-hidden="true" />
        <label>
          <span>{copy.calculator.theyReceive}</span>
          <span className="live-money-field live-money-output">
            <output aria-live="polite">{isReady ? moneyFormatter.format(receiveAmount) : "—"}</output>
            <b>{selectedReceiving?.CurrencyInitial ?? "---"}</b>
          </span>
        </label>
      </div>

      <label className="live-payout-field">
        <span>{copy.calculator.payoutMethod}</span>
        <span className="live-select-wrap live-payout-select">
          <Money size={19} aria-hidden="true" />
          <select value={calculator.payoutId} disabled={isLoading || !calculator.payoutMethods.length} onChange={(event) => selectPayoutMethod(event.target.value)}>
            {!calculator.payoutMethods.length && <option>{copy.calculator.loadingPayout}</option>}
            {calculator.payoutMethods.map((method) => (
              <option key={method.DeliveryTypeId} value={String(method.DeliveryTypeId)}>{payoutLabel(method.Name)}</option>
            ))}
          </select>
          <CaretDown size={15} weight="bold" aria-hidden="true" />
        </span>
      </label>

      <dl className="live-quote-facts">
        <div>
          <dt><CurrencyGbp size={18} aria-hidden="true" /> {copy.calculator.transferFee}</dt>
          <dd>{isReady ? `${moneyFormatter.format(fee)} ${selectedSending.CurrencyInitial}` : "—"}</dd>
        </div>
        <div>
          <dt><LockKey size={18} aria-hidden="true" /> {copy.calculator.exchangeRate}</dt>
          <dd>{isReady ? `1 ${selectedSending.CurrencyInitial} = ${rateFormatter.format(rate)} ${selectedReceiving.CurrencyInitial}` : "—"}</dd>
        </div>
      </dl>

      {calculator.status === "error" ? (
        <div className="live-calculator-error" role="alert">
          <WarningCircle size={20} weight="bold" aria-hidden="true" />
          <span>{copy.calculator.errors[calculator.errorCode] || calculator.error || copy.calculator.errorFallback}</span>
          <button type="button" onClick={loadCalculator}>{copy.calculator.tryAgain}</button>
        </div>
      ) : null}

      {quoteExpired && !isLoading ? (
        <div className="live-calculator-error" role="alert">
          <WarningCircle size={20} weight="bold" aria-hidden="true" />
          <span>{copy.calculator.expiredMessage}</span>
          <button type="button" onClick={loadCalculator}>{copy.calculator.refreshRate}</button>
        </div>
      ) : null}

      {amountOutOfRange ? (
        <p className="live-validation" role="status">{copy.calculator.amountOutOfRange}</p>
      ) : null}

      {!validAmount && !isLoading ? <p className="live-validation" role="status">{copy.calculator.enterAmount}</p> : null}

      <button className="button button-orange live-calculator-submit" type="submit" disabled={!isReady}>
        {copy.calculator.submit} <ArrowRight size={18} weight="bold" aria-hidden="true" />
      </button>
      <small className="live-exact-note">
        <ShieldCheck size={15} weight="bold" aria-hidden="true" />
        {selectedPayout
          ? copy.calculator.exactNote.replace("{method}", payoutLabel(selectedPayout.Name).toLowerCase())
          : copy.calculator.exactNoteGeneric}
      </small>
    </form>
  );
}
