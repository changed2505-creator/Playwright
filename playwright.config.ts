import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  use: {
    browserName: "chromium",
    // screenshot: "only-on-failure",
    headless: false,
    actionTimeout: 10000,
    navigationTimeout: 20000,
  },
});
