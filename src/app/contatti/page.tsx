import type { Metadata } from 'next';
import { Contact } from '@/components/landing/Contact';
import { ContactHero } from '@/components/landing/ContactHero';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { SiteNav } from '@/components/landing/SiteNav';

export const metadata: Metadata = {
  title: 'Contatti · Alpwise Studio',
  description: 'Raccontaci il tuo progetto: ti rispondiamo entro un giorno lavorativo.',
};

export default function ContattiPage() {
  return (
    <>
      <SiteNav />
      <main>
        <ContactHero />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
