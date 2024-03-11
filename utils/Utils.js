import { TopSection } from '../page_objects/TopSection';
import { ProductSection } from '../page_objects/ProductSection';
import { AccountLogin } from '../page_objects/AccountLogin';
import url from '../test_data/URL.json';

export class Utils {
  constructor(page) {
    this.page = page;
    this.topSection = new TopSection(this.page);
    this.productSection = new ProductSection(this.page);
    this.accountLogin = new AccountLogin(this.page);
  }

  async loginUser(loginDataJson, context) {
    try {
      await this.page.goto(url.accountLoginPage);
      await this.accountLogin.fillLoginForm(loginDataJson);
      await this.btnLogin.click();
      const storage = await context.storageState();

      return storage.cookies;
    } catch (error) {
      console.log(`Login failed: ${error}`);
    }
  }

  async addProductToCart(product) {
    await this.topSection.clickCatMenuButton(product);
    await this.productSection.clickSubcategoryButton(product);

    const index = await this.productSection.getProductIndex(product);
    const productDetails = {};
    productDetails.image = await this.productSection.getProductImage(product);
    productDetails.price = await this.productSection.getProductPrice(product);

    if (await this.productSection.productElement.nth(index).locator('nostock').isVisible()) throw new Error(`Product: ${product} out of stock`);

    await this.productSection.productElement.nth(index).locator('.productcart').click();

    return productDetails;
  }
}
