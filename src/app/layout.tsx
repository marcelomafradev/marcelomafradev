import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/app';

const sora = Sora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marcelo Mafra - Fullstack developer',
  description: 'Developed by @officialmafra',
  icons: {
    icon: '/marcelomafra.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <Navigation>{children}</Navigation>
      </body>
    </html>
  );
}
