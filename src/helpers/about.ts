import type { getTranslations } from 'next-intl/server';
import { ABOUT_HIGHLIGHT_ICONS } from '@/constants';

export type AboutTranslator = Awaited<
  ReturnType<typeof getTranslations<'about'>>
>;

const ABOUT_HIGHLIGHT_KEYS = ['location', 'train', 'music', 'books'] as const;

export const getAboutHighlights = (translate: AboutTranslator) =>
  ABOUT_HIGHLIGHT_KEYS.map((key) => ({
    key,
    label: translate(`highlights.${key}`),
    icon: ABOUT_HIGHLIGHT_ICONS[key],
  }));
