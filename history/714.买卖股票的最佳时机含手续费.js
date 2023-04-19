/*
 * @lc app=leetcode.cn id=714 lang=javascript
 *
 * [714] 买卖股票的最佳时机含手续费
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */

// 贪心
// [1,3,7,5,10,3]
// function maxProfit (prices, fee) {
//   let sum = 0
//   let min = prices[0]
//   for (let price of prices) {
//     min = Math.min(min, price)
//     let money = price - min - fee
//     if (money > 0) {
//       sum += money
//       min = price - fee
//     }
//   }
//   return sum
// }

/**
 * dp
 * 
 */
function maxProfit (prices, fee) {
  let len = prices.length
  let notHas = 0
  let has = -prices[0]
  for(let i = 1;i < len; i++){
    notHas = Math.max(notHas, has + prices[i] - fee)
    has = Math.max(has, notHas - prices[i])
  }
  return notHas
}


// @lc code=end

