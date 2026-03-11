import { test as base } from "@playwright/test"
import { RegistrationPage } from "../pages/registration.page"
import { routesUI } from "../routes/routes"
import { LoginPage } from "../pages/login.page"
import { ProductsPage } from "../pages/products.page"
import { ProductDetailsPage } from "../pages/productDetails.page"

type Fixture = {
    registerPage: RegistrationPage,
    loginPage: LoginPage,
    productsPage: ProductsPage
    productsDetailsPage: ProductDetailsPage
}

export const test = base.extend<Fixture>({
    registerPage: async ({ page }, use) => {
        await use(new RegistrationPage(page))
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page))
    },

    productsDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page))
    }

})