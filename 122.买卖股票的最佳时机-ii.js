/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
/**
 * 贪心，只要有利润就卖出
 */

// 贪心
// function maxProfit(prices) {
//   let res = 0
//   for(let i=1; i < prices.length; i++){
//     if(prices[i] - prices[i-1] > 0){
//       res += prices[i] - prices[i - 1]
//     }
//   }
//   return res
// }

// function maxProfit(prices) {
//   let res = 0
//   for(let i=1; i < prices.length; i++){
//     res += Math.max(prices[i] - prices[i - 1], 0)
//   }
//   return res
// }

/**
 * 
 *  dp[i] = [不持有股票所得的最多的现金，持有股票所得的最多的现金]
 * 
 */
//  function maxProfit (prices) {
//   let len = prices.length
//   let dp = new Array(len).fill([0,0])
//   dp[0] = [0, -prices[0]]
//   for(let i = 1; i < len; i++) {
//       dp[i] = [
//         Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]),
//         Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]),
//       ]
//   }
//   return dp[len - 1][0];
// };

/**
 * notHas  不持有股票，手上还有的最多的现金
 * 
 * has 持有股票，手上还有的最多的现金
 * 
 * [7,1,5,3,6,4]
 * 
 */
function maxProfit (prices) {
  let len = prices.length
  let notHas = 0
  let has = -prices[0]
  for(let i=1;i<len;i++){
    notHas = Math.max(notHas, has + prices[i]) 
    has = Math.max(has, notHas - prices[i]) 
  }
  return notHas
}


// @lc code=end

