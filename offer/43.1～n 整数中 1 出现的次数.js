function countDigitOne(n) {
  let count = 0;
  let digit = 1;
  let high = Math.floor(n / 10);
  let cur = n % 10;
  let low = 0;
  while (high !== 0 || cur !== 0) {
    if (cur === 0) {
      count += high * digit;
    } else if (cur === 1) {
      count += high * digit + low + 1;
    } else {
      count += (high + 1) * digit;
    }
    low += cur * digit;
    cur = high % 10;
    high = Math.floor(high / 10);
    digit *= 10;
  }
  return count;
}