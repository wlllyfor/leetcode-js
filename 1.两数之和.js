/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// nums = [2,7,11,15], target = 9
// [3,2,4] 6

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// function twoSum(nums, target) {
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = 0; j < nums.length; j++) {
//       if (nums[i] + nums[j] === target && i !== j) {
//         return [i, j]
//       }      
//     }
//   }
// };

/**
 * 
 * {
 *   2: 0,
 *   7: 1
 * }
 */
function twoSum(nums, target) {
  const obj = {}
  for (let i = 0; i < nums.length; i++) {
    if (target - nums[i] in obj) {
      return [obj[target - nums[i]], i]
    } else {
      obj[nums[i]] = i
    }
  }
}
// @lc code=end

