export class TopSection {
  constructor(page) {
    this.page = page;

    // Locators
    this.topMenu = this.page.locator('#main_menu_top');
    this.catMenu = this.page.locator('ul.categorymenu > li > a');
  }

  async clickTopMenuButton(buttonText) {
    if (['Login', 'Check Your Order'].includes(buttonText)) await this.topMenu.getByText('Account').hover();
    await this.topMenu.getByText(buttonText).click();
  }

  async clickCatMenuButton(product) {
    await this.catMenu.getByText(product.category).click();
  }
}
