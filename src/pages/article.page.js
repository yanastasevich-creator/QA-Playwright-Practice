export class ArticlePage
{
    constructor(page){
        this.page = page;
        this.articleTitleInput = page.getByRole('textbox', { name: 'Article Title' });
        this.articleBodyInput = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.articleTopicInput =  page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.articleTagInput = page.getByRole('textbox', { name: 'Enter tags' });
        this.publishArticleBtn = page.getByRole('button', { name: 'Publish Article' });
        this.articleHeading = page.getByRole('heading');
        this.articleParagraph = page.getByRole('paragraph');
        this.editArticleBtn = page.getByRole('link', { name: 'Edit Article' }).first();
        this.updateArticleBtn = page.getByRole('button', { name: 'Update Article' });
        this.articleTag = page.locator('.tag-default.tag-pill.tag-outline');
        this.deleteArticleBtn = page.getByRole('button', { name: 'Delete Article' }).first();
        this.dialog = "dialog";
    }

    async addArticle(articleData){
        const {title, topic, body, tag} = articleData;

        await this.articleTitleInput.click();
        await this.articleTitleInput.fill(title);
        await this.articleTopicInput.click();
        await this.articleTopicInput.fill(topic);
        await this.articleBodyInput.click();
        await this.articleBodyInput.fill(body);
        await this.articleTagInput.click();
        await this.articleTagInput.fill(tag);
    }

    async publishArticle(){
        await this.publishArticleBtn.click();
    }

    getArticleHeading(){
        return this.articleHeading;
    }

    getArticleParagraph(){
        return this.articleParagraph;
    }

    getArticleTag(){
        return this.articleTag;
    }

    async startArticleEditing(){
        await this.editArticleBtn.click();
    }

    async updateArticle(){
        await this.updateArticleBtn.click();
    }   

    async deleteArticle(){
        await this.deleteArticleBtn.click();
    }

    async acceptArticleRemoval(){
        await this.page.on(this.dialog, dialog => dialog.accept());
    }
}