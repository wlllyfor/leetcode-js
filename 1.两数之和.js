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
// function twoSum(nums, target) {
//   const map = {}
//   for (let i = 0; i < nums.length; i++) {
//     if (map[target - nums[i]] !== undefined) {
//       return [map[target - nums[i]], i]
//     } else {
//       map[nums[i]] = i
//     }
//   }
// }

function twoSum (nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i]
    } else {
      map.set(nums[i], i)
    }
  }
}
// @lc code=end

