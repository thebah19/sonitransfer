const API_ROOT = "/api/remitec";

async function getJson(path, signal) {
  const response = await fetch(`${API_ROOT}${path}`, {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw new Error("Calculator data is currently unavailable.");
  }

  return response.json();
}

function requireLiveRecords(value, idField, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} are currently unavailable.`);
  }

  const hasInvalidId = value.some((item) => !/^\d+$/.test(String(item?.[idField] ?? "")));
  if (hasInvalidId) {
    throw new Error(`Live ${label.toLowerCase()} are currently unavailable.`);
  }

  return value;
}

export async function getHomeSettings(signal) {
  return getJson("/home-settings", signal);
}

export async function getSendingCurrencies(signal) {
  const data = await getJson("/currencies-from", signal);
  return requireLiveRecords(data, "CountryId", "Sending currencies");
}

export async function getReceivingCurrencies(sendingCurrency, signal) {
  const params = new URLSearchParams({
    countryFrom: String(sendingCurrency.CountryId),
    currencyFrom: sendingCurrency.CurrencyInitial,
  });
  const data = await getJson(`/currencies-to?${params}`, signal);
  return requireLiveRecords(data, "CurrencyBranchId", "Receiving countries");
}

export async function getPayoutMethods(receivingCurrency, signal) {
  const data = await getJson(`/delivery-types/${encodeURIComponent(receivingCurrency.CurrencyBranchId)}`, signal);
  return requireLiveRecords(data, "DeliveryTypeId", "Payout methods");
}

export async function getQuotation(receivingCurrency, payoutMethod, signal) {
  const data = await getJson(
    `/quotation/${encodeURIComponent(receivingCurrency.CurrencyBranchId)}/${encodeURIComponent(payoutMethod.DeliveryTypeId)}`,
    signal,
  );
  const rate = Number(data?.SellRates);

  if (!Number.isFinite(rate) || rate <= 0 || !Array.isArray(data?.Fees)) {
    throw new Error("The current exchange rate is unavailable.");
  }

  return data;
}

export function sendingCurrencyKey(currency) {
  return `${currency.CountryId}:${currency.CurrencyInitial}`;
}

export function receivingCurrencyKey(currency) {
  return `${currency.CurrencyBranchId}:${currency.CurrencyInitial}`;
}
