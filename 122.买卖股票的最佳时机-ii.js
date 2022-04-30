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
var maxProfit = function(prices) {
  let sum = 0
  let min = Infinity
  for (let price of prices) {
    min = Math.min(min, price)
    if (price > min) {
      sum += price - min
      min = price
    }
  }
  return sum
};

/**
 * dp
 */

// @lc code=end

