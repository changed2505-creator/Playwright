import { test, expect } from "@playwright/test";

test.only("Special Locators in Playwright", async ({ page }) => {
  //Complete test timeout
  test.setTimeout(50000);

  //Test level action timeout
  page.setDefaultTimeout(9000);

  //Test level timeout
  const slowExpect = expect.configure({ timeout: 6000 });

  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByPlaceholder("Password").fill("Likeit");
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  2;

  //action level
  await page.getByRole("button", { name: "submit" }).click({ timeout: 10000 });

  //assertion level timeout
  await slowExpect(page.getByText("Success!")).toBeVisible({ timeout: 10000 });
  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();
});
