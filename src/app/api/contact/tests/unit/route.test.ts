import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CONTACT_MESSAGE_MIN_LENGTH } from '@/constants';

const { isMailerConfiguredMock, sendContactMessageMock } = vi.hoisted(() => ({
  isMailerConfiguredMock: vi.fn(),
  sendContactMessageMock: vi.fn(),
}));

vi.mock('@/lib/mailer', () => ({
  isMailerConfigured: isMailerConfiguredMock,
  sendContactMessage: sendContactMessageMock,
}));

import { POST } from '@/app/api/contact/route';

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Marcelo',
    email: 'marcelo@example.com',
    subject: 'Hello there',
    message: 'x'.repeat(CONTACT_MESSAGE_MIN_LENGTH),
    website: '',
    ...overrides,
  };
}

function makeRequest(
  body: unknown,
  {
    ip = '203.0.113.10',
    jsonFails = false,
  }: { ip?: string; jsonFails?: boolean } = {},
): Request {
  const request = {
    headers: {
      get(name: string) {
        if (name.toLowerCase() === 'x-forwarded-for') {
          return ip;
        }

        return null;
      },
    },
    json: jsonFails
      ? async () => {
          throw new Error('invalid json');
        }
      : async () => body,
  };

  return request as Request;
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    isMailerConfiguredMock.mockReset();
    sendContactMessageMock.mockReset();
    isMailerConfiguredMock.mockReturnValue(true);
    sendContactMessageMock.mockResolvedValue(undefined);
  });

  it('returns 503 when the mailer is unconfigured', async () => {
    isMailerConfiguredMock.mockReturnValue(false);

    const response = await POST(makeRequest(validBody(), { ip: '10.0.0.1' }));

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: 'misconfigured' });
    expect(sendContactMessageMock).not.toHaveBeenCalled();
  });

  it('returns 400 on a filled honeypot', async () => {
    const response = await POST(
      makeRequest(validBody({ website: 'https://spam.example' }), {
        ip: '10.0.0.2',
      }),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'invalid' });
    expect(sendContactMessageMock).not.toHaveBeenCalled();
  });

  it('returns 400 on a message under CONTACT_MESSAGE_MIN_LENGTH', async () => {
    const response = await POST(
      makeRequest(
        validBody({
          message: 'x'.repeat(CONTACT_MESSAGE_MIN_LENGTH - 1),
        }),
        { ip: '10.0.0.3' },
      ),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'invalid' });
    expect(sendContactMessageMock).not.toHaveBeenCalled();
  });

  it('returns 429 on the 6th valid request in one window', async () => {
    const ip = '10.0.0.4';

    for (let i = 0; i < 5; i += 1) {
      const response = await POST(makeRequest(validBody(), { ip }));
      expect(response.status).toBe(200);
    }

    const limited = await POST(makeRequest(validBody(), { ip }));

    expect(limited.status).toBe(429);
    expect(await limited.json()).toEqual({ error: 'rate-limited' });
    expect(sendContactMessageMock).toHaveBeenCalledTimes(5);
  });

  it('does not consume rate-limit quota for a malformed body', async () => {
    const ip = '10.0.0.5';

    for (let i = 0; i < 5; i += 1) {
      const malformed = await POST(
        makeRequest({ not: 'valid' }, { ip, jsonFails: i % 2 === 0 }),
      );
      expect(malformed.status).toBe(400);
    }

    for (let i = 0; i < 5; i += 1) {
      const response = await POST(makeRequest(validBody(), { ip }));
      expect(response.status).toBe(200);
    }

    const limited = await POST(makeRequest(validBody(), { ip }));
    expect(limited.status).toBe(429);
    expect(sendContactMessageMock).toHaveBeenCalledTimes(5);
  });

  it('returns 502 when sendContactMessage throws', async () => {
    sendContactMessageMock.mockRejectedValue(new Error('smtp down'));

    const response = await POST(makeRequest(validBody(), { ip: '10.0.0.6' }));

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: 'send-failed' });
  });

  it('uses unknown IP when x-forwarded-for is absent', async () => {
    const request = {
      headers: {
        get() {
          return null;
        },
      },
      json: async () => validBody(),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  it('sweeps expired rate-limit entries between windows', async () => {
    const ip = '10.0.0.7';
    const now = Date.now();
    const realNow = Date.now.bind(Date);

    vi.spyOn(Date, 'now').mockImplementation(() => now);

    for (let i = 0; i < 5; i += 1) {
      const response = await POST(makeRequest(validBody(), { ip }));
      expect(response.status).toBe(200);
    }

    // Advance past WINDOW_MS (10 minutes)
    vi.spyOn(Date, 'now').mockImplementation(() => now + 11 * 60 * 1000);

    const response = await POST(makeRequest(validBody(), { ip }));
    expect(response.status).toBe(200);

    vi.spyOn(Date, 'now').mockImplementation(realNow);
  });
});
