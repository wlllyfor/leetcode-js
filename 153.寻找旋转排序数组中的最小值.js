/*
 * @lc app=leetcode.cn id=153 lang=javascript
 *
 * [153] 寻找旋转排序数组中的最小值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 
 * [1,2,3,4,5]
 * [5,1,2,3,4]
 * 
 * [4,5,1,2,3]
 * [3,4,5,1,2]
 * 
 * 
 * [2,1]
 */
var findMin = function(nums) {
  let left = 0
  let right = nums.length - 1

  while (left < right) { // 注意边界条件
    let mid = (left + right) >> 1
    if (nums[mid] < nums[right]) {
      right = mid // 当前这个值有可能是需要的
    } else {
      left = mid + 1
    }
  }
  return nums[left]
};
// @lc code=end

