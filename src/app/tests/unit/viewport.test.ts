import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('notFound');
  },
}));

vi.mock('next/font/google', () => ({
  Sora: () => ({ variable: '--font-sora', className: 'font-sora' }),
  JetBrains_Mono: () => ({
    variable: '--font-mono-numeric',
    className: 'font-mono',
  }),
}));

vi.mock('next-intl/server', () => ({
  getMessages: async () => ({}),
  getTranslations: async () => (key: string) => key,
  setRequestLocale: () => {},
}));

vi.mock('next-intl', () => ({
  hasLocale: (locales: readonly string[], locale: string) =>
    locales.includes(locale),
}));

vi.mock('@/lib/navigation', () => ({
  routing: {
    locales: ['pt-br', 'en', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
  Link: () => null,
  usePathname: () => '/',
}));

vi.mock('@/components/organisms', () => ({
  Navigation: () => null,
}));

vi.mock('@/providers/next-intl-provider', () => ({
  default: () => null,
}));

vi.mock('@/providers/theme-provider', () => ({
  default: () => null,
}));

vi.mock('@/components/ui/sonner', () => ({
  Toaster: () => null,
}));

vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}));

import { viewport } from '@/app/[locale]/layout';

describe('root viewport', () => {
  it('opts into viewport-fit cover for the mobile safe areas', () => {
    expect(viewport.viewportFit).toBe('cover');
  });

  it('declares the theme colors for the light and dark browser chrome', () => {
    expect(viewport.themeColor).toEqual([
      { media: '(prefers-color-scheme: light)', color: '#f6f0e9' },
      { media: '(prefers-color-scheme: dark)', color: '#2d2621' },
    ]);
  });
});
