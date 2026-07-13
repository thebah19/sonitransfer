import type { Metadata } from 'next';
import { MarketingPage } from '@/components/page-template';
export const metadata: Metadata = { title: 'Compliance & Security', description: 'Security controls, verification, transaction monitoring, data protection, and compliance information.' };
export default function Page(){return <MarketingPage slug="compliance-security" />;}
