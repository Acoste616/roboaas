import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  locales: locales as unknown as string[],
  defaultLocale: 'pl',
  localeDetection: true,
});

export const config = {
  matcher: ['/', '/(pl|en|de)/:path*']
};
