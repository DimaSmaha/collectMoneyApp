import { test } from "../fixtures/pagesFixture";

test.describe("Fixture test suite", () => {
  test.beforeEach(async ({ page, context, sloikHomePage }) => {
    await sloikHomePage.goto();
    await page.waitForLoadState();
    await context.clearCookies();
  });

  test("Should use fixture", async ({ sloikHomePage }) => {
    const sloikTitle = "Title made with fixture";
    const sloikDescription = "Description made with fixture";
    const sloikGoalSum = 10000;

    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(sloikTitle);
    await sloikHomePage.fillSloikDescriptionInput(sloikDescription);
    await sloikHomePage.fillSLoikGoalSumInput(sloikGoalSum);
    await sloikHomePage.clickSloikSumbitBtn();
  });
});
