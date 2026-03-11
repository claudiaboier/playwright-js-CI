import { expect } from '@playwright/test';
import { test } from '../../fixtures/pages.fixtures';
import { routesUI } from '../../routes/routes';
import { errors, mandatoryFields } from '../../test-data/registration';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
        await page.goto(routesUI.registration)
    })

test.describe('Registration - field validation', () => {
    test('registers successfully with required fields', async ({ registerPage, page }) => {
        // Arrange
        await registerPage.fillRegistrationForm()
        // Act
        await Promise.all([
            page.waitForResponse(r =>
                r.url().includes('/users') &&
                r.request().method() === 'POST'
            ),
            registerPage.clickRegister(),
        ]);
        // Assert
        await expect(page).toHaveURL(routesUI.login)
        await expect(page.locator('h3:has-text("Login")')).toBeVisible();
    });


    for (const field of mandatoryFields) {
        test(`Invalid test for registration, field missing for ${field}`, async ({ registerPage, page }) => {
            // Arrange
            await registerPage.fillRegistrationFormWithMissingField(field)
            // Act
            await registerPage.clickRegister()
            // Assert
            await expect(registerPage.getFieldError(field)).toContainText(errors[field]);
            await expect(page).toHaveURL(routesUI.registration);
        })
    }
})

test.describe('Registration - input validation', () => {
    test.describe('Email validation', () => {

        const invalidEmails = ['test', 'test@', '@domain.com']

        for (let invalidEmail of invalidEmails) {
            test(`rejects invalid email format '${invalidEmail}'`, async ({ registerPage }) => {
                // Arrange
                await registerPage.fillRegistrationForm({ email: invalidEmail })
                // Act
                await registerPage.clickRegister()
                // Assert
                await expect(registerPage.getFieldError(`email`)).toContainText('Email format is invalid')
            })
        }

        test(`rejects already registered email address`, async ({ registerPage, page }) => {
            // Arrange
            const email = `test${faker.number.int({ max: 100000 })}@test.com`
            await registerPage.fillRegistrationForm({ email: email })
            // Act
            await registerPage.clickRegister()
            // Assert
            await expect(page).toHaveURL(routesUI.login);
            // Act
            await page.goto(routesUI.registration)
            // Assert
            await expect(page).toHaveURL(routesUI.registration)
            // Arrange
            await registerPage.fillRegistrationForm({ email: email })
            // Act
            await registerPage.clickRegister()
            // Assert
            await expect(registerPage.getFieldError(`register`)).toContainText('A customer with this email address already exists.')
        })
    })

    test.describe(`Password validation`, () => {

        [
            { password: 'Pa1#aaa', expected: 'Be at least 8 characters long', description: 'is less than 8 characters' },
            { password: 'aa1!aaaa', expected: 'Contain both uppercase and lowercase letters', description: 'has no uppercase letter' },
            { password: 'AA1!AAAA', expected: 'Contain both uppercase and lowercase letters', description: 'has no lowercase letter' },
            { password: 'Aa!aaaaa', expected: 'Include at least one number', description: 'has no number' },
            { password: 'Aa1aaaaa', expected: 'Have at least one special symbol (e.g., @, #, $, etc.)', description: 'has no special symbol' }
        ].forEach(({ password, expected, description }) => {
            test(`'${expected}' should not be highlighted when password '${description}'`, async ({ registerPage, page }) => {
                // Arrange
                await registerPage.fillRegistrationForm({ password: password })
                // Act
                await registerPage.clickRegister()
                // Assert
                await expect(page.getByText(expected)).not.toHaveClass(/text-success/);
            })
        })
    })
})



