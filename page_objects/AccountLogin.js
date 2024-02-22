import url from '../test_data/URL.json';

export class AccountLogin {
  constructor(page) {
    this.page = page;

    // Locators
    this.btnContinue = page.locator('button[title="Continue"]');
    this.inpLoginName = page.locator('#loginFrm_loginname');
    this.inpPassword = page.locator('#loginFrm_password');
    this.btnLogin = page.getByTitle('Login');
  }

  async fillLoginForm(loginDataJson) {
    await this.inpLoginName.fill(loginDataJson.loginname);
    await this.inpPassword.fill(loginDataJson.password);
  }

  async loginUser(loginDataJson, context) {
    try {
      await this.page.goto(url.accountLoginPage);
      await this.fillLoginForm(loginDataJson);
      await this.btnLogin.click();
      const storage = await context.storageState();

      return storage.cookies;
    } catch (error) {
      console.log(`Login failed: ${error}`);
    }
  }
}
