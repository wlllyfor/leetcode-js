/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */

/**
 * dp[i] = dp[i - 1] + dp[i - 2]
 */
// var climbStairs = function(n) {
//   let dp = [1, 2]
//   for (let i = 2; i < n; i++) {
//     dp[i] = dp[i - 1] + dp[i - 2]
//   }
//   return dp[n - 1]
// };
// function climbStairs (n) {
//   if ( n < 3) {
//     return n
//   }
//   let p = 1, q = 2, r
//   for (let i = 2; i < n; i++) {
//     r = p + q
//     p = q
//     q = r
//   }
//   return r
// }

function climbStairs (n) {
  let p = 0, q = 1, r
  for (let i = 0; i < n; i++) {
    r = p + q
    p = q
    q = r
  }
  return r
}

// @lc code=end

