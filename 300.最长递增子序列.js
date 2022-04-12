/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 * 
 * 动态规划
 * 
 *                  i
 *              j
 * nums = [10,9,2,5,3,7,101,18]
 *   dp = [1, 1,1,2,2,3, 4,  4]
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
 * 贪心 + 二分
 * 
 * [0,1,0,3,2,3]
 * 
 * [10,9,2,5,3,7,101,18]
 * [2,5] 3
 * 
 * 循环 nums，判断 nums 里的值，
 * 如果 nums[i] > arr[arr.length - 1]，把 nums 里的值 push 到临时数组 arr 里
 * 如果 nums[i] < arr[arr.length - 1]
 * 
 * 就去 arr 里找到比 nums[i] 大的第一个数，替换成 arr[arr.length - 1]
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// var lengthOfLIS = function(nums) {
//   const len = nums.length
//   const dp = Array(len).fill(1)
//   for (let i = 0; i < len; i++) {
//     for (let j = 0; j < i; j++) {
//       if (nums[i] > nums[j]) {
//         dp[i] = Math.max(dp[i], dp[j] + 1)
//       }
//     }
//   }
//   return Math.max(...dp)
// };

function lengthOfLIS(nums) {
  const arr = [nums[0]]
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > arr[arr.length - 1]) {
      arr.push(nums[i])
    } else {
      let left = 0
      let right = arr.length - 1
      while (left < right) {
        let mid = (left + right) >> 1
        if (arr[mid] < nums[i]) {
          left = mid + 1
        } else {
          right = mid
        }
      }
      arr[left] = nums[i]
    }
  }
  return arr.length
}
// @lc code=end

