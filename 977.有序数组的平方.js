/*
 * @lc app=leetcode.cn id=977 lang=javascript
 *
 * [977] 有序数组的平方
 * 
 * 数组先平方
 * 
 * 先找到数组中最小的值
 * 
 * 双指针，从中间向两边
 * 
 *       i
 *       j
 * [16,1,0,9,100]
 * 
 *         i
 *         j
 * [16,9,1,1,9,100]
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
/**
 * 
 *  i 
 *            j          
 * [-4,-1,0,3,10]
 * 
 */
var sortedSquares = function(nums) {
  let left = 0, right = nums.length - 1

  const res = []
  while (left <= right) {

    if (Math.abs(nums[left]) > Math.abs(nums[right])) {
      res.unshift(nums[left] * nums[left])
      left++
    } else {
      res.unshift(nums[right] * nums[right])
      right--
    }
  }
  return res
};
// @lc code=end