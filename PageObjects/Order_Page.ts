import { Locator, Page, expect } from "@playwright/test";

export class Order_Page {
  OrderId: Locator;
  constructor(public page: Page) {
    this.page = page;
    this.OrderId = this.page.locator(".col-text.-main");
  }
  async viewLastOrder(orderNo: string) {
    await this.page.locator("tbody").waitFor();
    const allOrders = await this.page.locator("tbody tr").all();
    for (const e of allOrders) {
      if ((await e.locator("th").textContent()) === orderNo) {
        await e.locator(".btn-primary").click();
        break;
      }
    }
  }
  async verifyOrder(orderNo: string) {
    const verifyId = await this.OrderId.textContent();
    expect(verifyId).toMatch(orderNo);
  }
}
