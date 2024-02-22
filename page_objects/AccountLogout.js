export class AccountLogout {
  constructor(page) {
    this, (page = page);

    // Locators
    this.h1 = page.locator('h1');
    this.btnContinue = page.getByTitle('Continue');
  }
}
