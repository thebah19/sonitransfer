import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { HomeSections } from '@/components/sections/home-sections';
import { MarketingPage } from '@/components/page-template';
import { LegalPage } from '@/components/legal-page';
import { LocalizedBlogList, LocalizedBlogPost } from '@/components/blog-pages';
import { blogPosts, pages } from '@/data/content';
import { getLegalPage, legalPages } from '@/data/legal-content';
import { isLocale, type Locale } from '@/data/i18n';

type LocalizedPageProps = {
  params: Promise<{ locale: string; slug?: string[] }>;
};

const legalSlugs = new Set(legalPages.map((page) => page.slug));
const removedPublicSlugs = new Set(['send-money', 'receive-money']);
const marketingSlugs = new Set(pages.map((page) => page.slug).filter((slug) => !removedPublicSlugs.has(slug)));
const publicMarketingPages = pages.filter((page) => !removedPublicSlugs.has(page.slug));
const blogSlugs = new Set(blogPosts.map((post) => post.slug));

export function generateStaticParams() {
  const locales: Locale[] = ['en', 'es', 'fr'];
  return locales.flatMap((locale) => [
    { locale, slug: [] },
    ...publicMarketingPages.map((page) => ({ locale, slug: [page.slug] })),
    ...legalPages.map((page) => ({ locale, slug: [page.slug] })),
    { locale, slug: ['blog'] },
    ...blogPosts.map((post) => ({ locale, slug: ['blog', post.slug] }))
  ]);
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) return {};
  const path = slug.join('/');

  if (!path) {
    return {
      title: locale === 'en' ? 'Send Money Home' : locale === 'es' ? 'Envía dinero a casa' : "Envoyez de l'argent à la maison",
      description: locale === 'en'
        ? 'Check the current exchange rate, transfer fee, and exact amount your recipient will receive before you send.'
        : locale === 'es'
          ? 'Soni Transfer hace que enviar dinero sea más simple, fácil, fiable y accesible.'
          : "Soni Transfer rend l'envoi d'argent plus simple, plus facile, plus fiable et accessible."
    };
  }

  if (slug[0] === 'blog' && slug[1]) {
    const post = blogPosts.find((item) => item.slug === slug[1]);
    return post ? { title: post.title, description: post.excerpt } : {};
  }

  const page = pages.find((item) => item.slug === path) ?? getLegalPage(path);
  return page ? { title: page.title, description: page.description } : {};
}

export default async function LocalizedPage({ params }: LocalizedPageProps) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) notFound();

  if (!slug.length) {
    return <HomeSections locale={locale} />;
  }

  if (slug[0] === 'blog') {
    if (slug.length === 1) return <LocalizedBlogList locale={locale} />;
    if (slug.length === 2 && blogSlugs.has(slug[1])) return <LocalizedBlogPost locale={locale} slug={slug[1]} />;
    notFound();
  }

  if (slug.length !== 1) notFound();

  const pageSlug = slug[0];
  if (removedPublicSlugs.has(pageSlug)) redirect(`/${locale}`);
  if (legalSlugs.has(pageSlug)) return <LegalPage slug={pageSlug} locale={locale} />;
  if (marketingSlugs.has(pageSlug)) return <MarketingPage slug={pageSlug} locale={locale} />;

  notFound();
}
