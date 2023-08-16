import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  timeout: 300000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    // baseURL: "http://127.0.0.1:5500/public_modules_fail/home.html",
    baseURL: "http://127.0.0.1:5500/public/home.html",
    browserName: "chromium",
    launchOptions: {
      slowMo: 300,
    },
    locale: "en-GB",
    actionTimeout: 0,
    trace: "on",
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    } /*
    {
      name: "Desktop Chrome",
      use: { browserName: "chromium" },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/ /* Test against mobile viewports. */ /* Test against branded browsers. */, // { //   name: 'Mobile Chrome', //   use: { //     ...devices['Pixel 5'], //   }, // }, // { //   name: 'Mobile Safari', //   use: { //     ...devices['iPhone 12'], //   }, // }, // { //   name: 'Microsoft Edge', //   use: { //     channel: 'msedge', //   }, // }, // { //   name: 'Google Chrome', //   use: { //     channel: 'chrome', //   }, // },
  ] /* Folder for test artifacts such as screenshots, videos, traces, etc. */ /* Run your local dev server before starting the tests */, // outputDir: 'test-results/', // webServer: { //   command: 'npm run start', //   port: 3000, // },
};
export default config;
