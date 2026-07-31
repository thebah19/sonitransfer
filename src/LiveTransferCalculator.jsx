import { useCallback, useEffect, useRef, useState } from "react";
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

const APP_LOGIN_URL = "https://app.sonitransfer.com/#/ext/login/en-GB";
const moneyFormatter = new Intl.NumberFormat("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const rateFormatter = new Intl.NumberFormat("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 7 });

const initialCalculatorState = {
  status: "loading",
  error: "",
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

function payoutLabel(name) {
  return String(name).replace(/pick[\s-]*up/gi, "pickup").replace(/\s+/g, " ").trim();
}

function flagEmoji(countryCode) {
  const code = String(countryCode ?? "").toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return "";
  return String.fromCodePoint(...[...code].map((letter) => 127397 + letter.charCodeAt(0)));
}

function calculateFee(fees, sendAmount) {
  const feeBand = fees.find((item) => sendAmount >= Number(item.InitValue) && sendAmount <= Number(item.EndValue));
  if (!feeBand || sendAmount <= 0) return 0;
  return Number(feeBand.Value) + sendAmount * (Number(feeBand.Percentage) / 100);
}

export function LiveTransferCalculator({ variant = "editorial", initialAmount = "100" }) {
  const [calculator, setCalculator] = useState(initialCalculatorState);
  const [sendAmount, setSendAmount] = useState(initialAmount);
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
        commitIfCurrent(id, (current) => ({ ...current, status: "error", error: error.message }));
      }
    }
  }, []);

  useEffect(() => {
    loadCalculator();
    return () => abortRef.current?.abort();
  }, [loadCalculator]);

  const selectSendingCurrency = async (nextKey) => {
    const sending = calculator.sendingCurrencies.find((currency) => sendingCurrencyKey(currency) === nextKey);
    if (!sending) return;

    const { id, signal } = beginRequest();
    setCalculator((current) => ({ ...current, status: "loading", error: "", sendingKey: nextKey, receivingCurrencies: [], payoutMethods: [], quotation: null }));

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
      if (error.name !== "AbortError") commitIfCurrent(id, (current) => ({ ...current, status: "error", error: error.message }));
    }
  };

  const selectReceivingCurrency = async (nextKey) => {
    const receiving = calculator.receivingCurrencies.find((currency) => receivingCurrencyKey(currency) === nextKey);
    if (!receiving) return;

    const { id, signal } = beginRequest();
    setCalculator((current) => ({ ...current, status: "loading", error: "", receivingKey: nextKey, payoutMethods: [], quotation: null }));

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
      if (error.name !== "AbortError") commitIfCurrent(id, (current) => ({ ...current, status: "error", error: error.message }));
    }
  };

  const selectPayoutMethod = async (nextId) => {
    const receiving = calculator.receivingCurrencies.find((currency) => receivingCurrencyKey(currency) === calculator.receivingKey);
    const payout = calculator.payoutMethods.find((method) => String(method.DeliveryTypeId) === nextId);
    if (!receiving || !payout) return;

    const request = beginRequest();
    setCalculator((current) => ({ ...current, status: "loading", error: "", payoutId: nextId, quotation: null }));

    try {
      const quotation = await getQuotation(receiving, payout, request.signal);
      commitIfCurrent(request.id, (current) => ({ ...current, status: "ready", quotation }));
    } catch (error) {
      if (error.name !== "AbortError") commitIfCurrent(request.id, (current) => ({ ...current, status: "error", error: error.message }));
    }
  };

  const selectedSending = calculator.sendingCurrencies.find((currency) => sendingCurrencyKey(currency) === calculator.sendingKey);
  const selectedReceiving = calculator.receivingCurrencies.find((currency) => receivingCurrencyKey(currency) === calculator.receivingKey);
  const selectedPayout = calculator.payoutMethods.find((method) => String(method.DeliveryTypeId) === calculator.payoutId);
  const parsedAmount = Number(sendAmount);
  const validAmount = Number.isFinite(parsedAmount) && parsedAmount > 0;
  const rate = Number(calculator.quotation?.SellRates ?? 0);
  const isReady = calculator.status === "ready" && rate > 0 && validAmount;
  const receiveAmount = isReady ? parsedAmount * rate : 0;
  const fee = isReady ? calculateFee(calculator.quotation.Fees, parsedAmount) : 0;
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
          <h2>Start your transfer</h2>
          <p>Current rates and payout options</p>
        </div>
        <span className={`live-status live-status-${calculator.status}`} aria-live="polite">
          {isLoading ? <SpinnerGap size={17} className="spin" aria-hidden="true" /> : <ShieldCheck size={17} weight="bold" aria-hidden="true" />}
          {isLoading ? "Updating" : calculator.status === "ready" ? "Live quotation" : "Unavailable"}
        </span>
      </div>

      <div className="live-corridor-fields">
        <label>
          <span>Sending from</span>
          <span className="live-select-wrap">
            <select value={calculator.sendingKey} disabled={isLoading || !calculator.sendingCurrencies.length} onChange={(event) => selectSendingCurrency(event.target.value)}>
              {!calculator.sendingCurrencies.length && <option>Loading…</option>}
              {calculator.sendingCurrencies.map((currency) => (
                <option key={sendingCurrencyKey(currency)} value={sendingCurrencyKey(currency)}>{flagEmoji(currency.CountryISO)} {currency.CountryName} ({currency.CurrencyInitial})</option>
              ))}
            </select>
            <CaretDown size={15} weight="bold" aria-hidden="true" />
          </span>
        </label>
        <label>
          <span>They receive in</span>
          <span className="live-select-wrap">
            <select value={calculator.receivingKey} disabled={isLoading || !calculator.receivingCurrencies.length} onChange={(event) => selectReceivingCurrency(event.target.value)}>
              {!calculator.receivingCurrencies.length && <option>Loading…</option>}
              {calculator.receivingCurrencies.map((currency) => (
                <option key={receivingCurrencyKey(currency)} value={receivingCurrencyKey(currency)}>{flagEmoji(currency.CountryISO)} {currency.CountryName} ({currency.CurrencyInitial})</option>
              ))}
            </select>
            <CaretDown size={15} weight="bold" aria-hidden="true" />
          </span>
        </label>
      </div>

      <div className="live-amount-fields">
        <label>
          <span>You send</span>
          <span className="live-money-field">
            <input
              value={sendAmount}
              inputMode="decimal"
              aria-label="Amount you send"
              onChange={(event) => setSendAmount(event.target.value.replace(/[^\d.]/g, ""))}
            />
            <b>{selectedSending?.CurrencyInitial ?? "---"}</b>
          </span>
        </label>
        <ArrowsLeftRight className="live-transfer-arrow" size={20} weight="bold" aria-hidden="true" />
        <label>
          <span>Recipient receives exactly</span>
          <span className="live-money-field live-money-output">
            <output aria-live="polite">{isReady ? moneyFormatter.format(receiveAmount) : "—"}</output>
            <b>{selectedReceiving?.CurrencyInitial ?? "---"}</b>
          </span>
        </label>
      </div>

      <label className="live-payout-field">
        <span>Payout method</span>
        <span className="live-select-wrap live-payout-select">
          <Money size={19} aria-hidden="true" />
          <select value={calculator.payoutId} disabled={isLoading || !calculator.payoutMethods.length} onChange={(event) => selectPayoutMethod(event.target.value)}>
            {!calculator.payoutMethods.length && <option>Loading payout options…</option>}
            {calculator.payoutMethods.map((method) => (
              <option key={method.DeliveryTypeId} value={String(method.DeliveryTypeId)}>{payoutLabel(method.Name)}</option>
            ))}
          </select>
          <CaretDown size={15} weight="bold" aria-hidden="true" />
        </span>
      </label>

      <dl className="live-quote-facts">
        <div>
          <dt><CurrencyGbp size={18} aria-hidden="true" /> Transfer fee</dt>
          <dd>{isReady ? `${moneyFormatter.format(fee)} ${selectedSending.CurrencyInitial}` : "—"}</dd>
        </div>
        <div>
          <dt><LockKey size={18} aria-hidden="true" /> Exchange rate</dt>
          <dd>{isReady ? `1 ${selectedSending.CurrencyInitial} = ${rateFormatter.format(rate)} ${selectedReceiving.CurrencyInitial}` : "—"}</dd>
        </div>
      </dl>

      {calculator.status === "error" ? (
        <div className="live-calculator-error" role="alert">
          <WarningCircle size={20} weight="bold" aria-hidden="true" />
          <span>{calculator.error || "We cannot load the current exchange rate right now."}</span>
          <button type="button" onClick={loadCalculator}>Try again</button>
        </div>
      ) : null}

      {!validAmount && !isLoading ? <p className="live-validation" role="status">Enter an amount to see the exchange rate and recipient amount.</p> : null}

      <button className="button button-orange live-calculator-submit" type="submit" disabled={!isReady}>
        Continue <ArrowRight size={18} weight="bold" aria-hidden="true" />
      </button>
      <small className="live-exact-note">
        <ShieldCheck size={15} weight="bold" aria-hidden="true" />
        {selectedPayout ? `The amount shown is exactly what your recipient receives by ${payoutLabel(selectedPayout.Name).toLowerCase()}.` : "The amount shown is the exact amount your recipient will receive."}
      </small>
    </form>
  );
}
