import { expect, test } from '@playwright/test';

test.describe('navigation menu', () => {
  test('desktop nav Contato link goes to /contact', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Contato' }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(
      page.getByRole('heading', { name: 'Vamos conversar' }),
    ).toBeVisible();
  });

  test('desktop profile nav links are visible', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'Sobre' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Projetos' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Tecnologias' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contato' })).toBeVisible();
  });

  test.describe('mobile menu', () => {
    test.use({ viewport: { width: 375, height: 667 }, hasTouch: true });

    test('sheet nav list scrolls to reveal all items', async ({ page }) => {
      await page.goto('/');

      await page.getByRole('button', { name: 'Menu' }).click();

      const sheet = page.locator('[data-slot="sheet-content"]');
      await expect(sheet).toBeVisible();

      const viewport = sheet.locator('[data-slot="scroll-area-viewport"]');
      await expect(viewport).toBeVisible();

      const overflows = await viewport.evaluate(
        (el) => el.scrollHeight > el.clientHeight,
      );
      expect(overflows).toBe(true);

      await viewport.evaluate((el) => {
        el.scrollTop = el.scrollHeight;
      });
      const scrollTop = await viewport.evaluate((el) => el.scrollTop);
      expect(scrollTop).toBeGreaterThan(0);

      await expect(
        sheet.getByRole('button', { name: 'Instagram' }),
      ).toBeVisible();
    });
  });

  test('language switch to English updates URL prefix', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Tema' }).click();
    await page.getByRole('menuitem', { name: 'Inglês' }).click();

    await expect(page).toHaveURL(/\/en(\/|$)/);
  });
});
