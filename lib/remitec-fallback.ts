import type {
  RemitecCurrencyFrom,
  RemitecCurrencyTo,
  RemitecDeliveryMethod,
  RemitecHomeSettings,
  RemitecQuotation
} from '@/types';

export const fallbackHomeSettings: RemitecHomeSettings = {
  CalculatorAllowDeliveryMethod: 'Y',
  CalculatorDefaultValue: 100
};

export const fallbackCurrenciesFrom: RemitecCurrencyFrom[] = [
  { CountryId: 'GB', CountryName: 'United Kingdom', CountryISO: 'GB', CurrencyInitial: 'GBP', CurrencyIso: 'GBP' },
  { CountryId: 'US', CountryName: 'United States', CountryISO: 'US', CurrencyInitial: 'USD', CurrencyIso: 'USD' },
  { CountryId: 'EU', CountryName: 'Europe', CountryISO: 'EU', CurrencyInitial: 'EUR', CurrencyIso: 'EUR' }
];

export const fallbackDeliveryMethods: RemitecDeliveryMethod[] = [
  { DeliveryTypeId: 'cash-pickup', Name: 'Cash pickup' },
  { DeliveryTypeId: 'bank-deposit', Name: 'Bank deposit' },
  { DeliveryTypeId: 'mobile-wallet', Name: 'Mobile wallet' },
  { DeliveryTypeId: 'airtime', Name: 'Airtime top-up' },
  { DeliveryTypeId: 'cash-power', Name: 'Cash Power' }
];

const fallbackRates: Record<string, number> = {
  GBP: 89.5,
  USD: 86.1,
  EUR: 95.2
};

export function fallbackCurrenciesTo(currencyFrom: string): RemitecCurrencyTo[] {
  const currency = currencyFrom.toUpperCase();

  return [
    {
      CurrencyBranchId: `GM-${currency}`,
      CountryName: 'The Gambia',
      CountryISO: 'GM',
      CurrencyInitial: 'GMD'
    }
  ];
}

export function fallbackQuotation(currencyBranchId: string): RemitecQuotation {
  const currency = currencyBranchId.split('-').pop()?.toUpperCase() ?? 'GBP';
  const rate = fallbackRates[currency] ?? fallbackRates.GBP;

  return {
    SellRates: rate,
    Fees: [
      { InitValue: 0, EndValue: 100, Value: 1.99, Percentage: 0 },
      { InitValue: 100.01, EndValue: 500, Value: 2.99, Percentage: 0 },
      { InitValue: 500.01, EndValue: 5000, Value: 4.99, Percentage: 0 }
    ]
  };
}
