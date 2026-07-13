import type { NextConfig } from 'next';
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
