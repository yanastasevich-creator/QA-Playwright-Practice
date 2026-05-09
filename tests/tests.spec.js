import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker'
import { HomePage } from '../src/pages/home.page';
import { RegistrationPage } from '../src/pages/registration.page';
import { ArticlePage } from '../src/pages/createArticle.page';
import { AuthorizationPage } from '../src/pages/authorization.page';
import { EditArticlePage } from '../src/pages/editArticle.page';

const commentText = faker.lorem.word();

test('Create new article', async ({ page }) => {  
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);
  const articleEditing = new EditArticlePage(page);

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
  await article.fillArticleWithData(initialArticleData);
  await article.publishArticle();

  await expect(articleEditing.getArticleHeading()).toContainText(initialArticleData.title);
  await expect(articleEditing.getArticleParagraph()).toContainText(initialArticleData.body);
  await expect.soft(articleEditing.getArticleTag()).toContainText(initialArticleData.tag);

  await home.navigateToProfile();
  await expect(home.getFirstHeader()).toContainText(initialArticleData.title);

  await home.openFirstArticle();
  await articleEditing.acceptItemRemoval();
  await articleEditing.deleteArticle();
});

test('Edit an article', async ({ page }) => {
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);
  const articleEditing = new EditArticlePage(page);

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
  await article.fillArticleWithData(initialArticleData);
  await article.publishArticle();
  await articleEditing.startArticleEditing();
  await article.fillArticleWithData(newArticleData);
  await articleEditing.updateArticle();

  await expect(articleEditing.getArticleHeading()).toContainText(newArticleData.title);
  await expect(articleEditing.getArticleParagraph()).toContainText(newArticleData.body);
  await expect.soft(articleEditing.getArticleTag()).toContainText(newArticleData.tag);

  await home.openFirstArticle();
  await articleEditing.acceptItemRemoval();
  await articleEditing.deleteArticle();
});

test('Delete an article', async ({ page }) => {
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);
  const articleEditing = new EditArticlePage(page);

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
  await article.fillArticleWithData(initialArticleData);
  await article.publishArticle();
  await articleEditing.acceptItemRemoval();
  await articleEditing.deleteArticle();
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
  const authorization = new AuthorizationPage(page);
  const articleEditing = new EditArticlePage(page);

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
  await article.fillArticleWithData(initialArticleData);
  await article.publishArticle();
  await home.navigateToProfile();
  await home.logout();
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
  likesCounterOriginal = await home.getLikesCounter();
  await home.addFirstArticleToFavourites();
  await expect(async () => {
    likesCounterNew = await home.getLikesCounter();
    expect(likesCounterNew).toBe(likesCounterOriginal + 1);
  }).toPass();
  await home.navigateToProfile();
  await expect(home.getFavouritedArticles()).toBeVisible();
  await home.navigateToFavouriteArticles();
  await expect(home.getFirstArticlePreview()).toBeVisible();
  const titleOfFavouriteArticleActual = await home.getFirstArticlePreview().innerText();
  expect(titleOfFavouriteArticleActual).toBe(titleOfFavouriteArticleExpected);

  await home.navigateToProfile();
  await home.logout();
  await page.reload();
  await home.startRegistration();
  await authorization.login(initialUserData);
  await home.navigateToProfile();
  await home.openFirstArticle();
  await articleEditing.acceptItemRemoval();
  await articleEditing.deleteArticle();
});

test('Leave and remove the comment', async ({ page }) => {
  const article = new ArticlePage(page);
  const home = new HomePage(page);
  const registration = new RegistrationPage(page);
  const authorization = new AuthorizationPage(page);
  const articleEditing = new EditArticlePage(page);

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
  await article.fillArticleWithData(initialArticleData);
  await article.publishArticle();
  await home.navigateToProfile();
  await home.logout();
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
  await page.reload();
  await articleEditing.addComment(commentText);
  expect(await articleEditing.getCommentText()).toBe(commentText);
  await articleEditing.acceptItemRemoval();
  await articleEditing.deleteComment();

  await home.navigateToProfile();
  await home.logout();
  await page.reload();
  await home.startRegistration();
  await authorization.login(initialUserData);
  await home.navigateToProfile();
  await home.openFirstArticle();
  await articleEditing.deleteArticle();
});