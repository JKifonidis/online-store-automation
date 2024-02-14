export class HomePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.btnLoginPage = page.locator('#customernav a');
  }
}
