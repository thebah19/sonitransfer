import { NextRequest, NextResponse } from 'next/server';
import { remitecFetch } from '@/lib/remitec';
import { fallbackCurrenciesTo } from '@/lib/remitec-fallback';
import type { RemitecCurrencyTo } from '@/types';

export async function GET(request: NextRequest) {
  const countryFrom = request.nextUrl.searchParams.get('countryFrom');
  const currencyFrom = request.nextUrl.searchParams.get('currencyFrom');

  if (!countryFrom || !currencyFrom) {
    return NextResponse.json({ error: 'countryFrom and currencyFrom are required.' }, { status: 400 });
  }

  try {
    const path = `/SendMoney/GetCurrenciesTo?countryFrom=${encodeURIComponent(countryFrom)}&currencyFrom=${encodeURIComponent(currencyFrom)}`;
    const data = await remitecFetch<RemitecCurrencyTo[]>(path);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(fallbackCurrenciesTo(currencyFrom));
  }
}
