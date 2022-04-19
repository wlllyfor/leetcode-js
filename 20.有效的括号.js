/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 * 
 * s ')'
 * stack [(]
 */
function isValid (s) {
  const obj = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  let stack = []
  for (let char of s) {
    if (char === obj[stack[stack.length - 1]]) {
      stack.pop()
    } else {
      stack.push(char)
    }
  }
  return stack.length === 0
};
// @lc code=end

