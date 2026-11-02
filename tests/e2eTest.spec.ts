import { test, expect } from "@playwright/test";

test("Login to Ecommerse site", async ({ page }) => {
  const emailLogin = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const login = page.locator("#login");
  const itemName: string = "ZARA COAT 3";

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  //Login
  await emailLogin.fill("Never555@gmail.com");
  const email = await emailLogin.inputValue();
  console.log(email);
  await password.fill("Never@555");
  await login.click();

  //Wait for DOM load
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body").first().waitFor();

  //Search for items list
  const itemData = await page.locator(".card-body").all();
  for (const e of itemData) {
    if ((await e.locator("b").textContent()) === itemName) {
      //Add item
      await e.locator("text= Add To Cart").click();
      break;
    }
  }

  //Check if item is in cart
  const cartBtn = page.locator("[routerlink*='/cart']");
  await cartBtn.click();
  await page.locator(".cart li").waitFor();
  const cartItem = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(cartItem).toBeTruthy();

  //Checkout
  const checkOut = page.locator(".btn:has-text('Checkout')");
  await checkOut.click();

  //Personal Information
  const CCNo = page.locator(".field .text-validated");
  const exp = page.locator(".ddl");
  const CVV = page
    .locator(".field")
    .filter({ hasText: "CVV Code" })
    .locator(".input");
  const Name = page
    .locator(".field")
    .filter({ hasText: "Name on Card" })
    .locator(".input");
  await CCNo.fill("");
  await CCNo.fill("5555 5555 5555 4444");
  await exp.first().selectOption("08");
  await exp.last().selectOption("20");
  await CVV.fill("545");
  await Name.fill("Rakesh Shetty");

  // Shipping Info
  const emailCheck = page.locator(".text-validated.ng-valid");
  const selectCountry = page.locator("[placeholder*=Country]");
  const list = page.locator(".ta-results");
  await expect(emailCheck).toHaveValue(email);
  await selectCountry.pressSequentially("ind", { delay: 200 });
  await list.waitFor();
  const selectOption = await list.locator("button").all();
  for (const e of selectOption) {
    if ((await e.textContent()) === " India") {
      await e.click();
      break;
    }
  }

  //Place Order
  const placeOrder = page.locator(".btnn");
  await placeOrder.click();

  //Order placed confirmation
  await page
    .locator("td.line-item.product-info-column.m-3 div.title")
    .waitFor();
  await expect(
    page.locator("td.line-item.product-info-column.m-3 div.title"),
  ).toHaveText(itemName);
  const oConfirm = page.locator(".hero-primary");
  const orderID = page.locator("label.ng-star-inserted");
  await expect(oConfirm).toHaveText(" Thankyou for the order. ");
  const data = await orderID.textContent();
  const orderNo = data!.slice(3, -3);
  console.log(orderNo);

  //view orders
  const orders = page.locator("[routerlink*='/myorders'].btn");
  await orders.click();

  //view the last order
  await page.locator("tbody").waitFor();
  const allOrders = await page.locator("tbody tr").all();
  for (const e of allOrders) {
    if ((await e.locator("th").textContent()) === orderNo) {
      await e.locator(".btn-primary").click();
      break;
    }
  }

  //Verify orderID
  const verifyId = await page.locator(".col-text.-main").textContent();
  expect(verifyId).toMatch(orderNo);
  await page.pause();
});
