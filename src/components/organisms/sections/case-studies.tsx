import { PageHeading } from '@/components/atoms';
import { StackTagList } from '@/components/molecules';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CASE_STUDIES } from '@/constants';
import { getCaseStudyHighlights } from '@/helpers';
import { useTranslations } from 'next-intl';

export const CaseStudies = () => {
  const t = useTranslations('homepage.case-studies');

  return (
    <section id="case-studies" className="scroll-mt-24 space-y-5">
      <PageHeading as="h2" title={t('title')} description={t('description')} />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 xl:grid-cols-2">
        {CASE_STUDIES.map(({ id, icon: Icon, stack, highlightsCount }) => (
          <Card
            key={id}
            className="border-border/60 bg-card/60 hover:border-primary/40 group flex flex-col transition-colors duration-200"
          >
            <CardHeader className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="border-border/70 text-muted-foreground flex size-11 shrink-0 items-center justify-center rounded-xl border">
                  <Icon className="size-5" />
                </span>

                <div className="min-w-0 space-y-1.5">
                  <Badge
                    variant="outline"
                    className="border-border/70 text-muted-foreground font-normal"
                  >
                    {t(`items.${id}.sector`)}
                  </Badge>
                  <h3 className="text-balance text-lg font-semibold leading-snug tracking-tight">
                    {t(`items.${id}.title`)}
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(`items.${id}.summary`)}
              </p>
            </CardHeader>

            <CardContent className="mt-auto space-y-4 pt-0">
              <ul className="space-y-2.5">
                {getCaseStudyHighlights(t, id, highlightsCount).map(
                  (highlight) => (
                    <li
                      key={highlight}
                      className="text-muted-foreground flex gap-2.5 text-sm leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="bg-primary/70 mt-2 size-1.5 shrink-0 rounded-full"
                      />
                      {highlight}
                    </li>
                  ),
                )}
              </ul>

              <StackTagList items={stack} label={t('stack')} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
