import { test, expect } from "@playwright/test";

test("Login to another site", async ({ page }) => {
  const emailLogin = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const login = page.locator("#login");
  const itemName = page.locator(".card-body h5 b");

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await emailLogin.fill("Never555@gmail.com");
  await password.fill("Never@555");
  await login.click();

  // await page.waitForLoadState("networkidle");
  await itemName.first().waitFor();
  console.log(await itemName.allTextContents());
  console.log(await itemName.nth(0).textContent());
});
