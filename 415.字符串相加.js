/*
 * @lc app=leetcode.cn id=415 lang=javascript
 *
 * [415] 字符串相加
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
// function addStrings(num1, num2) {
//   let i = num1.length - 1
//   let j = num2.length - 1
//   let res = ''
//   let carry = 0
//   while(i >= 0 || j >=0) {
//     let x = i >= 0 ? num1[i] - '0' : 0
//     let y = j >= 0 ? num2[j] - '0' : 0
//     let sum = x + y + carry
//     if (sum >= 10) {
//       carry = 1
//       sum -= 10
//     } else {
//       carry = 0
//     }
//     res = sum + res
//     console.log(res)
//     i--
//     j--
//   }
//   if (carry) {
//     res = carry + res
//   }
//   return res
// }
// @lc code=end

function addStrings(num1, num2) {
  let i = num1.length - 1
  let j = num2.length - 1
  let carry = 0
  let res = ''
  while(i >= 0 || j >=0 || carry !== 0) {
    let x = Number(num1[i]) || 0
    let y = Number(num2[j]) || 0
    let sum = x + y + carry
    carry = Math.floor(sum / 10)
    res = sum % 10 + res
    i--
    j--
  }
  return res
}

function addStrings (num1, num2) {
  let i = num1.length - 1
  let j = num2.length - 1
  let carry = 0
  let res = []
  while (i >= 0 || j >= 0 || carry !== 0) {
      const x = Number(num1[i]) || 0
      const y = Number(num2[j]) || 0
      const sum = x + y + carry
      res.push(sum % 10)
      carry = Math.floor(sum / 10)
      i--
      j--
  }
  return res.reverse().join('')
}