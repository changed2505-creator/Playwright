import { Locator, Page, expect } from "@playwright/test";

export class Payments_Page {
  CCNo: Locator;
  exp: Locator;
  CVV: Locator;
  Name: Locator;
  emailCheck: Locator;
  selectCountry: Locator;
  list: Locator;
  placeOrder: Locator;

  constructor(public page: Page) {
    this.CCNo = page.locator(".field .text-validated");
    this.exp = page.locator(".ddl");
    this.CVV = page
      .locator(".field")
      .filter({ hasText: "CVV Code" })
      .locator(".input");
    this.Name = page
      .locator(".field")
      .filter({ hasText: "Name on Card" })
      .locator(".input");

    this.emailCheck = page.locator(".text-validated.ng-valid");
    this.selectCountry = page.locator("[placeholder*=Country]");
    this.list = page.locator(".ta-results");

    this.placeOrder = page.locator(".btnn");
  }
  async fillPersonalInfo() {
    await this.CCNo.fill("");
    await this.CCNo.fill("5555 5555 5555 4444");
    await this.exp.first().selectOption("08");
    await this.exp.last().selectOption("20");
    await this.CVV.fill("545");
    await this.Name.fill("Rakesh Shetty");
  }
  async fillShippingInfo(email: string) {
    await expect(this.emailCheck).toHaveValue(email);
    await this.selectCountry.pressSequentially("ind", { delay: 200 });
    await this.list.waitFor();
    const selectOption = await this.list.locator("button").all();
    for (const e of selectOption) {
      if ((await e.textContent()) === " India") {
        await e.click();
        break;
      }
    }
  }

  async payClick() {
    await this.placeOrder.click();
  }
}
