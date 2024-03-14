export class Checkout {
  constructor(page) {
    this.page = page;

    // Locators
    this.h1ReturnPolicy = this.page.locator('#content h1');
    this.ReturnPolicyModal = this.page.locator('#returnPolicyModal');
    this.btnReturnPolicy = this.page.locator('a[onclick]');
    this.btnCloseReturnPolicy = this.page.getByText('Close');
    this.tblConfirmShipping = this.page.locator('.confirm_shippment_options td');
    this.tblConfirmPayment = this.page.locator('.confirm_payment_options td');
    this.tblConfirmProducts = this.page.locator('.confirm_products tr');
    this.tblConfirmTotal = this.page.locator('.confirm_total tr td:last-child');
    this.tblProductSummary = this.page.locator('.sidewidt table').first().locator('tr');
    this.tblPriceSummary = this.page.locator('.sidewidt table').last().locator('td + td');
    this.btnConfirmOrder = this.page.locator('#checkout_btn');
  }

  async getProductIndex(product) {
    const count = await this.tblConfirmProducts.count();

    for (let i = 0; i < count; i++) {
      if ((await this.tblConfirmProducts.nth(i).locator('td').nth(1).locator('a').textContent()) === product.name) return i;
    }
  }

  async getProductImage(product) {
    const index = await this.getProductIndex(product);
    let image = await this.tblConfirmProducts.nth(index).locator('td').first().locator('img').getAttribute('src');

    image = image.split('/').pop().split('-');
    image.pop();
    image = image.join('-');
    console.log(`Product checkout image: ${image}`);

    return image;
  }

  async getProductName(product) {
    const index = await this.getProductIndex(product);
    const name = await this.tblConfirmProducts.nth(index).locator('td').nth(1).locator('a').textContent();

    console.log(`Product checkout name: ${name}`);

    return name;
  }

  async getProductPrice(product) {
    const index = await this.getProductIndex(product);
    let price = await this.tblConfirmProducts.nth(index).locator('td').nth(2).textContent();

    price = Number(price.replace('$', ''));
    console.log(`Product checkout unit price: ${price}`);

    return price;
  }

  async getProductQuantity(product) {
    const index = await this.getProductIndex(product);
    const quantity = Number(await this.tblConfirmProducts.nth(index).locator('td').nth(3).textContent());

    console.log(`Product checkout quantity: ${quantity}`);

    return quantity;
  }

  async getProductTotalPrice(product) {
    const index = await this.getProductIndex(product);
    let total = await this.tblConfirmProducts.nth(index).locator('td').nth(4).textContent();

    total = Number(total.replace('$', ''));
    console.log(`Product checkout total: ${total}`);

    return total;
  }

  async getTotals() {
    const totalsArr = [];

    for (let i = 0; i < 3; i++) {
      totalsArr.push(await this.tblConfirmTotal.nth(i).textContent());
    }

    const totals = {};
    totals.subTotal = Number(totalsArr[0].replace('$', ''));
    totals.shippingRate = Number(totalsArr[1].replace('$', ''));
    totals.total = Number(totalsArr[2].replace('$', ''));

    console.log(`Checkout sub-total: ${totals.subTotal}`);
    console.log(`Checkout shipping rate: ${totals.shippingRate}`);
    console.log(`Checkout total: ${totals.total}`);

    return totals;
  }

  async getProductSummaryIndex(product) {
    const count = await this.tblProductSummary.count();

    for (let i = 0; i < count; i++) {
      if ((await this.tblProductSummary.nth(i).locator('td').first().locator('a').textContent()) === product.name) {
        return i;
      } else throw new Error(`Product ${product.name} not found`);
    }
  }

  async getProductSummaryQuantity(product) {
    const index = await this.getProductSummaryIndex(product);
    let quantity = await this.tblProductSummary.nth(index).locator('td').first().textContent();

    quantity = Number(quantity.split(' ').shift());
    console.log(`Product checkout summary quantity: ${quantity}`);

    return quantity;
  }

  async getProductSummaryTotalPrice(product) {
    const index = await this.getProductSummaryIndex(product);
    let totalPrice = await this.tblProductSummary.nth(index).locator('td').last().textContent();

    totalPrice = Number(totalPrice.replace('$', ''));
    console.log(`Product checkout summary total price: ${totalPrice}`);

    return totalPrice;
  }

  async getSummaryTotals() {
    const totalsArr = [];

    for (let i = 0; i < 3; i++) {
      totalsArr.push(await this.tblPriceSummary.nth(i).textContent());
    }

    const totals = {};
    totals.subTotal = Number(totalsArr[0].replace('$', ''));
    totals.shippingRate = Number(totalsArr[1].replace('$', ''));
    totals.total = Number(totalsArr[2].replace('$', ''));

    console.log(`Checkout summary sub-total: ${totals.subTotal}`);
    console.log(`Checkout summary shipping rate: ${totals.shippingRate}`);
    console.log(`Checkout summary total: ${totals.total}`);

    return totals;
  }
}
