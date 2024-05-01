import { PROJECTS } from '@/helpers/constants';
import { Separator } from '@/components/ui/separator';
import CustomCard from '../custom-card';
import ProjectCardVertical from '../project-card-vertical';
import { useTranslations } from 'next-intl';

const Projects = () => {
  const t = useTranslations('homepage.projects');

  return (
    <section>
      <CustomCard title={t('title')} href="/projects" linkTitle={t('cta')}>
        <div className="space-y-4">
          {PROJECTS.map((project, index) => (
            <div key={index} className="space-y-4">
              <ProjectCardVertical
                key={index}
                {...project}
                description={t(`${index + 1}.description` as '1.description')}
                ctaTranslation={t('cta')}
                sourceCodeTranslation={t('source-code')}
              />

              {index !== PROJECTS.length - 1 && (
                <Separator className="lg:hidden" />
              )}
            </div>
          ))}
        </div>
      </CustomCard>
    </section>
  );
};

export default Projects;
