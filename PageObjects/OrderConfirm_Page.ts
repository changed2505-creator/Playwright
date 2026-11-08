import { Locator, Page, expect } from "@playwright/test";

export class OrderConfirm_Page {
  oConfirm: Locator;
  orderID: Locator;
  orders: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.oConfirm = page.locator(".hero-primary");
    this.orderID = page.locator("label.ng-star-inserted");
    this.orders = page.locator("[routerlink*='/myorders'].btn");
  }
  async checkOrderDetails(itemName: string) {
    await this.page
      .locator("td.line-item.product-info-column.m-3 div.title")
      .waitFor();
    await expect(
      this.page.locator("td.line-item.product-info-column.m-3 div.title"),
    ).toHaveText(itemName);

    await expect(this.oConfirm).toHaveText(" Thankyou for the order. ");
    const data = await this.orderID.textContent();
    const orderNo = data!.slice(3, -3);
    return orderNo;
  }
  async goToOrders() {
    await this.orders.click();
  }
}
