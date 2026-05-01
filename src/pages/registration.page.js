export class RegistrationPage
{
    constructor(page){
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signupBtn = page.getByRole('button', { name: 'Sign up' });
        this.logoutBtn = page.getByRole('link', { name: 'Logout' });
        this.loginDropdown = page.getByRole('link', { name: 'Login' });
        this.loginBtn = page.getByRole('button', { name: 'Login' })
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

    async logout(){
        await this.logoutBtn.click();
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