import { Page } from '@playwright/test';

export class ProductDetailsPage {

    private readonly page: Page

    constructor(page: Page) { this.page = page; } 

    async addToFavorites() {
        await this.page.waitForSelector('button:has-text("Add to favourites")');
        await this.page.getByRole('button', { name: 'Add to favourites' }).click();
    }

    async getAlertText() {
        return await this.page.getByRole('alert').innerText();
    }

}

