export class AccountLogin {
  constructor(page) {
    this.page = page;

    // Locators
    this.btnContinue = page.locator('button[title="Continue"]');
    this.inpLoginName = page.locator('#loginFrm_loginname');
    this.inpPassword = page.locator('#loginFrm_password');
    this.btnLogin = page.getByTitle('Login');
  }

  async fillLoginForm(json) {
    const loginData = JSON.parse(JSON.stringify(json));
    await this.inpLoginName.fill(loginData.loginname);
    await this.inpPassword.fill(loginData.password);
  }
}
