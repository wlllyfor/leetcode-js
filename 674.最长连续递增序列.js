/*
 * @lc app=leetcode.cn id=674 lang=javascript
 *
 * [674] 最长连续递增序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

/**
 * 
 * 
 */
// var findLengthOfLCIS = function(nums) {
//   let count = 1
//   let max = 1
//   for (let i = 1; i < nums.length; i++) {
//     if (nums[i] > nums[i - 1]) {
//       count++
//       max = Math.max(max, count)
//     }
//     if (nums[i] <= nums[i - 1]) {
//       count = 1
//     }
//   }
//   return max
// };

/**
 * dp[i + 1] = dp[i] + 1
 */
function findLengthOfLCIS (nums) {
  let dp = [1]
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1
    } else {
      dp[i] = 1
    }
  }
  return Math.max(...dp)
}
// @lc code=end

