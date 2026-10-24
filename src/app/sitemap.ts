import type { MetadataRoute } from 'next';
import { features, siteUrl } from '@/content/site';

// Generato in build come /sitemap.xml. Aggiungi qui ogni nuova pagina pubblica.
const pages: { path: string; changeFrequency: 'monthly' | 'yearly'; priority: number }[] = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/contatti', changeFrequency: 'yearly', priority: 0.8 },
  // Le pagine legali entrano solo quando sono pubblicate (features.legal).
  ...(features.legal
    ? [{ path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.2 }, { path: '/cookie', changeFrequency: 'yearly' as const, priority: 0.2 }]
    : []),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map(({ path, ...rest }) => ({ url: `${siteUrl}${path === '/' ? '' : path}`, lastModified, ...rest }));
}
