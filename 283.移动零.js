/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 * 
 *      i
 *        j
 * [1,2,0,1,0,3,12]
 * [2,1,0,1]
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


/**
 * 不为 0 时 slow++，fast一直++
 * 
 * 如果 nums[fast] !== 0，nums[slow] === 0，fast、slow位置的元素交换位置
 * 
 */

function moveZeroes(nums) {
  let slow = 0, fast = 0
  while(fast < nums.length) {
    if (nums[fast] !== 0) {
      [nums[fast],nums[slow]] = [nums[slow],nums[fast]]
      slow++
    }
    fast++
  }
  return nums
}

// function moveZeroes(nums) {
//   let slow = 0, fast = 0
//   while(fast < nums.length) {
//     if (nums[fast] !== 0 && nums[slow] === 0) {
//       [nums[fast],nums[slow]] = [nums[slow],nums[fast]]
//       slow++
//     }
//     if (nums[slow] !== 0) {
//       slow++
//     }
//     fast++
//   }
//   return nums
// }
// @lc code=end

