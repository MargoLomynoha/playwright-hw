import { test } from './fixture/pages';

test.describe('login', () => {
    test('login', async ({ logPage }) => {
        await logPage.typeDataIntoInputs(
            logPage.userEmailInput,
            'Marcella_Skiles@gmail.com'
        );
        await logPage.typeDataIntoInputs(
            logPage.userPasswordInput,
            '12345Margo'
        );

        await Promise.all([
            logPage.page.waitForURL('/panel/garage', { waitUntil: 'load' }),
            logPage.clickOnLoginButton(),
        ]);
        await logPage.shouldOpenGaragePage();
    });
});
