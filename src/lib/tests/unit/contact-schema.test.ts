import { describe, expect, it } from 'vitest';
import {
  CONTACT_EMAIL_MAX_LENGTH,
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_MESSAGE_MIN_LENGTH,
  CONTACT_NAME_MAX_LENGTH,
  CONTACT_SUBJECT_MAX_LENGTH,
} from '@/constants';
import { createContactSchema } from '@/lib/contact-schema';

const messages = {
  name: 'n',
  email: 'e',
  subject: 's',
  message: 'm',
};

const schema = createContactSchema(messages);

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Marcelo',
    email: 'marcelo@example.com',
    subject: 'Hello',
    message: 'x'.repeat(CONTACT_MESSAGE_MIN_LENGTH),
    website: '',
    ...overrides,
  };
}

describe('createContactSchema', () => {
  it('parses a valid payload', () => {
    const result = schema.safeParse(validPayload());

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Marcelo');
      expect(result.data.email).toBe('marcelo@example.com');
      expect(result.data.subject).toBe('Hello');
      expect(result.data.message).toHaveLength(CONTACT_MESSAGE_MIN_LENGTH);
    }
  });

  it('trims whitespace from name, subject, and message', () => {
    const result = schema.safeParse(
      validPayload({
        name: '  Marcelo  ',
        subject: '  Hello  ',
        message: `  ${'x'.repeat(CONTACT_MESSAGE_MIN_LENGTH)}  `,
      }),
    );

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Marcelo');
      expect(result.data.subject).toBe('Hello');
      expect(result.data.message).toBe('x'.repeat(CONTACT_MESSAGE_MIN_LENGTH));
    }
  });

  it('rejects an empty name', () => {
    const result = schema.safeParse(validPayload({ name: '' }));

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(messages.name);
    }
  });

  it('rejects a short message', () => {
    const result = schema.safeParse(
      validPayload({
        message: 'x'.repeat(CONTACT_MESSAGE_MIN_LENGTH - 1),
      }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(messages.message);
    }
  });

  it('rejects a non-empty honeypot website field', () => {
    const result = schema.safeParse(
      validPayload({ website: 'https://spam.example' }),
    );

    expect(result.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = schema.safeParse(validPayload({ email: 'not-an-email' }));

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(messages.email);
    }
  });

  it('rejects empty subject', () => {
    const result = schema.safeParse(validPayload({ subject: '   ' }));

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(messages.subject);
    }
  });

  it('rejects fields that exceed max lengths', () => {
    expect(
      schema.safeParse(
        validPayload({ name: 'n'.repeat(CONTACT_NAME_MAX_LENGTH + 1) }),
      ).success,
    ).toBe(false);

    expect(
      schema.safeParse(
        validPayload({
          email: `${'a'.repeat(CONTACT_EMAIL_MAX_LENGTH)}@x.com`,
        }),
      ).success,
    ).toBe(false);

    expect(
      schema.safeParse(
        validPayload({
          subject: 's'.repeat(CONTACT_SUBJECT_MAX_LENGTH + 1),
        }),
      ).success,
    ).toBe(false);

    expect(
      schema.safeParse(
        validPayload({
          message: 'm'.repeat(CONTACT_MESSAGE_MAX_LENGTH + 1),
        }),
      ).success,
    ).toBe(false);
  });

  it('allows omitting the website honeypot', () => {
    const { website: _website, ...withoutWebsite } = validPayload();
    const result = schema.safeParse(withoutWebsite);

    expect(result.success).toBe(true);
  });
});
