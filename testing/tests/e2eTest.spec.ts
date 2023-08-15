import { test, expect } from "@playwright/test";
import { SloikHomePage } from "../pages/sloikHomePage.page";
import { SloikSloikPage } from "../pages/sloikSloikPage.page";

test.describe("Login page tests", () => {
  test.beforeEach(async ({ page }) => {
    let redmineHomePage = new SloikHomePage(page);
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
