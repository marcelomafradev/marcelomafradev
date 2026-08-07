import { PageHeading } from '@/components/atoms';
import { MetricCard } from '@/components/molecules';
import { METRICS } from '@/constants';
import { useTranslations } from 'next-intl';

export const ProofMetrics = () => {
  const t = useTranslations('homepage.metrics');

  return (
    <section className="space-y-5">
      <PageHeading as="h2" title={t('title')} description={t('description')} />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {METRICS.map(({ id, value, ...metric }) => (
          <MetricCard
            key={id}
            value={value}
            accent={'accent' in metric ? metric.accent : undefined}
            label={t(`items.${id}.label`)}
            description={t(`items.${id}.description`)}
          />
        ))}
      </div>
    </section>
  );
};
