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

  page.on("request", (req) => console.log(req.url()));
  page.on("response", (res) => console.log(res.url(), res.status()));
  // //Login failure
  // await userName.fill("rahulshettyacademy");
  // await password.fill("Learning@830$3mK245656567");
  // await signInBtn.click();
  // console.log(await errorBox.textContent());
  // await expect(errorBox).toContainText("Incorrect");

  // //Clear content
  // await userName.fill("");
  // await password.fill("");

  //login success
  await userName.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK2");
  await signInBtn.click();

  // Network Abort
  // await page.route("**/*.jpg", (route) => route.abort());

  //extract title after login
  console.log(await productName.nth(0).textContent());
  console.log(await productName.allTextContents());
});

test("Static dropdown select", async ({ page }) => {
  const userName = page.locator("#username");
  const password = page.locator("[type = 'password']");
  const signInBtn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control ");
  const radio = page.locator(".customradio [value='user']");
  const ok = page.locator("#okayBtn");
  const TandC = page.locator("#terms");
  const blinkText = page.locator("[href*='documents-request']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await expect(blinkText).toHaveAttribute("class", "blinkingText");
  await userName.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK2");
  await radio.click();
  await ok.click();
  await expect(radio).toBeChecked();
  await dropdown.selectOption("consult");
  expect(await TandC.isChecked()).toBeFalsy();
  await TandC.click();
  await expect(TandC).toBeChecked();
  await signInBtn.click();
});

test("Navigating to child window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const userName = page.locator("#username");
  const password = page.locator("[type = 'password']");
  const signInBtn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control ");
  const radio = page.locator(".customradio [value='user']");
  const ok = page.locator("#okayBtn");
  const TandC = page.locator("#terms");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const blinkLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    blinkLink.click(),
  ]);

  const redText = await newPage.locator(".red a").textContent();
  const username = redText!.split("@")[1].slice(0, 18);

  await userName.fill(username);
  console.log(await userName.inputValue());
  await password.fill("Learning@830$3mK2");
  await radio.click();
  await ok.click();
  await expect(radio).toBeChecked();
  await dropdown.selectOption("consult");
  expect(await TandC.isChecked()).toBeFalsy();
  await TandC.click();
  await expect(TandC).toBeChecked();
  await signInBtn.click();
});
