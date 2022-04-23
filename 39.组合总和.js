/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  let res = []
  let path = []
  candidates.sort()
  backTrack(0, 0)
  return res
  function backTrack (start, sum) {
    if (sum > target) {
      return 
    }
    if (sum === target) {
      res.push([...path])
    }
    for (let i = start; i < candidates.length; i++) {
      let num = candidates[i] 
      if (num + sum > target) {
        continue
      }
      path.push(num)
      sum += num
      backTrack(i, sum)
      path.pop()
      sum -= num
    }
  }
};
// @lc code=end

