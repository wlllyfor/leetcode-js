// 摩尔投票算法，如果一个数出现的次数超过了数组长度的一半，那么它出现的次数减去其他所有数出现的次数之和仍然是大于0的。
function majorityElement(nums) {
  let count = 0;
  let temp = null;
  for (let num of nums) {
    if (count === 0) {
      temp = num;
    }
    count += num === temp ? 1 : -1;
  }
  return temp;
};


// [1, 2, 3, 2, 2, 2, 5, 4, 2]