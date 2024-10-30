import './globals.css';

import { Navigation } from '@/components/app';
import { Sora } from 'next/font/google';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import NextIntlProvider from '@/providers/next-intl-provider';
import { Analytics } from '@vercel/analytics/react';

const sora = Sora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marcelo Mafra - Fullstack Developer',
  description: 'Developed by @marcelomafradev',
  icons: {
    icon: '/marcelomafra.jpg',
  },
  robots: { index: false, follow: false },
  other: {
    'google-site-verification': 't3YbALBw3rJ5Q8eg0K_mkrOzVe8RLRj9HQ1miLKfQvQ',
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <NextIntlProvider>
      <Analytics />

      <html lang={locale} translate="no">
        <body className={sora.className}>
          <Navigation>{children}</Navigation>
          <Toaster />
        </body>
      </html>
    </NextIntlProvider>
  );
}
