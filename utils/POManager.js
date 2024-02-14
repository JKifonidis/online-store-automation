import { HomePage } from '../page_objects/HomePage';
import { AccountRegister } from '../page_objects/AccountRegister';
import { AccountSuccess } from '../page_objects/AccountSuccess';
import { AccountLogin } from '../page_objects/AccountLogin';
import { Account } from '../page_objects/Account';

export class POManager {
  constructor(page, apiContext) {
    this.page = page;
    this.apiContext = apiContext;
    this.homePage = new HomePage(this.page);
    this.accountRegister = new AccountRegister(this.page);
    this.accountSuccess = new AccountSuccess(this.page);
    this.accountLogin = new AccountLogin(this.page);
    this.account = new Account(this.page);
  }

  async getHomePage() {
    return this.homePage;
  }

  async getAccountRegisterPage() {
    return this.accountRegister;
  }

  async getAccountSuccessPage() {
    return this.accountSuccess;
  }

  async getAccountLoginPage() {
    return this.accountLogin;
  }

  async getAccountPage() {
    return this.account;
  }
}
