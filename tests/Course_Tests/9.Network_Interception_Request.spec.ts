import { test, expect, request } from "@playwright/test";
import { APIHandle } from "../../Utils/helpers/APIHandle";

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

test("Request Mocking", async ({ page }) => {
  //Setting the token value in Local Storage of the Window
  await page.addInitScript((Token: string) => {
    window.localStorage.setItem("token", Token);
  }, responseData.token);

  await page.goto("https://rahulshettyacademy.com/client");

  //view orders
  const orders = page.locator("[routerlink*='/myorders'].btn");
  await orders.click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6aec20fe92a4341c4c04b0bh",
      }),
  );

  //view an order
  await page.getByRole("button", { name: "View" }).first().click();

  await expect(page.locator("app-order-details")).toContainText(
    "You are not authorize to view this order",
  );
});
