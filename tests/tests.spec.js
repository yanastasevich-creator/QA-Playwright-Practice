import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker'
import { HomePage } from '../src/pages/home.page';
import { RegistrationPage } from '../src/pages/registration.page';
import { ArticlePage } from '../src/pages/article.page';

const commentText = faker.lorem.word();

test('Create new article', async ({ page }) => {  
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);

  const userData = {
  username: faker.internet.username(),
  email: faker.internet.email({ lastName: 'yahoo.com' }),
  password: faker.internet.password(),
  }

  const initialArticleData = {
  title: faker.lorem.words(2),
  topic: faker.lorem.words(1),
  body: faker.lorem.paragraphs(1),
  tag: faker.lorem.word()
}
  await home.openWebsite(page);
  await home.startRegistration();
  await registration.signup(userData);
  await home.startNewArticle();
  await article.addArticle(initialArticleData);
  await article.publishArticle();

  await expect(article.getArticleHeading()).toContainText(initialArticleData.title);
  await expect(article.getArticleParagraph()).toContainText(initialArticleData.body);
  await expect.soft(article.getArticleTag()).toContainText(initialArticleData.tag);

  await home.navigateToProfile();
  await expect(home.getFirstHeader()).toContainText(initialArticleData.title);

  await home.openFirstArticle();
  await article.acceptItemRemoval();
  await article.deleteArticle();
});

test('Edit an article', async ({ page }) => {
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);

  const userData = {
  username: faker.internet.username(),
  email: faker.internet.email({ lastName: 'yahoo.com' }),
  password: faker.internet.password(),
}

const initialArticleData = {
  title: faker.lorem.words(2),
  topic: faker.lorem.words(1),
  body: faker.lorem.paragraphs(1),
  tag: faker.lorem.word()
}

const newArticleData = {
  title: faker.lorem.words(2),
  topic: faker.lorem.words(1),
  body: faker.lorem.paragraphs(1),
  tag: faker.lorem.word()
}

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
  await expect.soft(article.getArticleTag()).toContainText(newArticleData.tag);

  await home.openFirstArticle();
  await article.acceptItemRemoval();
  await article.deleteArticle();
});

test('Delete an article', async ({ page }) => {
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);

  const userData = {
  username: faker.internet.username(),
  email: faker.internet.email({ lastName: 'yahoo.com' }),
  password: faker.internet.password(),
}

const initialArticleData = {
  title: faker.lorem.words(2),
  topic: faker.lorem.words(1),
  body: faker.lorem.paragraphs(1),
  tag: faker.lorem.word()
}

  await home.openWebsite(page);
  await home.startRegistration();
  await registration.signup(userData);
  await home.startNewArticle();
  await article.addArticle(initialArticleData);
  await article.publishArticle();
  await article.acceptItemRemoval();
  await article.deleteArticle();
  await home.navigateToProfile();
  await expect(async () => {
      const noArticlesText = await home.getArticlePreviewProfile().innerText();
      expect(noArticlesText).toBe("Articles not available.");
  }).toPass();
});

test('Add an article to Favourites', async ({ page }) => {
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);
  let titleOfFavouriteArticleExpected;
  let likesCounterOriginal = 0;
  let likesCounterNew = 0;

  const initialUserData = {
  username: faker.internet.username(),
  email: faker.internet.email({ lastName: 'yahoo.com' }),
  password: faker.internet.password(),
  }

const newUserData = {
  username: faker.internet.username(),
  email: faker.internet.email({ provider: 'yahoo.com' }),
  password: faker.internet.password(),
}

const initialArticleData = {
  title: faker.lorem.words(2),
  topic: faker.lorem.words(1),
  body: faker.lorem.paragraphs(1),
  tag: faker.lorem.word()
}

  await home.openWebsite(page);
  await home.startRegistration();
  await registration.signup(initialUserData);
  await home.startNewArticle();
  await article.addArticle(initialArticleData);
  await article.publishArticle();
  await home.navigateToProfile();
  await registration.logout();
  await page.reload();

  await home.startRegistration();
  await registration.signup(newUserData);
  await home.goToHomePage();
  await page.reload();
    await home.navigateToGlobalFeed();
 await expect(async () => {
    await expect(home.getFirstArticlePreview()).toBeVisible();
  }).toPass();
  titleOfFavouriteArticleExpected = await home.getFirstArticlePreview().innerText();
  await home.openFirstArticle();
  await expect(home.getAddToFavouritesBtn()).toBeVisible();
  likesCounterOriginal = await article.getLikesCounter();
  await home.addFirstArticleToFavourites();
  await expect(async () => {
    likesCounterNew = await article.getLikesCounter();
    expect(likesCounterNew).toBe(likesCounterOriginal + 1);
  }).toPass();
  await home.navigateToProfile();
  await expect(home.getFavouritedArticles()).toBeVisible();
  await home.navigateToFavouriteArticles();
  await expect(home.getFirstArticlePreview()).toBeVisible();
  const titleOfFavouriteArticleActual = await home.getFirstArticlePreview().innerText();
  expect(titleOfFavouriteArticleActual).toBe(titleOfFavouriteArticleExpected);

  await home.navigateToProfile();
  await registration.logout();
  await page.reload();
  await home.startRegistration();
  await registration.login(initialUserData);
  await home.navigateToProfile();
  await home.openFirstArticle();
  await article.acceptItemRemoval();
  await article.deleteArticle();
});

test('Leave and remove the comment', async ({ page }) => {
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);

   const initialUserData = {
  username: faker.internet.username(),
  email: faker.internet.email({ lastName: 'yahoo.com' }),
  password: faker.internet.password(),
  }

const newUserData = {
  username: faker.internet.username(),
  email: faker.internet.email({ provider: 'yahoo.com' }),
  password: faker.internet.password(),
}

const initialArticleData = {
  title: faker.lorem.words(2),
  topic: faker.lorem.words(1),
  body: faker.lorem.paragraphs(1),
  tag: faker.lorem.word()
}

  await home.openWebsite(page);
  await home.startRegistration();
  await registration.signup(initialUserData);
  await home.startNewArticle();
  await article.addArticle(initialArticleData);
  await article.publishArticle();
  await home.navigateToProfile();
  await registration.logout();
  await page.reload();

  await home.startRegistration();
  await registration.signup(newUserData);
  await home.goToHomePage();
  await page.reload();
    await home.navigateToGlobalFeed();
 await expect(async () => {
    await expect(home.getFirstArticlePreview()).toBeVisible();
  }).toPass();
  await home.openFirstArticle();
  await article.addComment(commentText);
  expect(await article.getCommentText()).toBe(commentText);
  await article.acceptItemRemoval();
  await article.deleteComment();

  await home.navigateToProfile();
  await registration.logout();
  await page.reload();
  await home.startRegistration();
  await registration.login(initialUserData);
  await home.navigateToProfile();
  await home.openFirstArticle();
  await article.deleteArticle();
});