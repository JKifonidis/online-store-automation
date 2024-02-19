export class AccountRegSuccess {
  constructor(page) {
    this.page = page;

    // Locators
    this.txtH1 = page.locator('h1');
    this.btncontactUs = page.locator('section.mb40 p a');
    this.btnContinue = page.getByTitle('Continue');
  }
}
