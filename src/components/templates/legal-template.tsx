import { PageHeading } from '@/components/atoms';
import { LEGAL_PLACEHOLDERS } from '@/constants';
import { LegalNamespace, LegalSection } from '@/types';
import { getTranslations } from 'next-intl/server';

interface LegalTemplateProps {
  namespace: LegalNamespace;
}

export const LegalTemplate = async ({ namespace }: LegalTemplateProps) => {
  const t = await getTranslations(namespace);
  const sections = t.raw('sections') as LegalSection[];

  return (
    <div className="align-page">
      <PageHeading title={t('title')} description={t('updated')} />

      <ol className="space-y-8">
        {sections.map(({ heading, paragraphs }, sectionPosition) => (
          <li key={heading} className="space-y-3">
            <PageHeading as="h2" title={heading} />

            {paragraphs.map((paragraph, paragraphPosition) => (
              <p
                key={paragraph}
                className="text-muted-foreground max-w-3xl text-pretty text-[15px] leading-relaxed"
              >
                {t(
                  `sections.${sectionPosition}.paragraphs.${paragraphPosition}`,
                  LEGAL_PLACEHOLDERS,
                )}
              </p>
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
};
