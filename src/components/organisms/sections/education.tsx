import { useTranslations } from 'next-intl';
import { SectionCard, TimelineEntry } from '@/components/molecules';
import { EDUCATION_POSITIONS } from '@/constants';
import { getEducationDetails, getEducationIcon } from '@/helpers';

export const Education = () => {
  const t = useTranslations('homepage.education');

  return (
    <section>
      <SectionCard title={t('title')} description={t('description')}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-3 md:gap-4 xl:grid-cols-2">
          {EDUCATION_POSITIONS.map((position) => {
            const EducationIcon = getEducationIcon(position);

            return (
              <TimelineEntry
                key={position}
                title={t(`items.${position}.title`)}
                subtitle={t(`items.${position}.description`)}
                meta={t(`items.${position}.time`)}
                details={getEducationDetails(t, position)}
                leading={
                  <div className="border-border/70 text-muted-foreground flex size-10 items-center justify-center rounded-xl border">
                    <EducationIcon className="size-4" />
                  </div>
                }
              />
            );
          })}
        </div>
      </SectionCard>
    </section>
  );
};
