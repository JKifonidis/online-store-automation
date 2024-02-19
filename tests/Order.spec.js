import { test, expect } from '@playwright/test';
import { POManager } from '../utils/POManager';
import url from '../test_data/URL.json';
import loginData from '../test_data/LoginData.json';

test.afterAll(async ({ browser }) => {
  await browser.close();
});

test('Add product to cart @smoke', async ({ page }) => {
  // const context = await browser.newContext({ storageState: './test_data/LoggedInState.json' });
  // const page = await context.newPage();
  const poManager = new POManager(page);
  const topSection = await poManager.getTopSection();
  const mainPage = await poManager.getMainPage();
  const productSection = await poManager.getProductSection();

  await page.goto('/');

  await topSection.clickCatMenuButton('Books');
  await expect(productSection.h1).toHaveText('Books');

  await productSection.clickThumbnailImage('Paperback');
  await expect(productSection.h1).toHaveText('Paperback');
  await productSection.addProductToCart('Allegiant by Veronica Roth');
  await expect(page).toHaveURL(url.cartPage);

  // await page.pause();
});
