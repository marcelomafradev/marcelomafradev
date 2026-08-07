import './globals.css';

import { Navigation } from '@/components/organisms';
import { JetBrains_Mono, Sora } from 'next/font/google';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import NextIntlProvider from '@/providers/next-intl-provider';
import ThemeProvider from '@/providers/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { routing } from '@/lib/navigation';
import {
  OG_IMAGE_URL,
  SITE_URL,
  localizedPath,
  localizedUrl,
} from '@/lib/site';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-numeric',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedUrl(l, '/')]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('home.title'),
      template: `%s | Marcelo Mafra`,
    },
    description: t('home.description'),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: localizedPath(locale, '/'),
      languages: {
        ...languages,
        'x-default': localizedUrl(routing.defaultLocale, '/'),
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pt-br' ? 'pt_BR' : locale,
      url: localizedUrl(locale, '/'),
      siteName: 'Marcelo Mafra',
      title: t('home.title'),
      description: t('home.description'),
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home.title'),
      description: t('home.description'),
      images: [OG_IMAGE_URL],
    },
    other: {
      'google-site-verification': 't3YbALBw3rJ5Q8eg0K_mkrOzVe8RLRj9HQ1miLKfQvQ',
    },
  };
}

function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Marcelo Mafra',
        url: SITE_URL,
      },
      {
        '@type': 'Person',
        name: 'Marcelo Mafra',
        url: SITE_URL,
        jobTitle: 'Tech Lead / Full Stack Engineer',
        image: `${SITE_URL}/me.webp`,
        sameAs: [
          'https://github.com/marcelomafradev',
          'https://www.linkedin.com/in/marcelomafradev',
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      translate="no"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${sora.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <JsonLd />
      </head>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlProvider locale={locale} messages={messages}>
            <Analytics />
            <Navigation>{children}</Navigation>
            <Toaster />
          </NextIntlProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
