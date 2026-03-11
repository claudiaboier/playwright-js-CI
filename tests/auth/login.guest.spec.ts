import { expect } from "@playwright/test";
import { test } from "../../fixtures/pages.fixtures"
import { routesUI } from "../../routes/routes";

test.beforeEach(async ({ page }) => {
        await page.goto(routesUI.login)
    })

test.describe('Login - field validation', () => {
    test('registered user can log in successfully', async ({ loginPage, page }) => {
        // Arrange
        const email = 'customer2@practicesoftwaretesting.com'
        const password = 'welcome01'
        await loginPage.fillLoginForm(email, password)
        // Act
        await Promise.all([
            page.waitForResponse(r => r.url().includes('/users/login') && r.request().method() === 'POST'),
            loginPage.clickLogin(),
        ]);
        // Assert
        await expect(page).toHaveURL(routesUI.myAccount)
        await expect(page.locator('h1:has-text("My Account")')).toBeVisible();
    })

    const negativeCases = [
        {
            caseName: 'empty email',
            email: '',
            password: 'welcome01',
            error: 'Email is required',
        },
        {
            caseName: 'empty password',
            email: 'customer2@practicesoftwaretesting.com',
            password: '',
            error: 'Password is required',
        },
        {
            caseName: 'wrong password',
            email: 'customer2@practicesoftwaretesting.com',
            password: 'wrongpassword',
            error: 'Invalid email or password',
        },
        {
            caseName: 'non-existent user',
            email: 'nonexistent@example.com',
            password: 'welcome01',
            error: 'Invalid email or password',
        },
    ]

    negativeCases.forEach(({ email, password, error }) => {
        test(`Negative test: login with email: "${email}" and password: "${password}" should show error: "${error}"`, async ({ loginPage, page }) => {
            // Arrange
            await loginPage.fillLoginForm(email, password)
            // Act
            await loginPage.clickLogin()
            // Assert
            await expect(page.locator(`text=${error}`)).toBeVisible()
            await expect(page).toHaveURL(routesUI.login)
        });
    })
})
