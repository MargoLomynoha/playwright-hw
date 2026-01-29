import { test } from './fixture/pages';
import { expect } from '@playwright/test';

test.describe('login and change response for profile request', () => {
    test('login', async ({ logPage }) => {
        await logPage.page.route('/api/users/profile', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    status: 'ok',
                    data: {
                        userId: 313085,
                        photoFilename: 'default-user.png',
                        name: 'Ivan',
                        lastName: 'Ivanov',
                    },
                }),
            });
        });

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

        const profileResponsePromise = logPage.page.waitForResponse(
            (response) => {
                return (
                    response.url().includes('/api/users/profile') &&
                    response.status() === 200
                );
            }
        );

        await Promise.all([
            logPage.page.waitForURL('/panel/profile', { waitUntil: 'load' }),
            logPage.clickOnNavButon(logPage.profileNavButton),
        ]);

        await profileResponsePromise;

        await logPage.checkUserName(logPage.userName);
    });
});

test.describe('API tests', () => {
    test.beforeEach('Login', async ({ request }) => {
        await request.post('/api/auth/signin', {
            data: {
                email: 'Marcella_Skiles@gmail.com',
                password: '12345Margo',
                remember: false,
            },
        });
    });

    test('success to add car and remove it', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 2,
                mileage: 110,
            },
        });

        expect(response.status()).toBe(201);

        const json = await response.json();

        expect(json.data.carBrandId).toBe(1);
        expect(json.data.carModelId).toBe(2);
        expect(json.data.mileage).toBe(110);
        expect(json.data.id).toBeDefined();
        expect(json.data.brand).toBeDefined();
        expect(json.data.brand).toBeDefined();

        // remove car
        const deleteResponse = await request.delete(
            `/api/cars/${json.data.id}`
        );
        expect(deleteResponse.status()).toBe(200);
    });

    test('failed to add car without car model', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: {
                carBrandId: 2,
                mileage: 110,
            },
        });

        expect(response.status()).toBe(400);

        const json = await response.json();

        expect(json.status).toBe('error');
        expect(json.message).toBe('Car model id is required');
    });

    test('failed to add car with minus value of mileage', async ({
        request,
    }) => {
        const response = await request.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 2,
                mileage: -11,
            },
        });

        expect(response.status()).toBe(400);

        const json = await response.json();

        expect(json.status).toBe('error');
        expect(json.message).toBe('Mileage has to be from 0 to 999999');
    });
});
