import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';
import { localePrefix } from './lib/navigation';

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'pt-br',
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
