import { SloikSloikPage } from "../pages/sloikSloikPage.page";
import { test } from "./../fixtures/createAndOpenSloik";

test.describe("Fixture dynamic test suite", () => {
  test.use({ title: "davinci", description: "some", yourGoal: 10000 });

  test("Should use dynamic fixture", async ({ page, context }) => {
    const title = "davinci";
    const description = "some";
    const moneyScore = 0;
    const yourGoal = 10000;
    const progressBar = "0%";

    let sloikSloikPage = new SloikSloikPage(page);
    await sloikSloikPage.assertSloikTitleValue(title);
    await sloikSloikPage.assertSloikDesriptionValue(description);
    await sloikSloikPage.assertMoneyScoreValue(`Your money : ${moneyScore}`);
    await sloikSloikPage.assertYourGoalValue(`Your goal : ${yourGoal}`);
    await sloikSloikPage.assertProgressBarValue(progressBar);
  });
});
