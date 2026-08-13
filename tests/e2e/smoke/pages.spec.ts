import { expect, test } from '@playwright/test';

test.describe('smoke pages', () => {
  test('home title matches Marcelo Mafra', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Marcelo Mafra/);
  });

  test('about page shows "Sobre mim" in pt-br', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText('Sobre mim').first()).toBeVisible();
  });

  test('projects page returns main content', async ({ page }) => {
    const response = await page.goto('/projects');
    expect(response?.ok()).toBeTruthy();
    await expect(
      page.getByRole('heading', { name: 'Galeria de projetos' }),
    ).toBeVisible();
  });

  test('technologies page returns main content', async ({ page }) => {
    const response = await page.goto('/technologies');
    expect(response?.ok()).toBeTruthy();
    await expect(
      page.getByRole('heading', { name: 'Minhas tecnologias' }),
    ).toBeVisible();
  });

  test('contact page returns main content', async ({ page }) => {
    const response = await page.goto('/contact');
    expect(response?.ok()).toBeTruthy();
    await expect(
      page.getByRole('heading', { name: 'Vamos conversar' }),
    ).toBeVisible();
  });

  test('english home and about load with About me', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/Marcelo Mafra/);

    await page.goto('/en/about');
    await expect(page.getByText('About me').first()).toBeVisible();
  });
});
