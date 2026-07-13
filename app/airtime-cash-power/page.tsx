import type { Metadata } from 'next';
import { MarketingPage } from '@/components/page-template';
export const metadata: Metadata = { title: 'Airtime & Cash Power', description: 'Top up airtime and Cash Power for loved ones.' };
export default function Page(){return <MarketingPage slug="airtime-cash-power" />;}
