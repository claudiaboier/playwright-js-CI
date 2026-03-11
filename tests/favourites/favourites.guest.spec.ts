import { test } from '../../fixtures/pages.fixtures';
import { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
        await page.goto("/")
    })

test.describe('Favourites', () => {

    test('Not logged in user cannot add a product to favourites', async ({ productsPage, page, request }) => {
    
        // Act
        const details = await productsPage.clickFirstProduct();
        await details.addToFavorites();

        // Assert
        const alertText = await page.getByRole('alert').innerText();
        expect(alertText).toContain('Unauthorized, can not add product to your favorite list.');

    });
});