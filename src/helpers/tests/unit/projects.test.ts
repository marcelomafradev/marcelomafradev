import { describe, expect, it } from 'vitest';
import type { ProjectProps } from '@/constants';
import { filterProjectsByCategory } from '@/helpers/projects';

const projects: ProjectProps[] = [
  {
    id: 'a',
    i18nKey: 'a',
    title: 'A',
    technologies: ['TypeScript'],
    categories: ['web'],
  },
  {
    id: 'b',
    i18nKey: 'b',
    title: 'B',
    technologies: ['NestJS'],
    categories: ['backend', 'platform'],
  },
  {
    id: 'c',
    i18nKey: 'c',
    title: 'C',
    technologies: ['React Native'],
    categories: ['mobile'],
  },
];

describe('filterProjectsByCategory', () => {
  it('returns all projects when filter is all', () => {
    expect(filterProjectsByCategory(projects, 'all')).toEqual(projects);
    expect(filterProjectsByCategory(projects, 'all')).toBe(projects);
  });

  it('returns only projects that include the requested category', () => {
    expect(filterProjectsByCategory(projects, 'web')).toEqual([projects[0]]);
    expect(filterProjectsByCategory(projects, 'backend')).toEqual([
      projects[1],
    ]);
    expect(filterProjectsByCategory(projects, 'platform')).toEqual([
      projects[1],
    ]);
    expect(filterProjectsByCategory(projects, 'mobile')).toEqual([projects[2]]);
  });

  it('returns an empty array when no project matches the category', () => {
    const onlyWeb: ProjectProps[] = [projects[0]];
    expect(filterProjectsByCategory(onlyWeb, 'mobile')).toEqual([]);
  });
});
