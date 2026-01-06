import { BasePage } from './basePage';
import { expect } from '@playwright/test';

export class RegistrationPage extends BasePage {
    constructor(page) {
        super(page, '/');
    }

    async openRegistrationForm() {
        const signUpBtn = this.getElement('[class^="hero-descriptor_btn"]');
        await expect(signUpBtn).toContainText('Sign up');
        await signUpBtn.click();
    }

    async checkRegistrationFormShouldBeVisible() {
        await expect(this.getElement('.modal-content')).toBeVisible();
    }

    get userNameInput() {
        return this.getElement('#signupName');
    }
    get userNameError() {
        return this.getElement('[id=signupName] + div p');
    }
    get userLastNameInput() {
        return this.getElement('#signupLastName');
    }
    get userLastNameError() {
        return this.getElement('[id=signupLastName] + div p');
    }
    get userEmailInput() {
        return this.getElement('#signupEmail');
    }
    get userEmailError() {
        return this.getElement('[id=signupEmail] + div p');
    }
    get userPasswordInput() {
        return this.getElement('#signupPassword');
    }
    get userPasswordError() {
        return this.getElement('[id=signupPassword] + div p');
    }
    get userReenterPasswordInput() {
        return this.getElement('#signupRepeatPassword');
    }
    get userReenterPasswordError() {
        return this.getElement('[id=signupRepeatPassword] + div p');
    }
    get registerButton() {
        return this.getElement('[class="btn btn-primary"]');
    }
    get formErrorMessage() {
        return this.getElement('app-signup-modal p');
    }

    async typeTextIntoInput(input, text) {
        await input.fill(text);
    }

    async checkInputHasTypePassword(input) {
        await expect(input).toHaveAttribute('type', 'password');
    }

    async inputFeedbackHasMessage(element, expectedMessage) {
        await expect(element).toHaveText(expectedMessage);
    }

    async shouldRegisterButtonBeEnabled() {
        await expect(this.registerButton).toBeEnabled();
    }

    async shouldRegisterButtonBeDisabled() {
        await expect(this.registerButton).toBeDisabled();
    }

    async clickOnRegisterButton() {
        await this.registerButton.click();
    }

    async inputShouldBeVisible(input) {
        await expect(input).toBeVisible();
    }

    async checkErrorMessageDoesNotExist(errorMessageElement) {
        await expect(errorMessageElement).toHaveCount(0);
    }

    async setInputFocused(input) {
        await input.focus();
    }

    async setInputBlurred(input) {
        await input.blur();
    }

    async inputShouldHaveRedBorder(input) {
        await expect(input).toContainClass('is-invalid');
    }

    async shouldOpenGaragePage() {
        await this.urlShouldContain('panel/garage');
    }
}
