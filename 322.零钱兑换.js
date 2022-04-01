/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 * 
 * 
 * 每次先兑换当前能兑换的最大零钱
 * 
 * [5,4,3] 7
 * 
 * 4 + 3 = 7
 * 
 * [2,1] 2
 * 
 *  11
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  coins.sort((a, b) => b - a)
  let count = Number.MAX_VALUE
  for (let i = 0; i < coins.length; i++) {
    count = Math.min(count, find(i))
  }

  function find(i) {
    let innerCount = 0
    let innerAmount = amount
    while(innerAmount) {
      const innerCoins = coins.slice(i)
      let max = innerCoins[0]
      if(innerAmount >= max) {
        innerAmount -= max
        innerCount++
      } else {
        innerCoins.shift()
        if (innerCoins.length === 0 && innerAmount > 0) {
          return Number.MAX_VALUE
        }
      }
    }
    return innerCount
  }
  return count
};
// @lc code=end

