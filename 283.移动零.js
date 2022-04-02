/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 * 
 *      i
 *          j
 * [0,1,0,3,12]
 * [1,3,12,0,0]
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// var moveZeroes = function(nums) {
//   let i = 0
//   for (let j = 0; j < nums.length; j++) {
//     if (nums[j] !== 0) {
//       nums[i] = nums[j]
//       i++
//     }
//   }
//   for (let k = i; k < nums.length; k++) {
//     nums[k] = 0
//   }
//   return nums
// };

function moveZeroes(nums) {
  let i = 0
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]]
      i++
    }
  }
  return nums
}
// @lc code=end

