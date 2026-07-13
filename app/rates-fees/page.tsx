import type { Metadata } from 'next';
import { MarketingPage } from '@/components/page-template';
export const metadata: Metadata = { title: 'Rates & Fees', description: 'Check the current rate, transfer fee, and exact receive amount before sending.' };
export default function Page(){return <MarketingPage slug="rates-fees" />;}
