function missingNumber(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === mid) {
      // 如果中间数字等于下标，说明缺失的数字在右侧
      left = mid + 1;
    } else {
      // 否则缺失的数字在左侧
      right = mid - 1;
    }
  }

  // 返回缺失的数字
  return left;
}