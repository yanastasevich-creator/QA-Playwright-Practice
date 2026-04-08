import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker'

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

const URL = 'https://realworld.qa.guru/';

test.only('Create new article', async ({ page }) => {
  const {username, email, password} = userData;
  const {title, topic, body, tag} = articleData;
  await page.goto(URL);
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(username);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByRole('link', { name: ' New Article' }).click();
  await page.getByRole('textbox', { name: 'Article Title' }).click();
  await page.getByRole('textbox', { name: 'Article Title' }).fill(title);
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).click();
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill(topic);
  await page.getByRole('textbox', { name: 'Write your article (in' }).click();
  await page.getByRole('textbox', { name: 'Write your article (in' }).fill(body);
  await page.getByRole('textbox', { name: 'Enter tags' }).click();
  await page.getByRole('textbox', { name: 'Enter tags' }).fill(tag);
  await page.getByRole('textbox', { name: 'Article Title' }).click();
  await page.getByRole('textbox', { name: 'Article Title' }).fill(title);
  await page.getByRole('button', { name: 'Publish Article' }).click();
  await expect(page.getByRole('heading')).toContainText(title);
  await expect(page.getByRole('paragraph')).toContainText(body);
});

test('Edit an article', async ({ page }) => {


  await page.getByRole('link', { name: ' Edit Article' }).first().click();
  await page.getByText('yan999').click();
  await page.getByRole('link', { name: ' Profile' }).click();
  await expect(page.locator('h1')).toContainText('my first article999');
  await page.getByRole('link', { name: 'my first article999 first' }).click();
  await page.getByRole('link', { name: ' Edit Article' }).nth(1).click();
  await page.getByRole('link', { name: ' Edit Article' }).first().click();
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).click();
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).click();
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill('second article');
  await page.getByRole('textbox', { name: 'Article Title' }).click();
  await page.getByRole('textbox', { name: 'Article Title' }).fill('my first article1001');
  await page.getByRole('textbox', { name: 'Write your article (in' }).click();
  await page.getByRole('textbox', { name: 'Write your article (in' }).fill('my article second second');
  await page.getByRole('textbox', { name: 'Enter tags' }).click();
  await page.getByRole('textbox', { name: 'Enter tags' }).fill('second');
  await page.getByRole('button', { name: 'Update Article' }).click();
  await page.getByRole('link', { name: ' Edit Article' }).first().click();
  await page.getByRole('button', { name: 'Update Article' }).click();
  await expect(page.getByRole('heading')).toContainText('my first article1001');
  await page.getByText('my article second second').click();
  await expect(page.getByRole('paragraph')).toContainText('my article second second');
  await page.getByRole('link', { name: ' Edit Article' }).first().click();
  await page.getByRole('textbox', { name: 'Enter tags' }).dblclick();
  await page.getByRole('textbox', { name: 'Enter tags' }).fill('second');
  await page.getByRole('button', { name: 'Update Article' }).click();
  await page.getByText('article', { exact: true }).click();
  await expect(page.getByRole('main')).toContainText('second');
});

test('Delete an article', async ({ page }) => {



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
});