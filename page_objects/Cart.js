export class Cart {
  constructor(page) {
    this.page = page;

    // Locators
    this.txtCartEmptyMessage = this.page.locator('div.contentpanel');
    this.rows = this.page.locator('div.product-list tr');
    this.txtCartTotals = this.page.locator('#totals_table tr td:nth-child(2)');
    this.inpCouponCode = this.page.locator('#coupon_coupon');
    this.btnCouponApply = this.page.locator('#apply_coupon_btn');
    this.ddlCountry = this.page.locator('#estimate_country');
    this.ddlState = this.page.locator('#estimate_country_zones');
    this.inpPostCode = this.page.locator('#estimate_postcode');
    this.ddlShippingRate = this.page.locator('#shippings');
    this.btnCheckout = this.page.locator('#cart_checkout2');
  }

  async getProductIndex(product) {
    const count = await this.rows.count();

    for (let i = 1; i < count; i++) {
      if ((await this.rows.nth(i).locator('td').nth(1).locator('a').textContent()) === product.name) return i;
    }
  }

  async getProductImage(product) {
    const index = await this.getProductIndex(product);
    let image = await this.rows.nth(index).locator('td').first().locator('img').getAttribute('src');

    image = image.split('/').pop().split('-');
    image.pop();
    image = image.join('-');
    console.log(`Product cart image: ${image}`);

    return image;
  }

  async getProductName(product) {
    const index = await this.getProductIndex(product);
    const name = await this.rows.nth(index).locator('td').nth(1).locator('a').textContent();

    console.log(`Product cart name: ${name}`);

    return name;
  }

  async getProductModel(product) {
    const index = await this.getProductIndex(product);
    const model = await this.rows.nth(index).locator('td').nth(2).textContent();

    console.log(`Product cart model: ${model}`);

    return model;
  }

  async getProductPrice(product) {
    const index = await this.getProductIndex(product);
    let price = await this.rows.nth(index).locator('td').nth(3).textContent();

    price = Number(price.replace('$', ''));
    console.log(`Product cart unit price: ${price}`);

    return price;
  }

  async getProductQuantity(product) {
    const index = await this.getProductIndex(product);
    const quantity = Number(await this.rows.nth(index).locator('td').nth(4).locator('input').getAttribute('value'));

    console.log(`Product cart quantity: ${quantity}`);

    return quantity;
  }

  async getProductTotalPrice(product) {
    const index = await this.getProductIndex(product);
    let total = await this.rows.nth(index).locator('td').nth(5).textContent();

    total = Number(total.replace('$', ''));
    console.log(`Product cart total: ${total}`);

    return total;
  }

  async getTotals() {
    const totalsArr = [];

    for (let i = 0; i < 3; i++) {
      totalsArr.push(await this.txtCartTotals.nth(i).textContent());
    }

    const totals = {};
    totals.subTotal = Number(totalsArr[0].replace('$', ''));
    totals.shippingRate = Number(totalsArr[1].replace('$', ''));
    totals.total = Number(totalsArr[2].replace('$', ''));

    console.log(`Cart sub-total: ${totals.subTotal}`);
    console.log(`Cart shipping rate: ${totals.shippingRate}`);
    console.log(`Cart total: ${totals.total}`);

    return totals;
  }

  async selectCountry(product) {
    await this.ddlCountry.selectOption(product.country);
  }

  async selectState(product) {
    await this.ddlState.selectOption(product.state);
  }

  async fillPostCode(product) {
    await this.inpPostCode.fill(product.code);
  }

  async selectShippingRate(product) {
    await this.ddlShippingRate.selectOption(product.rate);
  }

  async removeProduct(product) {
    const index = await this.getProductIndex(product);

    await this.rows.nth(index).locator('td').nth(6).locator('a').click();
  }
}
