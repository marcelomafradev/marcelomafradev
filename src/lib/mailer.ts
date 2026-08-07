import nodemailer from 'nodemailer';
import { CONTACT_EMAIL } from '@/constants';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function isMailerConfigured() {
  return Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD,
  );
}

function createTransport() {
  const port = Number(process.env.SMTP_PORT ?? 587);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function sendContactMessage({
  name,
  email,
  subject,
  message,
}: ContactMessage) {
  const transport = createTransport();
  const to = process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL;

  await transport.sendMail({
    from: `"${name} (site)" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
    to,
    replyTo: `"${name}" <${email}>`,
    subject: `[marcelomafra.dev] ${subject}`,
    text: `${message}\n\n---\n${name}\n${email}`,
    html: `
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      <hr />
      <p><strong>${escapeHtml(name)}</strong><br />
      <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    `,
  });
}
