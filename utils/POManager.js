import { HomePage } from '../page_objects/HomePage';
import { AccountRegister } from '../page_objects/AccountRegister';
import { AccountRegisterSuccess } from '../page_objects/AccountRegisterSuccess';
import { AccountLogin } from '../page_objects/AccountLogin';
import { Account } from '../page_objects/Account';
import { AccountLogout } from '../page_objects/AccountLogout';

export class POManager {
  constructor(page, apiContext) {
    this.page = page;
    this.apiContext = apiContext;
    this.homePage = new HomePage(this.page);
    this.accountRegister = new AccountRegister(this.page);
    this.accountRegisterSuccess = new AccountRegisterSuccess(this.page);
    this.accountLogin = new AccountLogin(this.page);
    this.account = new Account(this.page);
    this.accountLogout = new AccountLogout(this.page);
  }

  async getHomePage() {
    return this.homePage;
  }

  async getAccountRegisterPage() {
    return this.accountRegister;
  }

  async getAccountRegisterSuccessPage() {
    return this.accountRegisterSuccess;
  }

  async getAccountLoginPage() {
    return this.accountLogin;
  }

  async getAccountPage() {
    return this.account;
  }

  async getAccountLogoutPage() {
    return this.accountLogout;
  }
}
