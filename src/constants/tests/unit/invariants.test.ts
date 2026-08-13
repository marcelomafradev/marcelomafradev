import { describe, expect, it } from 'vitest';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_MAX_LENGTH,
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_MESSAGE_MIN_LENGTH,
  CONTACT_NAME_MAX_LENGTH,
  CONTACT_SUBJECT_MAX_LENGTH,
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
