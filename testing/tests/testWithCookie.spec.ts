import { test } from "../fixtures/mergeFixtures";
import { SloikHomePage } from "../pages/sloikHomePage.page";
import { SloikSloikPage } from "../pages/sloikSloikPage.page";

test.describe("Fixture test suite", () => {
  test.skip("Should use cookies", async ({ setCookies }) => {
    const sloikTitle = "Title made with fixture";
    const sloikDescription = "Description made with fixture";
    const sloikGoalSum = 10000;
    let sloikHomePage = new SloikHomePage(setCookies); //to use a browser context u have to connect pages to the context
    let sloikSloikPage = new SloikSloikPage(setCookies);
    await setCookies;
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
