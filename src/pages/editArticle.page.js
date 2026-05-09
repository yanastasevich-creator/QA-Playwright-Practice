export class EditArticlePage
{
    constructor(page){
        this.page = page;
        this.articleHeading = page.getByRole('heading');
        this.articleParagraph = page.getByRole('paragraph');
        this.editArticleBtn = page.getByRole('link', { name: 'Edit Article' }).first();
        this.updateArticleBtn = page.getByRole('button', { name: 'Update Article' });
        this.deleteArticleBtn = page.getByRole('button', { name: 'Delete Article' }).first();
        this.dialog = "dialog";
        this.commentInput = page.getByRole('textbox', { name: 'Write a comment...' });
        this.postCommentBtn = page.getByRole('button', { name: 'Post Comment' });
        this.articleTag = page.locator('.tag-default.tag-pill.tag-outline');
        this.comment = page.locator(".card > .card-block > .card-text").last();
        this.commentDeleteIcon = page.locator(".ion-trash-a", { hasText: /^$/ }).last();
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

    async acceptItemRemoval(){
        await this.page.on(this.dialog, dialog => dialog.accept());
    }

    async addComment(comment){
        this.commentInput.click();
        this.commentInput.fill(comment);
        this.postCommentBtn.click();
    }

    getCommentInput(){
        return this.commentInput;
    }

    async getCommentText(){
        const commentResult = await this.comment.innerText();
        return commentResult;
    }

    async deleteComment(){
        await this.commentDeleteIcon.click();
    }
}