import { test, expect } from "../fixtures/mergeFixtures";
import { test_data } from "../fixtures/data.json";
import { fakerSloikInfo } from "../fixtures/generateSloikInfo";
import { sloikOneTitle, sloikOneGoalSum } from "../fixtures/fixtures";

test.describe("Home page test suite", () => {
  const sloikTwoTitle = test_data.sloikTwoTitle;
  const sloikTwoDescription = "Gift for my sweetie";
  const sloikTwoGoalSum = 13500;
  const sloikOneGoalSum = 10000;
  const addMoneySum = 5000;

  async function getRandomDescription({ request }) {
    const response = await request.get("https://catfact.ninja/fact");
    expect(await response.status()).toBe(200);
    const getJSON = JSON.parse(await response.text());
    const getSentence = getJSON.fact;
    return getSentence;
  }

  test("Should create 2 sloiks", async ({ sloikHomePage, sloikSloikPage, request, setup }) => {
    let getRandomSentence = await getRandomDescription({ request });
    await setup;
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(fakerSloikInfo.title);
    await sloikHomePage.fillSloikDescriptionInput(fakerSloikInfo.description);
    await sloikHomePage.fillSLoikGoalSumInput(fakerSloikInfo.goalSum);
    await sloikHomePage.clickSloikSumbitBtn();
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(sloikTwoTitle);
    await sloikHomePage.fillSloikDescriptionInput(getRandomSentence);
    await sloikHomePage.fillSLoikGoalSumInput(sloikTwoGoalSum);
    await sloikHomePage.clickSloikSumbitBtn();
    await sloikHomePage.clickSloikOneBtn();
    await sloikSloikPage.assertSloikValues(
      fakerSloikInfo.title,
      fakerSloikInfo.description,
      "0",
      fakerSloikInfo.goalSum,
      "0%",
    );
    await sloikSloikPage.clickHomeBtn();
    await sloikHomePage.clickSloikTwoBtn();
    await sloikSloikPage.assertSloikValues(
      sloikTwoTitle,
      getRandomSentence,
      "0",
      sloikTwoGoalSum,
      "0%",
    );
  });

  test("Bulk edit sloik", async ({ sloikHomePage, sloikSloikPage, setup }) => {
    await setup;
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(fakerSloikInfo.title);
    await sloikHomePage.fillSloikDescriptionInput(fakerSloikInfo.description);
    await sloikHomePage.fillSLoikGoalSumInput(sloikOneGoalSum);
    await sloikHomePage.clickSloikSumbitBtn();
    await sloikHomePage.clickSloikOneBtn();
    await sloikSloikPage.assertSloikValues(
      fakerSloikInfo.title,
      fakerSloikInfo.description,
      "0",
      sloikOneGoalSum,
      "0%",
    );
    await sloikSloikPage.fillAddMoneyInput(addMoneySum);
    await sloikSloikPage.clickAddMoneyButton();
    await sloikSloikPage.assertSloikValues(
      fakerSloikInfo.title,
      fakerSloikInfo.description,
      "5000",
      sloikOneGoalSum,
      "50%",
    );
    await sloikSloikPage.clickHomeBtn();
    await sloikHomePage.bulkEditSloikButton.click();
    await sloikHomePage.sloikTitleInput.clear();
    await sloikHomePage.sloikDescriptionInput.clear();
    await sloikHomePage.sloikGoalSumInput.clear();
    await sloikHomePage.sloikTitleInput.fill("SomeEditedTitle");
    await sloikHomePage.sloikDescriptionInput.fill("SomeEditedDescription");
    await sloikHomePage.sloikGoalSumInput.fill("7500");
    await sloikHomePage.bulkEditButton.click();
    await sloikHomePage.clickSloikOneBtn();
    await sloikSloikPage.assertSloikValues(
      "SomeEditedTitle",
      "SomeEditedDescription",
      "5000",
      7500,
      "67%",
    );
  });
});
