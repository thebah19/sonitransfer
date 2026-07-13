import { NextResponse } from 'next/server';
import { remitecFetch } from '@/lib/remitec';
import { fallbackCurrenciesFrom } from '@/lib/remitec-fallback';
import type { RemitecCurrencyFrom } from '@/types';

export async function GET() {
  try {
    const data = await remitecFetch<RemitecCurrencyFrom[]>('/SendMoney/GetCurrenciesFrom');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(fallbackCurrenciesFrom);
  }
}
