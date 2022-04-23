/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {

  let path = []
  let res = []

  backTrack(1)

  return res

  function backTrack(count) {
    if (count > k ) {
      res.push([...path])
      return
    }
    for (let i = count; i <= n; i++) {
      if (path.includes(i) || i < Math.max(...path)) {
        continue
      }
      path.push(i)
      backTrack(count + 1)
      path.pop()
    }
  }
};
// @lc code=end

