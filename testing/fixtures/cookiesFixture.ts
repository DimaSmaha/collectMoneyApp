import { chromium, test as base } from "@playwright/test";
import { SloikHomePage } from "./../pages/sloikHomePage.page";

type Pages = {
  setCookies: any;
};

const oneDayInSeconds = 24 * 60 * 60;
const currentTimestamp = Math.floor(Date.now() / 1000);
const expires = currentTimestamp + oneDayInSeconds;

const userCookies = [
  {
    name: "sloiksCounter",
    value: "1",
    path: "/",
    domain: "127.0.0.1:5500", //to fillup all subdomains with cookies
    httpOnly: true,
    secure: true,
    expires: expires,
  },
  {
    name: "totalMoney_0",
    value: "999",
    path: "/",
    domain: "127.0.0.1:5500", //to fillup all subdomains with cookies
    httpOnly: true,
    secure: true,
    expires: expires,
  },
  {
    name: "goalValue_0",
    value: "10000",
    path: "/",
    domain: "127.0.0.1:5500",
    httpOnly: true,
    secure: true,
    expires: expires,
  },
  {
    name: "isGoarReached_0",
    value: "false",
    path: "/",
    domain: "127.0.0.1:5500",
    httpOnly: true,
    secure: true,
    expires: expires,
  },
  {
    name: "sloikTitle_0",
    value: "Title made with fixture",
    path: "/",
    domain: "127.0.0.1:5500",
    httpOnly: true,
    secure: true,
    expires: expires,
  },
  {
    name: "sloikDescription_0",
    value: "Description made with fixture",
    path: "/",
    domain: "127.0.0.1:5500",
    httpOnly: true,
    secure: true,
    expires: expires,
  },
];

export const test = base.extend<Pages>({
  setCookies: async ({}, use) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    let sloikHomePage = new SloikHomePage(page);
    await sloikHomePage.goto();
    await page.waitForLoadState();
    await context.addCookies(userCookies);
    console.log(await context.cookies());
    await page.reload();
    await use(page);
  },
});

// test("Should use cookies", async ({ page, setCookies }) => {
//     const sloikTitle = "Title made with fixture";
//     const sloikDescription = "Description made with fixture";
//     const sloikGoalSum = 10000;
//     let sloikHomePage = new SloikHomePage(page);
//     let sloikSloikPage = new SloikSloikPage(page);
//     await setCookies;
//     await sloikHomePage.clickSloikOneBtn();
//     await sloikSloikPage.assertSloikValues(
//       sloikTitle,
//       sloikDescription,
//       "0",
//       sloikGoalSum.toString(),
//       "0%"
//     );
//   });
