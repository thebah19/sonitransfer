import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getDictionary, withLocale, type Locale } from '@/data/i18n';

export function LocalizedBlogList({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const [featured, ...posts] = dictionary.blogs;

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-mint to-white py-16 md:py-24">
        <div className="container-custom relative">
          <p className="font-semibold text-gold">Community & CSR</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-navy md:text-6xl">
            {locale === 'en' ? 'Stories from the communities Soni Transfer supports.' : locale === 'es' ? 'Historias de las comunidades que apoya Soni Transfer.' : 'Histoires des communautés soutenues par Soni Transfer.'}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            {locale === 'en'
              ? 'Diaspora gatherings, cultural events, and community moments that keep families connected.'
              : locale === 'es'
                ? 'Encuentros de la diáspora, eventos culturales y momentos comunitarios que mantienen unidas a las familias.'
                : 'Rencontres de la diaspora, événements culturels et moments communautaires qui gardent les familles proches.'}
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <Card className="grid overflow-hidden lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[320px]">
              <Image src={featured.featuredImage} alt="" fill className="object-cover" priority />
            </div>
            <div className="p-6 md:p-8">
              <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-gold">{featured.category}</span>
              <h2 className="mt-4 text-3xl font-black text-navy">{featured.title}</h2>
              <BlogMeta date={featured.date} location={featured.location} />
              <p className="mt-4 leading-7 text-slate-700">{featured.excerpt}</p>
              <Button asChild className="mt-6">
                <Link href={withLocale(locale, `/blog/${featured.slug}`)}>
                  {locale === 'en' ? 'Read story' : locale === 'es' ? 'Leer historia' : 'Lire l’histoire'} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <Card key={post.slug} className="overflow-hidden">
                <div className="relative h-56">
                  <Image src={post.featuredImage} alt="" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-navy">{post.category}</span>
                  <h2 className="mt-4 text-2xl font-black text-navy">{post.title}</h2>
                  <BlogMeta date={post.date} location={post.location} />
                  <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                  <Link href={withLocale(locale, `/blog/${post.slug}`)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold">
                    {locale === 'en' ? 'Read story' : locale === 'es' ? 'Leer historia' : 'Lire l’histoire'} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function LocalizedBlogPost({ locale, slug }: { locale: Locale; slug: string }) {
  const post = getDictionary(locale).blogs.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main>
      <section className="bg-mint py-8">
        <div className="container-custom">
          <Button asChild variant="outline">
            <Link href={withLocale(locale, '/blog')}>
              <ArrowLeft className="h-4 w-4" />
              {locale === 'en' ? 'Back to blog' : locale === 'es' ? 'Volver al blog' : 'Retour au blog'}
            </Link>
          </Button>
        </div>
      </section>

      <article>
        <header className="bg-gradient-to-b from-mint to-white pb-12">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl text-center">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-gold shadow-sm">{post.category}</span>
              <h1 className="mt-5 text-4xl font-black leading-tight text-navy md:text-6xl">{post.title}</h1>
              <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm text-slate-600">
                <BlogMeta date={post.date} location={post.location} />
              </div>
            </div>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] shadow-premium">
              <Image src={post.featuredImage} alt="" fill className="object-cover" priority />
            </div>
          </div>
        </header>

        <section className="section bg-white">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl bg-cream p-6">
                <p className="text-sm font-bold text-gold">Community commitment</p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {locale === 'en'
                    ? 'Soni Transfer supports diaspora events that preserve culture, build connection, and celebrate communities abroad.'
                    : locale === 'es'
                      ? 'Soni Transfer apoya eventos de la diáspora que preservan cultura, conexión y comunidad.'
                      : 'Soni Transfer soutient les événements de la diaspora qui préservent la culture et le lien.'}
                </p>
              </div>
            </aside>
            <div className="prose prose-slate max-w-none">
              {post.body.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-8 text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

function BlogMeta({ date, location }: { date: string; location: string }) {
  return (
    <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">
      <span className="inline-flex items-center gap-1">
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
        {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))}
      </span>
      <span className="inline-flex items-center gap-1">
        <MapPin className="h-4 w-4" aria-hidden="true" />
        {location}
      </span>
    </div>
  );
}
