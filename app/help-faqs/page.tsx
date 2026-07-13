import type { Metadata } from 'next';
import { MarketingPage } from '@/components/page-template';
export const metadata: Metadata = { title: 'Help & FAQs', description: 'Answers about sending money, fees, documents, payout methods, and cancellations.' };
export default function Page(){return <MarketingPage slug="help-faqs" />;}
