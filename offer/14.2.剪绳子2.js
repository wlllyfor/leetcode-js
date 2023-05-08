function cuttingRope(n) {
  if (n <= 3) {
    return n - 1;
  }
  let res = 1;
  if (n % 3 === 1) {
    res = 4;
    n = n - 4;
  }
  if (n % 3 === 2) {
    res = 2;
    n = n - 2;
  }
  while (n > 0) {
    res = (res * 3) % 1000000007;
    n = n - 3;
  }
  return res;
}