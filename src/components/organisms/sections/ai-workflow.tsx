import { PageHeading } from '@/components/atoms';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AI_WORKFLOW_PILLARS } from '@/constants';
import { useTranslations } from 'next-intl';

export const AiWorkflow = () => {
  const t = useTranslations('homepage.ai-workflow');

  return (
    <section id="ai-workflow" className="scroll-mt-24 space-y-5">
      <PageHeading as="h2" title={t('title')} description={t('description')} />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 xl:grid-cols-3">
        {AI_WORKFLOW_PILLARS.map(({ id, icon: Icon }) => (
          <Card
            key={id}
            className="border-border/60 bg-card/60 hover:border-primary/40 flex flex-col transition-colors duration-200"
          >
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="border-border/70 text-muted-foreground flex size-11 shrink-0 items-center justify-center rounded-xl border">
                  <Icon className="size-5" />
                </span>

                <h3 className="text-balance text-base font-semibold leading-snug tracking-tight">
                  {t(`items.${id}.title`)}
                </h3>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(`items.${id}.description`)}
              </p>
            </CardHeader>

            <CardContent className="mt-auto pt-0">
              <Badge
                variant="outline"
                className="border-border/70 text-muted-foreground font-normal"
              >
                {t(`items.${id}.tag`)}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed">
        {t('footnote')}
      </p>
    </section>
  );
};
