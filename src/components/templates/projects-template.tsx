'use client';

import { useMemo, useState } from 'react';
import { ProjectGalleryCard } from '@/components/organisms/project-gallery-card';
import { PageHeading } from '@/components/atoms';
import { FilterPills } from '@/components/molecules';
import { LAB_PROJECTS, PROJECTS, PROJECT_FILTERS } from '@/constants';
import { filterProjectsByCategory, ProjectFilter } from '@/helpers';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';

export const ProjectsTemplate = () => {
  const t = useTranslations('projects');
  const tp = useTranslations('homepage.projects');
  const [filter, setFilter] = useState<ProjectFilter>('all');

  const labels = {
    visit: tp('visit'),
    details: tp('details'),
    stack: tp('stack'),
    role: tp('role'),
    confidential: tp('confidential'),
    source: tp('source'),
    download: tp('download'),
  };

  const projects = useMemo(
    () => filterProjectsByCategory(PROJECTS, filter),
    [filter],
  );

  return (
    <div className="align-page">
      <PageHeading title={t('title')} description={t('description')} />

      <section className="space-y-5">
        <PageHeading
          as="h2"
          title={t('work.title')}
          description={t('work.description')}
        />

        <FilterPills
          ariaLabel={t('filters.all')}
          value={filter}
          onChange={(key) => setFilter(key as ProjectFilter)}
          items={PROJECT_FILTERS.map((key) => ({
            key,
            label: t(`filters.${key}`),
          }))}
        />

        {projects.length > 0 ? (
          <div className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, position) => (
              <ProjectGalleryCard
                key={project.id}
                index={position + 1}
                project={project}
                description={tp(`items.${project.i18nKey}.description`)}
                roleDescription={tp(`items.${project.i18nKey}.role`)}
                {...labels}
              />
            ))}
          </div>
        ) : (
          <Card className="border-border/70 bg-card/40 border-dashed">
            <CardContent className="text-muted-foreground py-12 text-center text-sm">
              {t('empty')}
            </CardContent>
          </Card>
        )}
      </section>

      <section className="space-y-5">
        <PageHeading
          as="h2"
          title={t('lab.title')}
          description={t('lab.description')}
        />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {LAB_PROJECTS.map((project, position) => (
            <ProjectGalleryCard
              key={project.id}
              index={position + 1}
              project={project}
              description={tp(`items.${project.i18nKey}.description`)}
              roleDescription={tp(`items.${project.i18nKey}.role`)}
              {...labels}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
