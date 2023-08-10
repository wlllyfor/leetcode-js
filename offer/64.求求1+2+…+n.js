function sumNums(n) {
  let sum = n;
  n > 0 && (sum += sumNums(n - 1));
  return sum;
}