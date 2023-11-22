import { mergeTests } from "@playwright/test";
import { test as pages } from "../fixtures/pagesFixture";
import { test as setup } from "../fixtures/setupFixture";

export const test = mergeTests(pages, setup);
