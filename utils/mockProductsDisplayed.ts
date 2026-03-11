import { Page } from '@playwright/test'

type ProductImage = {
  id: string
  by_name: string
  by_url: string
  source_name: string
  source_url: string
  file_name: string
  title: string
}

type Product = {
  id: string
  name: string
  description: string
  price: number
  is_location_offer: boolean
  is_rental: boolean
  co2_rating: string
  in_stock: boolean
  is_eco_friendly: boolean
  product_image: ProductImage
} 

export async function mockProductsDisplayedWhenSearching(page: Page, query: string, products: Product[]) {
    await page.route('**/products**', async (route) => {
        const url = new URL(route.request().url());
        const queryUrl = url.searchParams.get('q');

        if (queryUrl == query) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                json: {
                    current_page: 1,
                    data: products,
                },
            })
        }
        else {
            await route.continue();
        }

    })
}