// playwright-dev-page.ts
import { expect, Locator, Page } from "@playwright/test";

export class RedmineLoginPage {
  readonly page: Page;
  readonly userInput: Locator;
  readonly passInput: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userInput = page.locator('input[name="username"]');
    this.passInput = page.locator('input[name="password"]');
    this.loginBtn = page.locator("text=Login »");
  }

  async checkPageUrl() {
    await expect(this.page).toHaveURL("/login");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async fillInputs(username: string, password: string) {
    await this.userInput.fill(username);
    await this.passInput.fill(password);
  }

  async clickLoginBtn() {
    await this.loginBtn.click();
  }
}
