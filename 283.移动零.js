/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 * 
 *             i    
 * [1,2,1,3,12,3,12]
 *               j
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */


// function moveZeroes (nums) {
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


/**
 * 
 * 初始化：
 *  i    
 * [0,1,0,3,12]
 *  j
 * 
 * 下一步：
 * 
 *  i    
 * [0,1,0,3,12]
 *    j
 * 
 *  i    
 * [1,0,0,3,12]
 *    j
 * 
 *    i    
 * [1,0,0,3,12]
 *    j
 * 
 * 下一步：
 * 
 *    i    
 * [1,0,0,3,12]
 *      j
 * 
 * 下一步：
 * 
 *    i    
 * [1,0,0,3,12]
 *        j
 * 
 *    i    
 * [1,3,0,0,12]
 *        j
 * 
 *      i    
 * [1,3,0,0,12]
 *        j
 * 
 * 下一步：
 * 
 *      i    
 * [1,3,0,0,12]
 *           j
 * 
 *      i    
 * [1,3,12,0,0]
 *           j
 * 
 *         i    
 * [1,3,12,0,0]
 *           j
 * 
 * 下一步：
 * 
 *         i    
 * [1,3,12,0,0]
 *              j
 *
 * 
 */

/**
 *      i
 * [1,0,1,0,3,12]
 *        j
 */
// function moveZeroes(nums) {
//   let slow = 0, fast = 0
//   while(fast < nums.length) {
//     if (nums[fast] !== 0) {
//       [nums[fast],nums[slow]] = [nums[slow],nums[fast]]
//       slow++
//     }
//     fast++
//   }
//   return nums
// }

function moveZeroes(nums) {
  let slow = 0, fast = 0
  while(fast < nums.length) {

    if (nums[fast] !== 0 && nums[slow] === 0) {
      [nums[fast],nums[slow]] = [nums[slow],nums[fast]]
      slow++
    }

    if (nums[slow] !== 0) {
      slow++
    }

    fast++
  }
  return nums
}

/**
 *  i
 * [0,1,0,3,12]
 *  j
 * 
 *  i
 * [0,1,0,3,12]  
 *    j
 * 
 *    i
 * [1,1,0,3,12]
 *      j
 * 
 *    i
 * [1,1,0,3,12]
 *        j
 * 
 *      i
 * [1,3,0,3,12]
 *           j
 * 
 *         i
 * [1,3,12,3,12]
 *              j
 * 
 *         i
 * [1,3,12,0,0]
 *              j
 * 
 * 
 */
// function moveZeroes(nums) {
//   let slow = 0
//   for(let fast = 0; fast < nums.length; fast++) {
//     if (nums[fast] !== 0) {
//       nums[slow] = nums[fast]
//       slow++
//     }
//   }
//   for(let i = slow; i < nums.length; i++) {
//     nums[i] = 0
//   }
//   return nums
// }

// function moveZeroes(nums) {
//   let slow = 0, fast = 0, len = nums.length
//   while (slow < len) {
//     if (fast < len) {
//       if (nums[fast] !== 0) {
//         nums[slow] = nums[fast]
//         slow++
//       }
//       fast++
//     } else {
//       nums[slow] = 0
//       slow++
//     }
//   }
//   return nums
// }
// @lc code=end

