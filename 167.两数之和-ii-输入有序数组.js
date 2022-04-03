/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 * 
 *  i       j
 * [2,7,11,15]
 * 
 * sum = nums[i] + nums[j]
 * 
 * sum > target j--
 * sum < target i++
 * sum === target return [i+1, j+1]
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let left = 0, right = nums.length - 1
  while (left < right) {
    let sum = nums[left] + nums[right]
    if (sum < target) {
      left++
    }
    if (sum  > target) {
      right--
    }
    if (sum === target) {
      return [left + 1, right + 1]
    }
  }
};
// @lc code=end

