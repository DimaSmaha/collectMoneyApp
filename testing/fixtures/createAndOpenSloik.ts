import { test as base } from "@playwright/test";
import { SloikHomePage } from "../pages/sloikHomePage.page";

type myFixtures = {
  title: string;
  description: string;
  yourGoal: number;
};

export const test = base.extend<myFixtures>({
  title: "Home",
  description: "Home sweet home",
  yourGoal: 150000,

  page: async ({ page, title, description, yourGoal }, use) => {
    let sloikHomePage = new SloikHomePage(page);
    await sloikHomePage.goto();
    await page.waitForLoadState();
    await sloikHomePage.clickAddSloikBtn();
    await sloikHomePage.fillSloikTitleInput(title);
    await sloikHomePage.fillSloikDescriptionInput(description);
    await sloikHomePage.fillSLoikGoalSumInput(yourGoal);
    await sloikHomePage.clickSloikSumbitBtn();
    await sloikHomePage.clickSloikOneBtn();
    await use(page); // will run all the time until test are done/resolved
    //here we write any teardown
  },
});

export { expect } from "@playwright/test";

// const { test: base } = require("@playwright/test");
// import { SloikHomePage } from "../pages/sloikHomePage.page";

// const createAndOpenSloikFixture = base.extend({
//   title: "Home",
//   description: "Home sweet home",
//   yourGoal: 150000,

//   createSloik: async ({ page, title, description, yourGoal }, use) => {
//     let sloikHomePage = new SloikHomePage(page);
//     await sloikHomePage.clickAddSloikBtn();
//     await sloikHomePage.fillSloikTitleInput(title);
//     await sloikHomePage.fillSloikDescriptionInput(description);
//     await sloikHomePage.fillSLoikGoalSumInput(yourGoal);
//     await sloikHomePage.clickSloikSumbitBtn();
//     await sloikHomePage.clickSloikOneBtn();
//     await use(sloikHomePage); // will run all the time until tests are done/resolved
//   },
// });

// export default createAndOpenSloikFixture;

// First via introducing a url fixture and then passing it into use {} via your config or in your test:
// const { test: base } = require('@playwright/test');

// const test = base.extend({
//   url: 'default',
//   testedPage: async ({ url }, use) => {
//     console.log(url);
//     await use();
//   }
// });

// // The scope of use is file or describe
// test.use({
//   url: 'overridden',
// });

// test('test 1', async ({ testedPage }) => {
// });

// Second is via making testedPage a function:
// const { test: base } = require('@playwright/test');

// const test = base.extend({
//   testedPage: async ({}, use) => {
//     await use(url => console.log(url));
//   }
// });

// test('test 1', async ({ testedPage }) => {
//   testedPage('url')
// });
