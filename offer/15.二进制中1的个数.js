function hammingWeight (n) {
  let res = 0;
  while (n) {
    res++;
    n &= (n - 1);
  }
  return res;
};

function hammingWeight(n) {
  let res = 0;
  while (n !== 0) {
    res += n % 2;
    n = Math.floor(n / 2);
  }
  return res;
}


