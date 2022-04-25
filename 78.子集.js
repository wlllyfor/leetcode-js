/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * path
 */
var subsets = function(nums) {
  let res = []
  let path = []

  backTrack(0)

  return res

  function backTrack(cur) {
    res.push([...path])
    if (cur === nums.length) {
      return
    }

    for (let i = cur; i < nums.length; i++) {
      path.push(nums[i])
      backTrack(i + 1)
      path.pop()
    }
  }
};
// @lc code=end

