import { useTranslations } from 'next-intl';
import CustomCard from '../custom-card';

const ResumeAboutMe = () => {
  const t = useTranslations('homepage.resume-about-me');

  return (
    <section>
      <CustomCard title={t('title')} href="/about" linkTitle="Ver mais">
        <p className="line-clamp-5 text-xs md:text-base">{t('description')}</p>
      </CustomCard>
    </section>
  );
};

export default ResumeAboutMe;
