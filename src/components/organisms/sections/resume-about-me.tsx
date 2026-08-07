import { useTranslations } from 'next-intl';
import { SectionCard } from '@/components/molecules';

export const ResumeAboutMe = () => {
  const t = useTranslations('homepage.resume-about-me');

  return (
    <section>
      <SectionCard title={t('title')} href="/about" linkTitle={t('cta')}>
        <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
          {t('description')}
        </p>
      </SectionCard>
    </section>
  );
};
