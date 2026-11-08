import { Locator, Page } from "@playwright/test";

export class Login_page {
  emailLogin: Locator;
  password: Locator;
  login: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.emailLogin = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.login = page.locator("#login");
  }

  async loginFun(email: string, password: string) {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await this.emailLogin.fill(email);
    await this.password.fill(password);
    await this.login.click();
  }
}
