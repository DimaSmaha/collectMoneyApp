import { test as base } from "@playwright/test";
import { SloikHomePage } from "./../pages/sloikHomePage.page";

type Pages = {
  setup: any;
};

export const test = base.extend<Pages>({
  setup: async ({ page, context }, use) => {
    let sloikHomePage = new SloikHomePage(page);
    await sloikHomePage.goto();
    await page.waitForLoadState();
    await context.clearCookies();
    await use(page);
  },
});
