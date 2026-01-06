import { test as base, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registrationPage';

export const test = base.test.extend({
    regPage: async ({ page }, use) => {
        const regPage = new RegistrationPage(page);
        await regPage.openSite();
        await regPage.openRegistrationForm();
        await use(regPage);
    },
});

export { expect };
