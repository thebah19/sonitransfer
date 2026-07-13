import { NextResponse } from 'next/server';
import { remitecFetch } from '@/lib/remitec';
import { fallbackQuotation } from '@/lib/remitec-fallback';
import type { RemitecQuotation } from '@/types';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ currencyBranchId: string; deliveryMethodId: string }> }
) {
  const { currencyBranchId, deliveryMethodId } = await params;

  try {
    const data = await remitecFetch<RemitecQuotation>(
      `/SendMoney/GetBestQuotation/${encodeURIComponent(currencyBranchId)}/${encodeURIComponent(deliveryMethodId)}`
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(fallbackQuotation(currencyBranchId));
  }
}
