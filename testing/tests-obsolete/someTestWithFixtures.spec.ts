import { expect } from "../fixtures/toBeWithinRange";
import { test } from "../fixtures/mergeFixtures";

test.describe("Fixture test suite", () => {
  test("Should use fixture", async ({
    sloikHomePage,
    sloikSloikPage,
    setup,
  }) => {
    expect(100).toBeWithinRange(90, 110);
    // expect(100).toBeWithinRange(105, 110);
    const sloikTitle = "Title made with fixture";
    const sloikDescription = "Description made with fixture";
    const sloikGoalSum = 10000;
    await setup;
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(sloikTitle);
    await sloikHomePage.fillSloikDescriptionInput(sloikDescription);
    await sloikHomePage.fillSLoikGoalSumInput(sloikGoalSum);
    await sloikHomePage.clickSloikSumbitBtn();
    await sloikHomePage.clickSloikOneBtn();
    await sloikSloikPage.assertSloikValues(
      sloikTitle,
      sloikDescription,
      "0",
      sloikGoalSum.toString(),
      "0%"
    );
  });
});
