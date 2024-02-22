export class ProductSectionDetails {
  constructor(page) {
    this.page = page;

    // Locators
    this.txtProductName = this.page.locator('h1');
    this.txtProductPrice = this.page.locator('.productfilneprice');
    this.inpProductQuantity = this.page.locator('#product_quantity');
    this.txtProductTotalPrice = this.page.locator('#product_details .total-price');
    this.imgProductImage = this.page.locator('.local_image img').first();
    this.txtProductModel = this.page.locator('.productinfo').getByText('Model');
    this.btnAddToCart = this.page.locator('#product_details .cart');
  }

  async getProductImage() {
    let image = await this.imgProductImage.getAttribute('src');

    image = image.split('/').pop().split('-');
    image.pop();
    image = image.join('-');
    console.log(`Product details image: ${image}`);

    return image;
  }

  async getProductName() {
    const name = await this.txtProductName.textContent();

    console.log(`Product details name: ${name}`);

    return name;
  }

  async getProductPrice() {
    let price = await this.txtProductPrice.textContent();

    price = Number(price.replace('$', ''));
    console.log(`Product details price: ${price}`);

    return price;
  }

  async getProductQuantity() {
    const quantity = Number(await this.inpProductQuantity.getAttribute('value'));

    console.log(`Product details quantity: ${quantity}`);

    return quantity;
  }

  async getProductTotalPrice() {
    await this.txtProductTotalPrice.waitFor();
    let total = await this.txtProductTotalPrice.textContent();

    total = Number(total.replace('$', ''));
    console.log(`Product details total: ${total}`);

    return total;
  }

  async getProductModel() {
    if (await this.txtProductModel.isVisible()) {
      let model = await this.page
        .locator('.productinfo li')
        .filter({ has: await this.page.getByText('Model:') })
        .textContent();

      model = model.split(':').pop().trim();
      console.log(`Product details model: ${model}`);

      return model;
    } else return '';
  }
}
