export class TopSection {
  constructor(page) {
    this.page = page;

    // Locators
    this.catMenu = 'ul.categorymenu > li > a';
  }

  async clickCatMenuButton(category) {
    await this.page.locator(this.catMenu).getByText(category).click();
  }
}
