export class ProductSection {
  constructor(page) {
    this.page = page;

    // Locators
    this.h1 = this.page.locator('h1');
    this.subcategories = this.page.locator('.thumbnails').first();
    this.productElement = this.page.locator('.list-inline > div.col-md-3');
  }

  async getProductIndex(product) {
    const count = await this.productElement.count();

    for (let i = 0; i < count; i++) {
      if ((await this.productElement.locator('.prdocutname').nth(i).textContent()) === product) return i;
    }
  }

  async getProductImage(product) {
    const index = await this.getProductIndex(product);
    let image = await this.productElement.nth(index).locator('img').getAttribute('src');

    image = image.split('/').pop().split('-');
    image.pop();
    image = image.join('-');
    console.log(`Product shop image: ${image}`);

    return image;
  }

  async getProductPrice(product) {
    const index = await this.getProductIndex(product);
    let price = await this.productElement.nth(index).locator('.oneprice').textContent();

    price = Number(price.replace('$', ''));
    console.log(`Product shop price: ${price}`);

    return price;
  }

  async clickSubcategoryButton(subcategory) {
    await this.subcategories.getByText(subcategory).click();
  }

  async clickViewButton(product) {
    const index = await this.getProductIndex(product);
    await this.productElement.nth(index).locator('> div > a').hover();
    await this.productElement.nth(index).locator('.details').click();
  }
}
