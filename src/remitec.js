const USE_DIRECT_REMITEC_API = import.meta.env.VITE_REMITEC_API_MODE === "direct";
const API_ROOT = USE_DIRECT_REMITEC_API ? "https://app.sonitransfer.com/api" : "/api/remitec";

const endpoint = (proxyPath, directPath) => (USE_DIRECT_REMITEC_API ? directPath : proxyPath);

/**
 * Errors carry a stable `code` so the UI can show a message in the reader's
 * language; `message` stays as readable English for logs.
 */
function liveDataError(message, code) {
  const error = new Error(message);
  error.code = code;
  return error;
}

async function getJson(path, signal) {
  const response = await fetch(`${API_ROOT}${path}`, {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw liveDataError("Calculator data is currently unavailable.", "data-unavailable");
  }

  return response.json();
}

function requireLiveRecords(value, idField, label, code) {
  if (!Array.isArray(value) || value.length === 0) {
    throw liveDataError(`${label} are currently unavailable.`, code);
  }

  const hasInvalidId = value.some((item) => !/^\d+$/.test(String(item?.[idField] ?? "")));
  if (hasInvalidId) {
    throw liveDataError(`Live ${label.toLowerCase()} are currently unavailable.`, code);
  }

  return value;
}

export async function getHomeSettings(signal) {
  return getJson(endpoint("/home-settings", "/HomeSettings/get"), signal);
}

export async function getSendingCurrencies(signal) {
  const data = await getJson(endpoint("/currencies-from", "/SendMoney/GetCurrenciesFrom"), signal);
  return requireLiveRecords(data, "CountryId", "Sending currencies", "sending-unavailable");
}

export async function getReceivingCurrencies(sendingCurrency, signal) {
  const params = new URLSearchParams({
    countryFrom: String(sendingCurrency.CountryId),
    currencyFrom: sendingCurrency.CurrencyInitial,
  });
  const data = await getJson(endpoint(`/currencies-to?${params}`, `/SendMoney/GetCurrenciesTo?${params}`), signal);
  return requireLiveRecords(data, "CurrencyBranchId", "Receiving countries", "receiving-unavailable");
}

export async function getPayoutMethods(receivingCurrency, signal) {
  const branchId = encodeURIComponent(receivingCurrency.CurrencyBranchId);
  const data = await getJson(endpoint(`/delivery-types/${branchId}`, `/SendMoney/GetDeliveryTypes/${branchId}`), signal);
  return requireLiveRecords(data, "DeliveryTypeId", "Payout methods", "payout-unavailable");
}

export async function getQuotation(receivingCurrency, payoutMethod, signal) {
  const branchId = encodeURIComponent(receivingCurrency.CurrencyBranchId);
  const deliveryTypeId = encodeURIComponent(payoutMethod.DeliveryTypeId);
  const data = await getJson(endpoint(
    `/quotation/${branchId}/${deliveryTypeId}`,
    `/SendMoney/GetBestQuotation/${branchId}/${deliveryTypeId}`,
  ), signal);
  const rate = Number(data?.SellRates);

  if (!Number.isFinite(rate) || rate <= 0 || !Array.isArray(data?.Fees)) {
    throw liveDataError("The current exchange rate is unavailable.", "rate-unavailable");
  }

  return data;
}

export function sendingCurrencyKey(currency) {
  return `${currency.CountryId}:${currency.CurrencyInitial}`;
}

export function receivingCurrencyKey(currency) {
  return `${currency.CurrencyBranchId}:${currency.CurrencyInitial}`;
}
