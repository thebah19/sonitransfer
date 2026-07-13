import type { LucideIcon } from 'lucide-react';

export type Corridor = 'UK' | 'EU' | 'USA';
export type SendCurrency = 'GBP' | 'EUR' | 'USD';
export type ReceiveCurrency = 'GMD';

export type Rate = {
  corridor: Corridor;
  country: string;
  flag: string;
  sendCurrency: SendCurrency;
  receiveCurrency: ReceiveCurrency;
  rate: number;
  fee: number;
  minimum: number;
  maximum: number;
  arrival: string;
};

export type FAQ = { q: string; a: string };
export type Testimonial = { name: string; city: string; quote: string };

export type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type PayoutMethod = FeatureCard & {
  detail: string;
};

export type PageContent = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  bullets: string[];
  cta?: string;
  detailTitle?: string;
  detailCopy?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  location: string;
  excerpt: string;
  category: 'CSR' | 'Community';
  featuredImage: string;
  gallery: string[];
  body: string[];
};

export type RemitecHomeSettings = {
  CalculatorAllowDeliveryMethod?: string;
  CalculatorDefaultValue?: number | string;
};

export type RemitecCurrencyFrom = {
  CountryId: number | string;
  CountryName: string;
  CountryISO: string;
  CurrencyInitial: string;
  CurrencyIso?: string;
};

export type RemitecCurrencyTo = {
  CurrencyBranchId: number | string;
  CountryName: string;
  CountryISO: string;
  CurrencyInitial: string;
};

export type RemitecDeliveryMethod = {
  DeliveryTypeId: number | string;
  Name: string;
  IconClass?: string;
};

export type RemitecFee = {
  InitValue: number;
  EndValue: number;
  Value: number;
  Percentage: number;
};

export type RemitecQuotation = {
  SellRates: number | string | null;
  Fees: RemitecFee[];
};
