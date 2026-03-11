import { Page } from "@playwright/test"; 

export class LoginPage {

    private readonly page: Page

    constructor(page: Page) { this.page = page; }

    async fillLoginForm(email: string, password: string) {
        await this.page.getByTestId('email').fill(email);
        await this.page.getByTestId('password').fill(password);
    }

    async clickLogin() {
        await this.page.getByRole('button', { name: 'Login' }).click();
    }
}