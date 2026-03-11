import { Page } from '@playwright/test';

export class Navbar {
    private readonly page: Page

    constructor(page: Page) { this.page = page; }

    async selectMenuItem(itemname: string, subItemName?: string) {
        await this.page.getByRole('link', { name: itemname }).click();
        if (subItemName) {
            await this.page.getByRole('link', { name: subItemName }).click();
        }
    }
}