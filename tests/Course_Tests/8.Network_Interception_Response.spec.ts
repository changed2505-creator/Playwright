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
const mockOrderResponse = {
  data: [],
  message: "No Orders",
};

//Common login point
test.beforeAll("Login to the site", async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIHandle(apiContext, loginPayload);
  responseData = await apiUtils.orderPlacer(orderPayload);
});

test("Response Mocking", async ({ page }) => {
  //Setting the token value in Local Storage of the Window
  await page.addInitScript((Token: string) => {
    window.localStorage.setItem("token", Token);
  }, responseData.token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(mockOrderResponse);
      route.fulfill({
        response,
        body,
      });
    },
  );

  //view orders
  const orders = page.locator("[routerlink*='/myorders'].btn");
  await orders.click();

  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  );

  //   Check Text
  await expect(page.getByText("You have No Orders to show at")).toBeVisible();
  await expect(page.locator("app-myorders")).toContainText(
    "You have No Orders to show at this time. Please Visit Back Us",
  );
});
