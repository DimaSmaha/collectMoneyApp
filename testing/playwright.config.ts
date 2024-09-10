import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  timeout: 15000,
  expect: {
    timeout: 6000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 3,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://127.0.0.1:5500/public_modules/home.html", //local server IP
    // baseURL: "http://127.0.0.1:5500/public/home.html",           //local server IP
    headless: false,
    browserName: "chromium",
    launchOptions: {
      slowMo: 0,
    },
    locale: "en-GB",
    actionTimeout: 0,
    trace: "on",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // viewport: { width: 1920, height: 1080 }, // the viewport may be overwritten by device, so u have to specify it inside of project
      },
    },
    {
      name: "gh-actions",
      use: {
        baseURL: "http://127.0.0.1:5500/public_modules/home.html", //local server IP
      },
    },
    {
      name: "docker",
      use: {
        // baseURL: "http://172.20.0.1:5500/public/home.html",    // local docker-compose IP
        baseURL: "http://app/public/home.html", // local docker-compose IP
        headless: true,
      },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], browserName: "firefox" },
    },
    {
      name: "mobile_chrome",
      use: { ...devices["Pixel 5"], browserName: "chromium" },
    },
    {
      name: "safari",
      use: { ...devices["Desktop Safari"], browserName: "webkit" },
    } /* Test against mobile viewports. */ /* Test against branded browsers. */,
    /*
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
    },*/ // { //   name: 'Mobile Chrome', //   use: { //     ...devices['Pixel 5'], //   }, // }, // { //   name: 'Mobile Safari', //   use: { //     ...devices['iPhone 12'], //   }, // }, // { //   name: 'Microsoft Edge', //   use: { //     channel: 'msedge', //   }, // }, // { //   name: 'Google Chrome', //   use: { //     channel: 'chrome', //   }, // },
  ] /* Folder for test artifacts such as screenshots, videos, traces, etc. */ /* Run your local dev server before starting the tests */, // outputDir: 'test-results/', // webServer: { //   command: 'npm run start', //   port: 3000, // },
};
export default config;
