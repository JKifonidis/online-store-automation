import { test, expect } from '@playwright/test';
import { POManager } from '../utils/POManager';
import url from '../test_data/URL.json';
import productData from '../test_data/ProductData.json';

test.afterAll(async ({ browser }) => {
  await browser.close();
});

test(`Add product "${productData[2].name}" to cart @smoke`, async ({ page }) => {
  const poManager = new POManager(page);
  const topSection = await poManager.getTopSection();
  const productSection = await poManager.getProductSection();
  const productSectionDetails = await poManager.getProductSectionDetails();
  const cart = await poManager.getCartPage();
  let productImage, productPrice, productTotalPrice, productModel;

  await page.goto('/');

  await topSection.clickCatMenuButton(productData[2].category);
  await expect(productSection.h1).toHaveText(productData[2].category);

  await productSection.clickSubcategoryButton(productData[2].subcategory);
  await expect(productSection.h1).toHaveText(productData[2].subcategory);

  productImage = await productSection.getProductImage(productData[2].name);
  productPrice = await productSection.getProductPrice(productData[2].name);

  await productSection.clickViewButton(productData[2].name);

  expect(await productSectionDetails.getProductImage()).toEqual(productImage);
  expect(await productSectionDetails.getProductName()).toEqual(productData[2].name);
  expect(await productSectionDetails.getProductPrice()).toEqual(productPrice);
  expect(await productSectionDetails.getProductQuantity()).toEqual(1);

  productTotalPrice = await productSectionDetails.getProductTotalPrice();
  productModel = await productSectionDetails.getProductModel();

  await productSectionDetails.btnAddToCart.click();

  expect(await cart.getProductImage(productData[2].name)).toEqual(productImage);
  expect(await cart.getProductName(productData[2].name)).toEqual(productData[2].name);
  expect(await cart.getProductModel(productData[2].name)).toEqual(productModel);
  expect(await cart.getProductPrice(productData[2].name)).toEqual(productPrice);
  expect(await cart.getProductQuantity(productData[2].name)).toEqual(1);
  expect(await cart.getProductTotalPrice(productData[2].name)).toEqual(productTotalPrice);

  await cart.removeProduct(productData[2].name);
  await expect(cart.txtCartEmptyMessage).toContainText('Your shopping cart is empty!');
});
