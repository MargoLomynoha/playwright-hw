import { expect } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page, '/');
    }
    get userEmailInput() {
        return this.getElement('#signinEmail');
    }
    get userPasswordInput() {
        return this.getElement('#signinPassword');
    }
    get loginButton() {
        return this.getElement('[class="btn btn-primary"]');
    }
    async openLoginForm() {
        const signInBtn = this.getElement(
            '[class="btn btn-outline-white header_signin"]'
        );
        await expect(signInBtn).toContainText('Sign In');
        await signInBtn.click();
    }

    async typeDataIntoInputs(input, value) {
        await input.fill(value);
    }

    async clickOnLoginButton() {
        await this.loginButton.click();
    }

    async shouldOpenGaragePage() {
        await this.urlShouldContain('panel/garage');
    }
}
