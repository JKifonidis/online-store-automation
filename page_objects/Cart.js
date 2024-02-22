export class Cart {
  constructor(page) {
    this.page = page;

    // Locators
    this.txtCartEmptyMessage = this.page.locator('div.contentpanel');
    this.rows = this.page.locator('div.product-list tr');
    this.txtCartTotals = this.page.locator('#totals_table tr td:nth-child(2)');
  }

  async getProductIndex(product) {
    const count = await this.rows.count();
    for (let i = 1; i < count; i++) {
      if ((await this.rows.nth(i).locator('td').nth(1).locator('a').textContent()) === product) return i;
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
    let name = await this.rows.nth(index).locator('td').nth(1).locator('a').textContent();

    console.log(`Product cart name: ${name}`);

    return name;
  }

  async getProductModel(product) {
    const index = await this.getProductIndex(product);
    let model = await this.rows.nth(index).locator('td').nth(2).textContent();

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
    let quantity = Number(await this.rows.nth(index).locator('td').nth(4).locator('input').getAttribute('value'));

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
    const totals = [];

    for (let i = 0; i < 3; i++) {
      totals.push(await this.txtCartTotals.nth(i).textContent());
    }

    const totalsNumbers = totals.map(total => Number(total.replace('$', '')));
    console.log(`Cart sub-total: ${totalsNumbers[0]}`);
    console.log(`Cart shipping rate: ${totalsNumbers[1]}`);
    console.log(`Cart total: ${totalsNumbers[2]}`);

    return totalsNumbers;
  }

  async removeProduct(product) {
    const index = await this.getProductIndex(product);

    await this.rows.nth(index).locator('td').nth(6).locator('a').click();
  }
}
