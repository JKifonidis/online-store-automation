export class AccountOrderHistory {
  constructor(page) {
    this.page = page;

    // Locators
    this.order = this.page.locator('.contentpanel > div.container-fluid.mt20');
  }

  async getOrderIndex(orderId) {
    const count = await this.order.count();
    for (let i = 0; i < count; i++) {
      let historyOrderId = await this.order.nth(i).locator('> div:first-child').textContent();
      historyOrderId = historyOrderId.split(':')[1].trim();

      if (historyOrderId === orderId) return i;
    }
  }

  async getOrderDetails(orderId) {
    const index = await this.getOrderIndex(orderId);
    const orderDetails = {};
    let orderDetailsText = await this.order.nth(index).innerText();

    orderDetailsText = orderDetailsText.split('\n');
    orderDetails.status = orderDetailsText[1].split(':')[1].trim();
    orderDetails.dateAdded = orderDetailsText[2].split('\t')[0].split(':')[1].trim();
    orderDetails.customer = orderDetailsText[2].split('\t')[1].split(':')[1].trim();
    orderDetails.products = Number(orderDetailsText[3].split('\t')[0].split(':')[1].trim());
    orderDetails.total = Number(orderDetailsText[3].split('\t')[1].split(':')[1].trim().replace('$', ''));

    console.log(`Order ${orderId} details:
    Status: ${orderDetails.status}
    Date added: ${orderDetails.dateAdded}
    Customer: ${orderDetails.customer}
    Products: ${orderDetails.products}
    Total: ${orderDetails.total}`);

    return orderDetails;
  }
}
