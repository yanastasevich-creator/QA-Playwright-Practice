import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker'
import { HomePage } from '../src/pages/home.page';
import { RegistrationPage } from '../src/pages/registration.page';
import { ArticlePage } from '../src/pages/article.page';

const userData = {
  username: faker.internet.username(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}

const initialArticleData = {
  title: faker.lorem.sentence(),
  topic: faker.lorem.lines({min: 1, max: 2}),
  body: faker.lorem.paragraphs(),
  tag: faker.lorem.word()
}

const newArticleData = {
  title: faker.lorem.sentence(),
  topic: faker.lorem.lines({min: 1, max: 2}),
  body: faker.lorem.paragraphs(),
  tag: faker.lorem.word()
}

test('Create new article', async ({ page }) => {  
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);

  await home.openWebsite(page);
  await home.startRegistration();
  await registration.signup(userData);
  await home.startNewArticle();
  await article.addArticle(initialArticleData);
  await article.publishArticle();

  await expect(article.getArticleHeading()).toContainText(initialArticleData.title);
  await expect(article.getArticleParagraph()).toContainText(initialArticleData.body);
  await expect(article.articleTag).toContainText(initialArticleData.tag);

  await home.navigateToProfile();
  await expect(home.getFirstHeader()).toContainText(initialArticleData.title);
});

test('Edit an article', async ({ page }) => {
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);

  await home.openWebsite(page);
  await home.startRegistration();
  await registration.signup(userData);
  await home.startNewArticle();
  await article.addArticle(initialArticleData);
  await article.publishArticle();
  await article.startArticleEditing();
  await article.addArticle(newArticleData);
  await article.updateArticle();

  await expect(article.getArticleHeading()).toContainText(newArticleData.title);
  await expect(article.getArticleParagraph()).toContainText(newArticleData.body);
  await expect.soft(article.articleTag).toContainText(newArticleData.tag);
});

test('Delete an article', async ({ page }) => {
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);

  await home.openWebsite(page);
  await home.startRegistration();
  await registration.signup(userData);
  await home.startNewArticle();
  await article.addArticle(initialArticleData);
  await article.publishArticle();
  await article.acceptArticleRemoval();
  await article.deleteArticle();
  await expect(home.articlesPreview).toContainText('Articles not available');
  await home.navigateToProfile();
  await expect(home.articlesPreviewProfile).toBeVisible();
});

/*test('Add an article to Favourites', async ({ page }) => {
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);
 // const titleOfFavouriteArticle;

  await home.openWebsite(page);
  await home.startRegistration();
  await registration.signup(userData);
  await home.goToHomePage();
  await home.navigateToGlobalFeed();
  await page.getByText('Americo Moriarti DDSApril 8, 2026 ( 0 )Tametsi corona carmen.Crebro curia curo').click();
  await home.addFirstArticleToFavourites();
  await expect(page.getByRole('main')).toContainText('( 1 )');
  await home.navigateToProfile();
  await home.navigateToFavouriteArticles();
  // await expect(article.getFirstHeader()).toContainText(titleOfFavouriteArticle);
});

test('Search articles by a tag', async ({ page }) => {
  await home.openWebsite(page);
  await home.goToHomePage();
 // const articleTag = 

  await page.getByRole('button', { name: 'timor' }).click();
  await expect(page.getByRole('main')).toContainText('timor');
  await expect(page.getByRole('main')).toContainText('timor');
});*/