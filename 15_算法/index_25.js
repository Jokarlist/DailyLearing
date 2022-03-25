function fibonacci(n) {
  if (n <= 0) {
    return -1;
  }

  if (n === 1) {
    return 0;
  }

  if (n === 2) {
    return 1;
  }

  let first = 0;
  let second = 1;
  let fiboNum = null;
  for (let i = 2; i < n; i++) {
    fiboNum = first + second;
    first = second;
    second = fiboNum;
  }

  return fiboNum;
}

function fibonacci(n) {
  if (n <= 0) {
    return -1;
  }

  if (n === 1) {
    return 0;
  }

  if (n === 2) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(20));