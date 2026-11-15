import { Link, PageHeading } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  COMPANY,
  RESUME_LINKS,
  SERVICE_OFFERINGS,
  SERVICE_PROCESS_STEPS,
} from '@/constants';
import { getTranslations } from 'next-intl/server';
import { Download, Send } from 'lucide-react';

export const ServicesTemplate = async () => {
  const t = await getTranslations('services');

  return (
    <div className="align-page">
      <PageHeading title={t('title')} description={t('description')} />

      <section className="space-y-5">
        <PageHeading as="h2" title={t('offerings.title')} />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
          {SERVICE_OFFERINGS.map(({ id, icon: OfferingIcon }) => (
            <Card
              key={id}
              className="border-border/60 bg-card/60 hover:border-primary/40 flex flex-col transition-colors duration-200"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="border-border/70 text-muted-foreground flex size-11 shrink-0 items-center justify-center rounded-xl border">
                    <OfferingIcon className="size-5" />
                  </span>

                  <h3 className="text-balance text-lg font-semibold leading-snug tracking-tight">
                    {t(`offerings.${id}.title`)}
                  </h3>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`offerings.${id}.description`)}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <PageHeading as="h2" title={t('process.title')} />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
          {SERVICE_PROCESS_STEPS.map(({ id }, position) => (
            <Card
              key={id}
              className="border-border/60 bg-card/60 flex flex-col"
            >
              <CardHeader className="space-y-3">
                <span className="numeric text-muted-foreground text-[11px] uppercase tracking-[0.14em]">
                  {position + 1}
                </span>

                <h3 className="text-balance text-lg font-semibold leading-snug tracking-tight">
                  {t(`process.${id}.title`)}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`process.${id}.description`)}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Card className="border-border/60 bg-card/60">
        <CardHeader className="space-y-1.5">
          <CardTitle className="text-base tracking-tight">
            {t('company.title')}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <dt className="text-muted-foreground text-xs uppercase tracking-[0.14em]">
                {t('company.legal-name')}
              </dt>
              <dd className="text-sm font-medium">{COMPANY.legalName}</dd>
            </div>

            <div className="space-y-1">
              <dt className="text-muted-foreground text-xs uppercase tracking-[0.14em]">
                {t('company.tax-id')}
              </dt>
              <dd className="numeric text-sm font-medium">{COMPANY.cnpj}</dd>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <dt className="text-muted-foreground text-xs uppercase tracking-[0.14em]">
                {t('company.activities-label')}
              </dt>
              <dd className="text-muted-foreground text-sm leading-relaxed">
                {t('company.activities')}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/60">
        <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0 space-y-2">
            <h2 className="text-balance text-xl font-semibold tracking-tight md:text-2xl">
              {t('cta.title')}
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
              {t('cta.description')}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href="/contact" />}>
              <Send className="size-4" />
              {t('cta.contact')}
            </Button>

            <Button
              size="lg"
              variant="outline"
              render={<Link href={RESUME_LINKS['pt-br']} type="external" />}
            >
              <Download className="size-4" />
              {t('cta.resume')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
