import { Page } from "@playwright/test";
import { Cart_Page } from "../Cart_Page";
import { Dashboard_Page } from "../Dashboard_Page";
import { Login_page } from "../Login_Page";
import { Payments_Page } from "../Payments_Page";
import { OrderConfirm_Page } from "../OrderConfirm_Page";
import { Order_Page } from "../Order_Page";

export class POM {
  login: Login_page;
  dashboard: Dashboard_Page;
  cart: Cart_Page;
  payments: Payments_Page;
  orderConfirm: OrderConfirm_Page;
  orderVerify: Order_Page;

  constructor(public page: Page) {
    this.page = page;
    this.login = new Login_page(this.page);
    this.dashboard = new Dashboard_Page(this.page);
    this.cart = new Cart_Page(this.page);
    this.payments = new Payments_Page(this.page);
    this.orderConfirm = new OrderConfirm_Page(this.page);
    this.orderVerify = new Order_Page(this.page);
  }
  async loginPage() {
    return this.login;
  }
  async dashboardPage() {
    return this.dashboard;
  }
  async cartPage() {
    return this.cart;
  }
  async paymentsPage() {
    return this.payments;
  }
  async orderConfirmPage() {
    return this.orderConfirm;
  }
  async orderPage() {
    return this.orderVerify;
  }
}
