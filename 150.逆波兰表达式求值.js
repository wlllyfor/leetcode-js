/*
 * @lc app=leetcode.cn id=150 lang=javascript
 *
 * [150] 逆波兰表达式求值
 */

// @lc code=start
/**
 * @param {string[]} tokens
 * @return {number}
 */

function calc(val1, val2, s) {
  if (s === '+') {
    return val1 + val2
  }
  if (s === '-') {
    return val1 - val2
  }
  if (s === '*') {
    return val1 * val2
  }
  if (s === '/') {
    return parseInt(val1 / val2)
  }
}

var evalRPN = function(tokens) {
  
  let stack = []
  for (let item of tokens) {
    if (item>= -200 && item <= 200) {
      stack.push(Number(item))
    } else {
      const val2 = stack.pop()
      const val1 = stack.pop()
      const clacRes = calc(val1, val2, item)
      stack.push(clacRes)
    }
  }
  return stack[0]
};
// @lc code=end

