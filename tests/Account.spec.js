import { test, expect } from '@playwright/test';
import { POManager } from '../utils/POManager';
import RegistrationData from '../test_data/RegistrationData.json';
import LoginData from '../test_data/LoginData.json';
import URL from '../test_data/URL.json';

const url = JSON.parse(JSON.stringify(URL));

test('@Smoke Register new user', async ({ page }) => {
  const registrationData = JSON.parse(JSON.stringify(RegistrationData));
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

test('@Smoke Login with existing user', async ({ page }) => {
  const loginData = JSON.parse(JSON.stringify(LoginData));
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
  // Assertion
});
