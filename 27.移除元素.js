/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 * 
 * 
 *  
 * 
 * 
 * nums[i] === val
 * 
 * 
 *      i
 *               j
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
//   let i = 0
//   for (let j = 0; j < nums.length; j++) {
//     if (nums[i] !== val) {
//       i++
//     }
//   }
//   return i
// };

/**
 *        l         
 *        r
 * [5,2,3,4,5,1,1]  1
 */

function removeElement (nums, val) {
  let left = 0, right = nums.length;
  while (left < right) {
    if (nums[left] === val) {
      nums[left] = nums[right - 1];
      right--;
    } else {
      left++;
    }
  }
  return left;
}

// @lc code=end

