import 'jest-extended';
import { test } from '../../fixtures/pages.fixtures';
import { expect } from '@playwright/test';
import { mockProductsDisplayedWhenSearching } from '../../utils/mockProductsDisplayed';
import { Sorting } from '../../utils/sorting';

test.beforeEach(async ({ page }) => {
        await page.goto("/")
    })

test.describe('Sort', () => {

    type NameOption = 'Name (A - Z)' | 'Name (Z - A)'
    type PriceOption = 'Price (High - Low)' | 'Price (Low - High)'

    type SortConfig = { option: NameOption, kind: 'name', sorter: (items: string[]) => string[] }
        | { option: PriceOption, kind: 'price', sorter: (items: number[]) => number[] }

    const sortOptions: SortConfig[] = [
        { option: 'Name (A - Z)', kind: 'name', sorter: Sorting.sortAscending },
        { option: 'Name (Z - A)', kind: 'name', sorter: Sorting.sortDescending },
        { option: 'Price (Low - High)', kind: 'price', sorter: Sorting.sortByPriceLowToHigh },
        { option: 'Price (High - Low)', kind: 'price', sorter: Sorting.sortByPriceHighToLow }
    ]


    for (const { option, kind, sorter } of sortOptions) {

        test(`Guest can sort by ${option}`, async ({ productsPage }) => {
            
            await productsPage.sortProductBy(option)

            if (kind == 'name') {
                const listOfDisplayedProducts = await productsPage.displayedProductsNamesList()
                const sortedList = sorter(listOfDisplayedProducts)
                expect(listOfDisplayedProducts).toEqual(sortedList)
            }
            else {
                const listOfDisplayedProductsPrices = await productsPage.displayedProductsPricesList()
                const sortedList = sorter(listOfDisplayedProductsPrices)
                expect(listOfDisplayedProductsPrices).toEqual(sortedList)
            }

        })
    }
})
