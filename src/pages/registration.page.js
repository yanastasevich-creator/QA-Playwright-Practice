export class RegistrationPage
{
    constructor(page){
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signupBtn = page.getByRole('button', { name: 'Sign up' });
    }

    async signup(userData){
        const {username, email, password} = userData;

        await this.usernameInput.click();
        await this.usernameInput.fill(username);
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.signupBtn.click();
    }
}