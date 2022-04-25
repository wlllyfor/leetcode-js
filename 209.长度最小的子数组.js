/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 * 
 * 
 *  i
 *  j
 * 2,3,1,4,3]
 * 
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
// var minSubArrayLen = function(target, nums) {
//   let slow = 0, fast = 0
//   let sum = 0
//   let min = Infinity
//   while (slow <= nums.length - 1) {
//     sum = nums[slow]
    
//     while (sum < target) {
//       if (fast === nums.length - 1) {
//         break
//       }
//       fast++
//       sum += nums[fast]
//     }

//     if (sum >= target) {
//       min = Math.min(fast - slow + 1, min)
//       slow++
//       fast = slow
      
//     } else {
//       console.log(sum)
//       min = min === Infinity ? 0 : min
//       break
//     }
//   }
//   return min
// };

/**
 * 慢指针 i，快指针 j
 * target = 7  
 * 初始状态：
 * sum = 2  res = Infinity
 * 
 *  i          
 * [2,3,1,4,3]
 *  j
 * 
 * 
 * 下一步：
 * sum = 5  res = Infinity
 * 
 *  i          
 * [2,3,1,4,3]
 *    j
 * 
 * 
 * 下一步：
 * sum = 6  res = Infinity
 * 
 *  i          
 * [2,3,1,4,3]
 *      j
 * 
 * 
 * 下一步：
 * sum = 10  res = 4
 * 
 *  i          
 * [2,3,1,4,3]
 *        j
 * 
 * 下一步：
 * sum = 8  res = 3
 * 
 *    i          
 * [2,3,1,4,3]
 *        j
 * 
 * 
 * 下一步：
 * sum = 5  res = 3
 * 
 *      i          
 * [2,3,1,4,3]
 *        j
 * 
 * 
 * 下一步：
 * sum = 8  res = 3
 * 
 *      i          
 * [2,3,1,4,3]
 *          j
 * 
 * 
 * 下一步：
 * sum = 7  res = 2
 * 
 *        i          
 * [2,3,1,4,3]
 *          j
 * 
 * 
 * 下一步：
 * sum = 3  res = 2
 * 
 *          i          
 * [2,3,1,4,3]
 *          j
 *
 * 
 * 下一步：
 * 快指针走完，循环结束
 * 
 *          i          
 * [2,3,1,4,3]
 *            j
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *  
 */
// function minSubArrayLen (target, nums) {
//   let slow = 0, fast = 0
//   let len = nums.length
//   let res = Infinity
//   let sum = 0
//   while(fast < len) {
//     sum += nums[fast]
//     while (sum >= target) {
//       res = Math.min(fast - slow + 1, res)
//       sum -= nums[slow]
//       slow++
//     }
//     fast++
//   }
//   return res === Infinity ? 0 : res
// }

function minSubArrayLen (target, nums) {
  let len = nums.length
  let res = Infinity
  for (let i = 0; i < len; i++) {
      let sum = 0
      for (let j = i; j < len; j++) {
          sum += nums[j]
          if (sum >= target) {
              res = Math.min(res, j - i + 1);
              break
          }
      }
  }
  return res == Infinity ? 0 : res;
}
// @lc code=end

