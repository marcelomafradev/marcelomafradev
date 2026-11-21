import { COMPANY, CONTACT_EMAIL } from './personal';

export const LEGAL_PLACEHOLDERS = {
  legalName: COMPANY.legalName,
  tradeName: COMPANY.tradeName,
  cnpj: COMPANY.cnpj,
  email: CONTACT_EMAIL,
} as const;
