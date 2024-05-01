import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation';

export const locales = ['en', 'pt-br', 'es'] as const;
export type localesType = 'en' | 'pt-br' | 'es';
export const localePrefix = 'never';

export type HrefValue =
  | '/'
  | '/auth'
  | '/about'
  | '/projects'
  | '/technologies'
  | '/messages'
  | '/admin/';

export const pathnames = {
  '/': '/',
  '/auth': '/auth',
  '/about': '/about',
  '/projects': '/projects',
  '/technologies': '/technologies',
  '/messages': '/messages',

  '/admin/': '/admin/',
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
