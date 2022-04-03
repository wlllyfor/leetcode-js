/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 *
 *        i
 *              j           
 * [2,1,4,3,2,2,2] 2
 * [1,4,3]
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// var removeElement = function(nums, val) {
//   let slow = 0, fast = 0
//   const len = nums.length
//   while(fast < len) {
//     if (nums[fast] !== val) {
//       nums[slow] = nums[fast]
//       slow++
//     }
//     fast++
//   }
//   return slow
// };

/**
 *          l         
 *          r
 * [1,5,2,3,4,5,1,1]  1
 * [5,5,2,3,4]
 * 
 * [1]
 */

function removeElement (nums, val) {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    if (nums[left] === val) {
      nums[left] = nums[right]
      right--
    } else {
      left++
    }
  }
  return left
}

// @lc code=end

