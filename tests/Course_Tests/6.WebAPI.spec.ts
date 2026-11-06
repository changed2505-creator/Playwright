import { test, expect, request } from "@playwright/test";
import { APIHandle } from "../Utils/APIHandle";

let responseData: Record<string, any>;
//Login Payload
const loginPayload = {
  userEmail: "Never555@gmail.com",
  userPassword: "Never@555",
};
//Order Payload
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};

//Common login point
test.beforeAll("Login to the site", async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIHandle(apiContext, loginPayload);
  responseData = await apiUtils.orderPlacer(orderPayload);
});

test("E2E test for the site", async ({ page }) => {
  //Setting the token value in Local Storage of the Window
  await page.addInitScript((Token: string) => {
    window.localStorage.setItem("token", Token);
  }, responseData.token);

  await page.goto("https://rahulshettyacademy.com/client");

  //view orders
  const orders = page.locator("[routerlink*='/myorders'].btn");
  await orders.click();

  //view the last order
  await page.locator("tbody").waitFor();
  const allOrders = await page.locator("tbody tr").all();
  for (const e of allOrders) {
    if ((await e.locator("th").textContent()) === responseData.orderID) {
      await e.locator(".btn-primary").click();
      break;
    }
  }

  //Verify orderID
  const verifyId = await page.locator(".col-text.-main").textContent();
  await page.pause();
  expect(verifyId).toMatch(responseData.orderID);
});
