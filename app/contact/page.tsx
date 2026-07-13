import type { Metadata } from 'next';
import { MarketingPage } from '@/components/page-template';
export const metadata: Metadata = { title: 'Contact', description: 'Contact Soni Transfer support for transfer help, account questions, complaints, and accessibility support.' };
export default function Page(){return <MarketingPage slug="contact" />;}
