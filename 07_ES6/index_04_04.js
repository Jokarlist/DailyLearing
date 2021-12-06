/* 函数curry化 */

function curry(func, ...args) {
  return function (...subArgs) {
    const allArgs = [...args, ...subArgs];

    /* if (allArgs.length >= func.length) {
      return func(...allArgs);
    } else {
      return curry(func, ...allArgs);
    } */

    return allArgs.length >= func.length ? func(...allArgs) : curry(func, ...allArgs);
  }
}

function cal(a, b, c, d) {
  return a + b * c - d;
}

const newCal = curry(cal, 1, 2);

console.log(newCal(3, 4));
console.log(newCal(5, 6));
console.log(newCal(7, 8));
console.log(newCal(9, 10));

const newCal2 = curry(newCal, 3);

console.log(newCal2(4));