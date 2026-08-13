import { describe, expect, it } from 'vitest';
import { cn, isExternalHref } from '@/lib/utils';

describe('cn', () => {
  it('merges class names and resolves Tailwind conflicts', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    expect(cn('text-sm', false && 'hidden', 'font-bold')).toBe(
      'text-sm font-bold',
    );
    expect(cn(['flex', null, undefined, 'items-center'])).toBe(
      'flex items-center',
    );
  });
});

describe('isExternalHref', () => {
  it('returns true for http, https, mailto, and tel links', () => {
    expect(isExternalHref('http://example.com')).toBe(true);
    expect(isExternalHref('https://example.com')).toBe(true);
    expect(isExternalHref('mailto:me@example.com')).toBe(true);
    expect(isExternalHref('tel:+5511999999999')).toBe(true);
  });

  it('returns false for internal paths', () => {
    expect(isExternalHref('/about')).toBe(false);
    expect(isExternalHref('/')).toBe(false);
    expect(isExternalHref('#section')).toBe(false);
    expect(isExternalHref('about')).toBe(false);
  });
});
