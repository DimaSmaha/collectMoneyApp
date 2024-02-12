import { faker } from "@faker-js/faker";
export let fakerSloikInfo = {
  title: faker.internet.displayName(),
  description: faker.lorem.sentence({ min: 2, max: 7 }),
  goalSum: faker.number.int({ min: 100, max: 1_000_000 }),
};
