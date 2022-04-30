/*
 * @lc app=leetcode.cn id=123 lang=javascript
 *
 * [123] 买卖股票的最佳时机 III
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  
  // dp[i][0] 不买也不卖
  // dp[i][1] 第一次买入
  // dp[i][2] 卖出
  // dp[i][3] 第二次买入
  // dp[i][3] 第二次卖出
  // dp[i-1][0]-prices[i]
  let len = prices.length
  let dp = new Array(len).fill(0).map(x=>{
    return new Array(5).fill(0)
  })
  dp[0][1] = -prices[0]
  dp[0][3] = -prices[0]
  for(let i=1; i<len; i++){
    dp[i][0] = dp[i-1][0]
    dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i])
    dp[i][2] = Math.max(dp[i-1][2], dp[i-1][1] + prices[i])
    dp[i][3] = Math.max(dp[i-1][3], dp[i-1][2] - prices[i])
    dp[i][4] = Math.max(dp[i-1][4], dp[i-1][3] + prices[i])
  }
  return dp[len-1][4]
};
// @lc code=end

