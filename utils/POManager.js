import { TopSection } from '../page_objects/TopSection';
import { ProductSection } from '../page_objects/ProductSection';
import { ProductSectionDetails } from '../page_objects/ProductSectionDetails';
import { MainPage } from '../page_objects/MainPage';
import { AccountReg } from '../page_objects/AccountReg';
import { AccountRegSuccess } from '../page_objects/AccountRegSuccess';
import { AccountLogin } from '../page_objects/AccountLogin';
import { Account } from '../page_objects/Account';
import { AccountLogout } from '../page_objects/AccountLogout';
import { Cart } from '../page_objects/Cart';

export class POManager {
  constructor(page, apiContext) {
    this.page = page;
    this.apiContext = apiContext;
    this.topSection = new TopSection(this.page);
    this.productSection = new ProductSection(this.page);
    this.productSectionDetails = new ProductSectionDetails(this.page);
    this.mainPage = new MainPage(this.page);
    this.accountReg = new AccountReg(this.page);
    this.accountRegSuccess = new AccountRegSuccess(this.page);
    this.accountLogin = new AccountLogin(this.page);
    this.account = new Account(this.page);
    this.accountLogout = new AccountLogout(this.page);
    this.cart = new Cart(this.page);
  }

  async getTopSection() {
    return this.topSection;
  }

  async getProductSection() {
    return this.productSection;
  }

  async getProductSectionDetails() {
    return this.productSectionDetails;
  }

  async getMainPage() {
    return this.mainPage;
  }

  async getAccountRegPage() {
    return this.accountReg;
  }

  async getAccountRegSuccessPage() {
    return this.accountRegSuccess;
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

  async getCartPage() {
    return this.cart;
  }
}
