import type { useTranslations } from 'next-intl';
import {
  EDUCATION_DETAIL_COUNT,
  EDUCATION_FALLBACK_ICON,
  EDUCATION_ICONS,
} from '@/constants';

export type EducationTranslator = ReturnType<
  typeof useTranslations<'homepage.education'>
>;

export const getEducationIcon = (position: number) =>
  EDUCATION_ICONS[position - 1] ?? EDUCATION_FALLBACK_ICON;

export const getEducationDetails = (
  translate: EducationTranslator,
  position: number,
) =>
  Array.from({ length: EDUCATION_DETAIL_COUNT }, (_, index) => {
    const key = `items.${position}.details.${index + 1}` as const;
    return translate.has(key) ? translate(key) : null;
  }).filter((detail): detail is string => Boolean(detail));
