import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
export const metadata: Metadata = { title: 'Refunds & Cancellations', description: 'Refund and cancellation guidance for Soni Transfer customers.' };
export default function Page(){return <LegalPage slug="refunds-cancellations" />;}
