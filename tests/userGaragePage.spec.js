import { test, expect } from './fixture/pages';

test.describe('user garage page', () => {
    test('user is already logged in', async ({ userGaragePage }) => {
        await expect(userGaragePage).toHaveURL('panel/garage');
        await expect(
            userGaragePage.locator('[class="dropdown-toggle user-nav_toggle"]')
        ).toBeVisible();
    });
});
