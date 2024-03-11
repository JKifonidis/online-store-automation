export class TopSection {
  constructor(page) {
    this.page = page;

    // Locators
    this.catMenu = 'ul.categorymenu > li > a';
  }

  async clickCatMenuButton(product) {
    await this.page.locator(this.catMenu).getByText(product.category).click();
  }
}
