const compose = require("lodash.compose");
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))

const add10 = (number) => number + 10;
const minus10 = (number) => number - 10;
const add20 = compose(
  add10,
  add10,
  add10,
  minus10,
);
console.log(add20(6));
