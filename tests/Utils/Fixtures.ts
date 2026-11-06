import { test as base, Page, request } from "@playwright/test";
import { APIHandle } from "./APIHandle";

const loginPayload = {
  userEmail: "Never555@gmail.com",
  userPassword: "Never@555",
};
//Order Payload
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};

export const customTest = base.extend<{
  loginFixture: Page;
  orderFixture: Record<string, any>;
}>({
  //Setup
  loginFixture: async ({ page }, use) => {
    await page.goto("https://rahulshettyacademy.com/client");
    const emailLogin = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login = page.locator("#login");
    await emailLogin.fill("Never555@gmail.com");
    const email = await emailLogin.inputValue();
    console.log(email);
    await password.fill("Never@555");
    await login.click();
    await page.waitForLoadState("networkidle");
    await use(page);

    //Teardown(After use())
    await page.close();
  },
  orderFixture: async ({}, use) => {
    const apiContext = await request.newContext();
    const apiUtils = new APIHandle(apiContext, loginPayload);
    const responseData = await apiUtils.orderPlacer(orderPayload);
    use(responseData);

    await apiContext.dispose();
  },
});
