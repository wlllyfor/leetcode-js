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
  let arr = s.split('')
  let stack = []
  while(arr.length) {
    let item = arr.shift()
    if (obj[stack[stack.length - 1]] === item) {
      stack.pop()
    } else {
      stack.push(item)
    }
  }
  return stack.length === 0
};
// @lc code=end

