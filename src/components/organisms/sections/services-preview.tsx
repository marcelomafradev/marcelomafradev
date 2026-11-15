import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link, PageHeading } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { SERVICE_OFFERINGS } from '@/constants';

export const ServicesPreview = () => {
  const t = useTranslations('homepage.services');
  const tOfferings = useTranslations('services.offerings');

  return (
    <section id="services" className="scroll-mt-24 space-y-5">
      <PageHeading
        as="h2"
        title={t('title')}
        description={t('description')}
        action={
          <Button variant="outline" render={<Link href="/services" />}>
            {t('cta')}
            <ArrowRight className="size-4" />
          </Button>
        }
      />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SERVICE_OFFERINGS.map(({ id, icon: OfferingIcon }) => (
          <Card
            key={id}
            className="border-border/60 bg-card/60 hover:border-primary/40 flex flex-col transition-colors duration-200"
          >
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="border-border/70 text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-xl border">
                  <OfferingIcon className="size-5" />
                </span>

                <h3 className="text-balance text-sm font-semibold leading-snug tracking-tight">
                  {tOfferings(`${id}.title`)}
                </h3>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};
