import { Locator, Page } from "@playwright/test";

export class Dashboard_Page {
  itemData: Locator;
  cartBtn: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.itemData = page.locator(".card-body");
    this.cartBtn = page.locator("[routerlink*='/cart']");
  }
  async addToCart(itemName: string) {
    await this.page.waitForLoadState("networkidle");
    await this.page.locator(".card-body").first().waitFor();
    const testData = await this.itemData.all();
    for (const e of testData) {
      if ((await e.locator("b").textContent()) === itemName) {
        //Add item
        await e.locator("text= Add To Cart").click();
        break;
      }
    }
    this.page.waitForLoadState("networkidle");
  }
  async goToCart() {
    await this.cartBtn.waitFor();
    await this.cartBtn.click();
  }
}
