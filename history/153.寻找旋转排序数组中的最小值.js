/*
 * @lc app=leetcode.cn id=153 lang=javascript
 *
 * [153] 寻找旋转排序数组中的最小值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 
 * [1,2,3,4,5]
 * [5,1,2,3,4]
 * 
 * [4,5,1,2,3]
 * [3,4,5,1,2]
 * 
 * 
 * [2,1]
 */
function findMin (nums) {
  let left = 0
  let right = nums.length - 1

  while (left < right) { 
    let mid = (left + right) >> 1
    if (nums[mid] < nums[right]) {
      right = mid 
    } else {
      left = mid + 1
    }
  }
  return nums[left]
}

// @lc code=end

