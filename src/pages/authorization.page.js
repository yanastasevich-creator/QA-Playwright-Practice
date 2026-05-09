export class AuthorizationPage
{
    constructor(page){
        this.page = page;
        this.loginDropdown = page.getByRole('link', { name: 'Login' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    }

    async login(userData){
        const {email, password} = userData;

        await this.loginDropdown.click();
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
}