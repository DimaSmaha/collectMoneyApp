import { Helper } from "./helper.page";
// playwright-dev-page.ts
import { expect, Locator, Page } from "@playwright/test";

export class SloikSloikPage extends Helper {
  readonly page: Page;
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordConfirmInput: Locator;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly homeButton: Locator;
  readonly achievementsButton: Locator;
  readonly addMoneyInput: Locator;
  readonly addMoneyButton: Locator;
  readonly sloikTitle: Locator;
  readonly sloikDescription: Locator;
  readonly yourMoneyScore: Locator;
  readonly yourGoal: Locator;
  readonly progressBarText: Locator;
  readonly transactionBox: Locator;
  readonly editGoalButton: Locator;
  readonly editGoalInput: Locator;
  readonly acceptEditGoalButton: Locator;
  readonly cancelEditGoalButton: Locator;
  readonly achievementOne: Locator;

  constructor(page: Page) {
    super();
    this.page = page;
    this.loginInput = page.locator('input[name="user\\[login\\]"]');
    this.passwordInput = page.locator('input[name="user\\[password\\]"]');
    this.passwordConfirmInput = page.locator('input[name="user\\[password_confirmation\\]"]');
    this.firstnameInput = page.locator('input[name="user\\[firstname\\]"]');
    this.lastnameInput = page.locator('input[name="user\\[lastname\\]"]');
    this.emailInput = page.locator('input[name="user\\[mail\\]"]');
    this.submitButton = page.locator("text=Submit");
    this.homeButton = page.locator('//a[text()="Home"]');
    this.achievementsButton = page.locator('//a[text()="Achievements"]');
    this.sloikTitle = page.locator('[id="sloikTitle"]');
    this.sloikDescription = page.locator('[id="sloikDescription"]');
    this.yourMoneyScore = page.locator('[id="yourMoneyScore"]');
    this.yourGoal = page.locator('[id="sloikGoal"]');
    this.progressBarText = page.locator('[id="progressBarParent"]');
    this.addMoneyInput = page.locator("#addMoneyInput");
    this.addMoneyButton = page.locator("#addMoneyBtn");
    this.editGoalButton = page.locator("#sloikGoalEdit");
    this.editGoalInput = page.locator("#sloikGoalInput");
    this.acceptEditGoalButton = page.locator("#sloikGoalAccept");
    this.cancelEditGoalButton = page.locator("#sloikGoalCancel");
    this.achievementOne = page.locator("#achievement_1");
  }

  async checkPageUrl() {
    await expect(this.page).toHaveURL("/account/register");
  }

  async goto() {
    await this.page.goto("/account/register");
  }

  async fillInputs(
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    email: string,
  ) {
    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
    await this.passwordConfirmInput.fill(password);
    await this.firstnameInput.fill(firstname);
    await this.lastnameInput.fill(lastname);
    await this.emailInput.fill(email);
  }

  async clickSubmitBtn() {
    await this.submitButton.click();
  }

  async clickHomeBtn() {
    await this.homeButton.click();
  }

  async clickAchievementsBtn() {
    await this.achievementsButton.click();
  }

  async assertSloikTitleValue(sloikTitle: string) {
    expect(await this.sloikTitle.textContent()).toBe(sloikTitle);
  }

  async assertSloikDesriptionValue(sloikDescription: string) {
    expect(await this.sloikDescription.textContent()).toBe(sloikDescription);
  }

  async assertMoneyScoreValue(moneyScore: string) {
    expect.soft(await this.yourMoneyScore.textContent()).toBe(moneyScore.toString()); //wont terminate a test, the test will end the execution, but it will be marked as failed
  }

  async assertYourGoalValue(yourGoal: string) {
    expect(await this.yourGoal.textContent()).toBe(yourGoal);
  }

  async assertProgressBarValue(progressBar: string) {
    expect(await this.progressBarText.innerText()).toBe(progressBar);
  }

  async fillAddMoneyInput(title: number) {
    await this.addMoneyInput.fill(title.toString());
  }

  async clickAddMoneyButton() {
    await this.addMoneyButton.click();
  }

  // async getTransactionBoxLocatorsId(transactionBoxId: number) {
  //   this.page.locator(`transaction_${transactionBoxId}_Box`);
  //   this.page.locator(`transaction_${transactionBoxId}_Text`);
  //   this.page.locator(`edit_transaction_${transactionBoxId}`);
  //   this.page.locator(`cancel_transaction_${transactionBoxId}`);
  // }

