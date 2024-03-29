import { test, expect } from "@playwright/test";
import { SloikHomePage } from "../pages/sloikHomePage.page";
import { SloikSloikPage } from "../pages/sloikSloikPage.page";
import {
  sloikOneTitle,
  sloikOneDescription,
  sloikOneGoalSum,
} from "../fixtures/fixtures";
import { test_data } from "../fixtures/data.json";

test.skip("Sloik page test suite", () => {
  const sloikTwoTitle = test_data.sloikTwoTitle;
  const sloikTwoDescription = "Gift for my sweetie";
  const sloikTwoGoalSum = 13500;

  async function createAndOpenSloik(
    { page },
    title: string,
    description: string,
    yourGoal: number
  ) {
    sloikHomePage = new SloikHomePage(page);
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
    sloikHomePage = new SloikHomePage(page);
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

  let sloikHomePage;
  let sloikSloikPage;
  test.beforeEach(async ({ page, context }) => {
    sloikHomePage = new SloikHomePage(page);
    sloikSloikPage = new SloikSloikPage(page);
    await sloikHomePage.goto();
    await page.waitForLoadState();
    await context.clearCookies();
  });

  test("Should add money to sloik", async ({ page }) => {
    const addMoneySum = 10000;

    await createAndOpenSloik(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await sloikSloikPage.assertSloikValues(
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
    await sloikSloikPage.assertSloikValues(
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
    await sloikSloikPage.assertSloikValues(
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
    await sloikSloikPage.assertSloikValues(
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
    const transaction1 = 777;

    await createAndOpenSloik(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await sloikSloikPage.assertSloikValues(
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
    const transaction1 = 10000;
    const transaction2 = 15000;
    const transaction3 = 6250;

    await createAndOpenSloik(
      { page },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await sloikSloikPage.assertSloikValues(
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
    await sloikSloikPage.assertSloikValues(
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
    await sloikSloikPage.assertSloikValues(
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
    await sloikSloikPage.assertSloikValues(
      sloikTwoTitle,
      sloikTwoDescription,
      "6250",
      sloikTwoGoalSum.toString(),
      "46%"
    );
  });
});
