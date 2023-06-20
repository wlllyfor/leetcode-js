// 10 ** (k - 1) <= n < 10 ** k
// res = n - 10 ** (k - 1)
function findNthDigit(n) {
  let k = 1; // 数字的位数
  let count = 9; // 当前位数下数字的个数
  let start = 1; // 当前位数下数字的起始值
  while (n > k * count) {
    n -= k * count;
    k++;
    count *= 10;
    start *= 10;
  }
  let num = start + Math.floor((n - 1) / k); // 确定数字的值
  let digit = (n - 1) % k; // 确定数字中的位数
  return parseInt(num.toString()[digit]); // 返回数字中的位数对应的数字
}