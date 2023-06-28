function nthUglyNumber(n) {
  if (n <= 0) {
    return 0;
  }

  const uglyNumbers = [1];
  let p2 = 0, p3 = 0, p5 = 0;

  for (let i = 1; i < n; i++) {
    const nextUglyNumber = Math.min(uglyNumbers[p2] * 2, uglyNumbers[p3] * 3, uglyNumbers[p5] * 5);
    uglyNumbers.push(nextUglyNumber);

    if (nextUglyNumber === uglyNumbers[p2] * 2) {
      p2++;
    }
    if (nextUglyNumber === uglyNumbers[p3] * 3) {
      p3++;
    }
    if (nextUglyNumber === uglyNumbers[p5] * 5) {
      p5++;
    }
  }

  return uglyNumbers[n - 1];
}