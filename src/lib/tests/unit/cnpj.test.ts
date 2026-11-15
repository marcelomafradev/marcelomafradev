import { describe, expect, it } from 'vitest';
import { formatCnpj, isValidCnpj } from '@/lib/cnpj';

describe('isValidCnpj', () => {
  it('accepts a valid formatted CNPJ', () => {
    expect(isValidCnpj('69.635.734/0001-43')).toBe(true);
  });

  it('accepts a valid CNPJ with only digits', () => {
    expect(isValidCnpj('69635734000143')).toBe(true);
  });

  it('rejects a formatted CNPJ with a wrong check digit', () => {
    expect(isValidCnpj('69.635.734/0001-44')).toBe(false);
  });

  it('rejects a digit-only CNPJ with a wrong check digit', () => {
    expect(isValidCnpj('69635734000144')).toBe(false);
  });

  it('rejects repeated digits', () => {
    expect(isValidCnpj('11111111111111')).toBe(false);
  });

  it('rejects short values', () => {
    expect(isValidCnpj('6963573400014')).toBe(false);
  });

  it('rejects garbage values', () => {
    expect(isValidCnpj('not-a-cnpj')).toBe(false);
    expect(isValidCnpj('')).toBe(false);
  });
});

describe('formatCnpj', () => {
  it('formats a digit-only CNPJ', () => {
    expect(formatCnpj('69635734000143')).toBe('69.635.734/0001-43');
  });
});
