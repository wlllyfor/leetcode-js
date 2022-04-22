/*
 * @lc app=leetcode.cn id=704 lang=javascript
 *
 * [704] 二分查找
 * 
 * [-1,0,3,5,9,12]
 * 
 * mid 2
 * left 2
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search (nums, target) {
  let left = 0
  let right = nums.length - 1
  while(left <= right) {
    let mid = (left + right) >> 1
    if (nums[mid] === target) {
      return mid
    }
    if (nums[mid] > target) {
      right = mid - 1
    }
    if (nums[mid] < target) {
      left = mid + 1
    }
  }
  return -1
}
// @lc code=end

