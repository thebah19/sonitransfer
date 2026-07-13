import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { blogPosts } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Blog & CSR',
  description: 'Community stories, CSR updates, and diaspora events supported by Soni Transfer.'
};

export default function BlogPage() {
  const [featured, ...posts] = blogPosts;

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-mint to-white py-16 md:py-24">
        <div className="container-custom relative">
          <p className="font-semibold text-gold">Community & CSR</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-navy md:text-6xl">
            Stories from the communities Soni Transfer supports.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            Sponsorships, diaspora gatherings, cultural events, and football tournaments that keep Gambian and Soninkara communities connected.
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
              <Meta date={featured.date} location={featured.location} />
              <p className="mt-4 leading-7 text-slate-700">{featured.excerpt}</p>
              <Button asChild className="mt-6">
                <Link href={`/blog/${featured.slug}`}>
                  Read story <ArrowRight className="h-4 w-4" />
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
                  <Meta date={post.date} location={post.location} />
                  <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold">
                    Read story <ArrowRight className="h-4 w-4" />
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

function Meta({ date, location }: { date: string; location: string }) {
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
