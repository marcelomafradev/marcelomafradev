import { NextResponse } from 'next/server';
import { createContactSchema } from '@/lib/contact-schema';
import { isMailerConfigured, sendContactMessage } from '@/lib/mailer';

const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;

// Per-instance Map: best-effort only on multi-instance serverless deploys.
const attemptsByIp = new Map<string, number[]>();

const contactSchema = createContactSchema({
  name: 'name',
  email: 'email',
  subject: 'subject',
  message: 'message',
});

function sweepExpiredAttempts(now: number) {
  for (const [ip, timestamps] of attemptsByIp) {
    const recent = timestamps.filter(
      (timestamp) => now - timestamp < WINDOW_MS,
    );

    if (recent.length === 0) {
      attemptsByIp.delete(ip);
    } else {
      attemptsByIp.set(ip, recent);
    }
  }
}

function isRateLimited(ip: string) {
  const now = Date.now();
  sweepExpiredAttempts(now);

  const recent = (attemptsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    attemptsByIp.set(ip, recent);
    return true;
  }

  attemptsByIp.set(ip, [...recent, now]);
  return false;
}

export async function POST(request: Request) {
  if (!isMailerConfigured()) {
    return NextResponse.json({ error: 'misconfigured' }, { status: 503 });
  }

  const parsed = contactSchema.safeParse(
    await request.json().catch(() => null),
  );

  if (!parsed.success || parsed.data.website) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'rate-limited' }, { status: 429 });
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await sendContactMessage({ name, email, subject, message });
  } catch {
    return NextResponse.json({ error: 'send-failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
