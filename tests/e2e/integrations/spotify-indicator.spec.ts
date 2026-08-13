import { expect, test } from '@playwright/test';
import nowPlaying from '../../fixtures/now-playing.json';

test.describe('spotify indicator', () => {
  test('shows fixture song title and artist when playing', async ({ page }) => {
    await page.route('**/api/spotify/now-playing', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(nowPlaying),
      });
    });

    await page.goto('/');

    await expect(page.getByText(nowPlaying.title).first()).toBeVisible();
    await expect(page.getByText(nowPlaying.artist).first()).toBeVisible();
  });
});
