import { Helper } from "./helper.page";
// playwright-dev-page.ts
import { expect, Locator, Page } from "@playwright/test";

export class RedmineRegisterPage extends Helper {
  readonly page: Page;
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordConfirmInput: Locator;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;

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
}
