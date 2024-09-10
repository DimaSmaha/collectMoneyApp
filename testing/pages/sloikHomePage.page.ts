// playwright-dev-page.ts

//in ts page object pattern looks like this

import { expect, Locator, Page } from "@playwright/test";

export class SloikHomePage {
  readonly page: Page;
  readonly addSloikBtn: Locator;
  readonly sloikOneBtn: Locator;
  readonly sloikTwoBtn: Locator;
  readonly sloikTitleInput: Locator;
  readonly sloikDescriptionInput: Locator;
  readonly sloikGoalSumInput: Locator;
  readonly sloikSubmitBtn: Locator;
  readonly achievementsBtn: Locator;
  readonly bulkEditSloikButton: Locator;
  readonly bulkEditButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addSloikBtn = page.locator('[id="add_sloik"]');
    this.sloikOneBtn = page.locator('[id="sloik_0"]');
    this.sloikTwoBtn = page.locator('[id="sloik_1"]');
    this.sloikTitleInput = page.locator('[id="inputField1"]');
    this.sloikDescriptionInput = page.locator('[id="inputField2"]');
    this.sloikGoalSumInput = page.locator('[id="inputField3"]');
    this.sloikSubmitBtn = page.locator('[id="submitBtn"]');
    this.achievementsBtn = page.locator('//a[text()="Achievements"]');
    this.bulkEditSloikButton = page.locator("#editSloikBtn_0");
    this.bulkEditButton = page.locator("#editBtn");
  }

  async goto() {
    await this.page.goto("");
  }

  async clickAddSloikBtn() {
    await this.addSloikBtn.click();
  }

  async clickSloikOneBtn() {
    await this.sloikOneBtn.click();
  }

  async clickSloikTwoBtn() {
    await this.sloikTwoBtn.click();
  }

  async fillSloikTitleInput(title: string) {
    await this.sloikTitleInput.fill(title);
  }

  async fillSloikDescriptionInput(description: string) {
    await this.sloikDescriptionInput.fill(description);
  }

  async fillSLoikGoalSumInput(goalSum: number) {
    await this.sloikGoalSumInput.fill(goalSum.toString());
  }

  async clickSloikSumbitBtn() {
    await this.sloikSubmitBtn.click();
  }

  async clickAchievementsButton() {
    await this.achievementsBtn.click();
  }
}
