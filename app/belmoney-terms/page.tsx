import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Belmoney Terms & Conditions',
  description: 'Belmoney regulatory and payment service terms connected to Soni Transfer.'
};

export default function Page() {
  return <LegalPage slug="belmoney-terms" />;
}
