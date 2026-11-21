import { describe, expect, it } from 'vitest';
import { isValidCnpj } from '@/lib/cnpj';
import {
  CASE_STUDIES,
  COMPANY,
  CONTACT_EMAIL,
  CONTACT_EMAIL_MAX_LENGTH,
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_MESSAGE_MIN_LENGTH,
  CONTACT_NAME_MAX_LENGTH,
  CONTACT_SUBJECT_MAX_LENGTH,
  EXPERIENCES,
  METRICS,
  PERSONAL_INFO,
  PROJECTS,
  SERVICE_OFFERINGS,
  SIDEBAR_ITEMS,
  SOCIAL_LINKS,
  STACK,
} from '@/constants';
import en from '../../../../messages/en.json';
import es from '../../../../messages/es.json';
import ptBr from '../../../../messages/pt-br.json';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const offeringKeys = (offerings: Record<string, unknown>) =>
  Object.keys(offerings).filter((key) => key !== 'title');

const caseStudyItems = (locale: typeof ptBr | typeof en | typeof es) =>
  locale.homepage['case-studies'].items as Record<
    string,
    { highlights: Record<string, string> }
  >;

describe('constants invariants', () => {
  describe('CASE_STUDIES', () => {
    it('keeps every id and highlight present under the case study messages in all locales', () => {
      for (const locale of [ptBr, en, es]) {
        const items = caseStudyItems(locale);

        for (const caseStudy of CASE_STUDIES) {
          expect(items).toHaveProperty(caseStudy.id);
          expect(caseStudy.highlightsCount).toBeGreaterThan(0);

          for (let index = 1; index <= caseStudy.highlightsCount; index += 1) {
            expect(items[caseStudy.id].highlights).toHaveProperty(
              String(index),
            );
          }
        }
      }
    });
  });

  describe('PROJECTS', () => {
    it('has unique ids', () => {
      const ids = PROJECTS.map((project) => project.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('requires non-empty technologies and categories on every project', () => {
      for (const project of PROJECTS) {
        expect(project.technologies.length).toBeGreaterThan(0);
        expect(project.categories.length).toBeGreaterThan(0);
        expect(project.id).toBeTruthy();
        expect(project.title).toBeTruthy();
        expect(project.i18nKey).toBeTruthy();
      }
    });

    it('keeps every project i18n key present in the pt-br messages', () => {
      const items = ptBr.homepage.projects.items;

      for (const project of PROJECTS) {
        expect(items).toHaveProperty(project.i18nKey);
      }
    });

    it('marks the SP Capital projects as confidential and logo-less in links', () => {
      const spCapitalProjects = ['spcapital-credit', 'spcapital-receipts'].map(
        (id) => PROJECTS.find((project) => project.id === id),
      );

      for (const project of spCapitalProjects) {
        expect(project).toBeDefined();
        expect(project?.confidential).toBe(true);
        expect(project?.logo).toBe('/companies/spcapital.svg');
        expect(project?.logoOnDark).toBe(true);
        expect(project?.href).toBeUndefined();
      }
    });
  });

  describe('STACK', () => {
    it('has unique group titles', () => {
      const titles = STACK.map((group) => group.title);
      expect(new Set(titles).size).toBe(titles.length);
    });

    it('requires name, an icon or symbol, and http(s) link on every item', () => {
      for (const group of STACK) {
        expect(group.items.length).toBeGreaterThan(0);

        for (const item of group.items) {
          expect(item.name).toBeTruthy();
          expect(Boolean(item.icon ?? item.symbol)).toBe(true);
          expect(item.link.startsWith('http')).toBe(true);
        }
      }
    });
  });

  describe('EXPERIENCES', () => {
    it('requires non-empty titles and positive detail counts', () => {
      for (const experience of EXPERIENCES) {
        expect(experience.title.trim().length).toBeGreaterThan(0);
        expect(experience.detailsCount).toBeGreaterThan(0);
      }
    });
  });

  describe('METRICS', () => {
    it('counts four sectors', () => {
      const sectors = METRICS.find((metric) => metric.id === 'sectors');

      expect(sectors?.value).toBe('4');
    });
  });

  describe('CONTACT_EMAIL', () => {
    it('matches an email regex', () => {
      expect(CONTACT_EMAIL).toMatch(EMAIL_REGEX);
    });
  });

  describe('SIDEBAR_ITEMS', () => {
    it('ensures every item has id and href', () => {
      for (const group of SIDEBAR_ITEMS) {
        expect(group.items.length).toBeGreaterThan(0);

        for (const item of group.items) {
          expect(item.id).toBeTruthy();
          expect(item.href).toBeTruthy();
          expect(item.icon).toBeTruthy();
        }
      }
    });

    it('exposes the services page in the profile group', () => {
      const items = SIDEBAR_ITEMS.flatMap((group) => group.items);

      expect(
        items.some(
          (item) => item.id === 'services' && item.href === '/services',
        ),
      ).toBe(true);
    });
  });

  describe('SERVICE_OFFERINGS', () => {
    it('has six unique ids matching the offering keys, in order', () => {
      const ids = SERVICE_OFFERINGS.map((offering) => offering.id);

      expect(ids).toHaveLength(6);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids).toEqual(offeringKeys(ptBr.services.offerings));
    });

    it('keeps the offering keys identical across locales', () => {
      const reference = offeringKeys(ptBr.services.offerings);

      expect(offeringKeys(en.services.offerings)).toEqual(reference);
      expect(offeringKeys(es.services.offerings)).toEqual(reference);
    });

    it('gives every offering a distinct icon', () => {
      const icons = SERVICE_OFFERINGS.map((offering) => offering.icon);

      expect(new Set(icons).size).toBe(icons.length);
    });
  });

  describe('COMPANY', () => {
    it('exposes a valid CNPJ', () => {
      expect(isValidCnpj(COMPANY.cnpj)).toBe(true);
    });

    it('exposes non-empty legal and trade names', () => {
      expect(COMPANY.legalName.trim().length).toBeGreaterThan(0);
      expect(COMPANY.tradeName.trim().length).toBeGreaterThan(0);
    });
  });

  describe('PERSONAL_INFO', () => {
    it('does not carry a fullstack title', () => {
      expect(PERSONAL_INFO.title).not.toContain('Fullstack');
    });
  });

  describe('SOCIAL_LINKS', () => {
    it('points the Instagram link to the professional profile marcelomafradev01', () => {
      expect(SOCIAL_LINKS.instagram).toBe(
        'https://www.instagram.com/marcelomafradev01',
      );
    });
  });

  describe('form length constants', () => {
    it('keeps CONTACT_MESSAGE_MIN_LENGTH at 20 and maxes above mins', () => {
      expect(CONTACT_MESSAGE_MIN_LENGTH).toBe(20);
      expect(CONTACT_MESSAGE_MAX_LENGTH).toBeGreaterThan(
        CONTACT_MESSAGE_MIN_LENGTH,
      );
      expect(CONTACT_NAME_MAX_LENGTH).toBeGreaterThan(1);
      expect(CONTACT_EMAIL_MAX_LENGTH).toBeGreaterThan(1);
      expect(CONTACT_SUBJECT_MAX_LENGTH).toBeGreaterThan(1);
    });
  });
});
