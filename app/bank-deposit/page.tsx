import type { Metadata } from 'next';
import { MarketingPage } from '@/components/page-template';
export const metadata: Metadata = { title: 'Bank Deposit', description: 'Send deposits directly to supported bank accounts.' };
export default function Page(){return <MarketingPage slug="bank-deposit" />;}
