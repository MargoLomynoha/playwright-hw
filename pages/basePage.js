import { expect } from '@playwright/test';

export class BasePage {
    constructor(page, url) {
        this.page = page;
        this.url = url;
    }
    async openSite() {
        await this.page.goto(this.url ?? '');
    }
    getElement(selector) {
        return this.page.locator(selector);
    }
    async elementExists(element) {
        await expect(element).toBeVisible();
    }
    async elementDoesNotExist(element) {
        await expect(element).toHaveCount(0);
    }
    urlShouldContain(path) {
        return expect(this.page.url()).toContain(path);
    }
}
