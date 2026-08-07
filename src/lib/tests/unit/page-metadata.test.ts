import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getTranslationsMock } = vi.hoisted(() => ({
  getTranslationsMock: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: getTranslationsMock,
}));

vi.mock('@/lib/navigation', () => ({
  routing: {
    locales: ['en', 'pt-br', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
}));

const { buildPageMetadata } = await import('@/lib/page-metadata');
const { OG_IMAGE_URL, localizedUrl, localizedPath } =
  await import('@/lib/site');

describe('buildPageMetadata', () => {
  beforeEach(() => {
    getTranslationsMock.mockReset();
    getTranslationsMock.mockImplementation(async () => {
      return (key: string) => {
        if (key.endsWith('.title')) {
          return `title:${key}`;
        }
        if (key.endsWith('.description')) {
          return `description:${key}`;
        }
        return key;
      };
    });
  });

  it('uses absolute title for the home page and localized openGraph url', async () => {
    const metadata = await buildPageMetadata('en', 'home');

    expect(getTranslationsMock).toHaveBeenCalledWith({
      locale: 'en',
      namespace: 'meta',
    });

    expect(metadata.title).toEqual({ absolute: 'title:home.title' });
    expect(metadata.description).toBe('description:home.description');
    expect(metadata.openGraph).toMatchObject({
      title: 'title:home.title',
      description: 'description:home.description',
      url: localizedUrl('en', '/'),
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    });
    expect(metadata.alternates).toEqual({
      canonical: localizedPath('en', '/'),
      languages: {
        en: localizedUrl('en', '/'),
        'pt-br': localizedUrl('pt-br', '/'),
        es: localizedUrl('es', '/'),
        'x-default': localizedUrl('pt-br', '/'),
      },
    });
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      title: 'title:home.title',
      description: 'description:home.description',
      images: [OG_IMAGE_URL],
    });
  });

  it('uses a plain string title for non-home pages', async () => {
    const metadata = await buildPageMetadata('pt-br', 'about');

    expect(metadata.title).toBe('title:about.title');
    expect(metadata.description).toBe('description:about.description');
    expect(metadata.openGraph?.url).toBe(localizedUrl('pt-br', '/about'));
    expect(metadata.alternates?.canonical).toBe(
      localizedPath('pt-br', '/about'),
    );
  });

  it.each([
    ['projects', '/projects'],
    ['technologies', '/technologies'],
    ['contact', '/contact'],
  ] as const)(
    'maps %s page to path %s with localized openGraph url',
    async (page, path) => {
      const metadata = await buildPageMetadata('es', page);

      expect(metadata.title).toBe(`title:${page}.title`);
      expect(metadata.openGraph?.url).toBe(localizedUrl('es', path));
      expect(metadata.alternates?.canonical).toBe(localizedPath('es', path));
    },
  );
});
