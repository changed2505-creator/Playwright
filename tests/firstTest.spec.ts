import { expect, test } from "@playwright/test";

test("First test", async ({ browser, page }) => {
  //   const context = await browser.newContext();
  //   const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log(await page.title());

  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
});

test("Login to a site", async ({ page }) => {
  const errorBox = page.locator("[style*='block']");
  const userName = page.locator("#username");
  const password = page.locator("[type = 'password']");
  const signInBtn = page.locator("#signInBtn");
  const productName = page.locator(".card-body .card-title a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  //Login failuer
  await userName.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK245656567");
  await signInBtn.click();
  console.log(await errorBox.textContent());
  await expect(errorBox).toContainText("Incorrect");

  //Clear content
  await userName.fill("");
  await password.fill("");

  //login success
  await userName.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK2");
  await signInBtn.click();

  //extract title after login
  console.log(await productName.nth(0).textContent());
  console.log(await productName.allTextContents());
});

test.only("Login to another site", async ({ page }) => {
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
