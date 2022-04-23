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

// function calc(val1, val2, s) {
//   switch(s) {
//     case '+':
//     return val1 + val2
//     case '-':
//     return val1 - val2
//     case '*':
//     return val1 * val2
//     case '/':
//     return (val1 / val2) | 0
//   }
// }

// var evalRPN = function(tokens) {
  
//   let stack = []
//   for (let item of tokens) {
//     if (item>= -200 && item <= 200) {
//       stack.push(Number(item))
//     } else {
//       const val2 = stack.pop()
//       const val1 = stack.pop()
//       const calcRes = calc(val1, val2, item)
//       stack.push(calcRes)
//     }
//   }
//   return stack[0]
// };

// 策略模式
function evalRPN (tokens) {
  let calc = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => (a / b) | 0,
  }
  let stack = []
  for (let item of tokens) {
    if (item in calc) {
      const val2 = stack.pop()
      const val1 = stack.pop()
      const calcRes = calc[item](val1, val2)
      stack.push(calcRes)
    } else {
      stack.push(Number(item))
    }
  }
  return stack.pop()
}
// @lc code=end

