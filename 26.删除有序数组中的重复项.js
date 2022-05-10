/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 * 
 * 
 * 定义慢指针 i，快指针 j，初始状态：
 * 
 *  i
 * [1, 1, 2]
 *  j
 * 
 * 此时，快指针和慢指针的值相等，j++，
 * 
 *  i
 * [1, 1, 2]
 *     j
 * 
 * 此时，快指针和慢指针的值相等，j++
 * 
 *  i
 * [1, 1, 2]
 *        j
 * 
 * 此时，快指针和慢指针的值不相等，
 * i++ 之后，再执行 nums[i] = nums[j]
 * 
 *     i
 * [1, 2, 2]
 *        j
 * 
 * 此时，快指针和慢指针的值相等，j++
 * j 不再小于 len ，跳出循环
 * 
 * 
 * 
 * 
 * 循环，每一轮 j++ 
 * 
 * nums[j] !== nums[j - 1] ------>  nums[i] = nums[j] i++ 
 * 
 *  i
 * [0,0,1,1,2]
 *  j
 * 
 *  i
 * [0,0,1,1,2]
 *    j
 * 
 *  i
 * [0,0,1,1,2]
 *      j
 * 
 *    i
 * [0,0,1,1,2]
 *      j
 * 
 *    i
 * [0,1,1,1,2]
 *      j
 * 
 *    i
 * [0,1,1,1,2]
 *        j
 * 
 *    i
 * [0,1,1,1,2]
 *          j
 * 
 *      i
 * [0,1,1,1,2]
 *          j
 * 
 *      i
 * [0,1,2,1,2]
 *          j
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// var removeDuplicates = function(nums) {
//   let slow = 0, fast = 0
//   const len = nums.length
//   while (fast < len) {
//     if (nums[slow] !== nums[fast]) {
//       slow++
//       nums[slow] = nums[fast]
//     }
//     fast++
//   }
//   return slow + 1
// };

/**
 *    i
 * [0,1,1,1,1,2,2,3,3,4]
 *      j
 */
function removeDuplicates (nums) {
  let slow = 0
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++
      nums[slow] = nums[fast]
    }
  }
  return slow + 1
}

function removeDuplicates (nums) {
  const n = nums.length
  let fast = 1, slow = 1
  while (fast < n) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  return slow
}

function removeDuplicates (nums) {
  const len = nums.length
  let fast = 1, slow = 0
  while (fast < len) {
    if (nums[fast] !== nums[fast - 1]) {
      slow++
      nums[slow] = nums[fast]
    }
    fast++
  }
  return slow + 1
}

// @lc code=end

