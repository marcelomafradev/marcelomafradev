import type { getTranslations } from 'next-intl/server';

export type ExperienceTranslator = Awaited<
  ReturnType<typeof getTranslations<'homepage.experiences'>>
>;

export const getExperienceDetails = (
  translate: ExperienceTranslator,
  position: number,
  detailsCount: number,
) =>
  Array.from({ length: detailsCount }, (_, index) => {
    const key = `${position}.details.${index + 1}` as const;
    return translate.has(key) ? translate(key) : null;
  }).filter((detail): detail is string => Boolean(detail));
