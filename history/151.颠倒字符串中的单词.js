/*
 * @lc app=leetcode.cn id=151 lang=javascript
 *
 * [151] 颠倒字符串中的单词
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  let arr = s.split(' ')
  let res = []
  while (arr.length) {
    let item = arr.pop()
    if (item) {
      res.push(item)
    }
  }
  return res.join(' ')
};
// @lc code=end

