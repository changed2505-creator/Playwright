import { test, expect, Page } from "@playwright/test";

test("E2E booking and verification", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("Test12345@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("Test@123");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("button", { name: "Admin" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Manage Events" })
    .click();
  await page.getByTestId("event-title-input").fill("Dance");
  await page
    .getByRole("textbox", { name: "Describe the event…" })
    .fill("We are going to dance");
  await page.getByLabel("Category*").selectOption("Festival");
  await page.getByRole("textbox", { name: "City*" }).fill("Banglore");
  await page.getByRole("textbox", { name: "Venue*" }).fill("Kormangla");
  await page
    .getByRole("textbox", { name: "Event Date & Time*" })
    .fill("2026-11-05T10:12");
  await page.getByRole("spinbutton", { name: "Price ($)*" }).fill("5");
  await page.getByTestId("add-event-btn").click();
  await page.getByTestId("nav-home").click();
  const before = await page
    .getByTestId("event-card")
    .filter({ hasText: "Dance" })
    .getByText("seats")
    .textContent();
  const beforeCount = Number(before?.match(/\d+/)?.[0]);

  await page
    .getByRole("article")
    .filter({ hasText: "FestivalDanceThu, 5" })
    .getByTestId("book-now-btn")
    .click();
  await page.getByRole("textbox", { name: "Full Name*" }).fill("Tester");
  await page.getByTestId("customer-email").fill("Test12345@gmail.com");
  await page.getByRole("textbox", { name: "Phone Number*" }).fill("1234567899");
  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await page.getByTestId("nav-home").click();
  await page.waitForLoadState("networkidle");
  const after = await page
    .getByTestId("event-card")
    .filter({ hasText: "Dance" })
    .getByText("seats")
    .textContent();
  console.log(before);
  console.log(after);
  const afterCount = Number(after?.match(/\d+/));
  expect(beforeCount - afterCount).toBe(1);
});

test.only("E2E cancellation with refund", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com");

  //   Login
  async function loginAndGoToBooking(page: Page) {
    await page
      .getByRole("textbox", { name: "Email" })
      .fill("Test12345@gmail.com");
    await page.getByRole("textbox", { name: "Password" }).fill("Test@123");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(
      page.getByRole("link", { name: "Browse Events →" }),
    ).toBeVisible();
  }
  loginAndGoToBooking(page);

  //   Book first event with 1 ticket (default)
  await page.getByTestId("nav-events").click();
  await page
    .getByRole("article")
    .filter({ hasText: "FestivalFeaturedDilli Diwali" })
    .getByTestId("book-now-btn")
    .click();
  await page.getByRole("textbox", { name: "Full Name*" }).fill("Tester");
  await page.getByTestId("customer-email").fill("test123@gmail.com");
  await page.getByRole("textbox", { name: "Phone Number*" }).fill("1234567899");
  await page.getByRole("button", { name: "Confirm Booking" }).click();

  // Navigate to booking detail
  await page.getByRole("button", { name: "View My Bookings" }).click();
  await expect(page).toHaveURL(/\/bookings$/);
  await page.getByRole("button", { name: "View Details" }).first().click();
  await expect(
    page.getByRole("heading", { name: "Booking Information" }),
  ).toBeVisible();

  //   Validate booking ref
  const text1 = await page.locator("span.text-indigo-600").textContent();
  const ref = text1?.slice(0, 1);
  const text2 = await page.locator("h1").textContent();
  const title = text2?.slice(0, 1);
  expect(ref).toEqual(title);

  //   Check refund eligibility
  await page.getByTestId("check-refund-btn").click();
  await expect(page.getByTestId("refund-spinner")).toBeVisible();
  await expect(page.getByTestId("refund-spinner")).toBeHidden({
    timeout: 6000,
  });

  //   Validate result
  await expect(page.getByTestId("refund-result")).toBeVisible();
  await expect(page.getByRole("strong")).toContainText("Eligible for refund.");
  await expect(page.getByTestId("refund-result")).toContainText(
    "Single-ticket bookings qualify for a full refund.",
  );
});
