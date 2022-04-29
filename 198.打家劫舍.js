/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 
 * [2,7,3,1,9]
 */

/**
 * dp[0] = 0
 * dp[1] = nums[0]
 * dp[2] = Math.max(dp[0] + nums[2 - 1], dp[1])
 *         
 * dp[3] = Math.max(dp[1] + nums[3 - 1], dp[2])
 * 
 * dp[i] = Math.max(dp[i-2]+ nums[i - 1], dp[i-1])
 * 
 * [1]
 * 
 * [1, 2]
 */
// var rob = function(nums) {
//   let dp = [0]
//   let n = nums.length
//   dp[1] = nums[0]
//   if (n >= 2) {
//     for (let i = 2; i <= n; i++) {
//       dp[i] = Math.max(dp[i-2]+ nums[i - 1], dp[i-1])
//     }
//   }

//   return dp[n]
// };

function rob (nums) {
  let dp = [nums[0], Math.max(nums[0], nums[1])]
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i-2]+ nums[i], dp[i-1])
  }
  return dp[nums.length - 1]
}
// @lc code=end

