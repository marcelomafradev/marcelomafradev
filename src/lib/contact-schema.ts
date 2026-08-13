import { z } from 'zod';
import {
  CONTACT_EMAIL_MAX_LENGTH,
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_MESSAGE_MIN_LENGTH,
  CONTACT_NAME_MAX_LENGTH,
  CONTACT_SUBJECT_MAX_LENGTH,
} from '@/constants';

export type ContactSchemaMessages = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function createContactSchema(messages: ContactSchemaMessages) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, messages.name)
      .max(CONTACT_NAME_MAX_LENGTH, messages.name),
    email: z
      .email(messages.email)
      .max(CONTACT_EMAIL_MAX_LENGTH, messages.email),
    subject: z
      .string()
      .trim()
      .min(1, messages.subject)
      .max(CONTACT_SUBJECT_MAX_LENGTH, messages.subject),
    message: z
      .string()
      .trim()
      .min(CONTACT_MESSAGE_MIN_LENGTH, messages.message)
      .max(CONTACT_MESSAGE_MAX_LENGTH, messages.message),
    website: z.string().max(0).optional(),
  });
}
