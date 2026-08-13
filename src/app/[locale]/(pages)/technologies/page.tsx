import { TechnologiesTemplate } from '@/components/templates';
import { buildPageMetadata } from '@/lib/page-metadata';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'technologies');
}

export default async function Technologies({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TechnologiesTemplate />;
}
