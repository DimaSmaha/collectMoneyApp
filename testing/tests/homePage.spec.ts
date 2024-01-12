import { test, expect } from "../fixtures/mergeFixtures";
import { test_data } from "../fixtures/data.json";
import { sloikOneTitle, sloikOneGoalSum } from "../fixtures/fixtures";

test.describe("Home page test suite", () => {
  const sloikTwoTitle = test_data.sloikTwoTitle;
  const sloikTwoDescription = "Gift for my sweetie";
  const sloikTwoGoalSum = 13500;

  async function getRandomDescription({ request }) {
    const response = await request.get("https://catfact.ninja/fact");
    expect(await response.status()).toBe(200);
    const getJSON = JSON.parse(await response.text());
    const getSentence = getJSON.fact;
    return getSentence;
  }


  test("Should create 2 sloiks", async ({
    sloikHomePage,
    sloikSloikPage,
    request,
    setup
  }) => {
    let getRandomSentence = await getRandomDescription({ request });
    await setup;
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
    await sloikSloikPage.assertSloikValues(
      sloikOneTitle,
      getRandomSentence,
      "0",
      sloikOneGoalSum,
      "0%"
    );
    await sloikSloikPage.clickHomeBtn();
    await sloikHomePage.clickSloikTwoBtn();
    await sloikSloikPage.assertSloikValues(
      sloikTwoTitle,
      sloikTwoDescription,
      "0",
      sloikTwoGoalSum,
      "0%"
    );
  });
});
