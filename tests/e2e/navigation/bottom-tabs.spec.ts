import { expect, test } from '@playwright/test';

const TABS_SELECTOR = 'nav[aria-label="Navegação principal"]';

test.describe('bottom tabs', () => {
  test.describe('mobile', () => {
    test.use({ viewport: { width: 375, height: 667 }, hasTouch: true });

    test('navigates to the tapped page and marks it as current', async ({
      page,
    }) => {
      await page.goto('/');

      const tabs = page.locator(TABS_SELECTOR);
      await expect(tabs).toBeVisible();

      await tabs.getByRole('link', { name: 'Projetos' }).click();
      await expect(page).toHaveURL(/\/projects$/);

      await expect(tabs.locator('a[aria-current="page"]')).toHaveText(
        'Projetos',
      );
    });

    test('footer ends just above the floating tab bar at the end of the scroll', async ({
      page,
    }) => {
      await page.goto('/contact');

      const footer = page.locator('footer');
      await expect(footer).toBeAttached();

      await page.evaluate(() => {
        window.scrollTo(0, document.documentElement.scrollHeight);
      });
      await expect
        .poll(() =>
          page.evaluate(
            () =>
              Math.ceil(window.scrollY + window.innerHeight) >=
              document.documentElement.scrollHeight,
          ),
        )
        .toBe(true);

      const footerBox = await footer.boundingBox();
      const tabsBox = await page.locator(TABS_SELECTOR).boundingBox();

      expect(footerBox).not.toBeNull();
      expect(tabsBox).not.toBeNull();

      const gap = tabsBox!.y - (footerBox!.y + footerBox!.height);
      expect(gap).toBeGreaterThanOrEqual(0);
      expect(gap).toBeLessThanOrEqual(28);
    });
  });

  test('is hidden on desktop where the sidebar takes over', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    await expect(page.locator(TABS_SELECTOR)).toBeHidden();
  });
});
