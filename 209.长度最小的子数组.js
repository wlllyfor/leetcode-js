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
var minSubArrayLen = function(target, nums) {
  let slow = 0, fast = 0
  let sum = 0
  let min = Infinity
  while (slow <= nums.length - 1) {
    sum = nums[slow]
    
    while (sum < target) {
      if (fast === nums.length - 1) {
        break
      }
      fast++
      sum += nums[fast]
    }

    if (sum >= target) {
      min = Math.min(fast - slow + 1, min)
      slow++
      fast = slow
      
    } else {
      console.log(sum)
      min = min === Infinity ? 0 : min
      break
    }
  }
  return min
};
// @lc code=end

