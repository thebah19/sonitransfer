import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How Soni Transfer uses cookies and similar technologies.'
};

export default function Page() {
  return <LegalPage slug="cookie-policy" />;
}
