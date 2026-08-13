import type { MetadataRoute } from 'next';
import { routing } from '@/lib/navigation';
import { localizedUrl } from '@/lib/site';

const paths = [
  '/',
  '/about',
  '/projects',
  '/technologies',
  '/contact',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return paths.flatMap((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
    );

    return routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified,
      changeFrequency: path === '/' ? 'weekly' : 'monthly',
      priority: path === '/' ? 1 : 0.7,
      alternates: {
        languages: {
          ...languages,
          'x-default': localizedUrl(routing.defaultLocale, path),
        },
      },
    }));
  });
}
