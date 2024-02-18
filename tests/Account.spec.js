import { test, expect } from '@playwright/test';
import { POManager } from '../utils/POManager';
import url from '../test_data/URL.json';
import accountLogoutPageContent from '../test_data/page_content/AccountLogout.json';
import registrationData from '../test_data/RegistrationData.json';
import loginData from '../test_data/LoginData.json';

test.afterAll(async ({ browser }) => {
  await browser.close();
});

test.skip('@smoke Register new user', async ({ page }) => {
  const poManager = new POManager(page);
  const homePage = await poManager.getHomePage();
  const accountLoginPage = await poManager.getAccountLoginPage();
  const accountRegisterPage = await poManager.getAccountRegisterPage();

  await page.goto('/');
  await expect(page).toHaveURL(url.baseURL);

  await homePage.btnLoginPage.click();
  await expect(page).toHaveURL(url.accountLoginPage);

  await accountLoginPage.btnContinue.click();
  await expect(page).toHaveURL(url.accountRegisterPage);

  await accountRegisterPage.fillRegistrationForm(registrationData);
  await expect(page).toHaveURL(url.accountPage);
  // Assertion
});

test.describe('Login / Logout user', async () => {
  test.describe.configure({ mode: 'serial' });

  test('@smoke Login with existing user', async ({ browser }) => {
    const context = await browser.newContext({ storageState: undefined });
    const page = await context.newPage();
    const poManager = new POManager(page);
    const homePage = await poManager.getHomePage();
    const loginPage = await poManager.getAccountLoginPage();
    const accountPage = await poManager.getAccountPage();

    await page.goto('/');
    await expect(page).toHaveURL(url.baseURL);

    await homePage.btnLoginPage.click();
    await expect(page).toHaveURL(url.accountLoginPage);

    await loginPage.fillLoginForm(loginData);
    await loginPage.btnLogin.click();
    await expect(page).toHaveURL(url.accountPage);
    await expect(accountPage.txtAccountName).toHaveText(loginData.loginname);
    await context.storageState({ path: './test_data/LoggedInState.json' });
  });

  test('@smoke Logout current user', async ({ browser }) => {
    const context = await browser.newContext({ storageState: './test_data/LoggedInState.json' });
    const page = await context.newPage();
    const poManager = new POManager(page);
    const accountPage = await poManager.getAccountPage();
    const accountLogoutPage = await poManager.getAccountLogoutPage();

    await page.goto(url.accountPage);
    await expect(page).toHaveURL(url.accountPage);

    await accountPage.btnLogoff.click();
    await expect(page).toHaveURL(url.accountLogoutPage);
    await expect(accountLogoutPage.txtH1).toHaveText(accountLogoutPageContent.txtH1);

    await accountLogoutPage.btnContinue.click();
    await expect(page).toHaveURL('/');
  });
});
