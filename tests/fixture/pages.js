import { test as base, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registrationPage';
import { LoginPage } from '../../pages/loginPage';

const STORAGE_STATE_PATH = 'storageState.json';

export const test = base.extend({
    userGaragePage: async ({ page }, use) => {
        const logPage = new LoginPage(page);
        await logPage.openSite();
        await logPage.openLoginForm();

        await logPage.typeDataIntoInputs(
            logPage.userEmailInput,
            'Marcella_Skiles@gmail.com'
        );
        await logPage.typeDataIntoInputs(
            logPage.userPasswordInput,
            '12345Margo'
        );

        await Promise.all([
            page.waitForURL('/panel/garage', { waitUntil: 'load' }),
            logPage.clickOnLoginButton(),
        ]);

        await logPage.shouldOpenGaragePage();
        await page.context().storageState({ path: STORAGE_STATE_PATH });
        await use(page);
    },
    regPage: async ({ page }, use) => {
        const regPage = new RegistrationPage(page);
        await regPage.openSite();
        await regPage.openRegistrationForm();
        await use(regPage);
    },
    logPage: async ({ page }, use) => {
        const logPage = new LoginPage(page);
        await logPage.openSite();
        await logPage.openLoginForm();
        await use(logPage);
    },
});

export { expect };
