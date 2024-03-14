export class CheckoutSuccess {
  constructor(page) {
    this.page = page;

    // Locators
    this.h1 = this.page.locator('h1');
    this.txtOrderId = this.page.locator('.mb40 p').nth(1);
    this.btnContinue = this.page.getByTitle('Continue');
  }

  async getOrderId() {
    let orderId = await this.txtOrderId.textContent();

    orderId = orderId.split(' ')[2];
    console.log(`Order Id: ${orderId}`);

    return orderId;
  }
}
