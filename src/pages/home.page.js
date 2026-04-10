export class HomePage
{
    constructor(page){
        this.page = page;
        this.signupLink = page.getByRole('link', { name: 'Sign up' });
        this.newArticleBtn = page.getByRole('link', { name: 'New Article' });
        this.profileNavigation = page.locator('.nav-link.dropdown-toggle');
        this.profileLink = page.getByRole('link', { name: 'Profile' });
        this.firstHeader = page.locator('h1');
        this.articlesPreview = page.locator('.article-preview');
        this.articlesPreviewProfile = page.locator('.article-preview', {name: "doesn't have articles"});
        this.homeMenuBtn = page.getByRole('link', { name: 'Home' });
        this.globalFeed = page.getByRole('button', { name: 'Global Feed' });
        this.favouriteBtn = page.getByRole('button', { name: 'Favorite ( 0 )' }).first();
        this.favouriteArticles = page.getByRole('link', { name: 'Favorited Articles' });
    }

    async openWebsite(page){
        await page.goto(URL);
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

    getArticlesPreview(){
        return this.articlesPreview;
    }

    async goToHomePage(){
        await this.homeMenuBtn.click();
    }

    async navigateToGlobalFeed(){
        await this.globalFeed.click();
    }

    async addFirstArticleToFavourites(){
        await this.favouriteBtn.click();
    }

    async navigateToFavouriteArticles(){
        await this.favouriteArticles.click();
    }
}

    const URL = 'https://realworld.qa.guru/';
