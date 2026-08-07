import { expect, test } from '@playwright/test';

test.describe('filters and carousels', () => {
  test('project filter tab becomes selected when clicked', async ({ page }) => {
    await page.goto('/projects');

    const mobileTab = page.getByRole('tab', { name: 'Mobile' });
    await expect(mobileTab).toBeVisible();
    await expect(mobileTab).toHaveAttribute('aria-selected', 'false');

    await mobileTab.click();
    await expect(mobileTab).toHaveAttribute('aria-selected', 'true');
  });

  test('about page books carousel exposes next/prev controls', async ({
    page,
  }) => {
    await page.goto('/about');

    const carousel = page.locator('[aria-roledescription="carousel"]').first();
    await expect(carousel).toBeVisible();
    await expect(
      carousel.getByRole('button', { name: 'Next slide' }),
    ).toBeVisible();
    await expect(
      carousel.getByRole('button', { name: 'Previous slide' }),
    ).toBeVisible();
  });
});
