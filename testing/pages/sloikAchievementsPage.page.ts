// playwright-dev-page.ts
import { expect, Locator, Page } from "@playwright/test";

export class SloikAchievementsPage {
  readonly page: Page;
  readonly homeBtn: Locator;
  readonly achievementOne: Locator;
  readonly achievementTwo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeBtn = page.locator('//a[text()="Home"]');
    this.achievementOne = page.locator("#achievement_1");
    this.achievementTwo = page.locator("#achievement_2");
  }

  async checkPageUrl() {
    await expect(this.page).toHaveURL("/achievements.html");
  }

  async clickHomeButton() {
    await this.homeBtn.click();
  }
}
