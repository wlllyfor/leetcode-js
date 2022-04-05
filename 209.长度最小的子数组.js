/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 * 
 * 
 *  i
 *  j
 * [2,3,1,2,4,3]
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
 * 
 *            i
 *            j
 * [2,3,1,2,4,3]
 * 
 *  i
 *          j
 * [1,2,3,4,5] 15
 */
function minSubArrayLen (target, nums) {
  let slow = 0, fast = 0
  let len = nums.length
  let min = len + 1
  let sum = 0
  while (fast < len) {
    sum += nums[fast]
    while (sum >= target) {
      min = Math.min(min, fast - slow + 1)
      sum -= nums[slow]
      slow++
    }
    fast++
  }
  return min === len - 1 ? 0 : min
}
// @lc code=end

