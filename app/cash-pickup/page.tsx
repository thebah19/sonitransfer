import type { Metadata } from 'next';
import { MarketingPage } from '@/components/page-template';
export const metadata: Metadata = { title: 'Cash Pickup', description: 'Send money for supported cash pickup with Soni Transfer.' };
export default function Page(){return <MarketingPage slug="cash-pickup" />;}
