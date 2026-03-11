import { test } from '../../fixtures/pages.fixtures';
import { expect } from '@playwright/test';
import { getFavourites, deleteFavourite } from '../../utils/favourites.api';
import { routesAPI, routesUI } from '../../routes/routes';

test.describe('Favourites', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/")
    })

    test('User can add a product to favourites', async ({ productsPage, request }) => {
        // Ensure no favourites for this user
        const existing = await getFavourites(request);
        console.log(existing)
        // console.log(existing)
        await deleteFavourite(existing, request);

        // Act
        const details = await productsPage.clickFirstProduct();
        await details.addToFavorites();

        // Assert
        const alertText = await details.getAlertText()
        expect(alertText).toContain('Product added to your favorites list.');

        // Cleanup
        const favourites = await getFavourites(request);
        await deleteFavourite(favourites, request);

    });
});