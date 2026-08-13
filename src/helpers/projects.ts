import { PROJECT_FILTERS, ProjectProps } from '@/constants';

export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export const filterProjectsByCategory = (
  projects: ProjectProps[],
  filter: ProjectFilter,
) =>
  filter === 'all'
    ? projects
    : projects.filter((project) => project.categories.includes(filter));
