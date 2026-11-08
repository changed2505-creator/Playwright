import { test, expect } from "@playwright/test";
import { POM } from "../../PageObjects/POM/POM";
import testData from "../../Utils/testData/P_OtestData.json" with { type: "json" };
import { customTest } from "../../Utils/helpers/testDataFixture";

for (const data of testData) {
  test(`Tesing for differenent data ${data.itemName}`, async ({ page }) => {
    const pom = new POM(page);

    //Login
    const login = await pom.loginPage();
    await login.loginFun(data.email, data.password);

    //Search for items list
    const dashboard = await pom.dashboardPage();
    await dashboard.addToCart(data.itemName);

    //Check if item is in cart
    await dashboard.goToCart();

    const cart = await pom.cartPage();
    await cart.verifyProduct();

    //Checkout
    await cart.itemCheckOut();

    //Personal Information
    const payments = await pom.paymentsPage();
    await payments.fillPersonalInfo();

    // Shipping Info
    await payments.fillShippingInfo(data.email);

    //Place Order
    await payments.payClick();

    //Order placed confirmation
    const orderConfirm = await pom.orderConfirmPage();
    const orderNo = await orderConfirm.checkOrderDetails(data.itemName);

    //view orderss
    await orderConfirm.goToOrders();

    //view the last order
    const orderVerify = await pom.orderPage();
    await orderVerify.viewLastOrder(orderNo);

    //Verify orderID
    await orderVerify.verifyOrder(orderNo);
  });
}

customTest.only(
  "Testing custom data fixtures",
  async ({ page, testDataFixture }) => {
    const pom = new POM(page);

    //Login
    const login = await pom.loginPage();
    await login.loginFun(testDataFixture.email, testDataFixture.password);

    //Search for items list
    const dashboard = await pom.dashboardPage();
    await dashboard.addToCart(testDataFixture.itemName);

    //Check if item is in cart
    await dashboard.goToCart();

    const cart = await pom.cartPage();
    await cart.verifyProduct();

    //Checkout
    await cart.itemCheckOut();

    //Personal Information
    const payments = await pom.paymentsPage();
    await payments.fillPersonalInfo();

    // Shipping Info
    await payments.fillShippingInfo(testDataFixture.email);

    //Place Order
    await payments.payClick();

    //Order placed confirmation
    const orderConfirm = await pom.orderConfirmPage();
    const orderNo = await orderConfirm.checkOrderDetails(
      testDataFixture.itemName,
    );

    //view orderss
    await orderConfirm.goToOrders();

    //view the last order
    const orderVerify = await pom.orderPage();
    await orderVerify.viewLastOrder(orderNo);

    //Verify orderID
    await orderVerify.verifyOrder(orderNo);
  },
);
