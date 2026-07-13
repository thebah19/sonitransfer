import type { Metadata } from 'next';
import { MarketingPage } from '@/components/page-template';
export const metadata: Metadata = { title: 'How It Works', description: 'Create an account, add a recipient, pay securely, and track transfers in the app.' };
export default function Page(){return <MarketingPage slug="how-it-works" />;}
