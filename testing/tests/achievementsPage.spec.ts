import { test, expect } from "../fixtures/mergeFixtures";

import {
  sloikOneTitle,
  sloikOneDescription,
  sloikOneGoalSum,
} from "../fixtures/fixtures";

test.describe("Achievements page test suite", () => {
  async function assertSloikValues(
    { page, sloikSloikPage },
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
    { sloikHomePage },
    title: string,
    description: string,
    yourGoal: number
  ) {
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(title);
    await sloikHomePage.fillSloikDescriptionInput(description);
    await sloikHomePage.fillSLoikGoalSumInput(yourGoal);
    await sloikHomePage.clickSloikSumbitBtn();
    await sloikHomePage.clickSloikOneBtn();
  }

  test.beforeEach(async ({ page, context, sloikHomePage }) => {
    await sloikHomePage.goto();
    await page.waitForLoadState();
    await context.clearCookies();
  });

  test("Should properly show achievements", async ({
    page,
    sloikHomePage,
    sloikAchievementsPage,
    sloikSloikPage,
  }) => {
    const addMoneySum = 777;

    await sloikHomePage.clickAchievementsButton();
    await expect(sloikAchievementsPage.achievementOne).not.toBeVisible();
    await expect(sloikAchievementsPage.achievementTwo).not.toBeVisible();
    await sloikAchievementsPage.clickHomeButton();
    await createAndOpenSloik(
      { sloikHomePage },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await assertSloikValues(
      { page, sloikSloikPage },
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
