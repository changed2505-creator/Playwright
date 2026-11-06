import { Page, request, expect, test } from "@playwright/test";
import { testAPIHandle } from "./utilsTest/testAPIHandle";

const BASE_URL: string = "https://eventhub.rahulshettyacademy.com";
const API_URL: string = `https://api.eventhub.rahulshettyacademy.com/api`;
const gmailUser = { email: "test12345@gmail.com", password: "Test@123" };
const yahooUser = { email: "test123@yahoo.com", password: "Test@123" };
let responseData: Record<string, any>;

test.beforeAll("Login via API", async () => {
  const apiContext = await request.newContext();
  const APIutils = new testAPIHandle(apiContext, yahooUser, API_URL);
  await APIutils.getEventId();
  responseData = await APIutils.bookEvent();
});

async function loginAs(page: Page, GMAIL_USER: Record<string, any>) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByRole("textbox", { name: "Email" }).fill(GMAIL_USER.email);
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(GMAIL_USER.password);
  await page.getByRole("button", { name: "Sign In" }).click();
}

test("Access Denial", async ({ page }) => {
  await loginAs(page, gmailUser);

  await page.waitForLoadState("networkidle");

  await page.goto(
    `https://eventhub.rahulshettyacademy.com/bookings/${responseData.yahooBookingId}`,
    {
      waitUntil: "networkidle",
    },
  );

  await expect(page.getByText("Access Denied")).toBeVisible();

  await page.pause();
});
