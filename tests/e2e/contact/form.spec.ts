import { expect, test } from '@playwright/test';

test.describe('contact form', () => {
  test('submits successfully and shows toast', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{}',
      });
    });

    await page.goto('/contact');

    await page.getByLabel('Nome').fill('Marcelo Mafra');
    await page.getByLabel('E-mail').fill('marcelo@example.com');
    await page.getByLabel('Assunto').fill('Proposta de projeto');
    await page
      .getByLabel('Mensagem')
      .fill('Mensagem de teste com mais de vinte caracteres.');

    await page.getByRole('button', { name: 'Enviar mensagem' }).click();

    await expect(
      page.getByText('Mensagem enviada. Respondo em breve.'),
    ).toBeVisible();
  });
});
