export class ProductSection {
  constructor(page) {
    this.page = page;

    // Locators
    this.thumbnails = this.page.locator('ul.thumbnails');
    this.h1 = this.page.locator('h1');
    this.productLinks = this.page.locator('.fixed_wrapper a');
  }

  async clickThumbnailImage(thumbnail) {
    await this.thumbnails.getByText(thumbnail).click();
  }

  async getProductId(product) {
    let productId;
    const count = await this.productLinks.count();

    for (let i = 0; i < count; i++) {
      const linkName = await this.productLinks.nth(i).textContent();
      if (linkName.toLowerCase() === product.toLowerCase()) {
        const link = await this.productLinks.nth(i).getAttribute('href');
        productId = link.split('id=').pop();
      }
    }
    console.log(`Product Id: ${productId}`);
    if (!productId) throw new Error(`Product with name "${product}" not found`);

    return productId;
  }

  async getProductPrice(product) {
    const productId = await this.getProductId(product);
    const price = await this.page.locator(`a[data-id="${productId}"] + div > div`).first().textContent();

    return Number(price.replace('$', ''));
  }

  async addProductToCart(product) {
    const productId = await this.getProductId(product);

    await this.page.locator(`a[data-id="${productId}"]`).first().click();
    await this.page.getByTitle('Added to cart').click();
  }
}
