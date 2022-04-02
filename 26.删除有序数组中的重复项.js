/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 *      j            
 *  i      
 * [0,0,1,1,1,2,2,3,3,4]
 * 
 * 慢指针 i，快指针 j
 * 循环，每一轮 j++ 
 * 
 * nums[j] !== nums[j - 1] ------>  nums[i] = nums[j] i++ 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  const len = nums.length
  if (len < 2) {
    return len
  }
  let i = 1, j = 1
  while (j < len) {
    if (nums[j] !== nums[j - 1]) {
      nums[i] = nums[j]
      i++
    }
    j++
  }
  return i
};
// @lc code=end

