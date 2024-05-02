import { NextResponse } from 'next/server';
import { auth as AuthMiddleware } from './lib/auth';
import {
  ADMIN_EMAILS,
  ADMIN_ROUTES,
  API_ROUTES,
  DEFAULT_ADMIN_LOGIN_REDIRECT,
  DEFAULT_USER_LOGIN_REDIRECT,
  PUBLIC_ROUTES,
  USER_ROUTES,
} from './routes';
import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';
import { localePrefix } from './lib/navigation';

const isUserAdmin = (email: string) => ADMIN_EMAILS.includes(email);

const matchesApiRoute = (pathname: string) =>
  API_ROUTES.some((prefix) => pathname.startsWith(prefix));

export const matchesPublicRoute = (pathname: string) => {
  return PUBLIC_ROUTES.some((route) => {
    if (route.includes(':')) {
      const routePattern = new RegExp(`^${route.replace(/:\w+/g, '.*')}$`);
      return routePattern.test(pathname);
    } else {
      return route === pathname;
    }
  });
};

const intlMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'pt-br',
});

export default AuthMiddleware((req) => {
  const { nextUrl, auth } = req;

  const { pathname } = nextUrl;
  const userEmail = auth?.user?.email;
  const isLoggedIn = !!auth;

  const isRedirectingToSamePath = (destination: string) => {
    const destinationPath = new URL(destination, nextUrl.href).pathname;
    return pathname === destinationPath;
  };

  if (pathname === '/auth' && isLoggedIn) {
    if (!isRedirectingToSamePath(DEFAULT_ADMIN_LOGIN_REDIRECT)) {
      return NextResponse.redirect(
        new URL(DEFAULT_ADMIN_LOGIN_REDIRECT, nextUrl.href),
      );
    }
  }

  if (matchesPublicRoute(pathname) || matchesApiRoute(pathname)) {
    return intlMiddleware(req);
  }

  if (!isLoggedIn) {
    if (!isRedirectingToSamePath('/auth')) {
      return NextResponse.redirect(new URL('/auth', nextUrl.href));
    }
  }

  const isAdminUser = userEmail ? isUserAdmin(userEmail) : false;
  const redirectPath = isAdminUser
    ? DEFAULT_ADMIN_LOGIN_REDIRECT
    : DEFAULT_USER_LOGIN_REDIRECT;

  if (
    (isAdminUser && ADMIN_ROUTES.includes(pathname)) ||
    (!isAdminUser && USER_ROUTES.includes(pathname))
  ) {
    return intlMiddleware(req);
  }

  if (!isRedirectingToSamePath(redirectPath)) {
    return NextResponse.redirect(new URL(redirectPath, nextUrl.href));
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
