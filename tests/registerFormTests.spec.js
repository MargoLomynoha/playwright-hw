import { faker } from '@faker-js/faker';
import { test } from './fixture/pages';

test.describe('Registration modal', () => {
    test('check is modal form correct', async ({ regPage }) => {
        // Registration form should be visible
        await regPage.checkRegistrationFormShouldBeVisible();
        // check that all needed inputs exist
        await regPage.inputShouldBeVisible(regPage.userNameInput);
        await regPage.inputShouldBeVisible(regPage.userLastNameInput);
        await regPage.inputShouldBeVisible(regPage.userEmailInput);
        await regPage.inputShouldBeVisible(regPage.userPasswordInput);
        await regPage.inputShouldBeVisible(regPage.userReenterPasswordInput);
        //Register button should be disabled
        await regPage.shouldRegisterButtonBeDisabled();
        // check that form doesn't have error messages
        await regPage.checkErrorMessageDoesNotExist(regPage.userNameError);
        await regPage.checkErrorMessageDoesNotExist(regPage.userLastNameError);
        await regPage.checkErrorMessageDoesNotExist(regPage.userEmailError);
        await regPage.checkErrorMessageDoesNotExist(regPage.userPasswordError);
        await regPage.checkErrorMessageDoesNotExist(
            regPage.userReenterPasswordError
        );
    });
});

