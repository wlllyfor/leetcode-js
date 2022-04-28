/*
 * @lc app=leetcode.cn id=213 lang=javascript
 *
 * [213] 打家劫舍 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

/**
 * 
 * 
 * dp[0] = 0
 * dp[1] = nums[0]
 * dp[2] = Math.max(nums[0], nums[1])
 * dp[3] = 
 * 
 * dp[i] = Math.max(dp[i - 2] + nums[i - 1] , dp[i - 1])
 * 
 * [1,2,3,1]
 */
var rob = function(nums) {

  if (nums.length === 1) {
    return nums[0]
  }

  const nums1 = nums.slice(0, nums.length - 1)
  const nums2 = nums.slice(1)

  function helper(nums) {
    let dp = [0]
    dp[1] = nums[0]

    let n = nums.length
    if (n >=2) {
      for (let i = 2; i <= n; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1])
      }
    }
    console.log('dp :>> ', dp);
    return dp[n]
  }

  return Math.max(helper(nums1),helper(nums2))
  
};
// @lc code=end

