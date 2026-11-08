import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  projects: [
    {
      name: "Firefox",
      use: {
        browserName: "firefox",
        // screenshot: "only-on-failure",
        headless: false,
        actionTimeout: 10000,
        navigationTimeout: 20000,
        // screenshot: "on",
        trace: "on",
        // viewport: { width: 720, height: 720 }, Responsive Sites
      },
    },
    {
      name: "Webkit",
      use: {
        browserName: "webkit",
        // screenshot: "only-on-failure",
        headless: true,
        actionTimeout: 10000,
        navigationTimeout: 20000,
        // screenshot: "on",
        // trace: "on",
      },
    },
  ],
});
