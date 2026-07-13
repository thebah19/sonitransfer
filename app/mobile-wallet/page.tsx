import type { Metadata } from 'next';
import { MarketingPage } from '@/components/page-template';
export const metadata: Metadata = { title: 'Mobile Wallet', description: 'Send to supported mobile wallet accounts.' };
export default function Page(){return <MarketingPage slug="mobile-wallet" />;}
