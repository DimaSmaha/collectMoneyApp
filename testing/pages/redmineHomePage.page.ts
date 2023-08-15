// playwright-dev-page.ts

//in ts page object pattern looks like this

import { expect, Locator, Page } from "@playwright/test";

export class RedmineHomePage {
  readonly page: Page;
  readonly signInBtn: Locator;
  readonly myAccountBtn: Locator;
  readonly registerBtn: Locator;
  readonly helpBtn: Locator;
  readonly roadmapBtn: Locator;
  readonly issuesBtn: Locator;
  readonly mainMenu: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInBtn = page.locator("text=Sign in");
    this.myAccountBtn = page.locator("text=My Account");
    this.registerBtn = page.locator('a:has-text("Register")');
    this.helpBtn = page.locator("#top-menu >> text=Help");
    this.roadmapBtn = page.locator("text=Roadmap");
    this.issuesBtn = page.locator("a:has-text('Issues')");
    this.mainMenu = page.locator("[id='main-menu']>ul>li");
    this.searchInput = page.locator('input[name="q"]');
  }

  async checkPageUrl() {
    await expect(this.page).toHaveURL("");
  }

  async goto() {
    await this.page.goto("");
  }

  async clickSignInBtn() {
    await this.signInBtn.click();
    await expect(this.page).toHaveURL("https://www.redmine.org/login");
  }

  async clickHelpBtn() {
    await this.helpBtn.click();
  }

  async clickRoadmapBtn() {
    await this.roadmapBtn.click();
  }

  async clickIssuesBtn() {
    await this.issuesBtn.click();
  }

  async fillSearchInput(searchValue: string) {
    await this.searchInput.fill(searchValue);
  }
}
