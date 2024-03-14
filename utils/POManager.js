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
import { Checkout } from '../page_objects/Checkout';
import { CheckoutSuccess } from '../page_objects/CheckoutSuccess';
import { AccountOrderHistory } from '../page_objects/AccountOrderHistory';

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
    this.accountOrderHistory = new AccountOrderHistory(this.page);
    this.accountLogout = new AccountLogout(this.page);
    this.cart = new Cart(this.page);
    this.checkout = new Checkout(this.page);
    this.checkoutSuccess = new CheckoutSuccess(this.page);
  }

  async getTopSectionPage() {
    return this.topSection;
  }

  async getProductSectionPage() {
    return this.productSection;
  }

  async getProductSectionDetailsPage() {
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

  async getAccountOrderHistoryPage() {
    return this.accountOrderHistory;
  }

  async getAccountLogoutPage() {
    return this.accountLogout;
  }

  async getCartPage() {
    return this.cart;
  }

  async getCheckoutPage() {
    return this.checkout;
  }

  async getCheckoutSuccessPage() {
    return this.checkoutSuccess;
  }
}
