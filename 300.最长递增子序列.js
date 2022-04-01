/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 * 
 * nums = [10,9,2,5,3,7,101,18]
 *   dp = [1, 1,1,2,2,]
 * 
 * 
 * 
 * nums = [0,1,0,3,2,3]
 *   dp = [1,2,2,3,3,4]
 * 遍历 nums，index 为 i
 * 
 * 遍历长度为 i 的子数组，index 为 j
 * 
 * dp[0] = 1
 * if (nums[i] > nums[j])
 * dp[i] = Math.max(dp[i], dp[j] + 1)
 * 
 *
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  let max = 1
  const dp = [1]
  for(let i = 1; i < nums.length; i++) {
    dp[i] = 1
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    max = Math.max(max, dp[i])
  }
  return max 
  
};
// @lc code=end

