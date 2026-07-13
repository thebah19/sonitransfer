import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
export const metadata: Metadata = { title: 'Terms & Conditions', description: 'Soni Transfer service terms, transfer rules, and customer responsibilities.' };
export default function Page(){return <LegalPage slug="terms-conditions" />;}
