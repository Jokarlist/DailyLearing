/**
 * 青蛙跳台阶：
 * 青蛙跳n级台阶，青蛙一次可以跳1级、2级，问有多少种跳法？
 * @param {Numer} n
 */
function jump(n) {
  if (n <= 0) {
    return -1;
  }

  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }

  return jump(n - 1) + jump(n - 2);
}

/**
 * 变态青蛙跳台阶：
 * 青蛙跳n级台阶，青蛙一次可以跳1级、2级...n级，问有多少种跳法？
 * @param {Number} n 
 */
function jump(n) {
  if (n <= 0) {
    return -1;
  }

  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }

  let result = 0;
  for (let i = 1; i < n; i++) {
    result += jump(n - i);
  }

  return result + 1;
  // +1是考虑从0级台阶直接跳到n级台阶
}

console.log(jump(4));
