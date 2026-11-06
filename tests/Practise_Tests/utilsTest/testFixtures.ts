import { test as base, Page } from "@playwright/test";

export const customTest = base.extend<{
  authenticatedPage: Page;
  createEvent: Record<string, any>;
}>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page
      .getByRole("textbox", { name: "Email" })
      .fill("test12345@gmail.com");
    await page.getByRole("textbox", { name: "Password" }).fill("Test@123");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.waitForLoadState("networkidle");
    await use(page);
  },
  createEvent: async ({ playwright }, use) => {
    const newContext = await playwright.request.newContext();
    const response = await newContext.post(
      "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
      {
        data: {
          email: "Test12345@gmail.com",
          password: "Test@123",
        },
      },
    );
    const jsonResponse = await response.json();
    const token = jsonResponse.token;

    const testData = {
      category: "Workshop",
      city: "Banglore",
      description: "Something new5",
      eventDate: "2026-11-10T06:30:00.000Z",
      price: 50,
      title: "Five stars5",
      totalSeats: 500,
      venue: "Kengeri",
    };

    const eventResponse = await newContext.post(
      "https://api.eventhub.rahulshettyacademy.com/api/events",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: testData,
      },
    );
    const jsonEvent = await eventResponse.json();
    await use(jsonEvent);
  },
});
