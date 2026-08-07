import { expect, test } from '@playwright/test';
import chessSnapshot from '../../fixtures/chess-snapshot.json';

test.describe('chess indicator', () => {
  test('shows Chess.com brand and rapid rating from fixture', async ({
    page,
  }) => {
    await page.route('**/api/chess', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(chessSnapshot),
      });
    });

    await page.goto('/');

    await expect(
      page.getByRole('link', { name: /Ver perfil no Chess\.com/i }),
    ).toBeVisible();
    await expect(page.getByText('Chess.com').first()).toBeVisible();
    await expect(
      page.getByText(String(chessSnapshot.rapidRating)).first(),
    ).toBeVisible();
  });
});
