import type { useTranslations } from 'next-intl';

export type CaseStudyTranslator = ReturnType<
  typeof useTranslations<'homepage.case-studies'>
>;

export const getCaseStudyHighlights = (
  translate: CaseStudyTranslator,
  caseStudyId: string,
  highlightsCount: number,
) =>
  Array.from({ length: highlightsCount }, (_, index) =>
    translate(`items.${caseStudyId}.highlights.${index + 1}`),
  );
