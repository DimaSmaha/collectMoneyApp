import { test, expect, request, APIResponse } from "@playwright/test";
import { SloikHomePage } from "../pages/sloikHomePage.page";
import { SloikSloikPage } from "../pages/sloikSloikPage.page";
import { SloikAchievementsPage } from "../pages/sloikAchievementsPage.page";
import {
  sloikOneTitle,
  sloikOneDescription,
  sloikOneGoalSum,
} from "../fixtures/fixtures";

test.describe("Achievements page test suite", () => {
  async function assertSloikValues(
    { page },
    title: string,
    description: string,
    moneyScore: string,
    yourGoal: string,
    progressBar: string
  ) {
    await page.waitForLoadState();
    await sloikSloikPage.assertSloikTitleValue(title);
    await sloikSloikPage.assertSloikDesriptionValue(description);
    await sloikSloikPage.assertMoneyScoreValue(`Your money : ${moneyScore}`);
    await sloikSloikPage.assertYourGoalValue(`Your goal : ${yourGoal}`);
    await sloikSloikPage.assertProgressBarValue(progressBar);
  }

  async function createAndOpenSloik(
    { page },
    title: string,
    description: string,
    yourGoal: number
  ) {
    let sloikHomePage = new SloikHomePage(page);
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(title);
    await sloikHomePage.fillSloikDescriptionInput(description);
    await sloikHomePage.fillSLoikGoalSumInput(yourGoal);
    await sloikHomePage.clickSloikSumbitBtn();
    await sloikHomePage.clickSloikOneBtn();
  }

  let sloikHomePage;
  let sloikSloikPage;
  let sloikAchievementsPage;
  test.beforeEach(async ({ page, context }) => {
    sloikHomePage = new SloikHomePage(page);
    sloikSloikPage = new SloikSloikPage(page);
    sloikAchievementsPage = new SloikAchievementsPage(page);
    await sloikHomePage.goto();
    await page.waitForLoadState();
    await context.clearCookies();
  });

  test("Should properly show achievements", async ({ page }) => {
    const addMoneySum = 777;

    await sloikHomePage.clickAchievementsButton();
    await expect(sloikAchievementsPage.achievementOne).not.toBeVisible();
    await expect(sloikAchievementsPage.achievementTwo).not.toBeVisible();
    await sloikAchievementsPage.clickHomeButton();
    await createAndOpenSloik(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await assertSloikValues(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      "0",
      sloikOneGoalSum.toString(),
      "0%"
    );
    await sloikSloikPage.fillAddMoneyInput(addMoneySum.toString());
    await sloikSloikPage.clickAddMoneyButton();
    await sloikSloikPage.assertMoneyScoreValue(
      `Your money : ${addMoneySum.toString()}`
    );
    await expect(sloikSloikPage.achievementOne).toBeInViewport();
    await expect(sloikSloikPage.achievementOne).toBeVisible();
    await expect(sloikSloikPage.achievementOne).toHaveCSS("display", "block");
    await sloikSloikPage.clickHomeBtn();
    await sloikHomePage.clickAchievementsButton();
    await expect(sloikAchievementsPage.achievementOne).toBeVisible();
    await expect(sloikAchievementsPage.achievementTwo).not.toBeVisible();
  });
});
