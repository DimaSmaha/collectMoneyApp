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

  constructor(page: Page) {
    super();
    this.page = page;
    this.loginInput = page.locator('input[name="user\\[login\\]"]');
    this.passwordInput = page.locator('input[name="user\\[password\\]"]');
    this.passwordConfirmInput = page.locator(
      'input[name="user\\[password_confirmation\\]"]'
    );
    this.firstnameInput = page.locator('input[name="user\\[firstname\\]"]');
    this.lastnameInput = page.locator('input[name="user\\[lastname\\]"]');
    this.emailInput = page.locator('input[name="user\\[mail\\]"]');
    this.submitButton = page.locator("text=Submit");
    this.homeButton = page.locator('//a[text()="Home"]');
    this.achievementsButton = page.locator('//a[text()="Achievements"]');
    this.sloikTitle = page.locator('[id="sloikTitle"]');
    this.sloikDescription = page.locator('[id="sloikDescription"]');
    this.yourMoneyScore = page.locator('[id="yourMoneyScore"]');
    this.yourGoal = page.locator('[id="yourGoal"]');
    this.progressBarText = page.locator('[id="progressBarParent"]');
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
    email: string
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
    expect(await this.yourMoneyScore.textContent()).toBe(moneyScore);
  }

  async assertYourGoalValue(yourGoal: string) {
    expect(await this.yourGoal.textContent()).toBe(yourGoal);
  }

  async assertProgressBarValue(progressBar: string) {
    expect(await this.progressBarText.innerText()).toBe(progressBar);
  }
}
