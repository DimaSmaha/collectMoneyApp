import { test, expect, request, APIResponse } from "@playwright/test";
import { SloikHomePage } from "../pages/sloikHomePage.page";
import { SloikSloikPage } from "../pages/sloikSloikPage.page";
import {
  sloikOneTitle,
  sloikOneDescription,
  sloikOneGoalSum,
} from "../fixtures/fixtures";
import { test_data } from "../fixtures/data.json";

test.describe("Hone page test suite", () => {
  const sloikTwoTitle = test_data.sloikTwoTitle;
  const sloikTwoDescription = "Gift for my sweetie";
  const sloikTwoGoalSum = 13500;

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

  async function getRandomDescription({ request }) {
    const response = await request.get("https://catfact.ninja/fact");
    expect(await response.status()).toBe(200);
    const getJSON = JSON.parse(await response.text());
    const getSentence = getJSON.fact;
    return getSentence;
  }

  let sloikHomePage;
  let sloikSloikPage;
  test.beforeEach(async ({ page, context }) => {
    sloikHomePage = new SloikHomePage(page);
    sloikSloikPage = new SloikSloikPage(page);
    await sloikHomePage.goto();
    await page.waitForLoadState();
    await context.clearCookies();
  });

  test("Should create 2 sloiks", async ({ page, request }) => {
    let getRandomSentence = await getRandomDescription({ request });

    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(sloikOneTitle);
    await sloikHomePage.fillSloikDescriptionInput(getRandomSentence);
    await sloikHomePage.fillSLoikGoalSumInput(sloikOneGoalSum);
    await sloikHomePage.clickSloikSumbitBtn();
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(sloikTwoTitle);
    await sloikHomePage.fillSloikDescriptionInput(sloikTwoDescription);
    await sloikHomePage.fillSLoikGoalSumInput(sloikTwoGoalSum);
    await sloikHomePage.clickSloikSumbitBtn();
    await sloikHomePage.clickSloikOneBtn();
    await assertSloikValues(
      { page },
      sloikOneTitle,
      getRandomSentence,
      "0",
      sloikOneGoalSum.toString(),
      "0%"
    );
    await sloikSloikPage.clickHomeBtn();
    await sloikHomePage.clickSloikTwoBtn();
    await assertSloikValues(
      { page },
      sloikTwoTitle,
      sloikTwoDescription,
      "0",
      sloikTwoGoalSum.toString(),
      "0%"
    );
  });
});
