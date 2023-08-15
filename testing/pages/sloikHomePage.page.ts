// playwright-dev-page.ts

//in ts page object pattern looks like this

import { expect, Locator, Page } from "@playwright/test";

export class SloikHomePage {
  readonly page: Page;
  readonly addSloikBtn: Locator;
  readonly sloikOneBtn: Locator;
  readonly sloikTwoBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addSloikBtn = page.locator('[id="add_sloik"]');
    this.sloikOneBtn = page.locator('[id="sloik_0"]');
    this.sloikTwoBtn = page.locator('[id="sloik_1"]');
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
}
