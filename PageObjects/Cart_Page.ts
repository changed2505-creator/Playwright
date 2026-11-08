import { Locator, Page, expect } from "@playwright/test";

export class Cart_Page {
  cartItem: Locator;
  checkOut: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.cartItem = page.locator("h3:has-text('ZARA COAT 3')");
    this.checkOut = page.locator(".btn:has-text('Checkout')");
  }
  async verifyProduct() {
    expect(this.cartItem.isVisible()).toBeTruthy();
  }
  async itemCheckOut() {
    await this.checkOut.click();
  }
}
