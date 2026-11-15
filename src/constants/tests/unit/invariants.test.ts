import { describe, expect, it } from 'vitest';
import { isValidCnpj } from '@/lib/cnpj';
import {
  COMPANY,
  CONTACT_EMAIL,
  CONTACT_EMAIL_MAX_LENGTH,
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_MESSAGE_MIN_LENGTH,
  CONTACT_NAME_MAX_LENGTH,
  CONTACT_SUBJECT_MAX_LENGTH,
  PERSONAL_INFO,
  PROJECTS,
  SIDEBAR_ITEMS,
  STACK,
} from '@/constants';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

describe('constants invariants', () => {
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
  });

  describe('STACK', () => {
    it('has unique group titles', () => {
      const titles = STACK.map((group) => group.title);
      expect(new Set(titles).size).toBe(titles.length);
    });

    it('requires name, icon, and http(s) link on every item', () => {
      for (const group of STACK) {
        expect(group.items.length).toBeGreaterThan(0);

        for (const item of group.items) {
          expect(item.name).toBeTruthy();
          expect(item.icon).toBeTruthy();
          expect(item.link.startsWith('http')).toBe(true);
        }
      }
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
