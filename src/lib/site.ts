import { routing } from '@/lib/navigation';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.marcelomafradev.com.br';

export const OG_IMAGE_URL = `${SITE_URL}/opengraph-image.png`;

export function localizedPath(locale: string, path: string): string {
  if (locale === routing.defaultLocale) {
    return path;
  }

  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

export function localizedUrl(locale: string, path: string): string {
  if (locale === routing.defaultLocale) {
    return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  }

  return path === '/'
    ? `${SITE_URL}/${locale}`
    : `${SITE_URL}/${locale}${path}`;
}
