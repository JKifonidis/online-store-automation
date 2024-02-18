export class Account {
  constructor(page) {
    this.page = page;

    // Locators
    this.txtAccountName = page.locator('span.subtext');
    this.btnLogoff = page.locator('ul.side_account_list li').last();
  }
}
