// 递归
function myPow(x, n) {
  if (n === 0) {
    return 1;
  }
  if (n < 0) {
    return 1 / myPow(x, -n);
  }
  if (n % 2 === 0) {
    const half = myPow(x, n / 2);
    return half * half;
  }
  return x * myPow(x, n - 1);
}

// 循环
function myPow(x, n) {
  let result = 1;
  let base = x;
  let exponent = n;
  if (exponent < 0) {
    base = 1 / base;
    exponent = -exponent;
  }
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result *= base;
    }
    base *= base;
    exponent = Math.floor(exponent / 2);
  }
  return result;
}