  async assertSloikValues(
    title: string,
    description: string,
    moneyScore: string,
    yourGoal: number,
    progressBar: string,
  ) {
    await this.page.waitForLoadState();
    await this.assertSloikTitleValue(title);
    await this.assertSloikDesriptionValue(description);
    await this.assertMoneyScoreValue(`Your money : ${moneyScore}`);
    await this.assertYourGoalValue(`Your goal : ${yourGoal.toString()}`);
    await this.assertProgressBarValue(progressBar);
  }

  async assertTransactionByNumber(transactionBoxId: number, transactionSum: number, date: Date) {
    const transactionBox = this.page.locator(`#transaction_${transactionBoxId}_Box`);
    const transactionText = this.page.locator(`#transaction_${transactionBoxId}_Text`);
    const editTransaction = this.page.locator(`#edit_transaction_${transactionBoxId}`);
    const cancelTransaction = this.page.locator(`#cancel_transaction_${transactionBoxId}`);
    console.log(transactionText.innerHTML);
    await expect(transactionBox).toBeVisible();
    await expect(transactionText).toBeVisible();
    expect(await transactionText.innerText()).toContain("Transaction sum:");
    expect(await transactionText.innerText()).toContain(transactionSum.toString());
    expect(await transactionText.innerText()).toContain("Date:");
    let getDate = date.getDate();
    let getMonth = date.getMonth();
    getMonth++;
    let getYear = date.getFullYear();
    let getHours = date.getHours();
    let getMinutes = date.getMinutes();
    let passZero;
    if (date.getMonth() < 9) {
      passZero = 0;
    } else {
      passZero = "";
    }
    let passZeroMin;
    if (getMinutes < 10) {
      passZeroMin = 0;
    } else {
      passZeroMin = "";
    }
    let passZeroHrs;
    if (getHours < 10) {
      passZeroHrs = 0;
    } else {
      passZeroHrs = "";
    }
    let passZeroDays;
    if (getDate < 10) {
      passZeroDays = 0;
    } else {
      passZeroDays = "";
    }
    expect(await transactionText.innerText()).toContain(
      `${passZeroDays}${getDate}/${passZero}${getMonth}/${getYear}, ${passZeroHrs}${getHours}:${passZeroMin}${getMinutes}:`,
    );
    await expect(editTransaction).toBeVisible();
    await expect(cancelTransaction).toBeVisible();
  }

  async isTransactionByIdDisplayed(transactionId: number) {
    const transactionBox = this.page.locator(`#transaction_${transactionId}_Box`);

    await expect(transactionBox).toBeVisible();
  }

  async clickEditTransactionBtnById(transactionId: number) {
    const transactionEditBtn = this.page.locator(`#edit_transaction_${transactionId}`);

    await transactionEditBtn.click();
  }

  async clickCancelEditTransactionBtnById(transactionId: number) {
    const cancelEditTransactionButton = this.page.locator(
      `#decline_edit_transaction_${transactionId}`,
    );

    await cancelEditTransactionButton.click();
  }

  async fillEditTransactionInputById(transactionId: number, editedTransaction: number) {
    const transactionEditInput = this.page.locator(`#editMoneyInput_${transactionId}`);

    transactionEditInput.fill(editedTransaction.toString());
  }

  async clickAcceptEditTransactionBtnById(transactionId: number) {
    const acceptEditTransactionBtn = this.page.locator(`#accept_edit_transaction_${transactionId}`);

    await acceptEditTransactionBtn.click();
  }

  async assertTransactionTransactionSumById(transactionBoxId: number, transactionSum: number) {
    const transactionText = this.page.locator(`#transaction_${transactionBoxId}_Text`);
    await expect(transactionText).toBeVisible();
    expect(await transactionText.innerText()).toContain("Transaction sum:");
    expect(await transactionText.innerText()).toContain(transactionSum.toString());
  }

  async deleteTransactionById(transactionId: number) {
    const deleteTransactionBtn = this.page.locator(`#cancel_transaction_${transactionId}`);

    await deleteTransactionBtn.click();
  }

  async clickEditGoalBtn() {
    await this.editGoalButton.click();
  }

  async fillEditGoalInput(editedGoal: number) {
    await this.editGoalInput.fill(editedGoal.toString());
  }

  async clickAcceptEditGoalBtn() {
    await this.acceptEditGoalButton.click();
  }

  async clickCancelEditGoalBtn() {
    await this.cancelEditGoalButton.click();
  }
}
