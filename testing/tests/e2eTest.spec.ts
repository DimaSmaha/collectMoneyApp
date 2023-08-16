import { test, expect } from "@playwright/test";
import { SloikHomePage } from "../pages/sloikHomePage.page";
import { SloikSloikPage } from "../pages/sloikSloikPage.page";

test.describe("E2E", () => {
  const sloikOneTitle = "Home";
  const sloikOneDescription = "Home sweet home";
  const sloikOneGoalSum = 150000;
  const sloikTwoTitle = "Gift";
  const sloikTwoDescription = "Gift for my sweetie";
  const sloikTwoGoalSum = 13500;

  test.beforeEach(async ({ page }) => {
    let sloikHomePage = new SloikHomePage(page);
    await sloikHomePage.goto();
    await page.waitForLoadState();
  });

  test("Should make e2e test", async ({ page }) => {
    let sloikHomePage = new SloikHomePage(page);
    let sloikSloikPage = new SloikSloikPage(page);

    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(sloikOneTitle);
    await sloikHomePage.fillSloikDescriptionInput(sloikOneDescription);
    await sloikHomePage.fillSLoikGoalSumInput(sloikOneGoalSum);
    await sloikHomePage.clickSloikSumbitBtn();
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(sloikTwoTitle);
    await sloikHomePage.fillSloikDescriptionInput(sloikTwoDescription);
    await sloikHomePage.fillSLoikGoalSumInput(sloikTwoGoalSum);
    await sloikHomePage.clickSloikSumbitBtn();
    await sloikHomePage.clickSloikOneBtn();
  });
});
