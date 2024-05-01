import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { Navigation } from '@/components/app';
import { Sora } from 'next/font/google';
import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import { Toaster } from '@/components/ui/sonner';

const sora = Sora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marcelo Mafra - Fullstack Developer',
  description: 'Developed by @marcelomafradev',
  icons: {
    icon: '/marcelomafra.jpg',
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang={locale} translate="no">
        <body className={sora.className}>
          <Navigation>{children}</Navigation>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
