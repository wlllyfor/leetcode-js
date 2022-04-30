/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

/**
 * dp[0] = nums[0]
 * dp[1] = Math.max(dp[0] + nums[1], nums[1])
 * dp[2] = Math.max(dp[1] + nums[2], nums[2])
 * dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
 * res = Math.max(dp[i], res)
 */
// function maxSubArray (nums) {
//   let dp = [nums[0]]
//   let res = nums[0]
//   for (let i = 1; i < nums.length; i++) {
//     dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
//     res = Math.max(res, dp[i])
//   }
//   return res
// }

/**
 * 
 * 贪心
 */
var maxSubArray = function(nums) {
  
  let res = -Infinity
  let sum = 0
  for (let num of nums) {
    sum += num
    res = Math.max(sum, res)

    if (sum < 0) {
      sum = 0
    }
  }
  return res
};

// @lc code=end

