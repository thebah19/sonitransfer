import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react';
import { blogPosts, getBlogPost } from '@/data/content';
import { Button } from '@/components/ui/button';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage]
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <section className="bg-mint py-8">
        <div className="container-custom">
          <Button asChild variant="outline">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              Back to blog
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
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.date))}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {post.location}
                </span>
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
                  Soni Transfer supports diaspora events that preserve culture, build connection, and celebrate Gambian communities abroad.
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

        <section className="section bg-slate-50">
          <div className="container-custom">
            <h2 className="text-3xl font-black text-navy">Event gallery</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {post.gallery.map((image) => (
                <div key={image} className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-sm">
                  <Image src={image} alt="" fill className="object-cover" />
                </div>
              ))}
              <div className="rounded-3xl bg-navy p-6 text-white">
                <h3 className="text-2xl font-black">Connected to home.</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  Community work and remittance service belong together: both help families stay close across distance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
