/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
// 贪心
// var maxProfit = function(prices) {
//   let min = Infinity
//   let res = 0
//   for (let price of prices) {
//     min = Math.min(min, price)
//     res = Math.max(res, price - min)
//   }
//   return res
// };

// dp[i] = [不持有股票所得的最多的现金，持有股票所得的最多的现金]
/**
 * 
 * prices = [7,1,5,3,6,4]
 * [
 *  [0, -7],
 *  [0, -1],
 *  [4, -1],
 *  [4, -1],
 *  [5, -1],
 *  [5, -1],
 * ]
 */
function maxProfit (prices) {
  let len = prices.length
  let dp = new Array(len).fill([0,0])
  dp[0] = [0, -prices[0]]
  for (let i = 1; i < len; i++) {
    dp[i] = [
      Math.max(dp[i - 1][0], prices[i] + dp[i - 1][1]),
      Math.max(dp[i - 1][1], -prices[i])
    ]
  }
  return dp[len - 1][0]
}
// @lc code=end

