import { mergeTests } from "@playwright/test";
import { test as pages } from "../fixtures/pagesFixture";
import { test as setup } from "../fixtures/setupFixture";
import { test as cookies } from "../fixtures/cookiesFixture";

export const test = mergeTests(pages, setup, cookies);
export { expect } from "@playwright/test";
