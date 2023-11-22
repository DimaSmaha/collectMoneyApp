import { test as base } from "@playwright/test";
import { SloikSloikPage } from "./../pages/sloikSloikPage.page";
import { SloikHomePage } from "./../pages/sloikHomePage.page";
import { SloikAchievementsPage } from "../pages/sloikAchievementsPage.page";

type Pages = {
  sloikHomePage: SloikHomePage;
  sloikSloikPage: SloikSloikPage;
  sloikAchievementsPage: SloikAchievementsPage;
};

export const test = base.extend<Pages>({
  sloikHomePage: ({ page }, use) => {
    const homePage = new SloikHomePage(page);
    use(homePage);
  },
  sloikSloikPage: ({ page }, use) => {
    const sloikPage = new SloikSloikPage(page);
    use(sloikPage);
  },
  sloikAchievementsPage: ({ page }, use) => {
    const achievementsPage = new SloikAchievementsPage(page);
    use(achievementsPage);
  },
});
