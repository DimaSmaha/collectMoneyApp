const redNumbers = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
];
const blackNumbers = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35,
];
const zero = [0];

function roullette() {
  let result = Math.floor(Math.random() * (36 - 0 + 1)) + 1;

  if (zero.includes(result)) {
    return `The number is ${result} ZERO, green`;
  }

  if (redNumbers.includes(result)) {
    return `The number is ${result}, red`;
  }

  if (blackNumbers.includes(result)) {
    return `The number is ${result}, black`;
  }
}

console.log(roullette());

// const newArr = [];
// const together = newArr.concat(redNumbers, blackNumbers);
// const together2 = together.sort(function (a, b) {
//   return a - b;
// });
// console.log(together2);
