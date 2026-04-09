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

const articleData = {
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

const URL = 'https://realworld.qa.guru/';


test('Create new article', async ({ page }) => {  
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);

  await page.goto(URL);
  await home.startRegistration();
  await registration.signup(userData);
  await home.startNewArticle();
  await article.createArticle(articleData);

  await expect(article.getArticleHeading()).toContainText(articleData.title);
  await expect(article.getArticleParagraph()).toContainText(articleData.body);
  await home.navigateToProfile();
  await expect(home.getFirstHeader()).toContainText(articleData.title);
});

test.only('Edit an article', async ({ page }) => {
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);

  await page.goto(URL);
  await home.startRegistration();
  await registration.signup(userData);
  await home.startNewArticle();
  await article.createArticle(articleData);

  await page.getByRole('link', { name: ' Edit Article' }).first().click();
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).click();
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill(newArticleData.topic);
  await page.getByRole('textbox', { name: 'Article Title' }).click();
  await page.getByRole('textbox', { name: 'Article Title' }).fill(newArticleData.title);
  await page.getByRole('textbox', { name: 'Write your article (in' }).click();
  await page.getByRole('textbox', { name: 'Write your article (in' }).fill(newArticleData.body);
  await page.getByRole('textbox', { name: 'Enter tags' }).click();
  await page.getByRole('textbox', { name: 'Enter tags' }).fill(newArticleData.tag);
  await page.getByRole('button', { name: 'Update Article' }).click();
 
  await expect(page.getByRole('heading')).toContainText(newArticleData.title);
  await expect(page.getByRole('paragraph')).toContainText(newArticleData.body);
  await expect(page.locator('.tag-default.tag-pill.tag-outline')).toContainText(newArticleData.tag);
});

/*test('Delete an article', async ({ page }) => {



  await page.getByRole('link', { name: ' Home' }).click();
  await page.getByText('yan999').click();
  await page.getByRole('link', { name: ' Profile' }).click();
  await page.getByText('yan999April 8, 2026 ( 0 )my').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

});

test('Add an article to Favourites', async ({ page }) => {
  await page.getByRole('link', { name: ' Home' }).click();
  await page.getByRole('button', { name: 'Global Feed' }).click();
  await page.getByText('Americo Moriarti DDSApril 8, 2026 ( 0 )Tametsi corona carmen.Crebro curia curo').click();
  await page.getByRole('button', { name: ' Favorite ( 0 )' }).first().click();
  await expect(page.getByRole('main')).toContainText('( 1 )');
  await page.getByText('yan999').click();
  await page.getByRole('link', { name: ' Profile' }).click();
  await page.getByRole('link', { name: 'Favorited Articles' }).click();
  await expect(page.locator('h1')).toContainText('Tametsi corona carmen.');
});

test('Search articles by a tag', async ({ page }) => {
  await page.getByRole('link', { name: ' Home' }).click();
  await page.getByRole('button', { name: 'timor' }).click();
  await expect(page.getByRole('main')).toContainText('timor');
  await expect(page.getByRole('main')).toContainText('timor');
});*/