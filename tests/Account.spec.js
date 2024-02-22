import { test, expect } from '@playwright/test';
import { POManager } from '../utils/POManager';
import url from '../test_data/URL.json';
import accountRegSuccessPageCon from '../test_data/page_content/AccountRegSuccess.json';
import accountLogoutPageCon from '../test_data/page_content/AccountLogout.json';
import regData from '../test_data/RegData.json';
import loginData from '../test_data/LoginData.json';

test.afterAll(async ({ browser }) => {
  await browser.close();
});

test('Register new user @smoke', async ({ browser }) => {
  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const mainPage = await poManager.getMainPage();
  const accountLoginPage = await poManager.getAccountLoginPage();
  const accountRegPage = await poManager.getAccountRegPage();
  const accountRegSuccessPage = await poManager.getAccountRegSuccessPage();

  await page.goto('/');
  await expect(page).toHaveURL(url.baseURL);

  await mainPage.btnLoginPage.click();
  await expect(page).toHaveURL(url.accountLoginPage);

  await accountLoginPage.btnContinue.click();
  await expect(page).toHaveURL(url.accountRegPage);

  await accountRegPage.fillRegistrationForm(regData);
  // await expect(page).toHaveURL(url.accountRegSuccessPage); // add url to json
  // await expect(accountRegSuccessPage.h1).toHaveText(accountRegSuccessPageCon.h1);

  // await accountRegSuccessPage.btnContinue.click();
  // await expect(page).toHaveURL(); // check url after clicking continue
});

test('Login with existing user @smoke', async ({ browser }) => {
  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const mainPage = await poManager.getMainPage();
  const loginPage = await poManager.getAccountLoginPage();
  const accountPage = await poManager.getAccountPage();

  await page.goto('/');
  await expect(page).toHaveURL(url.baseURL);

  await mainPage.btnLoginPage.click();
  await expect(page).toHaveURL(url.accountLoginPage);

  await loginPage.fillLoginForm(loginData);
  await loginPage.btnLogin.click();
  await expect(page).toHaveURL(url.accountPage);
  await expect(accountPage.txtAccountName).toHaveText(loginData.loginname);
  await context.storageState({ path: './test_data/LoggedInState.json' });
});

test('Logout current user @smoke', async ({ browser }) => {
  const context = await browser.newContext({ storageState: './test_data/LoggedInState.json' });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const accountPage = await poManager.getAccountPage();
  const accountLogoutPage = await poManager.getAccountLogoutPage();

  await page.goto(url.accountPage);
  await expect(page).toHaveURL(url.accountPage);

  await accountPage.btnLogoff.click();
  await expect(page).toHaveURL(url.accountLogoutPage);
  await expect(accountLogoutPage.h1).toHaveText(accountLogoutPageCon.h1);

  await accountLogoutPage.btnContinue.click();
  await expect(page).toHaveURL('/');
});
