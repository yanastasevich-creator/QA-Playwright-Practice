export class ArticlePage
{
    constructor(page){
        this.page = page;
        this.articleTitleInput = page.getByRole('textbox', { name: 'Article Title' });
        this.articleBodyInput = page.getByRole('textbox', { name: 'Write your article (in' })
        this.articleTopicInput =  page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.articleTagInput = page.getByRole('textbox', { name: 'Enter tags' });
        this.publishArticleBtn = page.getByRole('button', { name: 'Publish Article' });
    }

    async fillArticleWithData(articleData){
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
}