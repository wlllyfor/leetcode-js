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
// var rob = function(nums) {

//   if (nums.length === 1) {
//     return nums[0]
//   }

//   const nums1 = nums.slice(0, nums.length - 1)
//   const nums2 = nums.slice(1)

//   // function helper(nums) {
//   //   let dp = [0]
//   //   dp[1] = nums[0]

//   //   let n = nums.length
//   //   if (n >=2) {
//   //     for (let i = 2; i <= n; i++) {
//   //       dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1])
//   //     }
//   //   }
//   //   console.log('dp :>> ', dp);
//   //   return dp[n]
//   // }
//   function helper (nums) {
//     let dp = [nums[0], Math.max(nums[0], nums[1])]
//     for (let i = 2; i <= nums.length; i++) {
//       dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
//     }
//     return dp[nums.length - 1]
//   }
//   return Math.max(helper(nums1), helper(nums2))
// };

function rob (nums) {
  let len = nums.length
  if (len === 1) {
    return nums[0]
  }
  return Math.max(helper(0, len - 2), helper(1, len - 1))
  function helper (start, end) {
    let dp = new Array(end + 1).fill(0)
    dp[start] = nums[start]
    dp[start + 1] = Math.max(nums[start], nums[start + 1])
    
    for (let i = start + 2; i <= end; i++) {
      dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    }
    
    return dp[end]
  }
}
// @lc code=end

