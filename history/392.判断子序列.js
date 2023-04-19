/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

/** 
 * 'abc'
 *   
 *   
 * 'cahbgdc'
 */

/**
 * 双指针
 */
// var isSubsequence = function(s, t) {
//   let i = 0
//   let j = 0
//   while(j < t.length) {
//     if (t[j] === s[i]) {
//       i++
//     } 
//     j++
//   }
//   return i === s.length
// };

function isSubsequence (s, t) {
  let m = s.length
  let n = t.length
  let dp = new Array(m + 1).fill(0).map(() => {
    return new Array(n + 1).fill(0)
  })
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = dp[i][j - 1]
      }
    }
  }
  return dp[m][n] === m
}

// @lc code=end

