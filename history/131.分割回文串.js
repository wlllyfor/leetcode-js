/*
 * @lc app=leetcode.cn id=131 lang=javascript
 *
 * [131] 分割回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 * ababa
 * []
 */

function isPalindrome (s, left, right) {
  let l = left
  let r = right
  while (l <= r) {
    if (s[l] !== s[r]) {
      return false
    }
    l++
    r--
  }
  return true
}
var partition = function(s) {
  let res = []
  let path = []
  backTrack(0)
  return res
  function backTrack(cur) {
    let len = s.length
    if (cur >= len) {
      res.push([...path])
    }
    for (let i = cur; i < len; i++) {
      if (!isPalindrome(s, cur, i)) {
        continue
      }
      path.push(s.slice(cur, i + 1))
      backTrack(i + 1)
      path.pop()
    }
  }
};
// @lc code=end

