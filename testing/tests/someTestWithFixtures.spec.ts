import { test } from "../fixtures/mergeFixtures";

test.describe("Fixture test suite", () => {
  test("Should use fixture", async ({ sloikHomePage, setup }) => {
    const sloikTitle = "Title made with fixture";
    const sloikDescription = "Description made with fixture";
    const sloikGoalSum = 10000;
    await setup;
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(sloikTitle);
    await sloikHomePage.fillSloikDescriptionInput(sloikDescription);
    await sloikHomePage.fillSLoikGoalSumInput(sloikGoalSum);
    await sloikHomePage.clickSloikSumbitBtn();
  });
});
