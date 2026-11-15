import { describe, expect, it, vi } from 'vitest';
import { COMPANY } from '@/constants';
import { SITE_URL } from '@/lib/site';
import { buildStructuredData } from '@/lib/structured-data';

vi.mock('@/lib/navigation', () => ({
  routing: {
    locales: ['en', 'pt-br', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
}));

describe('buildStructuredData', () => {
  it('describes the website, the person and the company as three graph nodes', () => {
    const { '@context': context, '@graph': graph } = buildStructuredData();

    expect(context).toBe('https://schema.org');
    expect(graph.map((node) => node['@type'])).toEqual([
      'WebSite',
      'Person',
      'Organization',
    ]);
    expect(graph[0].url).toBe(SITE_URL);
  });

  it('describes the company with its legal name and tax id', () => {
    const [, , organization] = buildStructuredData()['@graph'];

    expect(organization.name).toBe(COMPANY.tradeName);
    expect(organization.legalName).toBe(COMPANY.legalName);
    expect(organization.taxID).toBe(COMPANY.cnpj);
  });

  it('links the person to the company and the company back to the person', () => {
    const [, person, organization] = buildStructuredData()['@graph'];

    expect(person['@id']).toBe(`${SITE_URL}/#person`);
    expect(organization['@id']).toBe(`${SITE_URL}/#organization`);
    expect(person.worksFor['@id']).toBe(organization['@id']);
    expect(organization.founder['@id']).toBe(person['@id']);
    expect(person.sameAs).toEqual([
      'https://github.com/marcelomafradev',
      'https://www.linkedin.com/in/marcelomafradev/',
    ]);
  });
});
