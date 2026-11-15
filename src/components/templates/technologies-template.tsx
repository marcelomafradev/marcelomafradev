import { PageHeading, SectionTitle, TechButton } from '@/components/atoms';
import { AI_PRACTICES, AI_STACK, STACK } from '@/constants';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';

const GRID = 'grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4';

export const TechnologiesTemplate = () => {
  const t = useTranslations('technologies');

  return (
    <div className="align-page">
      <PageHeading title={t('title')} description={t('description')} />

      <div className="space-y-8">
        <section className="space-y-3">
          <SectionTitle>{t('ai.title')}</SectionTitle>

          <Card className="border-border/60 bg-card/40 shadow-sm">
            <CardContent className="p-3 sm:p-4">
              <div className={GRID}>
                {AI_STACK.map((item) => (
                  <TechButton key={item.name} {...item} />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <SectionTitle>{t('ai.practices-title')}</SectionTitle>

          <Card className="border-border/60 bg-card/40 shadow-sm">
            <CardContent className="p-3 sm:p-4">
              <div className={GRID}>
                {AI_PRACTICES.map((practice) => (
                  <div
                    key={practice}
                    className="border-border/60 text-card-foreground flex min-h-14 items-center rounded-xl border p-3 text-xs font-medium md:text-sm"
                  >
                    {t(`ai.practices.${practice}`)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {STACK.map((section) => (
          <section key={section.title} className="space-y-3">
            <SectionTitle>{t(section.title)}</SectionTitle>

            <Card className="border-border/60 bg-card/40 shadow-sm">
              <CardContent className="p-3 sm:p-4">
                <div className={GRID}>
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
