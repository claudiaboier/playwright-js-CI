import { Page } from "@playwright/test";
import { registration } from "../test-data/registration.ts";

type RegistrationForm = Record<string, string>

export class RegistrationPage {

    private readonly page: Page

    constructor(page: Page) { this.page = page; }

    async fillRegistrationForm(overrides: Partial<RegistrationForm> = {}) {
        
        const baseline: typeof registration = {
            'first-name': registration['first-name'],
            'last-name': registration['last-name'],
            'dob': registration['dob'],
            'street': registration['street'],
            'postal_code': registration['postal_code'],
            'city': registration['city'],
            'state': registration['state'],
            'country': registration['country'],
            'phone': registration['phone'],
            'email': registration.email,
            'password': registration.password,
        }

        const payload = { ...baseline, ...overrides }

        for (const [testId, value] of Object.entries(payload)) {
            await this.fillField(testId, value!);
        }
    }

    async fillRegistrationFormWithMissingField(fieldToOmit: string) {
        const baseline: typeof registration = {
            'first-name': registration['first-name'],
            'last-name': registration["last-name"],
            'dob': registration.dob,
            'street': registration.street,
            'postal_code': registration.postal_code,
            'city': registration.city,
            'state': registration.state,
            'country': registration.country,
            'phone': registration.phone,
            'email': registration.email,
            'password': registration.password,

        }

        for (const [field, value] of Object.entries(baseline)) {
            if (field === fieldToOmit) {
                continue
            }
            else {
                await this.fillField(field, value);
            }
        }
    }

    // Helper method to fill fields, handles both input and select elements
    private async fillField(field: string, value: string) {
        const locator = this.page.getByTestId(field);

        const tagName = await locator.evaluate((el) => el.tagName.toLowerCase());
        tagName === 'select' ? await locator.selectOption(value) : await locator.fill(value);

    }

    getFieldError(field: string) {
        return this.page.getByTestId(`${field}-error`)
    }

    async clickRegister() {
        await this.page.getByRole('button', { name: 'Register' }).click();
    }
}
