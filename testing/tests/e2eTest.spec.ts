import { test, expect } from "@playwright/test";
import { SloikHomePage } from "../pages/sloikHomePage.page";
import { SloikSloikPage } from "../pages/sloikSloikPage.page";

test.describe("E2E", () => {
  const sloikOneTitle = "Home";
  const sloikOneDescription = "Home sweet home";
  const sloikOneGoalSum = 150000;
  const sloikTwoTitle = "Gift";
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
    let sloikSloikPage = new SloikSloikPage(page);
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

  async function addMoneyToSloik({ page }, addMoneySum: number) {
    let sloikSloikPage = new SloikSloikPage(page);

    await sloikSloikPage.fillAddMoneyInput(addMoneySum.toString());
    await sloikSloikPage.clickAddMoneyButton();
  }

  async function assertProgressBar(
    { page },
    addMoneySum: number,
    sloikGoal: number
  ) {
    let sloikSloikPage = new SloikSloikPage(page);

    await sloikSloikPage.assertProgressBarValue(
      `${Math.round((addMoneySum / sloikGoal) * 100)}%`
    );
  }

  async function assertMoneyScore({ page }, moneyScore: number) {
    let sloikSloikPage = new SloikSloikPage(page);

    await sloikSloikPage.assertMoneyScoreValue(
      `Your money : ${moneyScore.toString()}`
    );
  }

  async function editTransactionById(
    { page },
    transactionId: number,
    editedSum: number
  ) {
    let sloikSloikPage = new SloikSloikPage(page);

    expect(page.locator(`#editMoneyInput_${transactionId}`)).toBeVisible();
    await sloikSloikPage.clickEditTransactionBtnById(transactionId);
    await sloikSloikPage.fillEditTransactionInputById(transactionId, editedSum);
    await sloikSloikPage.clickAcceptEditTransactionBtnById(transactionId);
  }

  test.beforeEach(async ({ page }) => {
    let sloikHomePage = new SloikHomePage(page);
    await sloikHomePage.goto();
    await page.waitForLoadState();
  });

  test("Should create 2 sloiks", async ({ page }) => {
    let sloikHomePage = new SloikHomePage(page);
    let sloikSloikPage = new SloikSloikPage(page);

    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(sloikOneTitle);
    await sloikHomePage.fillSloikDescriptionInput(sloikOneDescription);
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
      sloikOneDescription,
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
    let sloikSloikPage = new SloikSloikPage(page);
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
    let sloikSloikPage = new SloikSloikPage(page);
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
    let sloikSloikPage = new SloikSloikPage(page);
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
    let sloikSloikPage = new SloikSloikPage(page);
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
    let sloikSloikPage = new SloikSloikPage(page);
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
  });

  test("Should check the proper save of data for 2 sloiks", async ({
    page,
  }) => {
    let sloikSloikPage = new SloikSloikPage(page);
    const transaction1 = 10000;
    const transaction2 = 15000;

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
    await sloikSloikPage.assertTransactionByNumber(0, transaction2, new Date());
  });
});
