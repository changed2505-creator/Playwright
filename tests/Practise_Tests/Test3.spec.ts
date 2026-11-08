import { expect } from "@playwright/test";
import { customTest } from "../../Utils/helpers/testFixtures";

customTest("Test Fixtures", async ({ authenticatedPage, createEvent }) => {
  await authenticatedPage.goto(
    "https://eventhub.rahulshettyacademy.com/events",
  );
  await expect(
    authenticatedPage.getByText(await createEvent.data.title),
  ).toBeVisible();
});
