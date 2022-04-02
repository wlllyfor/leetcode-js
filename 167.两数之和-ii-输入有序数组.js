/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 * 
 *  i       j
 * [2,7,11,15]
 * 
 * 如果 target - nums[i] < nums[j] 
 * 说明 nums[j] 大了 j--
 * 
 * 如果 target - nums[i] > nums[j] 
 * 说明 nums[i] 小了 i++
 * 
 * 如果 target - nums[i] = nums[j] 返回 [i, j]
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let len = nums.length
  let i = 0, j = len - 1
  while (i < j) {
    if (target - nums[i] < nums[j]) {
      j--
    }
    if (target - nums[i] > nums[j]) {
      i++
    }
    if (target - nums[i] === nums[j]) {
      return [i + 1, j + 1]
    }
  }
};
// @lc code=end

