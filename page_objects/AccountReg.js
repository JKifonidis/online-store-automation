export class AccountReg {
  constructor(page) {
    this.page = page;

    // Locators
    this.btnSubmit = page.getByTitle('Continue');
  }

  async fillRegistrationForm(json) {
    const testData = JSON.parse(JSON.stringify(json));
    let locator;

    for (const [key, value] of Object.entries(testData)) {
      locator = this.page.locator(`#AccountFrm_${key}`);

      if (['zone_id', 'country_id'].includes(key)) {
        await locator.click();
        await locator.pressSequentially(value);
        await this.page.keyboard.press('Enter');
        continue;
      } else if (key === 'newsletter') {
        locator = this.page.locator(`#AccountFrm_${key + (value ? '1' : '0')}`);
        await locator.check();
        continue;
      } else if (key === 'agree' && value) await locator.check();
      else await locator.fill(value);
    }
    await this.btnSubmit.click();
  }
}
