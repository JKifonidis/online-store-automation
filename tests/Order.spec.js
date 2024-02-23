import { test, expect } from '@playwright/test';
import { POManager } from '../utils/POManager';
import url from '../test_data/URL.json';
import orderData from '../test_data/OrderData.json';

test.afterAll(async ({ browser }) => {
  await browser.close();
});

test(`Add and remove product "${orderData[2].name}" from cart @smoke`, async ({ page }) => {
  const poManager = new POManager(page);
  const topSection = await poManager.getTopSection();
  const productSection = await poManager.getProductSection();
  const productSectionDetails = await poManager.getProductSectionDetails();
  const cart = await poManager.getCartPage();
  let productImage, productPrice, productTotalPrice, productModel;

  await page.goto('/');

  await topSection.clickCatMenuButton(orderData[2].category);
  await expect(productSection.h1).toHaveText(orderData[2].category);

  await productSection.clickSubcategoryButton(orderData[2].subcategory);
  await expect(productSection.h1).toHaveText(orderData[2].subcategory);

  productImage = await productSection.getProductImage(orderData[2].name);
  productPrice = await productSection.getProductPrice(orderData[2].name);

  await productSection.clickViewButton(orderData[2].name);

  expect(await productSectionDetails.getProductImage()).toEqual(productImage);
  expect(await productSectionDetails.getProductName()).toEqual(orderData[2].name);
  expect(await productSectionDetails.getProductPrice()).toEqual(productPrice);
  expect(await productSectionDetails.getProductQuantity()).toEqual(1);

  productTotalPrice = await productSectionDetails.getProductTotalPrice();
  productModel = await productSectionDetails.getProductModel();

  await productSectionDetails.btnAddToCart.click();

  await expect(page).toHaveURL(url.cartPage);
  expect(await cart.getProductImage(orderData[2].name)).toEqual(productImage);
  expect(await cart.getProductName(orderData[2].name)).toEqual(orderData[2].name);
  expect(await cart.getProductModel(orderData[2].name)).toEqual(productModel);
  expect(await cart.getProductPrice(orderData[2].name)).toEqual(productPrice);
  expect(await cart.getProductQuantity(orderData[2].name)).toEqual(1);
  expect(await cart.getProductTotalPrice(orderData[2].name)).toEqual(productTotalPrice);

  const [subTotal, shippingRate, total] = await cart.getTotals();

  expect(subTotal).toEqual(productPrice);
  expect(total).toEqual(subTotal + shippingRate);

  await cart.removeProduct(orderData[2].name);
  await expect(cart.txtCartEmptyMessage).toContainText('Your shopping cart is empty!');
});
