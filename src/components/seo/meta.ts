import type { Metadata } from 'next';
import { site } from '@/content/site';

/** Metadata di una pagina interna: titolo (con il template del layout), descrizione, canonical e anteprime social. */
export function pageMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  const full = `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', locale: site.locale, siteName: site.name, url: path, title: full, description },
    twitter: { card: 'summary_large_image', title: full, description },
  };
}
