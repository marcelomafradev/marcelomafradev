const PUBLIC_ROUTES = [
  '/',
  '/pt-br',
  '/en',
  '/es',
  '/about',
  '/projects',
  '/technologies',
  '/messages',
  '/auth',
];

const USER_ROUTES = [...PUBLIC_ROUTES];
const DEFAULT_USER_LOGIN_REDIRECT = '/messages';

const ADMIN_ROUTES = ['/admin', ...USER_ROUTES];
const DEFAULT_ADMIN_LOGIN_REDIRECT = '/admin';

const API_ROUTES = ['/api/auth'];

const ADMIN_EMAILS = ['marcelomafradev@gmail.com'];

export {
  USER_ROUTES,
  DEFAULT_USER_LOGIN_REDIRECT,
  ADMIN_ROUTES,
  DEFAULT_ADMIN_LOGIN_REDIRECT,
  API_ROUTES,
  PUBLIC_ROUTES,
  ADMIN_EMAILS,
};
