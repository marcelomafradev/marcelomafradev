import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/navigation', () => ({
  routing: {
    locales: ['en', 'pt-br', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
}));

const { SITE_URL, localizedUrl } = await import('@/lib/site');
const { default: sitemap } = await import('@/app/sitemap');

const ROOT_URLS = new Set([SITE_URL, `${SITE_URL}/en`, `${SITE_URL}/es`]);

describe('sitemap', () => {
  it('returns 24 entries (8 paths × 3 locales)', () => {
    const entries = sitemap();

    expect(entries).toHaveLength(24);
  });

  it.each(['/terms', '/privacy'])('lists %s in every locale', (path) => {
    const urls = sitemap().map((entry) => entry.url);

    for (const locale of ['pt-br', 'en', 'es']) {
      expect(urls).toContain(localizedUrl(locale, path));
    }
  });

  it("includes alternates.languages['x-default'] on every entry", () => {
    const entries = sitemap();

    for (const entry of entries) {
      expect(entry.alternates?.languages?.['x-default']).toEqual(
        expect.any(String),
      );
    }
  });

  it('assigns priority 1 to root paths and 0.7 to all others', () => {
    const entries = sitemap();

    for (const entry of entries) {
      if (ROOT_URLS.has(entry.url)) {
        expect(entry.priority).toBe(1);
      } else {
        expect(entry.priority).toBe(0.7);
      }
    }
  });
});
