import type { Metadata } from 'next';
import { MarketingPage } from '@/components/page-template';
export const metadata: Metadata = { title: 'About Us', description: 'Learn about Soni Transfer and its app-based money transfer services.' };
export default function Page(){return <MarketingPage slug="about-us" />;}
