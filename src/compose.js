const compose = require("lodash.compose");
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))

const add10 = (number) => number + 10;

// console.log(add10(add10(add10(6))));

const add40 = compose(
  add10,
  add10,
  add10,
  add10,
);

console.log(add40(6));
