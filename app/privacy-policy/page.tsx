import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
export const metadata: Metadata = { title: 'Privacy Policy', description: 'Soni Transfer privacy policy and data protection information.' };
export default function Page(){return <LegalPage slug="privacy-policy" />;}
