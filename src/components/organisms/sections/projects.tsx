'use client';

import { FEATURED_PROJECTS } from '@/constants';
import { SectionCard } from '@/components/molecules';
import { ProjectGalleryCard } from '../project-gallery-card';
import { useTranslations } from 'next-intl';
import { ScrollArea } from '@/components/ui/scroll-area';

export const Projects = () => {
  const t = useTranslations('homepage.projects');

  return (
    <section>
      <SectionCard title={t('title')} href="/projects" linkTitle={t('cta')}>
        <ScrollArea orientation="horizontal" className="w-full">
          <div className="flex w-max gap-4 pb-3">
            {FEATURED_PROJECTS.map((project, position) => (
              <div
                key={project.id}
                className="w-[min(calc(100vw-5rem),20rem)] shrink-0"
              >
                <ProjectGalleryCard
                  index={position + 1}
                  project={project}
                  description={t(`items.${project.i18nKey}.description`)}
                  roleDescription={t(`items.${project.i18nKey}.role`)}
                  visit={t('visit')}
                  details={t('details')}
                  stack={t('stack')}
                  role={t('role')}
                  confidential={t('confidential')}
                  source={t('source')}
                  download={t('download')}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </SectionCard>
    </section>
  );
};
