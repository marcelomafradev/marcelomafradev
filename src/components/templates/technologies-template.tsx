import { PageHeading, SectionTitle, TechButton } from '@/components/atoms';
import { STACK } from '@/constants';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';

export const TechnologiesTemplate = () => {
  const t = useTranslations('technologies');

  return (
    <div className="align-page">
      <PageHeading title={t('title')} description={t('description')} />

      <div className="space-y-8">
        {STACK.map((section) => (
          <section key={section.title} className="space-y-3">
            <SectionTitle>{t(section.title)}</SectionTitle>

            <Card className="border-border/60 bg-card/40 shadow-sm">
              <CardContent className="p-3 sm:p-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {section.items.map((item) => (
                    <TechButton
                      key={`${section.title}-${item.name}`}
                      {...item}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        ))}
      </div>
    </div>
  );
};
