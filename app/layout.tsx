import './globals.css';
import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://sonitransfer.com'),
  title: {
    default: 'Soni Transfer | Send Money Home',
    template: '%s | Soni Transfer'
  },
  description: 'See exactly what your recipient receives and support the people and everyday needs that matter back home.',
  openGraph: {
    title: 'Soni Transfer',
    description: 'App-based money transfers with cash pickup, bank deposit, mobile wallet, mobile credit, and Cash Power services.',
    type: 'website'
  },
  icons: {
    icon: '/brand/favicon.png',
    apple: '/brand/icon.png'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Providers>
          <SiteHeader />
          {children}
          <SiteFooter />
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-3 shadow-lg md:hidden">
            <a
              href="https://sonitransfer.app.link/sonitransfer"
              className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-navy px-5 py-3 text-sm font-bold text-white"
            >
              Download App
            </a>
          </div>
        </Providers>
      </body>
    </html>
  );
}
