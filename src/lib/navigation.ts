import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation';

export const locales = ['en', 'pt-br', 'es'] as const;
export type localesType = 'en' | 'pt-br' | 'es';
export const localePrefix = 'never';

export type HrefValue =
  | '/'
  | '/about'
  | '/projects'
  | '/technologies'
  | '/admin/';

export const pathnames = {
  '/': '/',
  '/about': '/about',
  '/projects': '/projects',
  '/technologies': '/technologies',

  '/admin/': '/admin/',
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
