import { test, expect } from "@playwright/test";

test("Hidden functionality", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  page.getByRole("button", { name: "Hide" }).click();
  await expect(
    page.getByRole("textbox", { name: "Hide/Show Example" }),
  ).toBeHidden();
  page.getByRole("button", { name: "Show" }).click();
  await expect(
    page.getByRole("textbox", { name: "Hide/Show Example" }),
  ).toBeVisible();
});

test("Popup and Hover functionality", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  page.on("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "Alert" }).click();
  await page.pause();

  await page.getByRole("button", { name: "Mouse Hover" }).hover();
});

test("iframes functionality", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  const framePage = page.frameLocator("#courses-iframe");
  await framePage.getByText("JOIN NOW").first().waitFor({ state: "visible" });
  await framePage.getByText("JOIN NOW").first().click();
});
