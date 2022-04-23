/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {

  if (!digits) {
    return []
  }

  const map = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
  }
  
  let res = []

  dfs('', 0)

  function dfs (curStr, i) {
    if (i > digits.length - 1) {
      res.push(curStr)
      return
    }

    const letters = map[digits[i]]

    for (let char of letters) {
      dfs(curStr + char, i + 1)
    }
  }
  return res
};

// @lc code=end

