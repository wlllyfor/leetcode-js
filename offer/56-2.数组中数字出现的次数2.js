function singleNumber(nums) {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    let count = 0;
    for (let j = 0; j < nums.length; j++) {
      count += (nums[j] >> i) & 1;
    }
    if (count % 3 !== 0) {
      res |= 1 << i;
    }
  }
  return res;
}
