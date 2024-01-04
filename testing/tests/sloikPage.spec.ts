import { test, expect } from "../fixtures/mergeFixtures";
import {
  sloikOneTitle,
  sloikOneDescription,
  sloikOneGoalSum,
} from "../fixtures/fixtures";
import { test_data } from "../fixtures/data.json";

test.describe("Sloik page test suite", () => {
  const sloikTwoTitle = test_data.sloikTwoTitle;
  const sloikTwoDescription = "Gift for my sweetie";
  const sloikTwoGoalSum = 13500;

  async function createAndOpenSloik(
    { sloikHomePage },
    title: string,
    description: string,
    yourGoal: number
  ) {
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(title);
    await sloikHomePage.fillSloikDescriptionInput(description);
    await sloikHomePage.fillSLoikGoalSumInput(yourGoal);
    await sloikHomePage.clickSloikSumbitBtn();
    await sloikHomePage.clickSloikOneBtn();
  }

  async function createSloik(
    { sloikHomePage },
    title: string,
    description: string,
    yourGoal: number
  ) {
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(title);
    await sloikHomePage.fillSloikDescriptionInput(description);
    await sloikHomePage.fillSLoikGoalSumInput(yourGoal);
    await sloikHomePage.clickSloikSumbitBtn();
  }

  async function addMoneyToSloik({ sloikSloikPage }, addMoneySum: number) {
    await sloikSloikPage.fillAddMoneyInput(addMoneySum.toString());
    await sloikSloikPage.clickAddMoneyButton();
  }

  async function assertProgressBar(
    { sloikSloikPage },
    addMoneySum: number,
    sloikGoal: number
  ) {
    await sloikSloikPage.assertProgressBarValue(
      `${Math.round((addMoneySum / sloikGoal) * 100)}%`
    );
  }

  async function assertMoneyScore({ sloikSloikPage }, moneyScore: number) {
    await sloikSloikPage.assertMoneyScoreValue(
      `Your money : ${moneyScore.toString()}`
    );
  }

  async function editTransactionById(
    { page, sloikSloikPage },
    transactionId: number,
    editedSum: number
  ) {
    await sloikSloikPage.clickEditTransactionBtnById(transactionId);
    expect(page.locator(`#editMoneyInput_${transactionId}`)).toBeVisible();
    await sloikSloikPage.fillEditTransactionInputById(transactionId, editedSum);
    await sloikSloikPage.clickAcceptEditTransactionBtnById(transactionId);
  }

  test.beforeEach(async ({ page, context, sloikHomePage }) => {
    await sloikHomePage.goto();
    await page.waitForLoadState();
    await context.clearCookies();
  });

  test("Should add money to sloik", async ({
    sloikHomePage,
    sloikSloikPage,
  }) => {
    const addMoneySum = 10000;

    await createAndOpenSloik(
      { sloikHomePage },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await sloikSloikPage.assertSloikValues(
      sloikOneTitle,
      sloikOneDescription,
      "0",
      sloikOneGoalSum,
      "0%"
    );
    await sloikSloikPage.fillAddMoneyInput(addMoneySum);
    await sloikSloikPage.clickAddMoneyButton();
    await sloikSloikPage.assertMoneyScoreValue(
      `Your money : ${addMoneySum.toString()}`
    );
    await assertProgressBar({ sloikSloikPage }, addMoneySum, sloikOneGoalSum);
    await sloikSloikPage.assertTransactionByNumber(0, addMoneySum, new Date());
  });

  test("Should edit the existing transaction", async ({
    sloikHomePage,
    sloikSloikPage,
    page,
  }) => {
    const transaction1 = 15000;
    const transaction2 = 10000;
    const editedTransaction1 = 25000;

    await createAndOpenSloik(
      { sloikHomePage },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await sloikSloikPage.assertSloikValues(
      sloikOneTitle,
      sloikOneDescription,
      "0",
      sloikOneGoalSum,
      "0%"
    );
    await addMoneyToSloik({ sloikSloikPage }, transaction1);
    await sloikSloikPage.assertMoneyScoreValue(
      `Your money : ${transaction1.toString()}`
    );
    await addMoneyToSloik({ sloikSloikPage }, transaction2);
    await sloikSloikPage.assertMoneyScoreValue(
      `Your money : ${(transaction1 + transaction2).toString()}`
    );
    await assertProgressBar(
      { sloikSloikPage },
      transaction1 + transaction2,
      sloikOneGoalSum
    );
    await sloikSloikPage.clickEditTransactionBtnById(0);
    expect(page.locator(`#transaction_${0}_Text`)).not.toBeVisible();
    await sloikSloikPage.clickCancelEditTransactionBtnById(0);
    expect(page.locator(`#transaction_${0}_Text`)).toBeVisible();
    expect(page.locator(`#edit_transaction_${0}`)).toBeVisible();
    expect(page.locator(`#editMoneyInput_${0}`)).not.toBeVisible();
    await editTransactionById({ page, sloikSloikPage }, 0, editedTransaction1);
    await assertMoneyScore(
      { sloikSloikPage },
      editedTransaction1 + transaction2
    );
    await assertProgressBar(
      { sloikSloikPage },
      editedTransaction1 + transaction2,
      sloikOneGoalSum
    );
    await sloikSloikPage.assertTransactionTransactionSumById(
      0,
      editedTransaction1
    );
  });

  test("Should delete the existing transaction", async ({
    sloikHomePage,
    sloikSloikPage,
  }) => {
    const transaction1 = 15000;
    const transaction2 = 10000;

    await createAndOpenSloik(
      { sloikHomePage },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await sloikSloikPage.assertSloikValues(
      sloikOneTitle,
      sloikOneDescription,
      "0",
      sloikOneGoalSum,
      "0%"
    );
    await addMoneyToSloik({ sloikSloikPage }, transaction1);
    await addMoneyToSloik({ sloikSloikPage }, transaction2);
    await sloikSloikPage.deleteTransactionById(1);
    await assertMoneyScore({ sloikSloikPage }, transaction1);
    await assertProgressBar({ sloikSloikPage }, transaction1, sloikOneGoalSum);
  });

  test("Should edit the existing goal", async ({
    sloikHomePage,
    sloikSloikPage,
  }) => {
    const transaction1 = 15000;
    const editedGoalSum = 100000;

    await createAndOpenSloik(
      { sloikHomePage },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await sloikSloikPage.assertSloikValues(
      sloikOneTitle,
      sloikOneDescription,
      "0",
      sloikOneGoalSum,
      "0%"
    );
    await addMoneyToSloik({ sloikSloikPage }, transaction1);
    await sloikSloikPage.clickEditGoalBtn();
    await expect(sloikSloikPage.editGoalButton).not.toBeVisible();
    await sloikSloikPage.clickCancelEditGoalBtn();
    await expect(sloikSloikPage.acceptEditGoalButton).not.toBeVisible();
    await expect(sloikSloikPage.cancelEditGoalButton).not.toBeVisible();
    await expect(sloikSloikPage.editGoalInput).not.toBeVisible();
    await sloikSloikPage.clickEditGoalBtn();
    await sloikSloikPage.fillEditGoalInput(editedGoalSum);
    await sloikSloikPage.clickAcceptEditGoalBtn();
    await assertProgressBar({ sloikSloikPage }, transaction1, editedGoalSum);
  });

  test("Should show an achievement", async ({
    sloikHomePage,
    sloikSloikPage,
    page,
  }) => {
    const transaction1 = 777;

    await createAndOpenSloik(
      { sloikHomePage },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await sloikSloikPage.assertSloikValues(
      sloikOneTitle,
      sloikOneDescription,
      "0",
      sloikOneGoalSum,
      "0%"
    );
    await addMoneyToSloik({ sloikSloikPage }, transaction1);
    await expect(sloikSloikPage.achievementOne).toBeInViewport();
    await expect(sloikSloikPage.achievementOne).toBeVisible();
    await expect(sloikSloikPage.achievementOne).toHaveCSS("display", "block");
    await sloikSloikPage.clickHomeBtn();
    await sloikHomePage.clickSloikOneBtn();
    await addMoneyToSloik({ sloikSloikPage }, transaction1);
    await page.waitForTimeout(1000);
    await expect(sloikSloikPage.achievementOne).not.toBeVisible();
  });

  test("Should check the proper save of data for 2 sloiks", async ({
    sloikHomePage,
    sloikSloikPage,
  }) => {
    const transaction1 = 10000;
    const transaction2 = 15000;
    const transaction3 = 6250;

    await createAndOpenSloik(
      { sloikHomePage },
      sloikOneTitle,
      sloikOneDescription,
      sloikOneGoalSum
    );
    await sloikSloikPage.assertSloikValues(
      sloikOneTitle,
      sloikOneDescription,
      "0",
      sloikOneGoalSum,
      "0%"
    );
    await addMoneyToSloik({ sloikSloikPage }, transaction1);
    await addMoneyToSloik({ sloikSloikPage }, transaction2);
    await sloikSloikPage.assertTransactionByNumber(0, transaction1, new Date());
    await sloikSloikPage.assertTransactionByNumber(1, transaction2, new Date());
    await sloikSloikPage.clickHomeBtn();
    await createSloik(
      { sloikHomePage },
      sloikTwoTitle,
      sloikTwoDescription,
      sloikTwoGoalSum
    );
    await sloikHomePage.clickSloikTwoBtn();
    await sloikSloikPage.assertSloikValues(
      sloikTwoTitle,
      sloikTwoDescription,
      "0",
      sloikTwoGoalSum,
      "0%"
    );
    await addMoneyToSloik({ sloikSloikPage }, transaction3);
    await sloikSloikPage.assertTransactionByNumber(0, transaction3, new Date());
    await sloikSloikPage.clickHomeBtn();
    await sloikHomePage.clickSloikOneBtn();
    await sloikSloikPage.assertSloikValues(
      sloikOneTitle,
      sloikOneDescription,
      "25000",
      sloikOneGoalSum,
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
      sloikTwoGoalSum,
      "46%"
    );
  });
});
