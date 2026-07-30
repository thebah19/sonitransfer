import type { NextConfig } from 'next';

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const basePath = configuredBasePath === '/' ? '' : configuredBasePath.replace(/\/+$/, '');

if (basePath && !basePath.startsWith('/')) {
  throw new Error('NEXT_PUBLIC_BASE_PATH must start with a forward slash.');
}

const legacySlugs = [
  'about-us',
  'airtime-cash-power',
  'bank-deposit',
  'belmoney-terms',
  'blog',
  'cash-pickup',
  'complaints-policy',
  'compliance-security',
  'contact',
  'cookie-policy',
  'help-faqs',
  'how-it-works',
  'mobile-wallet',
  'privacy-policy',
  'rates-fees',
  'refunds-cancellations',
  'terms-conditions'
];

const nextConfig: NextConfig = {
  basePath,
  async redirects() {
    return [
      ...legacySlugs.map((slug) => ({
        source: `/${slug}`,
        destination: `/en/${slug}`,
        permanent: false
      })),
      {
        source: '/send-money',
        destination: '/en',
        permanent: false
      },
      {
        source: '/receive-money',
        destination: '/en',
        permanent: false
      },
      {
        source: '/blog/:slug',
        destination: '/en/blog/:slug',
        permanent: false
      }
    ];
  }
};
export default nextConfig;
