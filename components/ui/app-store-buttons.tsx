import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Locale } from '@/data/i18n';

const APP_STORE_URL = 'https://apps.apple.com/app/id1464484976';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.UnityRemit.UnityRemit&gl=GB';

export function AppStoreButtons({ className, light = false, locale = 'en' }: { className?: string; light?: boolean; locale?: Locale }) {
  void locale;

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noreferrer"
        className={cn('inline-flex h-[60px] items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold', light && 'rounded-md bg-white')}
        aria-label="Download on the App Store"
      >
        <Image src="/store-badges/download-on-the-app-store.svg" alt="Download on the App Store" width={150} height={50} className="h-[50px] w-auto" />
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noreferrer"
        className={cn('inline-flex h-[60px] items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold', light && 'rounded-md bg-white')}
        aria-label="Get it on Google Play"
      >
        <Image src="/store-badges/get-it-on-google-play.png" alt="Get it on Google Play" width={646} height={250} className="h-[60px] w-auto" />
      </a>
    </div>
  );
}
