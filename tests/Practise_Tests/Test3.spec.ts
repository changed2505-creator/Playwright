import { expect } from "@playwright/test";
import { customTest } from "./utilsTest/testFixtures";

customTest.only("Test Fixtures", async ({ authenticatedPage, createEvent }) => {
  await authenticatedPage.goto(
    "https://eventhub.rahulshettyacademy.com/events",
  );
  await expect(
    authenticatedPage.getByText(await createEvent.data.title),
  ).toBeVisible();
});
