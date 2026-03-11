import { Page } from '@playwright/test';
import { ProductDetailsPage } from './productDetails.page';

export class ProductsPage {

    private readonly page: Page

    constructor(page: Page) { this.page = page; }

    async clickFirstProduct() {
        await this.waitForProductsToLoad()
        await this.page.locator('.card').first().click();
        return new ProductDetailsPage(this.page);
    }

    async searchForProduct(name: string) {
        await this.waitForProductsToLoad()
        await this.page.getByTestId('search-query').fill(name)
        await Promise.all([
            this.page.waitForResponse(response => {
                if (!response.url().includes('/products') || response.request().method() !== 'GET') {
                    return false;
                }

                const url = new URL(response.url());
                return url.searchParams.get('q') === name && response.status() === 200;
            }),
            this.page.getByTestId('search-submit').press('Enter')
        ])
    }

    async sortProductBy(option: string) {
        await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes('/products') &&
                response.url().includes('sort') &&
                response.status() === 200
            ),
            await this.page.getByTestId('sort').selectOption(option)
        ])
    }

    async displayedProductsNamesList() {
        return await this.page.getByTestId('product-name').allInnerTexts()
    }

    async displayedProductsPricesList() {
        const prices = await this.page.getByTestId('product-price').allInnerTexts()
        return prices.map(price => parseFloat(price.replace('$', '')))
    }

    async waitForProductsToLoad() {
        await this.page.waitForSelector('.card-img-top')
    }
}