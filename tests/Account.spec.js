import { test, expect } from '@playwright/test';
import { POManager } from '../utils/POManager';
import url from '../test_data/URL.json';
import regData from '../test_data/RegData.json';

test.afterAll(async ({ browser }) => {
  await browser.close();
});

// TODO Add comments
// TODO Add expect messages

test('Register new user @smoke @Account', async ({ browser }) => {
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
  await expect(page).toHaveURL(url.accountRegSuccessPage);
  await expect(accountRegSuccessPage.h1).toContainText('Your Account Has Been Created!');

  await accountRegSuccessPage.btnContinue.click();
  await expect(page).toHaveURL(url.accountPage);
  await context.storageState({ path: './test_data/LoggedInState.json' });
});

test(`Login with user: ${regData.loginname} and password: ${regData.password} @smoke @Account`, async ({ browser }) => {
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

  await loginPage.fillLoginForm(regData);
  await loginPage.btnLogin.click();
  await expect(page).toHaveURL(url.accountPage);
  await expect(accountPage.txtAccountName).toHaveText(regData.firstname);
  await context.storageState({ path: './test_data/LoggedInState.json' });
});

test('Logout current user @smoke @Account', async ({ browser }) => {
  const context = await browser.newContext({ storageState: './test_data/LoggedInState.json' });
  const page = await context.newPage();
  const poManager = new POManager(page);
  const accountPage = await poManager.getAccountPage();
  const accountLogoutPage = await poManager.getAccountLogoutPage();

  await page.goto(url.accountPage);
  await expect(page).toHaveURL(url.accountPage);

  await accountPage.btnLogoff.click();
  await expect(page).toHaveURL(url.accountLogoutPage);
  await expect(accountLogoutPage.h1).toContainText('Account Logout');

  await accountLogoutPage.btnContinue.click();
  await expect(page).toHaveURL('/');
});
