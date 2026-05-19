export class HomePage
{
    constructor(page){
        this.page = page;
        this.signupLink = page.getByRole('link', { name: 'Sign up' });
        this.newArticleBtn = page.getByRole('link', { name: 'New Article' });
        this.profileNavigation = page.locator('.nav-link.dropdown-toggle');
        this.profileLink = page.getByRole('link', { name: 'Profile'}).first();
        this.firstHeader = page.locator('.preview-link > h1');
        this.articlePreview = page.locator('.preview-link');
        this.articlesPreviewProfile = page.locator('.article-preview');
        this.homeMenuBtn = page.getByRole('link', { name: 'Home' });
        this.globalFeed = page.getByRole('button', { name: 'Global Feed' });
        this.favouriteBtn = page.getByRole('button', { name: 'Favorite' }).first();
        this.favouriteArticles = page.getByRole('link', { name: 'Favorited Articles' });
        this.articlePreviewLink = page.locator('.preview-link');
        this.firstArticleAuthor = page.locator('.article-preview > * > * > .author').first();
        this.activeNavigationLinkYourFeed = page.locator(".nav-link.active", {name: "Your Feed"});
        this.logoutBtn = page.getByRole('link', { name: 'Logout' });
        this.likesCounter = page.locator('.btn-outline-primary > .counter').first();
    }

    async openWebsite(page){
        await page.goto(URL);
    }

    getSignUpBtn(){
        return this.signupLink;
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

    getFirstArticlePreview(){
        return this.articlePreview.first();
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

    getAddToFavouritesBtn(){
        return this.favouriteBtn;
    }

    async openFirstArticle(){
        await this.articlePreviewLink.first().click();
    }

    async openFirstArticle(){
        await this.articlePreviewLink.first().click();
    }

    getFirstAuthor(){
        return this.firstArticleAuthor;
    }

    getFavouritedArticles(){
        return this.favouriteArticles;
    }

    getArticlePreviewProfile(){
        return this.articlesPreviewProfile;
    }

    getActiveNavigationLinkYourFeed(){
        return this.activeNavigationLinkYourFeed;
    }

    async logout(){
        await this.logoutBtn.click();
    }

    async getLikesCounter(){
        const text = await this.likesCounter.innerText();
        return Number(text.replace(/[() ]/g, ''));
    }
}

    const URL = 'https://realworld.qa.guru/';
