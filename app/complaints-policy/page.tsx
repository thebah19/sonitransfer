import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
export const metadata: Metadata = { title: 'Complaints Policy', description: 'How customers can raise and resolve complaints with Soni Transfer.' };
export default function Page(){return <LegalPage slug="complaints-policy" />;}
