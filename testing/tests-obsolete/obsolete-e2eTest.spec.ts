import { test, expect, request, APIResponse } from "@playwright/test";
import { SloikHomePage } from "../pages/sloikHomePage.page";
import { SloikSloikPage } from "../pages/sloikSloikPage.page";
import { SloikAchievementsPage } from "../pages/sloikAchievementsPage.page";
import {
  sloikOneTitle,
  sloikOneDescription,
  sloikOneGoalSum,
} from "../fixtures/fixtures";
import { test_data } from "../fixtures/data.json";

test.skip("E2E", () => {
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

  async function createAndOpenSloik(
    { page },
    title: string,
    description: string,
    yourGoal: number
  ) {
    let sloikHomePage = new SloikHomePage(page);
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(title);
    await sloikHomePage.fillSloikDescriptionInput(description);
    await sloikHomePage.fillSLoikGoalSumInput(yourGoal);
    await sloikHomePage.clickSloikSumbitBtn();
    await sloikHomePage.clickSloikOneBtn();
  }

  async function createSloik(
    { page },
    title: string,
    description: string,
    yourGoal: number
  ) {
    let sloikHomePage = new SloikHomePage(page);
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(title);
    await sloikHomePage.fillSloikDescriptionInput(description);
    await sloikHomePage.fillSLoikGoalSumInput(yourGoal);
    await sloikHomePage.clickSloikSumbitBtn();
  }

  async function addMoneyToSloik({ page }, addMoneySum: number) {
    await sloikSloikPage.fillAddMoneyInput(addMoneySum.toString());
    await sloikSloikPage.clickAddMoneyButton();
  }

  async function assertProgressBar(
    { page },
    addMoneySum: number,
    sloikGoal: number
  ) {
    await sloikSloikPage.assertProgressBarValue(
      `${Math.round((addMoneySum / sloikGoal) * 100)}%`
    );
  }

  async function assertMoneyScore({ page }, moneyScore: number) {
    await sloikSloikPage.assertMoneyScoreValue(
      `Your money : ${moneyScore.toString()}`
    );
  }

  async function editTransactionById(
    { page },
    transactionId: number,
    editedSum: number
  ) {
    await sloikSloikPage.clickEditTransactionBtnById(transactionId);
    expect(page.locator(`#editMoneyInput_${transactionId}`)).toBeVisible();
    await sloikSloikPage.fillEditTransactionInputById(transactionId, editedSum);
    await sloikSloikPage.clickAcceptEditTransactionBtnById(transactionId);
  }

  async function getRandomDescription({ request }) {
    const response = await request.get("https://catfact.ninja/fact");
    expect(await response.status()).toBe(200);
    const getJSON = JSON.parse(await response.text());
    const getSentence = getJSON.fact;
    return getSentence;
  }

  let sloikSloikPage;
  test.beforeEach(async ({ page, context }) => {
    let sloikHomePage = new SloikHomePage(page);
    sloikSloikPage = new SloikSloikPage(page);
    await sloikHomePage.goto();
    await page.waitForLoadState();
    await context.clearCookies();
  });

  test("Should create 2 sloiks", async ({ page, request }) => {
    let sloikHomePage = new SloikHomePage(page);
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

  test("Should add money to sloik", async ({ page }) => {
    const addMoneySum = 10000;

    await createAndOpenSloik(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await assertSloikValues(
      { page },
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
    await assertProgressBar({ page }, addMoneySum, sloikOneGoalSum);
    await sloikSloikPage.assertTransactionByNumber(0, addMoneySum, new Date());
  });

  test("Should edit the existing transaction", async ({ page }) => {
    const transaction1 = 15000;
    const transaction2 = 10000;
    const editedTransaction1 = 25000;

    await createAndOpenSloik(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await assertSloikValues(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      "0",
      sloikOneGoalSum.toString(),
      "0%"
    );
    await addMoneyToSloik({ page }, transaction1);
    await sloikSloikPage.assertMoneyScoreValue(
      `Your money : ${transaction1.toString()}`
    );
    await addMoneyToSloik({ page }, transaction2);
    await sloikSloikPage.assertMoneyScoreValue(
      `Your money : ${(transaction1 + transaction2).toString()}`
    );
    await assertProgressBar(
      { page },
      transaction1 + transaction2,
      sloikOneGoalSum
    );
    await sloikSloikPage.clickEditTransactionBtnById(0);
    expect(page.locator(`#transaction_${0}_Text`)).not.toBeVisible();
    await sloikSloikPage.clickCancelEditTransactionBtnById(0);
    expect(page.locator(`#transaction_${0}_Text`)).toBeVisible();
    expect(page.locator(`#edit_transaction_${0}`)).toBeVisible();
    expect(page.locator(`#editMoneyInput_${0}`)).not.toBeVisible();
    await editTransactionById({ page }, 0, editedTransaction1);
    await assertMoneyScore({ page }, editedTransaction1 + transaction2);
    await assertProgressBar(
      { page },
      editedTransaction1 + transaction2,
      sloikOneGoalSum
    );
    await sloikSloikPage.assertTransactionTransactionSumById(
      0,
      editedTransaction1
    );
  });

  test("Should delete the existing transaction", async ({ page }) => {
    const transaction1 = 15000;
    const transaction2 = 10000;

    await createAndOpenSloik(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await assertSloikValues(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      "0",
      sloikOneGoalSum.toString(),
      "0%"
    );
    await addMoneyToSloik({ page }, transaction1);
    await addMoneyToSloik({ page }, transaction2);
    await sloikSloikPage.deleteTransactionById(1);
    await assertMoneyScore({ page }, transaction1);
    await assertProgressBar({ page }, transaction1, sloikOneGoalSum);
  });

  test("Should edit the existing goal", async ({ page }) => {
    const transaction1 = 15000;
    const editedGoalSum = 100000;

    await createAndOpenSloik(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await assertSloikValues(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      "0",
      sloikOneGoalSum.toString(),
      "0%"
    );
    await addMoneyToSloik({ page }, transaction1);
    await sloikSloikPage.clickEditGoalBtn();
    await expect(sloikSloikPage.editGoalButton).not.toBeVisible();
    await sloikSloikPage.clickCancelEditGoalBtn();
    await expect(sloikSloikPage.acceptEditGoalButton).not.toBeVisible();
    await expect(sloikSloikPage.cancelEditGoalButton).not.toBeVisible();
    await expect(sloikSloikPage.editGoalInput).not.toBeVisible();
    await sloikSloikPage.clickEditGoalBtn();
    await sloikSloikPage.fillEditGoalInput(editedGoalSum);
    await sloikSloikPage.clickAcceptEditGoalBtn();
    await assertProgressBar({ page }, transaction1, editedGoalSum);
  });

  test("Should show an achievement", async ({ page }) => {
    let sloikHomePage = new SloikHomePage(page);
    const transaction1 = 777;

    await createAndOpenSloik(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await assertSloikValues(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      "0",
      sloikOneGoalSum.toString(),
      "0%"
    );
    await addMoneyToSloik({ page }, transaction1);
    await expect(sloikSloikPage.achievementOne).toBeInViewport();
    await expect(sloikSloikPage.achievementOne).toBeVisible();
    await expect(sloikSloikPage.achievementOne).toHaveCSS("display", "block");
    await sloikSloikPage.clickHomeBtn();
    await sloikHomePage.clickSloikOneBtn();
    await addMoneyToSloik({ page }, transaction1);
    await page.waitForTimeout(1000);
    await expect(sloikSloikPage.achievementOne).not.toBeVisible();
  });

  test("Should check the proper save of data for 2 sloiks", async ({
    page,
  }) => {
    let sloikHomePage = new SloikHomePage(page);
    const transaction1 = 10000;
    const transaction2 = 15000;
    const transaction3 = 6250;

    await createAndOpenSloik(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await assertSloikValues(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      "0",
      sloikOneGoalSum.toString(),
      "0%"
    );
    await addMoneyToSloik({ page }, transaction1);
    await addMoneyToSloik({ page }, transaction2);
    await sloikSloikPage.assertTransactionByNumber(0, transaction1, new Date());
    await sloikSloikPage.assertTransactionByNumber(1, transaction2, new Date());
    await sloikSloikPage.clickHomeBtn();
    await createSloik(
      { page },
      sloikTwoTitle,
      sloikTwoDescription,
      sloikTwoGoalSum
    );
    await sloikHomePage.clickSloikTwoBtn();
    await assertSloikValues(
      { page },
      sloikTwoTitle,
      sloikTwoDescription,
      "0",
      sloikTwoGoalSum.toString(),
      "0%"
    );
    await addMoneyToSloik({ page }, transaction3);
    await sloikSloikPage.assertTransactionByNumber(0, transaction3, new Date());
    await sloikSloikPage.clickHomeBtn();
    await sloikHomePage.clickSloikOneBtn();
    await assertSloikValues(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      "25000",
      sloikOneGoalSum.toString(),
      "17%"
    );
    await sloikSloikPage.isTransactionByIdDisplayed(0);
    await sloikSloikPage.isTransactionByIdDisplayed(1);
    await sloikSloikPage.clickHomeBtn();
    await sloikHomePage.clickSloikTwoBtn();
    await assertSloikValues(
      { page },
      sloikTwoTitle,
      sloikTwoDescription,
      "6250",
      sloikTwoGoalSum.toString(),
      "46%"
    );
  });

  test("Should properly show achievements", async ({ page }) => {
    let sloikHomePage = new SloikHomePage(page);
    let sloikAchievementsPage = new SloikAchievementsPage(page);
    const addMoneySum = 777;

    await sloikHomePage.clickAchievementsButton();
    await expect(sloikAchievementsPage.achievementOne).not.toBeVisible();
    await expect(sloikAchievementsPage.achievementTwo).not.toBeVisible();
    await sloikAchievementsPage.clickHomeButton();
    await createAndOpenSloik(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await assertSloikValues(
      { page },
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
