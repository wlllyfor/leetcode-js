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
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  let stack = []
  for (let char of s) {
    if (char === map[stack[stack.length - 1]]) {
      stack.pop()
    } else {
      stack.push(char)
    }
  }
  return stack.length === 0
}
// @lc code=end


// 删除字符串中的所有相邻重复项
// 简化路径
// 逆波兰表达式求值 
// 设计浏览器历史记录