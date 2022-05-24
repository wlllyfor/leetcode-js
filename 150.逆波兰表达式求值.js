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

function calc(num1, num2, token) {
  switch(token) {
    case '+':
      return num1 + num2
    case '-':
      return num1 - num2
    case '*':
      return num1 * num2
    case '/':
      const res = num1 / num2
      return res > 0 ? Math.floor(res) : Math.ceil(res)
  }
}

function evalRPN (tokens) {
  let stack = []
  for (let token of tokens) {
    if (!isNaN(token)) {
      stack.push(Number(token))
    } else {
      const num2 = stack.pop()
      const num1 = stack.pop()
      const calcRes = calc(num1, num2, token)
      stack.push(calcRes)
    }
  }
  return stack[0]
}

// 策略模式
function evalRPN (tokens) {
  let calc = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => (a / b) | 0,
  }
  let stack = []
  for (let token of tokens) {
    if (token in calc) {
      const num2 = stack.pop()
      const num1 = stack.pop()
      const calcRes = calc[token](num1, num2)
      stack.push(calcRes)
    } else {
      stack.push(Number(token))
    }
  }
  return stack.pop()
}


function evalRPN (tokens) {
  
  let stack = []
  for (let token of tokens) {
    if (token === '+') {
      stack.push(stack.pop() + stack.pop())
    } else if (token === '-') {
      const num2 = stack.pop()
      const num1 = stack.pop()
      stack.push(num1 - num2)
    } else if (token === '*') {
      stack.push(stack.pop() * stack.pop())
    } else if (token === '/') {
      const num2 = stack.pop()
      const num1 = stack.pop()
      const res = num1 / num2
      stack.push(res > 0 ? Math.floor(res) : Math.ceil(res))
    } else {
      stack.push(Number(token))
    }
  }
  return stack[0]
}

// @lc code=end

