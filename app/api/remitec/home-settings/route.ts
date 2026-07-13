import { NextResponse } from 'next/server';
import { remitecFetch } from '@/lib/remitec';
import { fallbackHomeSettings } from '@/lib/remitec-fallback';
import type { RemitecHomeSettings } from '@/types';

export async function GET() {
  try {
    const data = await remitecFetch<RemitecHomeSettings>('/HomeSettings/get');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(fallbackHomeSettings);
  }
}
