import { PageHeading, SectionTitle, TechButton } from '@/components/atoms';
import { AI_PRACTICES, AI_STACK, STACK } from '@/constants';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';

export const TechnologiesTemplate = () => {
  const t = useTranslations('technologies');

  return (
    <div className="align-page">
      <PageHeading title={t('title')} description={t('description')} />

      <div className="space-y-8">
        <section className="space-y-3">
          <SectionTitle>{t('ai.title')}</SectionTitle>

          <Card className="border-primary/40 bg-linear-to-br from-primary/10 via-card/40 to-card/40 shadow-sm">
            <CardContent className="space-y-5 p-3 sm:p-4">
              <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
                {t('ai.description')}
              </p>

              <div className="space-y-2">
                <p className="eyebrow">{t('ai.tools-label')}</p>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {AI_STACK.map((item) => (
                    <TechButton key={item.name} {...item} />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="eyebrow">{t('ai.practices-label')}</p>

                <div className="flex flex-wrap gap-2">
                  {AI_PRACTICES.map((practice) => (
                    <span
                      key={practice}
                      className="border-border/70 bg-background/60 rounded-full border px-3 py-1 text-xs"
                    >
                      {t(`ai.practices.${practice}`)}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

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
