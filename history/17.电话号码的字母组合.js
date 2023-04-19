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
// var letterCombinations = function(digits) {

//   if (!digits) {
//     return []
//   }

//   const arr = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'] 
  
//   let res = []

//   dfs('', 0)

//   return res

//   function dfs (curStr, i) {
//     if (i > digits.length - 1) {
//       res.push(curStr)
//       return
//     }

//     const letters = arr[digits[i]]

//     for (let char of letters) {
//       dfs(curStr + char, i + 1)
//     }
//   }
// };

function letterCombinations (digits) {
  let len = digits.length
  if (!len) {
    return []
  }
  let res = []
  const arr = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'] 
  let path = []
  backTrack(0)
  return res
  function backTrack (i) {
    if (path.length === len) {
      res.push(path.join(''))
      return
    }

    let letters = arr[digits[i]]

    for (let char of letters) {
      path.push(char)
      backTrack(i + 1)
      path.pop()
    }
  }
}

// @lc code=end

