import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/lib/navigation';
import { OG_IMAGE_URL, localizedPath, localizedUrl } from '@/lib/site';

type MetaPage = 'home' | 'about' | 'projects' | 'technologies' | 'contact';

const pathByPage: Record<MetaPage, string> = {
  home: '/',
  about: '/about',
  projects: '/projects',
  technologies: '/technologies',
  contact: '/contact',
};

export async function buildPageMetadata(
  locale: string,
  page: MetaPage,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const path = pathByPage[page];
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedUrl(l, path)]),
  );

  return {
    title: page === 'home' ? { absolute: title } : title,
    description,
    alternates: {
      canonical: localizedPath(locale, path),
      languages: {
        ...languages,
        'x-default': localizedUrl(routing.defaultLocale, path),
      },
    },
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, path),
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE_URL],
    },
  };
}
