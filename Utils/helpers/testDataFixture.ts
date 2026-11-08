import { test as base } from "@playwright/test";

interface TestData {
  itemName: string;
  email: string;
  password: string;
}
export const customTest = base.extend<{
  testDataFixture: TestData;
}>({
  testDataFixture: {
    itemName: "ZARA COAT 3",
    email: "Never555@gmail.com",
    password: "Never@555",
  },
});
