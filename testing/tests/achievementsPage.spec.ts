import { test, expect } from "../fixtures/mergeFixtures";
import {
  sloikOneTitle,
  sloikOneDescription,
  sloikOneGoalSum,
} from "../fixtures/fixtures";

test.describe("Achievements page test suite", () => {
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

  test("Should properly show achievements", async ({
    sloikHomePage,
    sloikAchievementsPage,
    sloikSloikPage,
    setup,
  }) => {
    const addMoneySum = 777;
    await setup;
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
    await sloikSloikPage.fillAddMoneyInput(addMoneySum);
    await sloikSloikPage.clickAddMoneyButton();
    await sloikSloikPage.assertMoneyScoreValue(`Your money : ${addMoneySum}`);
    await expect(sloikSloikPage.achievementOne).toBeInViewport();
    await expect(sloikSloikPage.achievementOne).toBeVisible();
    await expect(sloikSloikPage.achievementOne).toHaveCSS("display", "block");
    await sloikSloikPage.clickHomeBtn();
    await sloikHomePage.clickAchievementsButton();
    await expect(sloikAchievementsPage.achievementOne).toBeVisible();
    await expect(sloikAchievementsPage.achievementTwo).not.toBeVisible();
  });
});
