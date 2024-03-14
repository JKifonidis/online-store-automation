import { test, expect } from '@playwright/test';
import { POManager } from '../utils/POManager';
import { Utils } from '../utils/Utils';
import url from '../test_data/URL.json';
import regData from '../test_data/RegData.json';
import orderData from '../test_data/OrderData.json';

test.afterAll(async ({ browser }) => {
  await browser.close();
});

// TODO Add comments
// TODO Add expect messages

test(`Add and remove product "${orderData[2].name}" from cart @smoke @Cart`, async ({ page }) => {
  const poManager = new POManager(page);
  const topSection = await poManager.getTopSectionPage();
  const productSection = await poManager.getProductSectionPage();
  const productSectionDetails = await poManager.getProductSectionDetailsPage();
  const cart = await poManager.getCartPage();
  let productImage, productPrice, productTotalPrice, productModel;

  await page.goto('/');

  await topSection.clickCatMenuButton(orderData[2]);
  await expect(productSection.h1).toHaveText(orderData[2].category);

  await productSection.clickSubcategoryButton(orderData[2]);
  await expect(productSection.h1).toHaveText(orderData[2].subcategory);

  productImage = await productSection.getProductImage(orderData[2]);
  productPrice = await productSection.getProductPrice(orderData[2]);

  await productSection.clickViewButton(orderData[2]);

  expect(await productSectionDetails.getProductImage()).toEqual(productImage);
  expect(await productSectionDetails.getProductName()).toEqual(orderData[2].name);
  expect(await productSectionDetails.getProductPrice()).toEqual(productPrice);
  expect(await productSectionDetails.getProductQuantity()).toEqual(1);

  productTotalPrice = await productSectionDetails.getProductTotalPrice();
  productModel = await productSectionDetails.getProductModel();

  await productSectionDetails.btnAddToCart.click();

  await expect(page).toHaveURL(url.cartPage);
  expect(await cart.getProductImage(orderData[2])).toEqual(productImage);
  expect(await cart.getProductName(orderData[2])).toEqual(orderData[2].name);
  expect(await cart.getProductModel(orderData[2])).toEqual(productModel);
  expect(await cart.getProductPrice(orderData[2])).toEqual(productPrice);
  expect(await cart.getProductQuantity(orderData[2])).toEqual(1);
  expect(await cart.getProductTotalPrice(orderData[2])).toEqual(productTotalPrice);

  const totals = await cart.getTotals();

  expect(totals.subTotal).toEqual(productPrice);
  expect(totals.total).toEqual(totals.subTotal + totals.shippingRate);

  await cart.removeProduct(orderData[2]);
  await expect(cart.txtCartEmptyMessage).toContainText('Your shopping cart is empty!');
});

test('Create order', async ({ page }) => {
  const poManager = new POManager(page);
  const utils = new Utils(page);
  const topSection = await poManager.getTopSectionPage();
  const accountLogin = await poManager.getAccountLoginPage();
  const cart = await poManager.getCartPage();
  const checkout = await poManager.getCheckoutPage();
  const checkoutSuccess = await poManager.getCheckoutSuccessPage();
  const accountOrderHistory = await poManager.getAccountOrderHistoryPage();

  await page.goto('/');
  const productDetails = await utils.addProductToCart(orderData[2]);

  await page.goto(url.cartPage);
  const cartTotals = await cart.getTotals();
  await cart.btnCheckout.click();

  await accountLogin.fillLoginForm(regData);
  await accountLogin.btnLogin.click();

  // Assert privacy policy
  await checkout.btnReturnPolicy.click();
  await expect(checkout.h1ReturnPolicy).toHaveText('Return Policy');

  await checkout.btnCloseReturnPolicy.click();
  await page.waitForTimeout(200);
  await expect(checkout.ReturnPolicyModal).toHaveCSS('display', 'none');

  // Assert shipping
  await expect(checkout.tblConfirmShipping.nth(0)).toHaveText(`${regData.firstname} ${regData.lastname}\n${regData.telephone}`);
  await expect(checkout.tblConfirmShipping.nth(1)).toHaveText(
    `${regData.address_1} ${regData.address_2}\n${regData.city} ${regData.zone_id} ${regData.postcode}\n${regData.country_id}`
  );
  await expect(checkout.tblConfirmShipping.nth(2)).toHaveText('Flat Shipping Rate');

  // Assert payment
  await expect(checkout.tblConfirmPayment.nth(0)).toHaveText(`${regData.firstname} ${regData.lastname}\n${regData.telephone}`);
  await expect(checkout.tblConfirmPayment.nth(1)).toHaveText(
    `${regData.address_1} ${regData.address_2}\n${regData.city} ${regData.zone_id} ${regData.postcode}\n${regData.country_id}`
  );
  await expect(checkout.tblConfirmPayment.nth(2)).toHaveText('Cash On Delivery');

  // Assert product summary
  expect(await checkout.getProductImage(orderData[2])).toEqual(productDetails.image);
  expect(await checkout.getProductName(orderData[2])).toEqual(orderData[2].name);
  expect(await checkout.getProductPrice(orderData[2])).toEqual(productDetails.price);
  expect(await checkout.getProductQuantity(orderData[2])).toEqual(1);
  expect(await checkout.getProductTotalPrice(orderData[2])).toEqual(productDetails.price);

  // Assert price summary
  expect(await checkout.getTotals()).toEqual(cartTotals);

  // Assert order summary
  expect(await checkout.getProductSummaryQuantity(orderData[2])).toEqual(1);
  expect(await checkout.getProductSummaryTotalPrice(orderData[2])).toEqual(productDetails.price);
  expect(await checkout.getSummaryTotals()).toEqual(cartTotals);

  // Confirm order
  await checkout.btnConfirmOrder.click();
  await expect(page).toHaveURL(url.checkoutSuccessPage);
  await expect(checkoutSuccess.h1).toHaveText('Your Order Has Been Processed!');

  const orderId = await checkoutSuccess.getOrderId();
  await checkoutSuccess.btnContinue.click();
  await expect(page).toHaveURL('/');

  await topSection.clickTopMenuButton('Check Your Order');
  await expect(page).toHaveURL(url.accountOrderHistoryPage);
  const orderDetails = await accountOrderHistory.getOrderDetails(orderId);

  expect(orderDetails.status).toEqual('Pending');
  expect(orderDetails.dateAdded).toEqual(await utils.getCurrentDate());
  expect(orderDetails.customer).toEqual(`${regData.firstname} ${regData.lastname}`);
  expect(orderDetails.products).toEqual(1);
  expect(orderDetails.total).toEqual(cartTotals.total);
});
