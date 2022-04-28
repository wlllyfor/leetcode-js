/*
 * @lc app=leetcode.cn id=62 lang=javascript
 *
 * [62] 不同路径
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

/**
 * 
 * dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
 * dp[1][2] = dp[0][2] + dp[1][1]
 */
var uniquePaths = function(m, n) {
  let dp = []
  for (let i = 0; i < m; i++) {
    dp[i] = (new Array(n)).fill(1)
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
};
// @lc code=end

