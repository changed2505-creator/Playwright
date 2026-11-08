import { expect } from "@playwright/test";
import { customTest } from "../../Utils/helpers/Fixtures";

customTest("Running a fixture", async ({ loginFixture, orderFixture }) => {
  await loginFixture.goto("https://rahulshettyacademy.com/client");
  const orders = loginFixture.locator("[routerlink*='/myorders'].btn");
  await orders.click();
  console.log(orderFixture.orderID);
  expect(await loginFixture.getByText(orderFixture.orderID).isVisible());
});
