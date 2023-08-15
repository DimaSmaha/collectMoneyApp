import { test, expect } from "@playwright/test";
import { RedmineLoginPage } from "../pages/redmineLoginPage.page";
import { RedmineHomePage } from "../pages/redmineHomePage.page";

// Other way of imports
// const { test, expect } = require("@playwright/test");
// const { RedmineLoginPage } = require("../pages/redmineLoginPage.page");
// const { RedmineHomePage } = require("../pages/redmineHomePage.page");

test.describe("Login page tests", () => {
  test.beforeEach(async ({ page }) => {
    let redmineHomePage = new RedmineHomePage(page);
    await redmineHomePage.goto();
    await page.waitForLoadState();
    await redmineHomePage.checkPageUrl();
  });

  test("Should sing in to created account", async ({ page }) => {
    let redmineHomePage = new RedmineHomePage(page);
    let redmineLoginPage = new RedmineLoginPage(page);

    await redmineHomePage.clickSignInBtn();
    await redmineLoginPage.checkPageUrl();
    await redmineLoginPage.fillInputs("babalen", "qwerty");
    await redmineLoginPage.clickLoginBtn();
    await redmineHomePage.checkPageUrl();
    await expect(redmineHomePage.myAccountBtn).toBeVisible();
  });
});
