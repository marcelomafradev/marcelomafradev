import { expect, test } from '@playwright/test';

const EXPECTED_HEADERS = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-frame-options': 'SAMEORIGIN',
};

test.describe('security headers', () => {
  for (const [header, value] of Object.entries(EXPECTED_HEADERS)) {
    test(`home responds with ${header}`, async ({ page }) => {
      const response = await page.goto('/');

      expect(response?.headers()[header]).toBe(value);
    });
  }

  test('localized pages carry the headers too', async ({ page }) => {
    const response = await page.goto('/en/about');
    const headers = response?.headers() ?? {};

    for (const [header, value] of Object.entries(EXPECTED_HEADERS)) {
      expect(headers[header]).toBe(value);
    }
  });

  test('static documents carry the headers too', async ({ request }) => {
    const response = await request.get('/documents/marcelo-mafra-cv-en.pdf');
    const headers = response.headers();

    expect(response.ok()).toBeTruthy();
    for (const [header, value] of Object.entries(EXPECTED_HEADERS)) {
      expect(headers[header]).toBe(value);
    }
  });
});
