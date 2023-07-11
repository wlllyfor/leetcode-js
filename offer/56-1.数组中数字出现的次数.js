
function singleNumbers(nums) {
  let xorResult = 0;
  for (let num of nums) {
    xorResult ^= num;
  }
  let bit = 1;
  while ((bit & xorResult) === 0) {
    bit <<= 1;
  }
  let num1 = 0, num2 = 0;
  for (let num of nums) {
    if ((num & bit) === 0) {
      num1 ^= num;
    } else {
      num2 ^= num;
    }
  }
  return [num1, num2];
}