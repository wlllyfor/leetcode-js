/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 */

/**
 * 
 * 记录一个 max 值
 * 没走一步 max-- 并和当前值做对比选出新 max 值
 * 
 * max 值为 0 ，还没走到最后一步，就返回 false
 * 
 * [0,1]
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
  if (nums.length < 2) {
    return true
  }
  if (nums[0] === 0) {
    return false
  }
  let max = nums[0]
  for (let i = 1; i < nums.length - 1; i++) {
    max--
    max = Math.max(max, nums[i])
    if (max === 0) {
      return false
    }
  }
  return true
};
// @lc code=end

