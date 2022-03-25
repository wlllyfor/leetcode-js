/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// nums = [2,7,11,15], target = 9
// [3,2,4] 6

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const map = {}
  for (let i in nums) {
    if (target - nums[i] in map) {
      return [map[target - nums[i]], i]
    } else {
      map[nums[i]] = i
    }
  }
};
// @lc code=end

