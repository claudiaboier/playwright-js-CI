import { test } from '../../fixtures/pages.fixtures';
import { expect } from '@playwright/test';
import { mockProductsDisplayedWhenSearching } from '../../utils/mockProductsDisplayed';
import { productsDisplayed } from '../../test-data/search';

test.beforeEach(async ({ page }) => {
        await page.goto("/")
    })

test.describe('Search', () => {

    test('Guest user can search for a product', async ({ productsPage, page }) => {
        // Arrange
        await mockProductsDisplayedWhenSearching(page, "pliers", productsDisplayed)

        // Act
        await productsPage.searchForProduct('pliers')
        const listOfDisplayedProducts = await productsPage.displayedProductsNamesList()
        console.log(listOfDisplayedProducts)

        // Assert
        expect(listOfDisplayedProducts).toEqual(['Combination Pliers', 'Pliers'])
    })

    test('Guest user sees no results when searching for a non-existing product', async ({ productsPage, page }) => {
        // Act
        await productsPage.searchForProduct('non-existing-product')

        // Assert
        await expect(page.getByTestId('search_completed')).toHaveText('There are no products found.')

    })

})