test.describe('Required input validation', () => {
    test('Inputs have "input required" error messages if inputs are empty', async ({
        regPage,
    }) => {
        // set focus on the input to display the error
        await regPage.setInputFocused(regPage.userNameInput);
        await regPage.setInputBlurred(regPage.userNameInput);
        await regPage.setInputFocused(regPage.userLastNameInput);
        await regPage.setInputBlurred(regPage.userLastNameInput);
        await regPage.setInputFocused(regPage.userEmailInput);
        await regPage.setInputBlurred(regPage.userEmailInput);
        await regPage.setInputFocused(regPage.userPasswordInput);
        await regPage.setInputBlurred(regPage.userPasswordInput);
        await regPage.setInputFocused(regPage.userReenterPasswordInput);
        await regPage.setInputBlurred(regPage.userReenterPasswordInput);

        // check that errors are displayed and inputs have red borders
        await regPage.inputFeedbackHasMessage(
            regPage.userNameError,
            'Name required'
        );
        await regPage.inputShouldHaveRedBorder(regPage.userNameInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userLastNameError,
            'Last name required'
        );
        await regPage.inputShouldHaveRedBorder(regPage.userLastNameInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userEmailError,
            'Email required'
        );
        await regPage.inputShouldHaveRedBorder(regPage.userEmailInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userPasswordError,
            'Password required'
        );
        await regPage.inputShouldHaveRedBorder(regPage.userPasswordInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userReenterPasswordError,
            'Re-enter password required'
        );
        await regPage.inputShouldHaveRedBorder(
            regPage.userReenterPasswordInput
        );
        //Register button should be disabled
        await regPage.shouldRegisterButtonBeDisabled();
    });

    test('Name input validation', async ({ regPage }) => {
        await regPage.typeTextIntoInput(regPage.userNameInput, 'a');
        await regPage.setInputBlurred(regPage.userNameInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userNameError,
            'Name has to be from 2 to 20 characters long'
        );

        await regPage.typeTextIntoInput(
            regPage.userNameInput,
            'ItIsaLongUserFirstName'
        );
        await regPage.setInputBlurred(regPage.userNameInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userNameError,
            'Name has to be from 2 to 20 characters long'
        );

        await regPage.typeTextIntoInput(regPage.userNameInput, 'текст');
        await regPage.setInputBlurred(regPage.userNameInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userNameError,
            'Name is invalid'
        );

        await regPage.typeTextIntoInput(regPage.userNameInput, 'ab');
        await regPage.setInputBlurred(regPage.userNameInput);
        await regPage.checkErrorMessageDoesNotExist(regPage.userNameError);

        await regPage.typeTextIntoInput(regPage.userNameInput, 'FirstName');
        await regPage.setInputBlurred(regPage.userNameInput);
        await regPage.checkErrorMessageDoesNotExist(regPage.userNameError);

        await regPage.typeTextIntoInput(
            regPage.userNameInput,
            'qwertyuiopasdfghjklz'
        );
        await regPage.setInputBlurred(regPage.userNameInput);
        await regPage.checkErrorMessageDoesNotExist(regPage.userNameError);
    });

    test('Last name input validation', async ({ regPage }) => {
        await regPage.typeTextIntoInput(regPage.userLastNameInput, 'a');
        await regPage.setInputBlurred(regPage.userLastNameInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userLastNameError,
            'Last name has to be from 2 to 20 characters long'
        );

        await regPage.typeTextIntoInput(
            regPage.userLastNameInput,
            'ItIsaLongUserLastNameAndExtraText'
        );

        await regPage.setInputBlurred(regPage.userLastNameInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userLastNameError,
            'Last name has to be from 2 to 20 characters long'
        );

        await regPage.typeTextIntoInput(regPage.userLastNameInput, 'текст');
        await regPage.setInputBlurred(regPage.userLastNameInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userLastNameError,
            'Last name is invalid'
        );

        await regPage.typeTextIntoInput(regPage.userLastNameInput, 'ab');
        await regPage.setInputBlurred(regPage.userLastNameInput);
        await regPage.checkErrorMessageDoesNotExist(regPage.userLastNameError);

        await regPage.typeTextIntoInput(regPage.userLastNameInput, 'LastName');
        await regPage.setInputBlurred(regPage.userLastNameInput);
        await regPage.checkErrorMessageDoesNotExist(regPage.userLastNameError);

        await regPage.typeTextIntoInput(
            regPage.userLastNameInput,
            'qwertyuiopasdfghjklz'
        );
        await regPage.setInputBlurred(regPage.userLastNameInput);
        await regPage.checkErrorMessageDoesNotExist(regPage.userLastNameError);
    });

    test('Email input validation', async ({ regPage }) => {
        await regPage.typeTextIntoInput(regPage.userEmailInput, 'ab');
        await regPage.setInputBlurred(regPage.userEmailInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userEmailError,
            'Email is incorrect'
        );

        await regPage.typeTextIntoInput(regPage.userEmailInput, ' ');
        await regPage.setInputBlurred(regPage.userEmailInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userEmailError,
            'Email is incorrect'
        );

        await regPage.typeTextIntoInput(regPage.userEmailInput, '@');
        await regPage.setInputBlurred(regPage.userEmailInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userEmailError,
            'Email is incorrect'
        );

        await regPage.typeTextIntoInput(
            regPage.userEmailInput,
            'test@test.com'
        );
        await regPage.setInputBlurred(regPage.userEmailInput);
        await regPage.checkErrorMessageDoesNotExist(regPage.userEmailError);
    });

    test('Password input validation', async ({ regPage }) => {
        await regPage.typeTextIntoInput(regPage.userPasswordInput, '1');
        await regPage.setInputBlurred(regPage.userPasswordInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userPasswordError,
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        );

        // typing 16 symbols in password input
        await regPage.typeTextIntoInput(
            regPage.userPasswordInput,
            '123456789zxcvbNm'
        );
        await regPage.setInputBlurred(regPage.userPasswordInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userPasswordError,
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        );

        // typing the valid password
        await regPage.typeTextIntoInput(
            regPage.userPasswordInput,
            '12345Margo'
        );
        await regPage.setInputBlurred(regPage.userPasswordInput);
        await regPage.checkErrorMessageDoesNotExist(regPage.userPasswordError);

        // typing the password without a number
        await regPage.typeTextIntoInput(
            regPage.userPasswordInput,
            'MargoPasswordMargo'
        );
        await regPage.setInputBlurred(regPage.userPasswordInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userPasswordError,
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        );

        // typing the password without a capital letter
        await regPage.typeTextIntoInput(
            regPage.userPasswordInput,
            '12345margo'
        );
        await regPage.setInputBlurred(regPage.userPasswordInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userPasswordError,
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        );

        // typing the password without small letters
        await regPage.typeTextIntoInput(
            regPage.userPasswordInput,
            '12345MARGO'
        );
        await regPage.setInputBlurred(regPage.userPasswordInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userPasswordError,
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        );
    });

    test('Re-enter password input validation', async ({ regPage }) => {
        // check when password and re-entered password inputs are not matched
        await regPage.typeTextIntoInput(
            regPage.userPasswordInput,
            '12345Margo'
        );
        await regPage.setInputBlurred(regPage.userPasswordInput);
        await regPage.checkErrorMessageDoesNotExist(regPage.userPasswordError);
        await regPage.typeTextIntoInput(
            regPage.userReenterPasswordInput,
            '12345MargoPass'
        );
        await regPage.setInputBlurred(regPage.userReenterPasswordInput);
        await regPage.inputFeedbackHasMessage(
            regPage.userReenterPasswordError,
            'Passwords do not match'
        );

        // check when password and re-entered password inputs are matched
        await regPage.typeTextIntoInput(
            regPage.userPasswordInput,
            '12345Margo'
        );
        await regPage.setInputBlurred(regPage.userPasswordInput);
        await regPage.checkErrorMessageDoesNotExist(regPage.userPasswordError);
        await regPage.typeTextIntoInput(
            regPage.userReenterPasswordInput,
            '12345Margo'
        );
        await regPage.setInputBlurred(regPage.userReenterPasswordInput);
        await regPage.checkErrorMessageDoesNotExist(regPage.userPasswordError);
    });

    test('Button behavior with valid values but this user is already existed', async ({
        regPage,
    }) => {
        await regPage.typeTextIntoInput(regPage.userNameInput, 'FirstName');
        await regPage.typeTextIntoInput(regPage.userLastNameInput, 'LastName');
        await regPage.typeTextIntoInput(
            regPage.userEmailInput,
            'test@test.com'
        );
        await regPage.typeTextIntoInput(
            regPage.userPasswordInput,
            '12345Margo'
        );
        await regPage.typeTextIntoInput(
            regPage.userReenterPasswordInput,
            '12345Margo'
        );
        await regPage.shouldRegisterButtonBeEnabled();
        await regPage.elementDoesNotExist(regPage.formErrorMessage);
        await regPage.clickOnRegisterButton();
        await regPage.elementExists(regPage.formErrorMessage);
    });

    test('Successfully created a user with valid data and a unique email', async ({
        regPage,
    }) => {
        let fakeEmail = faker.internet.email();
        let prefix = 'pw-';
        let email = `${prefix}${fakeEmail}`;
        await regPage.typeTextIntoInput(regPage.userNameInput, 'FirstName');
        await regPage.typeTextIntoInput(regPage.userLastNameInput, 'LastName');
        await regPage.typeTextIntoInput(regPage.userEmailInput, email);
        await regPage.typeTextIntoInput(
            regPage.userPasswordInput,
            '12345Margo'
        );
        await regPage.typeTextIntoInput(
            regPage.userReenterPasswordInput,
            '12345Margo'
        );
        await regPage.shouldRegisterButtonBeEnabled();
        await regPage.elementDoesNotExist(regPage.formErrorMessage);
        await Promise.all([
            regPage.page.waitForURL('/panel/garage', { waitUntill: 'load' }),
            regPage.clickOnRegisterButton(),
        ]);
        await regPage.shouldOpenGaragePage();
    });
});
