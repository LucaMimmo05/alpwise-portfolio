import type { MetadataRoute } from 'next';
import { siteUrl } from '@/content/site';

// Generato in build come /sitemap.xml. Aggiungi qui ogni nuova pagina pubblica (privacy e cookie restano fuori).
const pages: { path: string; changeFrequency: 'monthly' | 'yearly'; priority: number }[] = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/contatti', changeFrequency: 'yearly', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map(({ path, ...rest }) => ({ url: `${siteUrl}${path === '/' ? '' : path}`, lastModified, ...rest }));
}
