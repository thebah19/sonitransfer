import { NextResponse } from 'next/server';
import { remitecFetch } from '@/lib/remitec';
import { fallbackDeliveryMethods } from '@/lib/remitec-fallback';
import type { RemitecDeliveryMethod } from '@/types';

export async function GET(_: Request, { params }: { params: Promise<{ currencyBranchId: string }> }) {
  const { currencyBranchId } = await params;

  try {
    const data = await remitecFetch<RemitecDeliveryMethod[]>(`/SendMoney/GetDeliveryTypes/${encodeURIComponent(currencyBranchId)}`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(fallbackDeliveryMethods);
  }
}
