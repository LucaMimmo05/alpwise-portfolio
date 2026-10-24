import { Cta } from '@/components/landing/Cta';
import { Hero } from '@/components/landing/Hero';
import { Method } from '@/components/landing/Method';
import { Sectors } from '@/components/landing/Sectors';
import { Services } from '@/components/landing/Services';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { SiteNav } from '@/components/landing/SiteNav';
import { Studio } from '@/components/landing/Studio';
import { Work } from '@/components/landing/Work';

export default function Home() {
  return (
    <>
      <SiteNav />
      <Hero />
      <main>
        <Studio />
        <Services />
        <Sectors />
        <Method />
        <Work />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
