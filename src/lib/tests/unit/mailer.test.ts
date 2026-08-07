import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CONTACT_EMAIL } from '@/constants';

const { createTransportMock, sendMailMock } = vi.hoisted(() => {
  const sendMailMock = vi.fn();
  const createTransportMock = vi.fn(() => ({ sendMail: sendMailMock }));
  return { createTransportMock, sendMailMock };
});

vi.mock('nodemailer', () => ({
  default: {
    createTransport: createTransportMock,
  },
}));

const originalEnv = { ...process.env };

describe('mailer', () => {
  beforeEach(() => {
    vi.resetModules();
    createTransportMock.mockClear();
    sendMailMock.mockReset();
    sendMailMock.mockResolvedValue(undefined);

    process.env = { ...originalEnv };
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASSWORD;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_FROM;
    delete process.env.CONTACT_TO_EMAIL;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('isMailerConfigured', () => {
    it('returns false when SMTP env vars are missing', async () => {
      const { isMailerConfigured } = await import('@/lib/mailer');

      expect(isMailerConfigured()).toBe(false);
    });

    it('returns false when only some SMTP env vars are set', async () => {
      process.env.SMTP_HOST = 'smtp.example.com';
      process.env.SMTP_USER = 'user@example.com';

      const { isMailerConfigured } = await import('@/lib/mailer');

      expect(isMailerConfigured()).toBe(false);
    });

    it('returns true when SMTP_HOST, SMTP_USER, and SMTP_PASSWORD are set', async () => {
      process.env.SMTP_HOST = 'smtp.example.com';
      process.env.SMTP_USER = 'user@example.com';
      process.env.SMTP_PASSWORD = 'secret';

      const { isMailerConfigured } = await import('@/lib/mailer');

      expect(isMailerConfigured()).toBe(true);
    });
  });

  describe('sendContactMessage', () => {
    beforeEach(() => {
      process.env.SMTP_HOST = 'smtp.example.com';
      process.env.SMTP_USER = 'user@example.com';
      process.env.SMTP_PASSWORD = 'secret';
      process.env.SMTP_PORT = '587';
    });

    it('sends escaped HTML and text via nodemailer', async () => {
      const { sendContactMessage } = await import('@/lib/mailer');

      await sendContactMessage({
        name: 'Marcelo <script>',
        email: 'marcelo@example.com',
        subject: 'Hi & hello',
        message: 'Line 1\n<script>alert(1)</script>',
      });

      expect(createTransportMock).toHaveBeenCalledWith({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
          user: 'user@example.com',
          pass: 'secret',
        },
      });

      expect(sendMailMock).toHaveBeenCalledOnce();
      const payload = sendMailMock.mock.calls[0]?.[0];

      expect(payload).toMatchObject({
        from: '"Marcelo <script> (site)" <user@example.com>',
        to: CONTACT_EMAIL,
        replyTo: '"Marcelo <script>" <marcelo@example.com>',
        subject: '[marcelomafra.dev] Hi & hello',
      });

      expect(payload.text).toContain('Line 1\n<script>alert(1)</script>');
      expect(payload.text).toContain('Marcelo <script>');
      expect(payload.text).toContain('marcelo@example.com');

      expect(payload.html).toContain(
        'Line 1\n&lt;script&gt;alert(1)&lt;/script&gt;',
      );
      expect(payload.html).toContain('Marcelo &lt;script&gt;');
      expect(payload.html).toContain('mailto:marcelo@example.com');
      expect(payload.html).not.toContain('<script>alert(1)</script>');
    });

    it('uses CONTACT_TO_EMAIL and SMTP_FROM when provided', async () => {
      process.env.CONTACT_TO_EMAIL = 'inbox@example.com';
      process.env.SMTP_FROM = 'from@example.com';
      process.env.SMTP_PORT = '465';

      const { sendContactMessage } = await import('@/lib/mailer');

      await sendContactMessage({
        name: 'Ana',
        email: 'ana@example.com',
        subject: 'Subject',
        message: 'x'.repeat(20),
      });

      expect(createTransportMock).toHaveBeenCalledWith(
        expect.objectContaining({
          port: 465,
          secure: true,
        }),
      );

      const payload = sendMailMock.mock.calls[0]?.[0];
      expect(payload.from).toBe('"Ana (site)" <from@example.com>');
      expect(payload.to).toBe('inbox@example.com');
    });

    it('defaults SMTP port to 587 when unset', async () => {
      delete process.env.SMTP_PORT;

      const { sendContactMessage } = await import('@/lib/mailer');

      await sendContactMessage({
        name: 'Ana',
        email: 'ana@example.com',
        subject: 'Subject',
        message: 'x'.repeat(20),
      });

      expect(createTransportMock).toHaveBeenCalledWith(
        expect.objectContaining({
          port: 587,
          secure: false,
        }),
      );
    });
  });
});
