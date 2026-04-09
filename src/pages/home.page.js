export class HomePage
{
    constructor(page){
        this.page = page;
        this.signupLink = page.getByRole('link', { name: 'Sign up' });
        this.newArticleBtn = page.getByRole('link', { name: 'New Article' });
        this.profileNavigation = page.locator('.nav-link.dropdown-toggle');
        this.profileLink = page.getByRole('link', { name: 'Profile' });
        this.firstHeader = page.locator('h1');
    }

    async startRegistration(){
        await this.signupLink.click();
    }

    async startNewArticle(){
        await this.newArticleBtn.click();
    }

    async navigateToProfile(){
       await this.profileNavigation.click();
       await this.profileLink.click();
    }

    getFirstHeader(){
        return this.firstHeader;
    }
}