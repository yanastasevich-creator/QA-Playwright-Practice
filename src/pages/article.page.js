export class ArticlePage
{
    constructor(page){
        this.page = page;
        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.articleTopic =  page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.articleBody = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.articleTag = page.getByRole('textbox', { name: 'Enter tags' });
        this.publishArticleBtn = page.getByRole('button', { name: 'Publish Article' });
        this.articleHeading = page.getByRole('heading');
        this.articleParagraph = page.getByRole('paragraph');
    }

    async createArticle(articleData){
        const {title, topic, body, tag} = articleData;

        await this.articleTitle.click();
        await this.articleTitle.fill(title);
        await this.articleTopic.click();
        await this.articleTopic.fill(topic);
        await this.articleBody.click();
        await this.articleBody.fill(body);
        await this.articleTag.click();
        await this.articleTag.fill(tag);
        await this.publishArticleBtn.click();
    }

    getArticleHeading(){
        return this.articleHeading;
    }

    getArticleParagraph(){
        return this.articleParagraph;
    }
}