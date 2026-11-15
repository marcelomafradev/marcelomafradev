const CNPJ_LENGTH = 14;

const FIRST_CHECK_WEIGHTS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

const SECOND_CHECK_WEIGHTS = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

function stripNonDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function computeCheckDigit(digits: string, weights: readonly number[]): number {
  const sum = weights.reduce(
    (total, weight, index) => total + Number(digits[index]) * weight,
    0,
  );

  const remainder = sum % 11;

  return remainder < 2 ? 0 : 11 - remainder;
}

export function isValidCnpj(value: string): boolean {
  const digits = stripNonDigits(value);

  if (digits.length !== CNPJ_LENGTH) {
    return false;
  }

  if (/^(\d)\1{13}$/.test(digits)) {
    return false;
  }

  const firstCheckDigit = computeCheckDigit(
    digits.slice(0, 12),
    FIRST_CHECK_WEIGHTS,
  );
  const secondCheckDigit = computeCheckDigit(
    digits.slice(0, 13),
    SECOND_CHECK_WEIGHTS,
  );

  return (
    Number(digits[12]) === firstCheckDigit &&
    Number(digits[13]) === secondCheckDigit
  );
}

export function formatCnpj(value: string): string {
  const digits = stripNonDigits(value);

  if (digits.length !== CNPJ_LENGTH) {
    return digits;
  }

  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}
