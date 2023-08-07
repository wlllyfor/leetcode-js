function isStraight(nums) {
  nums.sort((a, b) => a - b); // 先排序
  let joker = 0; // 大小王的数量
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === 0) {
      joker++; // 统计大小王的数量
    } else if (nums[i] === nums[i + 1]) {
      return false; // 如果有重复的牌，直接返回 false
    }
  }
  return nums[4] - nums[joker] < 5; // 判断最大值和最小值之差是否小于等于 4
}